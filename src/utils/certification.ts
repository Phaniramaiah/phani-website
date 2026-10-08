import type { Certification } from '../../content/types';

export type CertificationStatus = 'active' | 'expired' | 'lifetime';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const parseYearMonth = (value: string): { year: number; month: number } | null => {
  const match = /^(\d{4})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);

  return month >= 1 && month <= 12 ? { year, month } : null;
};

export const formatYearMonth = (value: string): string => {
  const parsed = parseYearMonth(value);
  return parsed ? `${monthNames[parsed.month - 1]} ${parsed.year}` : value;
};

export const certificationStatus = (certification: Certification, now: Date = new Date()): CertificationStatus => {
  const expiry = parseYearMonth(certification.expires);

  if (!expiry) {
    return 'lifetime';
  }

  const endOfExpiryMonth = new Date(expiry.year, expiry.month, 0, 23, 59, 59);
  return now.getTime() > endOfExpiryMonth.getTime() ? 'expired' : 'active';
};

export const validityLabel = (certification: Certification, status: CertificationStatus): string => {
  const issued = `Issued ${formatYearMonth(certification.issued)}`;

  if (status === 'lifetime') {
    return issued;
  }

  const verb = status === 'expired' ? 'Expired' : 'Valid until';
  return `${issued} · ${verb} ${formatYearMonth(certification.expires)}`;
};
