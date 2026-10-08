import type { ReactElement } from 'react';
import type { Achievement } from '../../content/types';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';

type AchievementsProps = {
  achievements: readonly Achievement[];
};

export const Achievements = ({ achievements }: AchievementsProps): ReactElement | null => {
  if (achievements.length === 0) {
    return null;
  }

  return (
    <section className="section" id="achievements">
      <SectionHeading index="04" kicker="Key achievements" title="What I delivered at Zazz." />
      <ol className="achievements">
        {achievements.map((achievement, index) => (
          <li key={achievement.id} className="achievement">
            <div className="achievement__top">
              <Icon name={achievement.icon} />
              <span className="achievement__index">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3>{achievement.title}</h3>
            <p>{achievement.impact}</p>
            {achievement.tools.length > 0 ? (
              <ul className="tags tags--compact" aria-label="Tools">
                {achievement.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
};
