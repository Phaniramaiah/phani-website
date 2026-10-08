import type { ReactElement } from 'react';
import type { Certification } from '../../content/types';
import { certificationStatus, validityLabel } from '../utils/certification';
import { SectionHeading } from './SectionHeading';

type CertificationsProps = {
  certifications: readonly Certification[];
};

const statusText = {
  active: 'Active',
  expired: 'Expired',
  lifetime: 'No expiry',
} as const;

const issuerMark = (issuer: string): string => (issuer.toLowerCase().includes('amazon') ? 'AWS' : issuer.slice(0, 2).toUpperCase());

export const Certifications = ({ certifications }: CertificationsProps): ReactElement | null => {
  if (certifications.length === 0) {
    return null;
  }

  return (
    <section className="section" id="certifications">
      <SectionHeading index="03" kicker="Certifications" title="Verified on Credly." />
      <ul className="certs">
        {certifications.map((certification) => {
          const status = certificationStatus(certification);

          return (
            <li key={certification.id} className={`cert cert--${status}`}>
              <div className="cert__top">
                <span className="cert__mark" aria-hidden="true">
                  {issuerMark(certification.issuer)}
                </span>
                <span className="cert__status">{statusText[status]}</span>
              </div>
              <h3>{certification.name}</h3>
              <p className="cert__issuer">{certification.issuer}</p>
              <p className="cert__dates">{validityLabel(certification, status)}</p>
              {certification.credentialUrl.length > 0 ? (
                <a className="cert__link" href={certification.credentialUrl} rel="noreferrer" target="_blank">
                  Verify credential
                  <span aria-hidden="true"> ↗</span>
                  <span className="sr-only"> for {certification.name} (opens in a new tab)</span>
                </a>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
