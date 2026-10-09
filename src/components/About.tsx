import type { ReactElement } from 'react';
import type { Profile } from '../../content/types';
import { SectionHeading } from './SectionHeading';

type AboutProps = {
  profile: Profile;
};

const paragraphsOf = (summary: string): string[] =>
  summary
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

const practices: readonly { title: string; copy: string }[] = [
  {
    title: 'Provision',
    copy: 'VPC, EC2, ECS, and EKS for containerized services that need to stay available.',
  },
  {
    title: 'Deliver',
    copy: 'GitHub Actions, CodePipeline from Bitbucket, and Jenkins, depending on the platform.',
  },
  {
    title: 'Protect',
    copy: 'IAM, Secrets Manager, and ACM for access and TLS. CloudWatch and S3 for alerts, logs, and cost.',
  },
];

export const About = ({ profile }: AboutProps): ReactElement => {
  const paragraphs = paragraphsOf(profile.summary);

  return (
    <section className="section" id="about">
      <SectionHeading index="01" kicker="Profile" title="Infrastructure, delivery, and the controls around both." />
      <div className="about">
        <div className="about__copy">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        <aside className="fact-sheet">
          <p className="fact-sheet__label">Now</p>
          <p className="fact-sheet__role">{profile.role}</p>
          <p className="fact-sheet__company">{profile.company}</p>
          <ul>
            <li>
              <span>Location</span>
              <strong>{profile.location}</strong>
            </li>
            <li>
              <span>Tenure</span>
              <strong>{profile.tenure}</strong>
            </li>
            <li>
              <span>Education</span>
              <strong>
                {profile.educationDegree}
                <em>
                  {profile.educationSchool}, {profile.educationYear}
                </em>
              </strong>
            </li>
          </ul>
        </aside>
      </div>
      <ol className="practices">
        {practices.map((practice) => (
          <li key={practice.title}>
            <h3>{practice.title}</h3>
            <p>{practice.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};
