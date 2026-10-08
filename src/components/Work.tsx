import type { ReactElement } from 'react';
import type { Project } from '../../content/types';
import { Pipeline } from './Pipeline';
import { SectionHeading } from './SectionHeading';

type WorkProps = {
  projects: readonly Project[];
};

export const Work = ({ projects }: WorkProps): ReactElement | null => {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="section" id="work">
      <SectionHeading index="06" kicker="Selected work" title="One platform, end to end." />
      <div className="work">
        {projects.map((project) => (
          <article key={project.id} className="case">
            <header className="case__header">
              <div>
                <p className="case__client">{project.client}</p>
                <h3>{project.title}</h3>
              </div>
              <p className="case__role">{project.role}</p>
            </header>
            <p className="case__summary">{project.summary}</p>
            <ul className="tags">
              {project.environment.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <div className="case__body">
              <ol className="duties">
                {project.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <Pipeline stages={project.pipeline} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
