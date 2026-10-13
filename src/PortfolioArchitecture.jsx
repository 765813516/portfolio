import { useEffect, useRef, useState } from 'react';
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  LineDashedMaterial,
  LineLoop,
  Mesh,
  MeshStandardMaterial,
  OrthographicCamera,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import './PortfolioArchitecture.css';

const areas = [
  { title: '游戏项目与角色视觉', detail: '角色原画、道具、美宣、GUI 与游戏 PV。', color: '#476bb3', light: '#c1d9ff', size: 1 },
  { title: '动态分镜与AI视频', detail: '动态分镜、游戏 PV 与 AI 辅助视频制作。', color: '#3c6a76', light: '#b6e7ed', size: 0.9 },
  { title: '品牌空间与活动视觉', detail: '品牌识别、空间视觉与活动宣传落地。', color: '#665276', light: '#ddd1ed', size: 1.04 },
  { title: '社媒账号运营设计', detail: '社媒账号视觉、长图、SVG 推文与 H5。', color: '#744e5a', light: '#f0c5cb', size: 0.86 },
  { title: 'IP潮玩与三维辅助', detail: 'IP 潮玩、手办建模与三维辅助设计。', color: '#4b6884', light: '#d5e8f1', size: 0.94 },
  { title: '原创漫画与连载作品', detail: '原创角色、故事分镜与长篇漫画连载。', color: '#4c6171', light: '#d2e7df', size: 1.06 },
];

const revealTiles = Array.from({ length: 96 }, (_, index) => {
  const column = index % 12;
  const row = Math.floor(index / 12);
  const distance = Math.hypot(column - 5.5, row - 3.5);
  return {
    index,
    delay: `${Math.min(720, Math.round(distance * 72))}ms`,
  };
});

const planetVertex = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const planetFragment = `
  uniform vec3 uBase;
  uniform vec3 uLight;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
          mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
      mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
          mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z
    );
  }

  float field(vec3 p) {
    return noise(p) * 0.55 + noise(p * 2.04 + 8.1) * 0.3 + noise(p * 4.07 + 19.2) * 0.15;
  }

  void main() {
    vec3 p = normalize(vPosition);
    float cloud = field(p * 3.7 + vec3(uTime * 0.055, -uTime * 0.03, 0.0));
    float fine = field(p * 15.0 - vec3(0.0, uTime * 0.04, 0.0));
    float illumination = max(dot(normalize(vNormal), normalize(vec3(-0.46, 0.66, 0.8))), 0.0);
    float rim = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.3);
    vec3 color = mix(uBase * 0.26, uBase, illumination * 0.74 + 0.13);
    color = mix(color, uLight, smoothstep(0.44, 0.86, cloud) * 0.51 + rim * 0.24);
    color += (fine - 0.5) * 0.13;
    color += (hash(p * 211.0) - 0.5) * 0.044;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function makeOrbit(width, height, widthFactor, heightFactor, tilt, opacity, dashed = false) {
  const points = [];
  for (let index = 0; index < 240; index += 1) {
    const angle = (index / 240) * Math.PI * 2;
    const x = Math.cos(angle) * width * widthFactor;
    const y = Math.sin(angle) * height * heightFactor;
    points.push(new Vector3(x * Math.cos(tilt) - y * Math.sin(tilt), x * Math.sin(tilt) + y * Math.cos(tilt), -30));
  }
  const geometry = new BufferGeometry().setFromPoints(points);
  const material = new LineDashedMaterial({
    color: new Color('#9fc9e8'),
    transparent: true,
    opacity,
    dashSize: dashed ? 3 : 10000,
    gapSize: dashed ? 7 : 0,
    depthWrite: false,
  });
  const orbit = new LineLoop(geometry, material);
  orbit.computeLineDistances();
  return orbit;
}

function makeStars(width, height) {
  const coordinates = [];
  for (let index = 0; index < 115; index += 1) {
    const x = ((index * 73) % 117) / 117 - 0.5;
    const y = ((index * 47 + 19) % 113) / 113 - 0.5;
    coordinates.push(x * width * 0.98, y * height * 0.94, -45);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(coordinates, 3));
  const material = new PointsMaterial({ color: '#c8dcf9', size: 1.35, transparent: true, opacity: 0.46, depthWrite: false });
  return new Points(geometry, material);
}

export default function PortfolioArchitecture() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const planetRefs = useRef([]);
  const activeRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvasHost = canvasRef.current;
    if (!stage || !canvasHost) return undefined;
    const section = stage.closest('.portfolio-architecture');

    let renderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      stage.classList.add('portfolio-system--fallback');
      return undefined;
    }

    renderer.setClearColor(0x000000, 0);
    canvasHost.appendChild(renderer.domElement);
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    camera.position.z = 500;
    const bodies = areas.map((area) => {
      const geometry = new SphereGeometry(1, 48, 32);
      const material = new ShaderMaterial({
        uniforms: {
          uBase: { value: new Color(area.color) },
          uLight: { value: new Color(area.light) },
          uTime: { value: 0 },
        },
        vertexShader: planetVertex,
        fragmentShader: planetFragment,
      });
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
      return mesh;
    });
    const coreGeometry = new SphereGeometry(1, 72, 48);
    const coreMaterial = new ShaderMaterial({
      uniforms: {
        uBase: { value: new Color('#15558d') },
        uLight: { value: new Color('#b8f7ff') },
        uTime: { value: 0 },
      },
      vertexShader: planetVertex,
      fragmentShader: planetFragment,
    });
    const core = new Mesh(coreGeometry, coreMaterial);
    core.visible = false;
    scene.add(core);
    const haloGeometry = new SphereGeometry(1, 48, 32);
    const haloMaterial = new MeshStandardMaterial({ color: '#72cfff', transparent: true, opacity: 0.05, depthWrite: false, blending: AdditiveBlending });
    const halo = new Mesh(haloGeometry, haloMaterial);
    halo.visible = false;
    scene.add(halo);

    const orbitGroup = new Group();
    scene.add(orbitGroup);
    const starGroup = new Group();
    scene.add(starGroup);
    const light = new DirectionalLight('#c5e6ff', 1);
    light.position.set(-1, 1, 3);
    scene.add(light);

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1;
    let height = 1;
    let orbitX = 1;
    let orbitY = 1;
    let planetRadius = 1;
    let visible = false;
    let frameId = 0;
    let previousTime = 0;
    let elapsed = 0;
    let angle = -0.45;

    const resize = () => {
      width = Math.max(1, stage.clientWidth);
      height = Math.max(1, stage.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4, 1600 / Math.max(width, height)));
      renderer.setSize(width, height);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      const orbitRadius = height * (width < 600 ? 0.31 : 0.36);
      orbitX = orbitRadius;
      orbitY = orbitRadius;
      planetRadius = width < 600 ? Math.min(width * 0.13, 52) : Math.min(height * 0.145, 94);
      const coreRadius = width < 600 ? Math.min(width * 0.17, 72) : Math.min(width * 0.115, 128);
      core.scale.setScalar(coreRadius);
      halo.scale.setScalar(coreRadius * 1.095);
      core.position.y = height * 0.015;
      halo.position.y = core.position.y;
      stage.style.setProperty('--portfolio-core-radius', `${coreRadius}px`);

      orbitGroup.children.forEach((object) => {
        object.geometry.dispose();
        object.material.dispose();
      });
      orbitGroup.clear();
      orbitGroup.add(makeOrbit(width, height, orbitRadius / width, orbitRadius / height, 0, 0.25));
      orbitGroup.add(makeOrbit(width, height, (orbitRadius * 1.07) / width, (orbitRadius * 1.07) / height, 0, 0.13, true));
      orbitGroup.add(makeOrbit(width, height, (orbitRadius * 0.93) / width, (orbitRadius * 0.93) / height, 0, 0.1, true));
      starGroup.children.forEach((object) => {
        object.geometry.dispose();
        object.material.dispose();
      });
      starGroup.clear();
      starGroup.add(makeStars(width, height));
      renderFrame(0);
    };

    const renderFrame = (delta) => {
      if (activeRef.current === null && !motion.matches) angle += delta * 0.033;
      const smallScreen = width < 600;
      bodies.forEach((body, index) => {
        const position = angle + index * Math.PI / 3;
        const x = Math.cos(position) * orbitX;
        const y = Math.sin(position) * orbitY;
        const targetRadius = planetRadius * areas[index].size * (activeRef.current === index ? (smallScreen ? 1.15 : 1.24) : 1);
        const currentRadius = body.scale.x || targetRadius;
        const nextRadius = currentRadius + (targetRadius - currentRadius) * Math.min(1, delta * 8 + (delta === 0 ? 1 : 0));
        body.position.set(x, y, 10);
        body.scale.setScalar(nextRadius);
        body.material.uniforms.uTime.value = elapsed;

        const button = planetRefs.current[index];
        if (button) {
          button.style.left = `${width / 2 + x}px`;
          button.style.top = `${height / 2 - y}px`;
          button.style.width = `${planetRadius * areas[index].size * 2}px`;
          button.style.height = `${planetRadius * areas[index].size * 2}px`;
        }
      });
      coreMaterial.uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
    };

    const draw = (now) => {
      frameId = 0;
      if (!visible || document.hidden) return;
      const delta = Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;
      if (activeRef.current === null && !motion.matches) elapsed += delta;
      renderFrame(delta);
      if (!motion.matches) frameId = window.requestAnimationFrame(draw);
    };

    const sync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      if (!visible || document.hidden) return;
      if (motion.matches) {
        renderFrame(0);
      } else {
        previousTime = performance.now();
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (entry.isIntersecting && !stage.classList.contains('is-revealed')) {
        window.requestAnimationFrame(() => {
          stage.classList.add('is-revealed');
          section?.classList.add('is-revealed');
        });
      }
      sync();
    }, { threshold: 0.28, rootMargin: '0px 0px -8% 0px' });
    resizeObserver.observe(stage);
    visibilityObserver.observe(stage);
    resize();
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) object.material.dispose();
      });
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  const setActive = (index) => {
    activeRef.current = index;
    setActiveIndex(index);
  };

  return (
    <section className="section areas-section portfolio-architecture" id="portfolio-architecture" aria-label="Portfolio Architecture">
      <div className="section-inner">
        <div className="portfolio-system-title" aria-label="Portfolio Architecture">
          <h2>
            <span className="portfolio-system-title__top">Portfolio</span>
            <span className="portfolio-system-title__bottom">
              <span className="portfolio-system-title__banner" aria-hidden="true" />
              <span className="portfolio-system-title__word">Architecture</span>
            </span>
          </h2>
          <p>Six Key Advantage Areas of the Portfolio</p>
        </div>
        <div className="portfolio-system" ref={stageRef}>
          <img
            className="portfolio-system-art portfolio-system-art--back"
            src={`${import.meta.env.BASE_URL}assets/portfolio-architecture-birds.png`}
            alt=""
            aria-hidden="true"
          />
          <div className="portfolio-graphic-accents" aria-hidden="true">
            <span className="portfolio-circle-glint circle-glint-one" />
            <span className="portfolio-circle-glint circle-glint-two" />
            <span className="portfolio-circle-glint circle-glint-three" />
            <span className="portfolio-circle-glint circle-glint-four" />
            <span className="portfolio-bird-sweep" />
          </div>
          <div className="portfolio-system-canvas" ref={canvasRef} aria-hidden="true" />
          <img
            className="portfolio-moon"
            src={`${import.meta.env.BASE_URL}assets/portfolio-architecture-moon.png`}
            alt=""
            aria-hidden="true"
          />
          <div className="portfolio-reveal-grid" aria-hidden="true">
            {revealTiles.map(({ index, delay }) => (
              <span
                className="portfolio-reveal-tile"
                key={index}
                style={{ '--reveal-delay': delay }}
              />
            ))}
          </div>
          {areas.map((area, index) => (
            <button
              className={`portfolio-planet${activeIndex === index ? ' is-active' : ''}`}
              key={area.title}
              ref={(element) => { planetRefs.current[index] = element; }}
              type="button"
              aria-label={`${area.title}：${area.detail}`}
              aria-expanded={activeIndex === index}
              onPointerEnter={(event) => { if (event.pointerType !== 'touch') setActive(index); }}
              onPointerLeave={(event) => { if (event.pointerType !== 'touch') setActive(null); }}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(activeRef.current === index ? null : index)}
            >
              <span className="portfolio-planet-title">{area.title}</span>
              <span className="portfolio-planet-detail">{area.detail}</span>
            </button>
          ))}
        </div>
        <div className={`portfolio-mobile-detail${activeIndex === null ? '' : ' is-visible'}`} aria-live="polite">
          {activeIndex === null ? '' : <><strong>{areas[activeIndex].title}</strong><p>{areas[activeIndex].detail}</p></>}
        </div>
      </div>
    </section>
  );
}
