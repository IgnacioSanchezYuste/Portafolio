import React, { useEffect, useRef } from 'react';
import { useTheme } from '../ui/ThemeToggle';
import { prefersReducedMotion } from '../../hooks/useNearView';

const TOLEDO = [39.8628, -4.0273];
const markers = [
  { location: TOLEDO, size: 0.09 },
  { location: [40.4168, -3.7038], size: 0.05 }, // Madrid
  { location: [38.7223, -9.1393], size: 0.03 }, // Lisboa
  { location: [48.8566, 2.3522], size: 0.03 }, // París
  { location: [52.52, 13.405], size: 0.03 }, // Berlín
  { location: [52.3676, 4.9041], size: 0.03 }, // Ámsterdam
  { location: [51.5072, -0.1276], size: 0.03 }, // Londres
  { location: [53.3498, -6.2603], size: 0.03 }, // Dublín
  { location: [45.4642, 9.19], size: 0.03 }, // Milán
  { location: [41.3874, 2.1686], size: 0.04 }, // Barcelona
];

// Rotation that puts Toledo facing the camera.
const BASE_PHI = Math.PI - ((TOLEDO[1] * Math.PI) / 180 - Math.PI / 2);
const BASE_THETA = 0.32;

const Globe = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  const drag = useRef({ active: false, startX: 0, offset: 0, current: 0 });

  useEffect(() => {
    let globe;
    let disposed = false;
    const canvas = canvasRef.current;
    const reduced = prefersReducedMotion();

    import('cobe').then(({ default: createGlobe }) => {
      if (disposed || !canvas) return;
      const size = canvas.offsetWidth;
      const light = theme === 'light';
      let t = 0;
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: size * 2,
        height: size * 2,
        phi: BASE_PHI,
        theta: BASE_THETA,
        dark: light ? 0 : 1,
        diffuse: light ? 1.4 : 1.2,
        mapSamples: 16000,
        mapBrightness: light ? 5 : 5,
        mapBaseBrightness: light ? 0.05 : 0,
        baseColor: light ? [1, 1, 1] : [0.22, 0.22, 0.24],
        markerColor: [1, 0.42, 0.24],
        glowColor: light ? [0.92, 0.9, 0.86] : [0.12, 0.12, 0.13],
        markers,
        onRender: (state) => {
          if (!reduced) t += 0.006;
          const d = drag.current;
          // Gentle sway around Spain, plus whatever the user dragged.
          state.phi = BASE_PHI + Math.sin(t) * 0.55 + d.current;
          state.theta = BASE_THETA + Math.cos(t * 0.7) * 0.05;
          state.width = canvas.offsetWidth * 2;
          state.height = canvas.offsetWidth * 2;
          if (!d.active) d.current *= 0.97; // ease back home
        },
      });
      requestAnimationFrame(() => {
        canvas.style.opacity = '1';
      });
    });

    return () => {
      disposed = true;
      globe?.destroy();
    };
  }, [theme]);

  const onDown = (e) => {
    drag.current.active = true;
    drag.current.startX = e.clientX;
    drag.current.offset = drag.current.current;
    canvasRef.current.style.cursor = 'grabbing';
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    d.current = d.offset + (e.clientX - d.startX) / 120;
  };
  const onUp = () => {
    drag.current.active = false;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
  };

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="h-full w-full cursor-grab opacity-0 transition-opacity duration-1000 [contain:layout_paint_size]"
        style={{ touchAction: 'pan-y' }}
      />
    </div>
  );
};

export default Globe;
