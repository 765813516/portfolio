import { useRef } from 'react';

function SpotlightCard({
  as: Component = 'div',
  children,
  className = '',
  spotlightColor = 'rgba(106, 96, 255, 0.22)',
  ...rest
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    cardRef.current.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
    cardRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <Component
      {...rest}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`.trim()}
    >
      {children}
    </Component>
  );
}

export default SpotlightCard;
