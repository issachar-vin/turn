import type { Step } from '../../content/types';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { VeiledStep } from './VeiledStep';

/**
 * Nested numbered steps joined by a vertical hairline — deliberately lighter
 * than a top-level StepCard so the hierarchy reads at a glance (plan §7.6).
 */
export function SubstepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative mt-4 flex list-none flex-col gap-4 pl-6">
      <span
        aria-hidden
        className="absolute bottom-2 left-[9px] top-2 w-px bg-[var(--border-hair)]"
      />
      {steps.map((step) => (
        <li key={step.id} id={step.id} className="relative">
          <span
            aria-hidden
            className="absolute -left-6 top-[7px] flex h-[19px] w-[19px] items-center justify-center rounded-full border border-[var(--phase-core)]/50 bg-[var(--bg-base)] text-[0.625rem] font-bold text-[var(--phase-text)]"
          >
            {step.label}
          </span>
          <SubstepBody step={step} />
        </li>
      ))}
    </ol>
  );
}

function SubstepBody({ step }: { step: Step }) {
  const body = (
    <>
      <h4 className="t-step-title text-[var(--text-primary)]">{step.title}</h4>
      {step.blocks && (
        <div className="mt-2 flex flex-col gap-3">
          <BlockRenderer blocks={step.blocks} />
        </div>
      )}
      {step.substeps && <SubstepList steps={step.substeps} />}
    </>
  );

  if (step.condition) {
    return <VeiledStep condition={step.condition}>{body}</VeiledStep>;
  }

  return body;
}
