import type { ReactElement } from 'react';
import type { Certification, Profile } from '../../content/types';
import { certificationStatus } from '../utils/certification';
import { Portrait } from './Portrait';
import { socialLinksOf } from './SocialLinks';
import { Typewriter } from './Typewriter';

type HeroProps = {
  profile: Profile;
  certifications: readonly Certification[];
  animate: boolean;
};

const commands = [
  'terraform plan -out=release.tfplan',
  'docker build -t api:latest . && docker push',
  'kubectl rollout status deploy/api -n prod',
  'aws ecs update-service --force-new-deployment',
  'ansible-playbook site.yml --limit web',
  'aws cloudwatch describe-alarms --state ALARM',
] as const;

const shortCertName = (name: string): string =>
  name.replace(/^AWS Certified /, 'AWS ').replace(/ – Associate$/, ' Associate');

export const Hero = ({ profile, certifications, animate }: HeroProps): ReactElement => {
  const activeCertifications = certifications.filter((certification) => certificationStatus(certification) !== 'expired');
  const nameParts = profile.name.split(' ');
  const leading = nameParts[0] ?? profile.name;
  const trailing = nameParts.slice(1).join(' ');

  return (
    <section className="hero" id="top">
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="hero__watermark" aria-hidden="true">
        OPS
      </p>
      <div className="hero__layout">
        <div className="hero__copy">
          <p className="eyebrow">
            <span className="pulse" aria-hidden="true" />
            {profile.eyebrow}
          </p>
          <h1>
            <span>{leading}</span>
            {trailing.length > 0 ? <span className="hero__serif">{trailing}</span> : null}
          </h1>
          <p className="hero__statement">{profile.statement}</p>
          <Typewriter animate={animate} lines={commands} />
          <div className="hero__actions">
            <a className="btn btn--solid" href="#work">
              View selected work
            </a>
            <a className="btn btn--ghost" href="#contact">
              Contact
            </a>
            {socialLinksOf(profile.githubUrl, profile.linkedinUrl).map((link) => (
              <a key={link.label} className="btn btn--ghost" href={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
          </div>
          <dl className="hero__facts">
            <div>
              <dt>Company</dt>
              <dd>{profile.company}</dd>
            </div>
            <div>
              <dt>Based</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Tenure</dt>
              <dd>{profile.tenure}</dd>
            </div>
          </dl>
        </div>
        <Portrait
          badges={activeCertifications.map((certification) => shortCertName(certification.name))}
          name={profile.name}
          photoUrl={profile.photoUrl}
          role={`${profile.role} · ${profile.company.replace(/ Pvt Ltd$/, '')}`}
        />
      </div>
    </section>
  );
};
