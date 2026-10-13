import { useEffect, useRef, useState } from 'react';
import './ProjectsDecor.css';

export default function ProjectsDecor() {
  const decorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = decorRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.28 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={decorRef} className={`projects-decor${isVisible ? ' is-visible' : ''}`} aria-hidden="true">
      <svg className="projects-decor-lines" viewBox="0 0 320 300" fill="none" focusable="false">
        <g stroke="currentColor" strokeWidth="0.8">
          <ellipse cx="74" cy="224" rx="46" ry="29" />
          <ellipse cx="74" cy="224" rx="19" ry="29" />
          <ellipse cx="74" cy="224" rx="46" ry="11" />
          <path d="M28 224h92M74 195v58M282 22v60M26 155v24" strokeDasharray="3 5" />
          <path d="M22 33V20h42M241 268h49v-15" />
          <path d="M36 122c3 15 7 19 22 22-15 3-19 7-22 22-3-15-7-19-22-22 15-3 19-7 22-22ZM273 128c2 10 5 13 15 15-10 2-13 5-15 15-2-10-5-13-15-15 10-2 13-5 15-15Z" />
          <circle cx="282" cy="94" r="9" />
          <path d="M282 80v28M268 94h28M111 36h10M116 31v10" />
        </g>
        <g className="projects-decor-pixels" fill="currentColor">
          <path d="M27 275h4v4h-4zM37 275h4v4h-4zM47 275h4v4h-4zM57 275h4v4h-4zM67 275h4v4h-4z" />
          <circle cx="118" cy="248" r="2" />
        </g>
      </svg>
      {['arrow', 'spark', 'plus', 'target'].map((shape) => (
        <span key={shape} className={`projects-key projects-key--${shape}`}>
          <span className="projects-key-sprite" />
        </span>
      ))}
    </div>
  );
}
