import type { ReactElement } from 'react';
import type { PipelineStage } from '../../content/types';

type PipelineProps = {
  engine: string;
  stages: readonly PipelineStage[];
};

export const Pipeline = ({ engine, stages }: PipelineProps): ReactElement | null => {
  if (stages.length === 0) {
    return null;
  }

  return (
    <aside className="pipeline" aria-label={`Delivery path orchestrated with ${engine}`}>
      <div className="pipeline__bar">
        <span className="pipeline__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <p>delivery-path</p>
        <span className="pipeline__engine">{engine}</span>
      </div>
      <ol className="pipeline__steps">
        {stages.map((stage, index) => (
          <li key={stage.id} className="step">
            <span className="step__node" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="step__body">
              <strong>{stage.label}</strong>
              <span className="step__tool">{stage.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="pipeline__foot">
        <span aria-hidden="true">●</span> Commit to production, no manual steps
      </p>
    </aside>
  );
};
