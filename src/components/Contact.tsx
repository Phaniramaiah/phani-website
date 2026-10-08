import type { ReactElement } from 'react';
import type { Profile } from '../../content/types';
import { SectionHeading } from './SectionHeading';

type ContactProps = {
  profile: Profile;
};

const toTelHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`;

const profileHandle = (url: string): string =>
  url
    .replace(/^https?:\/\/(www\.)?(github\.com|linkedin\.com\/in)\//, '')
    .replace(/\/$/, '');

export const Contact = ({ profile }: ContactProps): ReactElement => {
  return (
    <section className="section contact" id="contact">
      <SectionHeading index="07" kicker="Contact" title="Let’s talk about your platform." />
      <p className="contact__lede">
        Hiring for AWS, CI/CD, or platform work? Email or call me directly. I currently run AWS infrastructure and
        delivery pipelines at {profile.company}.
      </p>
      <div className="contact__grid">
        <a className="contact__link" href={`mailto:${profile.email}`}>
          <span>Email</span>
          <strong>{profile.email}</strong>
        </a>
        <a className="contact__link" href={toTelHref(profile.phone)}>
          <span>Phone</span>
          <strong>{profile.phone}</strong>
        </a>
        {profile.linkedinUrl.length > 0 ? (
          <a className="contact__link" href={profile.linkedinUrl} rel="noreferrer" target="_blank">
            <span>LinkedIn</span>
            <strong>{profileHandle(profile.linkedinUrl)}</strong>
          </a>
        ) : null}
        <a className="contact__link" href={profile.githubUrl} rel="noreferrer" target="_blank">
          <span>GitHub</span>
          <strong>{profileHandle(profile.githubUrl)}</strong>
        </a>
        <div className="contact__link contact__link--static">
          <span>Work</span>
          <strong>
            {profile.location}
            <em>{profile.company}</em>
          </strong>
        </div>
      </div>
    </section>
  );
};
