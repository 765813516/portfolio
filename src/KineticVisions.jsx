import { useEffect, useMemo, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import './KineticVisions.css';

// Add, replace, or remove video files in this folder; the source list sorts by filename.
const videoModules = import.meta.glob('./assets/kinetic-visions/*.{mp4,webm,mkv}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const filenameOrder = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
const finalClipName = '8.mp4';

const videoLibrary = Object.entries(videoModules)
  .map(([path, url]) => {
    const name = path.split('/').pop();
    const extension = name.split('.').pop().toLowerCase();
    const type = extension === 'webm'
      ? 'video/webm'
      : extension === 'mkv'
        ? 'video/x-matroska'
        : 'video/mp4';

    return { name, url, type };
  })
  .sort((first, second) => {
    if (first.name === finalClipName) return 1;
    if (second.name === finalClipName) return -1;
    return filenameOrder.compare(first.name, second.name);
  });

function findNextClip(start, unavailable, count) {
  for (let offset = 0; offset < count; offset += 1) {
    const index = (start + offset + count) % count;
    if (!unavailable.has(index)) return index;
  }
  return -1;
}

function MotionWindow({ clips, startIndex, className, isPlaying, label }) {
  const videoRefs = useRef([]);
  const sourceIndexesRef = useRef([null, null]);
  const activeLayerRef = useRef(0);
  const initializedRef = useRef(false);
  const transitioningRef = useRef(false);
  const endedRef = useRef(false);
  const isPlayingRef = useRef(isPlaying);
  const unavailableRef = useRef(new Set());
  const transitionTimerRef = useRef(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(startIndex % Math.max(clips.length, 1));
  const [mediaFailed, setMediaFailed] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    const layers = videoRefs.current;
    if (!clips.length || layers.length < 2) return undefined;

    const assignSource = (layer, index) => {
      if (index < 0) return;
      const video = layers[layer];
      sourceIndexesRef.current[layer] = index;
      video.dataset.clipIndex = String(index);
      video.preload = layer === activeLayerRef.current ? 'auto' : 'metadata';
      video.src = clips[index].url;
      video.load();
    };

    const beginTransition = () => {
      if (!isPlayingRef.current || transitioningRef.current) return;
      const oldLayer = activeLayerRef.current;
      const nextLayer = 1 - oldLayer;
      const nextVideo = layers[nextLayer];
      const nextIndex = sourceIndexesRef.current[nextLayer];
      if (nextIndex === null || nextVideo.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;

      transitioningRef.current = true;
      endedRef.current = false;
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => setAutoplayBlocked(true));
      activeLayerRef.current = nextLayer;
      setActiveLayer(nextLayer);
      setCurrentIndex(nextIndex);

      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = window.setTimeout(() => {
        layers[oldLayer].pause();
        transitioningRef.current = false;
        const following = findNextClip(
          nextIndex + 1,
          unavailableRef.current,
          clips.length,
        );
        if (following >= 0) assignSource(oldLayer, following);
        else setMediaFailed(true);
      }, 900);
    };

    const handleTimeUpdate = (layer) => {
      if (layer !== activeLayerRef.current) return;
      const video = layers[layer];
      const remaining = video.duration - video.currentTime;
      if (remaining <= 4) layers[1 - layer].preload = 'auto';
      if (remaining <= 0.85) beginTransition();
    };

    const handleEnded = (layer) => {
      if (layer !== activeLayerRef.current) return;
      endedRef.current = true;
      beginTransition();
    };

    const handleCanPlay = (layer) => {
      if (layer !== 1 - activeLayerRef.current) return;
      const activeVideo = layers[activeLayerRef.current];
      if (endedRef.current || activeVideo.duration - activeVideo.currentTime <= 0.85) {
        beginTransition();
      }
    };

    const handleError = (layer) => {
      const failedIndex = sourceIndexesRef.current[layer];
      if (failedIndex === null) return;
      unavailableRef.current.add(failedIndex);
      const replacement = findNextClip(
        failedIndex + 1,
        unavailableRef.current,
        clips.length,
      );

      if (replacement < 0) {
        setMediaFailed(true);
        layers[layer].pause();
        return;
      }

      if (layer === activeLayerRef.current) {
        endedRef.current = true;
        beginTransition();
      }
      assignSource(layer, replacement);
    };

    const listeners = layers.map((video, layer) => {
      const onTimeUpdate = () => handleTimeUpdate(layer);
      const onEnded = () => handleEnded(layer);
      const onCanPlay = () => handleCanPlay(layer);
      const onError = () => handleError(layer);
      video.addEventListener('timeupdate', onTimeUpdate);
      video.addEventListener('ended', onEnded);
      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('error', onError);
      return { video, onTimeUpdate, onEnded, onCanPlay, onError };
    });

    if (isPlaying && !initializedRef.current) {
      const firstIndex = findNextClip(startIndex, unavailableRef.current, clips.length);
      const secondIndex = findNextClip(firstIndex + 1, unavailableRef.current, clips.length);
      if (firstIndex >= 0 && secondIndex >= 0) {
        initializedRef.current = true;
        activeLayerRef.current = 0;
        setActiveLayer(0);
        assignSource(0, firstIndex);
        assignSource(1, secondIndex);
        setCurrentIndex(firstIndex);
        layers[0].play().catch(() => setAutoplayBlocked(true));
      } else {
        setMediaFailed(true);
      }
    } else if (isPlaying && initializedRef.current) {
      layers[activeLayerRef.current].play().catch(() => setAutoplayBlocked(true));
    } else {
      layers.forEach((video) => video.pause());
    }

    return () => {
      listeners.forEach(({ video, onTimeUpdate, onEnded, onCanPlay, onError }) => {
        video.removeEventListener('timeupdate', onTimeUpdate);
        video.removeEventListener('ended', onEnded);
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('error', onError);
      });
    };
  }, [clips, isPlaying, startIndex]);

  useEffect(() => () => {
    window.clearTimeout(transitionTimerRef.current);
    videoRefs.current.forEach((video) => video?.pause());
  }, []);

  const handleManualPlay = () => {
    const video = videoRefs.current[activeLayerRef.current];
    if (!video) return;
    video.play().then(() => setAutoplayBlocked(false)).catch(() => setAutoplayBlocked(true));
  };

  const clip = clips[currentIndex];

  return (
    <div className={`kinetic-window ${className}`} role="group" aria-label={label}>
      <div className="kinetic-window__layers" aria-hidden="true">
        {[0, 1].map((layer) => (
          <video
            key={layer}
            ref={(element) => { videoRefs.current[layer] = element; }}
            className={`kinetic-window__video${activeLayer === layer ? ' is-active' : ''}`}
            muted
            playsInline
            autoPlay
            loop={false}
            preload="none"
            tabIndex={-1}
          />
        ))}
      </div>
      <div className="kinetic-window__caption" aria-hidden="true">
        <span>{clip?.name.replace(/\.[^.]+$/, '') ?? 'MOTION STUDY'}</span>
        <span>{String(currentIndex + 1).padStart(2, '0')} / {String(clips.length).padStart(2, '0')}</span>
      </div>
      {autoplayBlocked && !mediaFailed && (
        <button
          className="kinetic-window__play"
          type="button"
          aria-label="播放影像片段"
          onClick={handleManualPlay}
        >
          <Play size={17} fill="currentColor" />
        </button>
      )}
      {mediaFailed && (
        <div className="kinetic-window__unavailable" role="status">
          <span>VIDEO SIGNAL UNAVAILABLE</span>
          <span>REPLACE WITH MP4 OR WEBM</span>
        </div>
      )}
    </div>
  );
}

export default function KineticVisions() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [clips, unavailable] = useMemo(() => {
    if (typeof document === 'undefined') return [[], videoLibrary.length];
    const probe = document.createElement('video');
    const playable = videoLibrary.filter((clip) => probe.canPlayType(clip.type));
    return [playable, videoLibrary.length - playable.length];
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
      if (entry.isIntersecting) setHasEntered(true);
    }, { threshold: 0.12, rootMargin: '80px 0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`kinetic-visions${hasEntered ? ' is-entered' : ''}${isInView ? ' is-in-view' : ''}`}
      id="kinetic-visions"
      ref={sectionRef}
      aria-labelledby="kinetic-visions-title"
    >
      <div className="kinetic-visions__media">
        {clips.length > 0 && (
          <>
            <MotionWindow
              clips={clips}
              startIndex={0}
              className="kinetic-window--backdrop"
              isPlaying={isInView}
              label="主影像"
            />
          </>
        )}
        {clips.length === 0 && (
          <div className="kinetic-visions__empty" role="status">
            VIDEO SOURCE UNAVAILABLE / ADD MP4 OR WEBM TO THE MEDIA FOLDER
          </div>
        )}
      </div>

      <div className="kinetic-visions__shade" aria-hidden="true" />
      <div className="kinetic-visions__topline" aria-hidden="true">
        <span>VISUAL ARCHIVE <i> / </i> MOTION STUDIES</span>
        <span>{String(videoLibrary.length).padStart(2, '0')} SOURCES <i> / </i> {String(clips.length).padStart(2, '0')} BROWSER READY</span>
      </div>

      <div className="kinetic-visions__copy">
        <div className="kinetic-visions__title-block">
          <span className="kinetic-visions__eyebrow">MOVING IMAGE <i>·</i> 2026</span>
          <h2 id="kinetic-visions-title">
            <span>Kinetic</span>
            <span>Visions</span>
          </h2>
        </div>
        <div className="kinetic-visions__note">
          <span>SELECTED WORKS <i> / </i> {String(clips.length).padStart(2, '0')} CLIPS</span>
          <p>A selection of visual studies in motion.</p>
        </div>
      </div>

      <div className="kinetic-visions__corner-mark" aria-hidden="true">
        <span />
        <span />
      </div>
      {unavailable > 0 && (
        <span className="kinetic-visions__format-note" aria-live="polite">
          {unavailable} FORMAT{unavailable > 1 ? 'S' : ''} NOT SUPPORTED
        </span>
      )}
    </section>
  );
}
