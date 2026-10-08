import type { ReactElement } from 'react';
import type { IconName } from '../../content/types';

type IconProps = {
  name: IconName;
};

export const Icon = ({ name }: IconProps): ReactElement => {
  if (name === 'code') {
    return (
      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m13.5 5-3 14" />
      </svg>
    );
  }

  if (name === 'chart') {
    return (
      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 19h16" />
        <path d="M4 15l4.5-4.5 3.5 3.5L19 7" />
        <path d="M15 7h4v4" />
      </svg>
    );
  }

  if (name === 'server') {
    return (
      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="7" rx="2" />
        <rect x="4" y="13" width="16" height="7" rx="2" />
        <path d="M8 7.5h.01" />
        <path d="M8 16.5h.01" />
      </svg>
    );
  }

  if (name === 'layers') {
    return (
      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 4 8 4-8 4-8-4 8-4z" />
        <path d="m4 12 8 4 8-4" />
        <path d="m4 16 8 4 8-4" />
      </svg>
    );
  }

  if (name === 'pipeline') {
    return (
      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h10" />
        <path d="M4 12h16" />
        <path d="M4 17h7" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="8" cy="17" r="2" />
      </svg>
    );
  }

  if (name === 'container') {
    return (
      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 8h16v10H4z" />
        <path d="M4 12h16" />
        <path d="M9 8v10" />
        <path d="M14 8v10" />
        <path d="M8 8V6h8v2" />
      </svg>
    );
  }

  if (name === 'shield') {
    return (
      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 5 6v6c0 4.2 2.8 7.2 7 8.5 4.2-1.3 7-4.3 7-8.5V6l-7-3z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6-1.5A3.5 3.5 0 0 0 7 18z" />
    </svg>
  );
};
