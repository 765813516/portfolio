const BACKDROP = `${import.meta.env.BASE_URL}assets/contact-instrument-panel.png`;

// Masks use the reference coordinates; the needle stays separate through the final tick.
const assembly = 'M 750 0 H 1536 V 1024 H 1080 L 1120 805 Q 737 548 750 0 Z';
const needle = 'M 1114 521 L 1288 494 A 47 47 0 1 1 1288 543 Z';
const labels = [
  { x: 940, y: 432, width: 47, height: 28, delay: 1.25 },
  { x: 1161, y: 617, width: 74, height: 33, delay: 1.5 },
  { x: 1014, y: 809, width: 36, height: 26, delay: 1.8 },
  { x: 1048, y: 823, width: 35, height: 26, delay: 1.95 },
  { x: 1025, y: 840, width: 34, height: 26, delay: 2.1 },
  { x: 998, y: 864, width: 39, height: 29, delay: 2.25 },
];

function mask(shapes) {
  return `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1024">${shapes}</svg>`,
  )}")`;
}

const labelCutouts = labels.map(({ x, y, width, height }) =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="black"/>`,
).join('');
const masks = {
  plate: mask(`<rect width="1536" height="1024" fill="white"/><path d="${assembly}" fill="black"/>${labelCutouts}`),
  assembly: mask(`<path d="${assembly}" fill="white"/><ellipse cx="1095" cy="522" rx="156" ry="151" fill="black"/><circle cx="1228" cy="834" r="110" fill="black"/><path d="${needle}" fill="black"/>${labelCutouts}`),
  dial: mask(`<ellipse cx="1095" cy="522" rx="156" ry="151" fill="white"/><path d="${needle}" fill="black"/>${labelCutouts}`),
  lowerDial: mask('<circle cx="1228" cy="834" r="110" fill="white"/>'),
  contours: mask('<path d="M 210 174 L 675 174 L 902 677 L 480 695 Z" fill="white"/>'),
};
const needleMask = mask(`<path d="${needle}" fill="white"/>`);
const stillMask = mask(`<rect width="1536" height="1024" fill="white"/><path d="${needle}" fill="black"/>`);

export default function ContactBackdrop({ onReady, onComplete }) {
  return (
    <div className="contact-backdrop" aria-hidden="true">
      <div className="contact-backdrop-art">
        <div className="contact-backdrop-layers">
          {Object.entries(masks).map(([name, maskImage]) => (
            <div key={name} className={`contact-art-layer contact-art-${name}`} style={{ maskImage }}>
              <img src={BACKDROP} alt="" draggable="false" />
            </div>
          ))}
          {labels.map(({ x, y, width, height, delay }, index) => (
            <div
              key={index}
              className="contact-art-layer contact-art-label"
              style={{
                '--label-delay': `${delay}s`,
                maskImage: mask(`<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="white"/>`),
              }}
            >
              <img src={BACKDROP} alt="" draggable="false" />
            </div>
          ))}
        </div>
        <img
          className="contact-backdrop-final"
          style={{ maskImage: stillMask }}
          src={BACKDROP}
          alt=""
          draggable="false"
          onLoad={onReady}
          onAnimationEnd={onComplete}
        />
        <div className="contact-art-layer contact-art-needle" style={{ maskImage: needleMask }}>
          <img src={BACKDROP} alt="" draggable="false" />
        </div>
      </div>
    </div>
  );
}
