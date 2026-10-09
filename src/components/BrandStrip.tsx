import type { ReactElement } from 'react';

type Brand = {
  id: string;
  label: string;
};

const brands: readonly Brand[] = [
  { id: 'aws', label: 'AWS' },
  { id: 'azure', label: 'Azure' },
  { id: 'gcp', label: 'GCP' },
  { id: 'digitalocean', label: 'DigitalOcean' },
  { id: 'hostinger', label: 'Hostinger' },
  { id: 'vercel', label: 'Vercel' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'claude', label: 'Claude' },
  { id: 'copilot', label: 'Copilot' },
  { id: 'ide', label: 'IDE' },
];

type BrandMarkProps = {
  id: string;
};

const BrandMark = ({ id }: BrandMarkProps): ReactElement => {
  return (
    <svg className="brand-strip__mark" viewBox="0 0 24 24" aria-hidden="true">
      {id === 'aws' ? <path d="M4 16c2.2 2.4 13.8 2.4 16 0M7.5 16.2c.5.7 1.3 1 2.1.7M14.2 16.9c.8.3 1.6 0 2.1-.7" /> : null}
      {id === 'azure' ? <path d="M12 4 5 18h5.2L12 13l1.8 5H19L12 4z" /> : null}
      {id === 'gcp' ? <path d="M12 3.5 19 7.5v9L12 20.5 5 16.5v-9L12 3.5z" /> : null}
      {id === 'digitalocean' ? (
        <>
          <circle cx="12" cy="12" r="7.5" />
          <path d="M8 13c1.2 1.4 6.8 1.4 8 0" />
        </>
      ) : null}
      {id === 'hostinger' ? <path d="M4 11 12 4l8 7v8H4v-8zM10 19v-5h4v5" /> : null}
      {id === 'vercel' ? <path d="M12 4 20.5 19h-17L12 4z" /> : null}
      {id === 'cloud' ? <path d="M7 17h10a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6-1.4A3.4 3.4 0 0 0 7 17z" /> : null}
      {id === 'cursor' ? <path d="M6 4.5 17.5 12 11 13.2 8.8 19.5 6 4.5z" /> : null}
      {id === 'claude' ? (
        <>
          <path d="M12 4v16M4 12h16M6.5 6.5l11 11M17.5 6.5l-11 11" />
        </>
      ) : null}
      {id === 'copilot' ? <path d="M4 14c2-5 5-7 8-7s6 2 8 7M8 14c1-2 2.2-3 4-3s3 1 4 3" /> : null}
      {id === 'ide' ? (
        <>
          <path d="m8 8-4 4 4 4" />
          <path d="m16 8 4 4-4 4" />
          <path d="m13.5 6-3 12" />
        </>
      ) : null}
    </svg>
  );
};

export const BrandStrip = (): ReactElement => {
  const sequence = [...brands, ...brands];

  return (
    <div className="brand-strip" aria-hidden="true">
      <div className="brand-strip__track">
        {sequence.map((brand, index) => (
          <span key={`${brand.id}-${index}`} className="brand-strip__item">
            <BrandMark id={brand.id} />
            {brand.label}
          </span>
        ))}
      </div>
    </div>
  );
};
