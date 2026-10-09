import type { ReactElement } from 'react';

const infinityPath =
  'M80 260C80 60 300 60 500 260C700 460 920 460 920 260C920 60 700 60 500 260C300 460 80 460 80 260';

const pathLength = 2234;
const trailLength = 90;

type InfinityLoopProps = {
  animate: boolean;
};

export const InfinityLoop = ({ animate }: InfinityLoopProps): ReactElement => {
  return (
    <div className="infinity" aria-hidden="true">
      <svg className="infinity__svg" viewBox="0 0 1000 520">
        <defs>
          <linearGradient id="infinity-grad" x1="0%" x2="100%" y1="50%" y2="50%">
            <stop offset="0%" stopColor="var(--ember)" />
            <stop offset="52%" stopColor="var(--peach)" />
            <stop offset="100%" stopColor="var(--lime)" />
          </linearGradient>
        </defs>
        <path className="infinity__halo" d={infinityPath} />
        <path className="infinity__body" d={infinityPath} />
        <path className="infinity__flow" d={infinityPath} strokeDasharray={`${trailLength} ${pathLength - trailLength}`}>
          {animate ? (
            <animate
              attributeName="stroke-dashoffset"
              dur="16s"
              from="0"
              repeatCount="indefinite"
              to={String(-pathLength)}
            />
          ) : null}
        </path>
      </svg>
    </div>
  );
};
