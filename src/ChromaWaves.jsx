import { useEffect, useRef } from 'react';

function ChromaWaves({ className = '', speed = 0.32, opacity = 0.2 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const pointer = { x: 0.68, y: 0.42 };
    const target = { x: pointer.x, y: pointer.y };
    let frameId = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const handlePointerMove = (event) => {
      const bounds = host.getBoundingClientRect();
      target.x = Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1);
      target.y = Math.min(Math.max((event.clientY - bounds.top) / bounds.height, 0), 1);
    };

    const draw = (time) => {
      pointer.x += (target.x - pointer.x) * 0.045;
      pointer.y += (target.y - pointer.y) * 0.045;
      const elapsed = time * 0.001 * speed;
      const pointerX = pointer.x * width;
      const pointerY = pointer.y * height;

      context.clearRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = 'screen';
      context.lineCap = 'round';

      for (let row = 0; row < 7; row += 1) {
        const baseY = height * (0.18 + row * 0.12);
        const distanceToPointer = Math.abs(baseY - pointerY) / Math.max(height, 1);
        const influence = Math.max(0, 1 - distanceToPointer * 1.75);
        const amplitude = height * (0.006 + influence * 0.018);
        const phase = elapsed * (0.72 + row * 0.035) + row * 0.82;
        const hue = row % 2 === 0 ? '112, 167, 255' : '91, 92, 232';

        context.beginPath();
        for (let x = -24; x <= width + 24; x += 18) {
          const normalizedX = x / Math.max(width, 1);
          const pointerPull = Math.exp(-((x - pointerX) ** 2) / (width * width * 0.06));
          const wave =
            Math.sin(normalizedX * 10.5 + phase) * amplitude * 0.55 +
            Math.sin(normalizedX * 24 - phase * 1.35 + row) * amplitude * 0.22 +
            (pointerY - baseY) * pointerPull * 0.08;
          const y = baseY + wave;
          if (x === -24) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        context.strokeStyle = `rgba(${hue}, ${0.11 + influence * 0.2})`;
        context.lineWidth = 0.7 + influence * 0.85;
        context.shadowColor = `rgba(${hue}, ${0.12 + influence * 0.18})`;
        context.shadowBlur = 10 + influence * 15;
        context.stroke();
      }

      context.restore();
      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    frameId = window.requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.cancelAnimationFrame(frameId);
    };
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`chroma-waves ${className}`.trim()}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}

export default ChromaWaves;
