import type { Step, StepFlow, StepRequirement } from '../../content/types';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { RichText } from '../blocks/RichText';
import { VeiledStep } from './VeiledStep';

/**
 * Nested steps joined by a vertical hairline — deliberately lighter than a
 * top-level StepCard so the hierarchy reads at a glance (plan §7.6).
 *
 * Consecutive siblings sharing a `flow` render as one group, because a numbered
 * spine is itself a claim about order: any-order steps get a labelled band and
 * identical markers, interrupts sit off the spine, and only untagged steps keep
 * the numbered ladder.
 */
export function SubstepList({ steps }: { steps: Step[] }) {
  const groups = groupByFlow(steps);

  return (
    <div className="mt-4 flex flex-col gap-4">
      {groups.map((group, index) => {
        switch (group.flow) {
          case 'any-order':
            return <AnyOrderGroup key={index} steps={group.steps} />;
          case 'interrupt':
            return <InterruptGroup key={index} steps={group.steps} />;
          default:
            return <SequenceGroup key={index} steps={group.steps} />;
        }
      })}
    </div>
  );
}

interface Group {
  flow?: StepFlow;
  steps: Step[];
}

function groupByFlow(steps: Step[]): Group[] {
  return steps.reduce<Group[]>((groups, step) => {
    const last = groups.at(-1);
    if (last && last.flow === step.flow) {
      last.steps.push(step);
    } else {
      groups.push({ flow: step.flow, steps: [step] });
    }
    return groups;
  }, []);
}

function SequenceGroup({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative flex list-none flex-col gap-4 pl-6">
      <Spine />
      {steps.map((step) => (
        <li key={step.id} id={step.id} className="relative">
          <Marker>{step.label}</Marker>
          <SubstepBody step={step} />
        </li>
      ))}
    </ol>
  );
}

/**
 * The order-free pair. Stacking is unavoidable on a narrow column, and stacking
 * reads as sequence — so the band header and the shared ◆ marker carry the whole
 * "your call" signal, and neither step is allowed a number.
 */
function AnyOrderGroup({ steps }: { steps: Step[] }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--phase-core)]/45 bg-[var(--phase-glow)]/10 p-3.5 sm:p-4">
      <p className="t-eyebrow inline-flex items-center gap-2 text-[var(--phase-text)]">
        <span aria-hidden>⇅</span>
        In any order — your choice
      </p>
      {steps[0].flowNote && (
        <p className="t-body-sm mt-2 text-[var(--text-secondary)]">
          <RichText value={steps[0].flowNote} />
        </p>
      )}
      <ul className="relative mt-3 flex list-none flex-col gap-4 pl-6">
        <Spine />
        {steps.map((step) => (
          <li key={step.id} id={step.id} className="relative">
            <Marker>{step.label}</Marker>
            <SubstepBody step={step} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Off the spine entirely: an interrupt is not a rung on the ladder. */
function InterruptGroup({ steps }: { steps: Step[] }) {
  return (
    <ul className="relative flex list-none flex-col gap-4 pl-6">
      <span
        aria-hidden
        className="absolute bottom-2 left-[9px] top-2 w-px border-l border-dashed border-[var(--danger)]/40"
      />
      {steps.map((step) => (
        <li key={step.id} id={step.id} className="relative">
          <span
            aria-hidden
            className="absolute -left-6 top-[7px] flex h-[19px] w-[19px] items-center justify-center rounded-full border border-[var(--danger)]/60 bg-[var(--bg-base)] text-[0.625rem] text-[var(--danger)]"
          >
            {step.label}
          </span>
          <p className="t-eyebrow mb-1.5 text-[var(--danger)]">
            <span className="sr-only">Interrupt: </span>
            Interrupt — can happen at any point
          </p>
          <SubstepBody step={step} />
        </li>
      ))}
    </ul>
  );
}

function Spine() {
  return (
    <span aria-hidden className="absolute bottom-2 left-[9px] top-2 w-px bg-[var(--border-hair)]" />
  );
}

/**
 * "Any order" answers *when*, not *whether* — without this the band reads as if
 * both halves were equally skippable, which is the opposite of the rule.
 */
function RequirementTag({ requirement }: { requirement: StepRequirement }) {
  const required = requirement === 'required';

  return (
    <span
      className="t-eyebrow shrink-0 rounded-full border px-2 py-0.5"
      style={{
        borderColor: required ? 'var(--phase-core)' : 'var(--border-hair)',
        color: required ? 'var(--phase-text)' : 'var(--text-muted)',
      }}
    >
      {required ? 'Required' : 'Optional'}
    </span>
  );
}

function Marker({ children }: { children: string }) {
  return (
    <span
      aria-hidden
      className="absolute -left-6 top-[7px] flex h-[19px] w-[19px] items-center justify-center rounded-full border border-[var(--phase-core)]/50 bg-[var(--bg-base)] text-[0.625rem] font-bold text-[var(--phase-text)]"
    >
      {children}
    </span>
  );
}

function SubstepBody({ step }: { step: Step }) {
  const body = (
    <>
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <h4 className="t-step-title text-[var(--text-primary)]">{step.title}</h4>
        {step.requirement && <RequirementTag requirement={step.requirement} />}
      </div>
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
