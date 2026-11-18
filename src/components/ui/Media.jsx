import React, { useState } from 'react';

// Shows an image when the file exists; otherwise a quiet typographic placeholder.
const Media = ({ src, alt, mark, label, hue, logo, className = '' }) => {
  const [failed, setFailed] = useState(!src);

  if (!failed) {
    return (
      <div className={`overflow-hidden bg-ink-surface ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div className={`media-placeholder relative flex items-center justify-center overflow-hidden ${className}`}>
      {hue && (
        <>
          <span className="cover-orb -left-[10%] -top-[30%]" style={{ background: hue }} aria-hidden="true" />
          <span className="cover-orb -bottom-[40%] -right-[15%] opacity-30" style={{ background: hue }} aria-hidden="true" />
        </>
      )}
      {logo ? (
        <img src={logo} alt={alt} className="relative h-28 w-auto drop-shadow-[0_8px_30px_rgba(79,214,255,0.25)] transition-transform duration-700 group-hover:rotate-[-6deg] group-hover:scale-105 md:h-36" />
      ) : (
        <span className="relative px-6 text-center font-serif text-4xl italic leading-none text-ink-text md:text-5xl">
          {mark}
        </span>
      )}
      {label && (
        <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          {label}
        </span>
      )}
    </div>
  );
};

export default Media;
