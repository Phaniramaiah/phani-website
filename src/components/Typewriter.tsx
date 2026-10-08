import { useEffect, useState, type ReactElement } from 'react';

type TypewriterProps = {
  lines: readonly string[];
  animate: boolean;
};

const typeDelayMs = 55;
const eraseDelayMs = 22;
const holdMs = 1800;

export const Typewriter = ({ lines, animate }: TypewriterProps): ReactElement | null => {
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [erasing, setErasing] = useState<boolean>(false);

  const line = lines[lineIndex % Math.max(lines.length, 1)] ?? '';

  useEffect(() => {
    if (!animate || lines.length === 0) {
      return undefined;
    }

    const complete = length === line.length;
    const empty = length === 0;

    const delay = !erasing && complete ? holdMs : erasing ? eraseDelayMs : typeDelayMs;

    const timer = window.setTimeout(() => {
      if (!erasing && complete) {
        setErasing(true);
      } else if (erasing && empty) {
        setErasing(false);
        setLineIndex((index) => (index + 1) % lines.length);
      } else {
        setLength((value) => value + (erasing ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [animate, erasing, length, line.length, lines.length]);

  if (lines.length === 0) {
    return null;
  }

  return (
    <p className="terminal-line">
      <span className="terminal-line__prompt" aria-hidden="true">
        ~/platform $
      </span>
      <span className="terminal-line__text" aria-hidden="true">
        {animate ? line.slice(0, length) : lines[0]}
      </span>
      <span className="terminal-line__caret" aria-hidden="true" />
      <span className="sr-only">Tools in daily use: {lines.join(', ')}</span>
    </p>
  );
};
