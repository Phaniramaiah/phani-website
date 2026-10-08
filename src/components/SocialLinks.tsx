import type { ReactElement } from 'react';

type SocialLinksProps = {
  githubUrl: string;
  linkedinUrl: string;
  className?: string;
  onNavigate?: () => void;
};

type SocialLink = {
  label: string;
  href: string;
};

export const socialLinksOf = (githubUrl: string, linkedinUrl: string): SocialLink[] =>
  [
    { label: 'LinkedIn', href: linkedinUrl },
    { label: 'GitHub', href: githubUrl },
  ].filter((link) => link.href.trim().length > 0);

export const SocialLinks = ({ githubUrl, linkedinUrl, className, onNavigate }: SocialLinksProps): ReactElement | null => {
  const links = socialLinksOf(githubUrl, linkedinUrl);

  if (links.length === 0) {
    return null;
  }

  return (
    <ul className={className ? `social ${className}` : 'social'}>
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href} onClick={onNavigate} rel="noreferrer" target="_blank">
            {link.label}
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
