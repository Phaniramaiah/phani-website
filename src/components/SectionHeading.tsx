import type { ReactElement } from 'react';

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
};

export const SectionHeading = ({ index, kicker, title }: SectionHeadingProps): ReactElement => {
  return (
    <div className="section-heading">
      <p className="section-heading__index">{index}</p>
      <div>
        <p className="section-heading__kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
    </div>
  );
};
