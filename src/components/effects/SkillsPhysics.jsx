import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../hooks/useNearView';

const KEY = new Set(['TypeScript', 'React', 'Next.js', '.NET', 'React Native', 'C#', 'PostgreSQL']);

// Skill chips as physical bodies: they drop in when the box scrolls into view
// and can be grabbed and thrown. DOM nodes are synced to Matter.js bodies.
const SkillsPhysics = ({ skills, hint }) => {
  const boxRef = useRef(null);
  const chipRefs = useRef([]);
  const [ready, setReady] = useState(false);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStaticMode(true);
      return undefined;
    }
    const box = boxRef.current;
    let cleanup = () => {};
    let started = false;

    const start = async () => {
      started = true;
      const Matter = (await import('matter-js')).default;
      const { Engine, Bodies, Composite, Mouse, MouseConstraint, Body } = Matter;

      const engine = Engine.create({ gravity: { y: 1.1 } });
      let width = box.clientWidth;
      let height = box.clientHeight;
      const wallT = 200;

      const makeWalls = () => [
        Bodies.rectangle(width / 2, height + wallT / 2, width * 3, wallT, { isStatic: true }),
        Bodies.rectangle(-wallT / 2, height / 2, wallT, height * 6, { isStatic: true }),
        Bodies.rectangle(width + wallT / 2, height / 2, wallT, height * 6, { isStatic: true }),
      ];
      let walls = makeWalls();

      const chips = chipRefs.current.filter(Boolean);
      const bodies = chips.map((el, i) => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        // Spawn in loose rows just above the box so everything lands within a second or two.
        const perRow = Math.max(Math.floor(width / 120), 3);
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        const x = Math.min(Math.max((col + 0.5) * (width / perRow) + (Math.random() - 0.5) * 30, w / 2), width - w / 2);
        const y = -40 - row * 56 - Math.random() * 20;
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: h / 2 },
          restitution: 0.35,
          friction: 0.2,
          frictionAir: 0.012,
          density: 0.002,
        });
        Body.setAngle(body, (Math.random() - 0.5) * 0.6);
        return body;
      });

      Composite.add(engine.world, [...walls, ...bodies]);

      const mouse = Mouse.create(box);
      mouse.pixelRatio = 1;
      // Let the page scroll normally over the box.
      box.removeEventListener('wheel', mouse.mousewheel);
      box.removeEventListener('mousewheel', mouse.mousewheel);
      box.removeEventListener('DOMMouseScroll', mouse.mousewheel);
      if (window.matchMedia('(pointer: coarse)').matches) {
        box.removeEventListener('touchmove', mouse.mousemove);
        box.removeEventListener('touchstart', mouse.mousedown);
        box.removeEventListener('touchend', mouse.mouseup);
      }
      const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
      Composite.add(engine.world, mc);

      let raf;
      let running = true;
      let last = performance.now();
      const sync = (now = performance.now()) => {
        // Fixed-ish timestep, clamped so a hidden tab does not explode the sim.
        const dt = Math.min(now - last, 32);
        last = now;
        if (running) Engine.update(engine, dt);
        bodies.forEach((b, i) => {
          const el = chips[i];
          el.style.transform = `translate(${b.position.x - el.offsetWidth / 2}px, ${
            b.position.y - el.offsetHeight / 2
          }px) rotate(${b.angle}rad)`;
          // Rescue anything flung out of the box.
          if (b.position.y > height + 200 || b.position.x < -200 || b.position.x > width + 200) {
            Body.setPosition(b, { x: width / 2, y: -50 });
            Body.setVelocity(b, { x: 0, y: 0 });
          }
        });
        raf = requestAnimationFrame(sync);
      };

      raf = requestAnimationFrame(sync);
      setReady(true);

      const ro = new ResizeObserver(() => {
        if (box.clientWidth === width && box.clientHeight === height) return;
        width = box.clientWidth;
        height = box.clientHeight;
        Composite.remove(engine.world, walls);
        walls = makeWalls();
        Composite.add(engine.world, walls);
        bodies.forEach((b) => {
          if (b.position.x > width) Body.setPosition(b, { x: width - 40, y: b.position.y - 40 });
        });
      });
      ro.observe(box);

      // Pause the simulation when off-screen.
      const vis = new IntersectionObserver(([e]) => {
        running = e.isIntersecting;
      });
      vis.observe(box);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        vis.disconnect();
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          io.disconnect();
          start();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(box);

    return () => {
      io.disconnect();
      cleanup();
    };
  }, [skills]);

  return (
    <div
      ref={boxRef}
      className={`relative overflow-hidden rounded-xl border border-ink-line bg-ink-surface select-none ${
        staticMode ? 'p-5' : 'h-[380px] md:h-[420px]'
      }`}
      style={{ touchAction: 'pan-y' }}
    >
      <div
        className="media-placeholder pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <p className="pointer-events-none absolute left-4 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
        {hint}
      </p>
      <div className={staticMode ? 'relative mt-6 flex flex-wrap gap-2' : ''}>
        {skills.map((skill, i) => (
          <span
            key={skill}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            className={`${
              staticMode ? 'relative' : 'absolute left-0 top-0 cursor-grab will-change-transform active:cursor-grabbing'
            } whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-opacity duration-300 md:text-[15px] ${
              KEY.has(skill)
                ? 'border-transparent bg-ink-accent text-ink-accent-ink'
                : 'border-ink-line-strong bg-ink-bg text-ink-text'
            } ${staticMode || ready ? 'opacity-100' : 'opacity-0'}`}
            style={staticMode ? undefined : { transform: 'translate(-9999px, 0)' }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsPhysics;
