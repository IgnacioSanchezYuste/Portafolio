import React from 'react';
import { useInView } from '../../hooks/useInView';

export const container = 'mx-auto w-full max-w-6xl px-5 md:px-8';

const Section = ({ id, index, label, children }) => {
  const [ref, inView] = useInView(0.06);

  return (
    <section id={id} className="border-t border-ink-line">
      <div
        ref={ref}
        className={`${container} grid gap-8 py-20 md:grid-cols-12 md:gap-10 md:py-28 reveal${inView ? ' in-view' : ''}`}
      >
        <div className="md:col-span-3">
          <div className="md:sticky md:top-24">
            <p className="font-mono text-xs text-ink-accent">{index}</p>
            <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-ink-text">{label}</h2>
          </div>
        </div>
        <div className="min-w-0 md:col-span-9">{children}</div>
      </div>
    </section>
  );
};

export default Section;
