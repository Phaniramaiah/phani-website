import type { ReactElement } from 'react';
import type { Profile } from '../../content/types';
import { SocialLinks } from './SocialLinks';

type FooterProps = {
  profile: Profile;
};

export const Footer = ({ profile }: FooterProps): ReactElement => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <a className="footer__mail" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <div className="footer__meta">
        <p>
          © {year} {profile.name}
        </p>
        <SocialLinks githubUrl={profile.githubUrl} linkedinUrl={profile.linkedinUrl} />
        <p>
          {profile.role} · {profile.company}
        </p>
      </div>
    </footer>
  );
};
