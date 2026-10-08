import { useEffect, useState, type ReactElement } from 'react';
import type { SectionId } from '../../content/portfolio';
import { SocialLinks } from './SocialLinks';

type NavItem = {
  id: SectionId;
  label: string;
};

const navItems: readonly NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

type HeaderProps = {
  active: string;
  githubUrl: string;
  linkedinUrl: string;
};

export const Header = ({ active, githubUrl, linkedinUrl }: HeaderProps): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);

    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const closeMenu = (): void => {
    setOpen(false);
  };

  return (
    <header className="header">
      <a className="brand" href="#top" onClick={closeMenu}>
        <span className="brand__mark">PK</span>
        <span className="brand__name">Phani Kumar</span>
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => {
          setOpen((current) => !current);
        }}
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <span className="nav-toggle__bar" />
        <span className="nav-toggle__bar" />
      </button>
      <nav id="site-nav" className={open ? 'nav nav--open' : 'nav'} aria-label="Primary">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? 'true' : undefined}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
        <SocialLinks className="social--menu" githubUrl={githubUrl} linkedinUrl={linkedinUrl} onNavigate={closeMenu} />
      </nav>
      <SocialLinks className="social--header" githubUrl={githubUrl} linkedinUrl={linkedinUrl} />
    </header>
  );
};
