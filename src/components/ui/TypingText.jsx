import React, { useEffect, useState } from 'react';

const TypingText = ({ phrases, className = '', typeSpeed = 70, deleteSpeed = 35, pause = 1500 }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;
    const current = phrases[index % phrases.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const delay = deleting ? deleteSpeed : typeSpeed;
    const t = setTimeout(() => {
      setText((prev) => (deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, pause]);

  useEffect(() => {
    setText('');
    setDeleting(false);
    setIndex(0);
  }, [phrases]);

  return (
    <span className={className}>
      {text}
      <span className="typing-caret" aria-hidden="true" />
    </span>
  );
};

export default TypingText;
