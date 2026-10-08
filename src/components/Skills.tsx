import type { ReactElement } from 'react';
import type { SkillGroup } from '../../content/types';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';

type SkillsProps = {
  groups: readonly SkillGroup[];
  strengths: readonly string[];
};

export const Skills = ({ groups, strengths }: SkillsProps): ReactElement | null => {
  if (groups.length === 0) {
    return null;
  }

  const toolCount = new Set(groups.flatMap((group) => group.skills)).size;

  return (
    <section className="section" id="skills">
      <SectionHeading index="02" kicker={`Toolbox · ${toolCount} tools`} title="Skills across the delivery stack." />
      <div className="skills">
        {groups.map((group) => (
          <article key={group.id} className="skill-card">
            <div className="skill-card__top">
              <Icon name={group.icon} />
              <h3>{group.title}</h3>
            </div>
            <p>{group.blurb}</p>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {strengths.length > 0 ? (
        <div className="strengths">
          <h3>Key strengths</h3>
          <ul>
            {strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
};
