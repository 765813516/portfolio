import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ArrowUpToLine, BookOpen, Maximize2, Minimize2, Play, ZoomIn, ZoomOut } from 'lucide-react';
import works from './animationAssets.json';
import './PlayWarehouseDetail.css';
import './AnimationVisualDetail.css';

const asset = `${import.meta.env.BASE_URL}assets/animation-visual/`;
const mujikaArt = [
  ['mujika-sc22.webp', 'SC 22', 2400, 1348],
  ['mujika-sc11.webp', 'SC 11 · 初华', 2400, 1497],
  ['mujika-sc19.webp', 'SC 19 · 睦', 2400, 1143],
  ['mujika-sc20.webp', 'SC 20 · 发光', 2400, 1351],
  ['mujika-sc23.webp', 'SC 23 · 羽毛', 1920, 1080],
  ['mujika-three.webp', '三人画面', 2400, 1240],
];
const mujikaFilm = { title: 'Abracadabra', video: { src: 'mujika-abracadabra.mp4', poster: 'mujika-poster.webp', duration: '02:30' } };

function ComicImages({ entry }) {
  return entry.images.map((image, index) => (
    <img key={image.src} src={`${asset}${image.src}`} alt={`${entry.title}，条漫第 ${index + 1} 段`} width={image.width} height={image.height} loading="lazy" decoding="async" draggable="false" />
  ));
}

function ComicReader({ entry, onExpand, onClose }) {
  const scroller = useRef(null);
  const drag = useRef(null);
  const [zoom, setZoom] = useState(1);

  function beginDrag(event) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const el = event.currentTarget;
    drag.current = { x: event.clientX, y: event.clientY, left: el.scrollLeft, top: el.scrollTop };
    el.setPointerCapture(event.pointerId);
    el.classList.add('is-dragging');
    el.focus({ preventScroll: true });
    event.preventDefault();
  }

  function moveDrag(event) {
    if (!drag.current) return;
    event.currentTarget.scrollLeft = drag.current.left + drag.current.x - event.clientX;
    event.currentTarget.scrollTop = drag.current.top + drag.current.y - event.clientY;
  }

  function endDrag(event) {
    drag.current = null;
    event.currentTarget.classList.remove('is-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div className="comic-reader">
      <div className="comic-toolbar">
        <span><BookOpen size={16} aria-hidden="true" />{entry.title}</span>
        <div className="comic-tools">
          <button type="button" title="缩小条漫" aria-label="缩小条漫" disabled={zoom === 1} onClick={() => setZoom(Math.max(1, zoom - 0.25))}><ZoomOut size={17} /></button>
          <output aria-label="缩放比例">{Math.round(zoom * 100)}%</output>
          <button type="button" title="放大条漫" aria-label="放大条漫" disabled={zoom === 2} onClick={() => setZoom(Math.min(2, zoom + 0.25))}><ZoomIn size={17} /></button>
          <button type="button" title="回到条漫开头" aria-label="回到条漫开头" onClick={() => scroller.current.scrollTo({ top: 0, left: 0, behavior: 'instant' })}><ArrowUpToLine size={17} /></button>
          <button type="button" title={onClose ? '退出放大阅读' : '放大阅读窗口'} aria-label={onClose ? '退出放大阅读' : '放大阅读窗口'} onClick={onClose || onExpand}>{onClose ? <Minimize2 size={17} /> : <Maximize2 size={17} />}</button>
        </div>
      </div>
      <div className="comic-scroll" ref={scroller} tabIndex="0" role="region" aria-label={`${entry.title}条漫阅读区`} onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}>
        <div className="comic-canvas" style={{ width: `${zoom * 100}%` }}><ComicImages entry={entry} /></div>
      </div>
    </div>
  );
}

function Film({ entry, story }) {
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);
  const player = useRef(null);
  return (
    <figure className="animation-film">
      <figcaption><span>{entry.title}</span><span>{entry.video.duration}</span></figcaption>
      <div className="animation-film-frame">
      <video ref={player} controls={started} playsInline preload="none" poster={`${asset}${entry.video.poster}`} aria-label={`${story}${entry.title}成片`} onError={() => setFailed(true)} onPlay={(event) => { setStarted(true); document.querySelectorAll('.animation-study video').forEach((video) => { if (video !== event.currentTarget) video.pause(); }); }}>
        <source src={`${asset}${entry.video.src}`} type="video/mp4" />
        当前浏览器无法播放此视频。
      </video>
      {!started && <button className="film-start" type="button" aria-label={`播放${story}${entry.title}`} title={`播放${story}${entry.title}`} onClick={() => { setStarted(true); player.current.play().catch(() => { setStarted(false); setFailed(true); }); }}><span><Play size={28} fill="currentColor" aria-hidden="true" /></span></button>}
      </div>
      {failed && <p className="film-error">视频暂时无法加载。<button type="button" onClick={() => { setFailed(false); player.current.load(); }}>重新加载</button><a href={`${asset}${entry.video.src}`} target="_blank" rel="noopener noreferrer">打开视频 <ArrowUpRight size={14} /></a></p>}
    </figure>
  );
}

function StorySection({ id, number, title, description, onExpand }) {
  return (
    <section className="case-section animation-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="animation-section-head">
        <div><span>{number} / MOTION COMIC</span><h2 id={`${id}-title`}>{title}</h2><p>{description}</p></div>
      </div>
      <div className="animation-episodes">
        {works[id].map((entry) => (
          <article className="animation-episode" key={entry.id} id={entry.id} aria-labelledby={`${entry.id}-title`}>
            <h3 id={`${entry.id}-title`}>{entry.title}</h3>
            <div className={entry.images.length > 0 && entry.video ? 'animation-pair' : 'animation-single'}>
              {entry.images.length > 0 && <div className="animation-media animation-media-comic"><h4>漫画绘制</h4><ComicReader entry={entry} onExpand={() => onExpand({ ...entry, title: `${title} / ${entry.title}` })} /></div>}
              {entry.video && <div className="animation-media"><h4>动画成片</h4><Film entry={entry} story={title} /></div>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function AnimationVisualDetail() {
  const [expanded, setExpanded] = useState(null);
  const [beidouIndex, setBeidouIndex] = useState(0);
  const dialog = useRef(null);
  const beidouEntry = works.beidou[beidouIndex];
  const beidouChapter = `第 ${String(beidouIndex + 1).padStart(2, '0')} 话`;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = '动画视觉创作 | 飞天 · 九州 · 北斗 · Ave Mujica | 郑雅靖';
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    target ? target.scrollIntoView() : window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [expanded]);

  function expandReader(entry) {
    setExpanded(entry);
    dialog.current.showModal();
  }

  function showBeidouChapter(index) {
    setBeidouIndex(index);
    requestAnimationFrame(() => document.getElementById('beidou').scrollIntoView({ behavior: 'instant', block: 'start' }));
  }

  return (
    <main className="case-study animation-study">
      <div className="case-shell">
        <header className="case-nav">
          <a className="case-brand" href="./#projects">ZHENGYAJING <span>/ PORTFOLIO</span></a>
          <a className="case-back" href="./#projects"><ArrowLeft size={18} aria-hidden="true" /> 返回精选项目</a>
        </header>

        <section className="case-intro animation-intro" aria-labelledby="animation-title">
          <img className="case-intro-art" src={`${asset}cover.webp`} alt="" width="1736" height="1006" fetchPriority="high" decoding="async" />
          <p className="case-kicker">SELECTED WORK / COMIC & ANIMATION</p>
          <h1 id="animation-title">动画视觉创作</h1>
          <p className="animation-intro-copy">从静态画格到动态叙事。<br />条漫、分镜与动画 MV 的创作实践。</p>
        </section>

        <nav className="animation-index" aria-label="故事目录">
          <a href="#feitian"><span>01</span>飞天<small>条漫 / 动态漫画</small></a>
          <a href="#jiuzhou"><span>02</span>九州<small>条漫 / 动态漫画</small></a>
          <a href="#beidou"><span>03</span>北斗<small>条漫</small></a>
          <a href="#mujika"><span>04</span>Ave Mujica<small>动画 MV</small></a>
        </nav>

        <StorySection id="feitian" number="01" title="飞天" description="人物、场景与对白构成连续画格，再由镜头运动和声音延展故事的节奏。" onExpand={expandReader} />
        <StorySection id="jiuzhou" number="02" title="九州" description="从动作画面到动态演绎，呈现角色交锋与场景氛围的变化。" onExpand={expandReader} />

        <section className="case-section animation-section" id="beidou" aria-labelledby="beidou-title">
          <div className="animation-section-head"><div><span>03 / SCROLL COMIC</span><h2 id="beidou-title">北斗</h2><p>沿着画格展开叙事，以场景、神情与对白推动角色的旅程。</p></div><span className="animation-count">07 / 条漫作品</span></div>
          <div className="beidou-page">
            <div className="beidou-page-head">
              <div><span>正在阅读</span><h3 aria-live="polite">{beidouChapter}</h3></div>
              <span>{String(beidouIndex + 1).padStart(2, '0')} / {String(works.beidou.length).padStart(2, '0')}</span>
            </div>
            <div className="beidou-strip" key={beidouEntry.id}><ComicImages entry={beidouEntry} /></div>
            <nav className="beidou-chapter-nav" aria-label="北斗章节导航">
              <div>
                {beidouIndex > 0 && <button type="button" onClick={() => showBeidouChapter(beidouIndex - 1)}><ArrowLeft size={18} aria-hidden="true" /> 上一话</button>}
                {beidouIndex < works.beidou.length - 1 && <button className="beidou-next" type="button" onClick={() => showBeidouChapter(beidouIndex + 1)}>下一话 <ArrowRight size={18} aria-hidden="true" /></button>}
                {beidouIndex === works.beidou.length - 1 && <button className="beidou-next" type="button" onClick={() => showBeidouChapter(0)}>回到第一话 <ArrowUpToLine size={18} aria-hidden="true" /></button>}
              </div>
            </nav>
          </div>
        </section>

        <section className="case-section animation-section mujika-section" id="mujika" aria-labelledby="mujika-title">
          <div className="animation-section-head">
            <div><span>04 / ANIMATION MV</span><h2 id="mujika-title">Ave Mujica</h2><p>围绕《Abracadabra》动画 MV 第四幕，展示构思、分镜、成稿与最终成片。</p></div>
          </div>

          <div className="mujika-stage">
            <div className="mujika-stage-head"><span>01</span><h3>前期构思</h3><a href={`${asset}mujika-concept.pdf`} target="_blank" rel="noopener noreferrer">查看完整方案 PDF <ArrowUpRight size={17} aria-hidden="true" /></a></div>
            <div className="mujika-concept-pages">
              {[1, 2].map((page) => <a key={page} href={`${asset}mujika-concept.pdf#page=${page}`} target="_blank" rel="noopener noreferrer" aria-label={`查看前期构思方案第 ${page} 页 PDF`}><img src={`${asset}mujika-concept-${page}.webp`} alt={`Ave Mujica 动画 MV 前期构思方案第 ${page} 页`} width="1921" height="3600" loading="lazy" decoding="async" /></a>)}
            </div>
          </div>

          <div className="mujika-stage">
            <div className="mujika-stage-head"><span>02</span><h3>分镜设计</h3><a href={`${asset}mujika-storyboard.webp`} target="_blank" rel="noopener noreferrer">放大查看分镜 <Maximize2 size={16} aria-hidden="true" /></a></div>
            <a className="mujika-board" href={`${asset}mujika-storyboard.webp`} target="_blank" rel="noopener noreferrer" aria-label="放大查看 Ave Mujica 分镜示意图"><img src={`${asset}mujika-storyboard.webp`} alt="分镜示意图，展示镜头构图、运动方向和时长标注" width="2800" height="1412" loading="lazy" decoding="async" /></a>
          </div>

          <div className="mujika-stage">
            <div className="mujika-stage-head"><span>03</span><h3>成稿画面</h3></div>
            <div className="mujika-gallery">
              {mujikaArt.map(([src, title, width, height]) => <figure key={src}><a href={`${asset}${src}`} target="_blank" rel="noopener noreferrer" aria-label={`放大查看${title}`}><img src={`${asset}${src}`} alt={`Ave Mujica 成稿，${title}`} width={width} height={height} loading="lazy" decoding="async" /></a><figcaption>{title}</figcaption></figure>)}
            </div>
          </div>

          <div className="mujika-stage mujika-finale">
            <div className="mujika-stage-head"><span>04</span><h3>最终成片</h3><a href="https://www.bilibili.com/video/BV1ZLeG6JEha/" target="_blank" rel="noopener noreferrer">前往 Bilibili 观看 <ArrowUpRight size={17} aria-hidden="true" /></a></div>
            <div className="mujika-video"><Film entry={mujikaFilm} story="Ave Mujica" /></div>
          </div>
        </section>

        <footer className="case-footer"><span>ZHENGYAJING / SELECTED WORK</span><a href="./#projects">返回精选项目 <ArrowUpRight size={20} aria-hidden="true" /></a></footer>
      </div>

      <dialog className="comic-dialog" ref={dialog} aria-label={expanded ? `${expanded.title}放大阅读` : '条漫放大阅读'} onClose={() => setExpanded(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }}>
        {expanded && <ComicReader key={expanded.id} entry={expanded} onClose={() => dialog.current.close()} />}
      </dialog>
    </main>
  );
}
