import { useEffect, useRef } from 'react';
import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderer } from 'three';
import './ProfileWaveBackdrop.css';

// Local noise-wave treatment; not the licensed React Bits Pro component.
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec2 uSize;
  uniform float uActivity;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float field(vec2 p) {
    return noise(p) * 0.57 + noise(p * 2.03 + 7.4) * 0.28
      + noise(p * 4.01 + 15.8) * 0.15;
  }

  void main() {
    vec2 uv = vUv;
    vec2 delta = uv - uPointer;
    delta.x *= uSize.x / max(uSize.y, 1.0);
    float influence = exp(-dot(delta, delta) * 5.0) * uActivity;
    vec2 p = uv;
    p += (uPointer - 0.5) * influence * 0.18;
    float t = uTime * 0.085;
    float distortion = field(p * vec2(3.1, 2.4) + vec2(t, -t * 0.6));
    float crest = p.y + p.x * 0.32 + (distortion - 0.5) * 0.32
      + sin(p.x * 5.2 + t) * 0.055 + influence * 0.065;
    float ribbons = 0.0;
    float edges = 0.0;
    for (int i = 0; i < 3; i++) {
      float distanceToWave = abs(crest - (0.34 + float(i) * 0.28));
      ribbons += exp(-distanceToWave * 15.0);
      edges += exp(-distanceToWave * 170.0);
    }
    float fade = smoothstep(0.0, 0.13, uv.y) * smoothstep(0.0, 0.12, 1.0 - uv.y)
      * smoothstep(0.0, 0.09, uv.x) * smoothstep(0.0, 0.09, 1.0 - uv.x);
    float grain = (hash(gl_FragCoord.xy) - 0.5) * 0.018;
    vec3 color = mix(vec3(0.055, 0.13, 0.60), vec3(0.25, 0.42, 0.85), edges * 0.5);
    float alpha = (ribbons * 0.27 + edges * 0.055 + grain) * fade;
    gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.38));
  }
`;

export default function ProfileWaveBackdrop() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const surface = host?.parentElement;
    if (!host || !surface) return undefined;

    let renderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
      return undefined;
    }

    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new Vector2(0.5, 0.5) },
      uSize: { value: new Vector2(1, 1) },
      uActivity: { value: 0 },
    };
    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }',
      fragmentShader,
    });
    const scene = new Scene();
    scene.add(new Mesh(geometry, material));
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const target = new Vector2(0.5, 0.5);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activity = 0;
    let isVisible = false;
    let frameId = 0;
    let previousTime = 0;
    let elapsed = 0;

    const draw = (now) => {
      frameId = 0;
      const delta = Math.min((now - previousTime) / 1000, 0.05);
      previousTime = now;
      elapsed += delta;
      const ease = 1 - Math.exp(-delta * 4.5);
      uniforms.uPointer.value.lerp(target, ease);
      uniforms.uActivity.value += (activity - uniforms.uActivity.value) * ease;
      uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(draw);
    };

    const syncAnimation = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      if (!isVisible || document.hidden) return;
      if (motion.matches) {
        uniforms.uActivity.value = 0;
        renderer.render(scene, camera);
      } else {
        previousTime = performance.now();
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25, 1600 / Math.max(width, height)));
      renderer.setSize(width, height);
      uniforms.uSize.value.set(width, height);
      if (motion.matches) renderer.render(scene, camera);
    };

    const move = (event) => {
      if (motion.matches || event.pointerType === 'touch') return;
      const rect = host.getBoundingClientRect();
      target.set(
        Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
        1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
      );
      activity = 1;
    };

    const leave = () => { activity = 0; target.set(0.5, 0.5); };
    const stopOnContextLoss = (event) => {
      event.preventDefault();
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      syncAnimation();
    });
    resize();
    resizeObserver.observe(host);
    visibilityObserver.observe(host);
    surface.addEventListener('pointermove', move, { passive: true });
    surface.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', syncAnimation);
    motion.addEventListener('change', syncAnimation);
    renderer.domElement.addEventListener('webglcontextlost', stopOnContextLoss);
    renderer.domElement.addEventListener('webglcontextrestored', syncAnimation);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      surface.removeEventListener('pointermove', move);
      surface.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', syncAnimation);
      motion.removeEventListener('change', syncAnimation);
      renderer.domElement.removeEventListener('webglcontextlost', stopOnContextLoss);
      renderer.domElement.removeEventListener('webglcontextrestored', syncAnimation);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="profile-wave-backdrop" aria-hidden="true" />;
}
