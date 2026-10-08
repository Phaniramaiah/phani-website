import { useEffect, useRef, useState, type ReactElement } from 'react';

type CountUpProps = {
  value: string;
  animate: boolean;
  durationMs?: number;
};

const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3;

export const CountUp = ({ value, animate, durationMs = 1400 }: CountUpProps): ReactElement => {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : '';
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number>(animate && target !== null ? 0 : (target ?? 0));

  useEffect(() => {
    const node = ref.current;

    if (!animate || target === null || !node) {
      setCurrent(target ?? 0);
      return undefined;
    }

    let frame = 0;

    const run = (): void => {
      const start = performance.now();
      const tick = (now: number): void => {
        const progress = Math.min((now - start) / durationMs, 1);
        setCurrent(Math.round(easeOutCubic(progress) * target));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [animate, target, durationMs]);

  if (target === null) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {current}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
};
