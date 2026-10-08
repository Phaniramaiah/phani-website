import type { ReactElement } from 'react';
import type { Stat } from '../../content/types';
import { CountUp } from './CountUp';

type StatsProps = {
  stats: readonly Stat[];
  animate: boolean;
};

export const Stats = ({ stats, animate }: StatsProps): ReactElement | null => {
  if (stats.length === 0) {
    return null;
  }

  return (
    <section className="stats" aria-label="Career highlights">
      <dl className="stats__grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat">
            <dt>{stat.label}</dt>
            <dd>
              <strong>
                <CountUp animate={animate} value={stat.value} />
              </strong>
              <span>{stat.detail}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
