import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AdvantagesIntro.css';

const artwork = `${import.meta.env.BASE_URL}assets/advantages-hands-transparent.png`;
const rayEnds = [
  [10, 45], [0, 164], [65, 338], [184, 400],
  [384, 0], [600, 28], [600, 176], [590, 348], [418, 400],
];

export default function AdvantagesIntro() {
  const introRef = useRef(null);

  useLayoutEffect(() => {
    const intro = introRef.current;
    const section = intro?.closest('.advantages-section');
    if (!intro || !section) return undefined;

    const motion = gsap.matchMedia();
    motion.add({
      animate: '(prefers-reduced-motion: no-preference)',
      mobile: '(max-width: 760px)',
    }, ({ conditions }) => {
      if (!conditions.animate) return;

      const title = intro.querySelector('.advantages-intro__title');
      const banner = intro.querySelector('.advantages-intro__banner');
      const caption = intro.querySelector('.advantages-intro__caption');
      const leftHand = intro.querySelector('.advantages-intro__art-layer--left');
      const rightHand = intro.querySelector('.advantages-intro__art-layer--right');
      const complete = intro.querySelector('.advantages-intro__art-layer--complete');
      const glow = intro.querySelector('.advantages-intro__glow');
      const star = intro.querySelector('.advantages-intro__star');
      const rays = intro.querySelector('.advantages-intro__rays');
      const rayLines = rays.querySelectorAll('line');
      const handShift = conditions.mobile ? 44 : 82;

      gsap.set(title, {
        autoAlpha: 0,
        x: -30,
        y: -18,
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
      });
      gsap.set(banner, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(caption, { autoAlpha: 0, y: 12 });
      gsap.set(leftHand, { autoAlpha: 0, x: -handShift });
      gsap.set(rightHand, { autoAlpha: 0, x: handShift });
      gsap.set(complete, { autoAlpha: 0 });
      gsap.set(glow, { autoAlpha: 0, scale: 0.25 });
      gsap.set(star, { autoAlpha: 0, scale: 0.15, rotation: -20 });
      gsap.set(rays, { autoAlpha: 0 });
      gsap.set(rayLines, { strokeDashoffset: 440 });

      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: section, start: 'top 82%', once: true },
      })
        .to(title, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          clipPath: 'polygon(0% 0%, 100% 0%, 42% 100%, 0% 100%)',
          duration: 0.64,
        }, 0)
        .to(title, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.38,
        }, 0.58)
        .to(banner, { scaleX: 1, duration: 0.9 }, 0.55)
        .to(caption, { autoAlpha: 1, y: 0, duration: 0.55 }, 1.02)
        .to(leftHand, { autoAlpha: 1, x: 0, duration: 1.05 }, 0.22)
        .to(rightHand, { autoAlpha: 1, x: 0, duration: 1.05 }, 0.32)
        .to(glow, { autoAlpha: 0.92, scale: 1.3, duration: 0.52 }, 1.06)
        .to(star, { autoAlpha: 1, scale: 1.16, rotation: 0, duration: 0.58, ease: 'back.out(1.3)' }, 1.1)
        .to(rays, { autoAlpha: 0.86, duration: 0.12 }, 1.2)
        .to(rayLines, { strokeDashoffset: 0, duration: 0.72, stagger: 0.035 }, 1.2)
        .to(complete, { autoAlpha: 1, duration: 0.68 }, 1.46)
        .to([leftHand, rightHand], { autoAlpha: 0, duration: 0.42 }, 1.62)
        .to(star, { scale: 1, duration: 0.42 }, 1.65)
        .to(glow, { autoAlpha: 0.38, scale: 1, duration: 0.6 }, 1.72)
        .to(rays, { autoAlpha: 0.42, duration: 0.55 }, 1.85);
    });

    return () => motion.revert();
  }, []);

  return (
    <div className="advantages-intro" ref={introRef}>
      <div className="advantages-intro__copy">
        <span className="advantages-intro__corner advantages-intro__corner--top" aria-hidden="true" />
        <span className="advantages-intro__banner" aria-hidden="true" />
        <h2 className="advantages-intro__title">个人优势</h2>
        <p className="advantages-intro__caption">Individual advantages</p>
        <span className="advantages-intro__corner advantages-intro__corner--bottom" aria-hidden="true" />
      </div>

      <div className="advantages-intro__art" role="img" aria-label="两只手伸向中心蓝色星形的科技感画面">
        <img className="advantages-intro__art-layer advantages-intro__art-layer--complete" src={artwork} alt="" aria-hidden="true" />
        <img className="advantages-intro__art-layer advantages-intro__art-layer--left" src={artwork} alt="" aria-hidden="true" />
        <img className="advantages-intro__art-layer advantages-intro__art-layer--right" src={artwork} alt="" aria-hidden="true" />
        <svg className="advantages-intro__rays" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
          {rayEnds.map(([x, y]) => <line key={`${x}-${y}`} x1="288" y1="188" x2={x} y2={y} />)}
        </svg>
        <span className="advantages-intro__contact" aria-hidden="true">
          <span className="advantages-intro__glow" />
          <span className="advantages-intro__star" />
        </span>
      </div>
    </div>
  );
}
