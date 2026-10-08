import type { ReactElement } from 'react';
import type { Experience as ExperienceItem } from '../../content/types';
import { SectionHeading } from './SectionHeading';

type ExperienceProps = {
  roles: readonly ExperienceItem[];
};

export const Experience = ({ roles }: ExperienceProps): ReactElement | null => {
  if (roles.length === 0) {
    return null;
  }

  return (
    <section className="section" id="experience">
      <SectionHeading index="05" kicker="Experience" title="AWS DevOps at Zazz." />
      <div className="roles">
        {roles.map((role) => (
          <article key={role.id} className="role">
            <div className="role__meta">
              <p className="role__dates">
                {role.start} — {role.current ? 'Present' : role.end}
              </p>
              <p>{role.location}</p>
            </div>
            <div className="role__body">
              <p className="role__company">{role.company}</p>
              <h3>{role.role}</h3>
              <p>{role.summary}</p>
              <ul>
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
