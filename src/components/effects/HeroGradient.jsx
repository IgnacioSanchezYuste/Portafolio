import React, { useEffect, useRef } from 'react';
import { useTheme } from '../ui/ThemeToggle';
import { prefersReducedMotion } from '../../hooks/useNearView';

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

const palettes = {
  dark: { bg: '#0d0d0e', c1: '#ff6a3d', c2: '#8a2a12', c3: '#2a7f9e' },
  light: { bg: '#f7f6f3', c1: '#ffb08f', c2: '#ffd9c4', c3: '#b9e6f5' },
};

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec3 uBg;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= uRes.x / uRes.y;
    float t = uTime * 0.06;

    float n1 = snoise(p * 1.1 + vec2(t, t * 0.7));
    float n2 = snoise(p * 1.7 - vec2(t * 0.8, -t * 0.5) + n1 * 0.45);
    float n3 = snoise(p * 0.8 + vec2(-t * 0.6, t) + n2 * 0.35);

    // Keep colour concentrated top-right, away from the headline.
    float focus = smoothstep(1.25, 0.1, distance(uv, vec2(0.85, 0.85)));

    vec3 col = uBg;
    col = mix(col, uC2, smoothstep(0.2, 0.9, n2 * 0.5 + 0.5) * 0.34 * focus);
    col = mix(col, uC1, smoothstep(0.35, 0.95, n1 * 0.5 + 0.5) * 0.3 * focus);
    col = mix(col, uC3, smoothstep(0.55, 1.0, n3 * 0.5 + 0.5) * 0.22 * focus);

    // Fade into the page at the bottom
    col = mix(uBg, col, smoothstep(0.0, 0.5, uv.y));

    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col += (g - 0.5) * 0.03;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const HeroGradient = () => {
  const wrapRef = useRef(null);
  const stateRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    let disposed = false;
    let raf;
    let io;
    let ro;

    import('ogl').then(({ Renderer, Program, Mesh, Triangle }) => {
      if (disposed || !wrapRef.current) return;
      const wrap = wrapRef.current;
      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 1.5), alpha: false });
      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      gl.canvas.style.display = 'block';
      wrap.appendChild(gl.canvas);

      const pal = palettes[document.documentElement.classList.contains('light') ? 'light' : 'dark'];
      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: [1, 1] },
          uBg: { value: hex(pal.bg) },
          uC1: { value: hex(pal.c1) },
          uC2: { value: hex(pal.c2) },
          uC3: { value: hex(pal.c3) },
        },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
      stateRef.current = { program, renderer, mesh };

      const resize = () => {
        renderer.setSize(wrap.clientWidth, wrap.clientHeight);
        program.uniforms.uRes.value = [wrap.clientWidth, wrap.clientHeight];
        renderer.render({ scene: mesh });
      };
      ro = new ResizeObserver(resize);
      ro.observe(wrap);
      resize();

      const reduced = prefersReducedMotion();
      let visible = true;
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !reduced) loop(performance.now());
      });
      io.observe(wrap);

      const start = performance.now() - 20000;
      const loop = (now) => {
        cancelAnimationFrame(raf);
        if (!visible || disposed) return;
        program.uniforms.uTime.value = (now - start) / 1000;
        renderer.render({ scene: mesh });
        raf = requestAnimationFrame(loop);
      };
      if (reduced) {
        program.uniforms.uTime.value = 20;
        renderer.render({ scene: mesh });
      } else {
        raf = requestAnimationFrame(loop);
      }
      requestAnimationFrame(() => wrap.classList.add('opacity-100'));
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro?.disconnect();
      const s = stateRef.current;
      if (s) {
        s.renderer.gl.getExtension('WEBGL_lose_context')?.loseContext();
        s.renderer.gl.canvas.remove();
      }
      stateRef.current = null;
    };
  }, []);

  // Swap palette on theme change without recreating the context.
  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;
    const pal = palettes[theme];
    s.program.uniforms.uBg.value = hex(pal.bg);
    s.program.uniforms.uC1.value = hex(pal.c1);
    s.program.uniforms.uC2.value = hex(pal.c2);
    s.program.uniforms.uC3.value = hex(pal.c3);
    s.renderer.render({ scene: s.mesh });
  }, [theme]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-1000"
    />
  );
};

export default HeroGradient;
