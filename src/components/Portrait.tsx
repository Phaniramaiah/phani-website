import type { ReactElement } from 'react';

type PortraitProps = {
  name: string;
  photoUrl: string;
  role: string;
  badges: readonly string[];
};

export const Portrait = ({ name, photoUrl, role, badges }: PortraitProps): ReactElement => {
  return (
    <figure className="portrait">
      <div className="portrait__ring" aria-hidden="true" />
      <div className="portrait__frame">
        <img
          alt={`Portrait of ${name}`}
          className="portrait__img"
          decoding="async"
          fetchPriority="high"
          height={800}
          src={photoUrl}
          width={800}
        />
      </div>
      {badges.slice(0, 2).map((badge, index) => (
        <span key={badge} className={`portrait__badge portrait__badge--${index + 1}`}>
          <span aria-hidden="true">✓</span> {badge}
        </span>
      ))}
      <figcaption className="portrait__caption">
        <span className="pulse" aria-hidden="true" />
        {role}
      </figcaption>
    </figure>
  );
};
