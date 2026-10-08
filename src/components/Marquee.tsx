import type { ReactElement } from 'react';

type MarqueeProps = {
  labels: readonly string[];
};

export const Marquee = ({ labels }: MarqueeProps): ReactElement | null => {
  if (labels.length === 0) {
    return null;
  }

  const sequence = [...labels, ...labels];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {sequence.map((label, index) => (
          <span key={`${label}-${index}`}>{label}</span>
        ))}
      </div>
    </div>
  );
};
