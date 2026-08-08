import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Step } from '../../content/types';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { SubstepList } from './SubstepList';
import { VeiledStep } from './VeiledStep';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { stepVariants, reducedStepVariants } from './motion';

export function StepCard({ step }: { step: Step }) {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);

  const hasBody = Boolean(step.blocks?.length || step.substeps?.length);
  const expanded = !hasBody || open;
  const bodyId = `${step.id}-body`;

  const body = (
    <div className="flex flex-col gap-3">
      {step.blocks && <BlockRenderer blocks={step.blocks} />}
      {step.substeps && <SubstepList steps={step.substeps} />}
    </div>
  );

  const header = (
    <div className="flex items-baseline gap-3">
      <span className="t-numeral shrink-0 text-[var(--phase-text)]">{step.label}</span>
      <h3 className="t-step-title flex-1 text-[var(--text-primary)]">{step.title}</h3>
      {hasBody && (
        <span
          aria-hidden
          className="shrink-0 text-[var(--text-secondary)] transition-transform duration-[var(--dur-standard)]"
          style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
        >
          ▾
        </span>
      )}
    </div>
  );

  const inner = (
    <>
      {hasBody ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={bodyId}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-[44px] w-full items-center text-left"
        >
          {header}
        </button>
      ) : (
        header
      )}

      <AnimatePresence initial={false}>
        {expanded && hasBody && (
          <motion.div
            id={bodyId}
            key="body"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <hr className="my-3 border-0 border-t border-[var(--border-hair)]" />
            {body}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // The veiled container supplies its own surface and border, so the card drops
  // its chrome rather than double-framing (plan §7.5).
  if (step.condition) {
    return (
      <motion.article
        id={step.id}
        variants={reduced ? reducedStepVariants : stepVariants}
        className="scroll-mt-32"
      >
        <VeiledStep condition={step.condition}>{inner}</VeiledStep>
      </motion.article>
    );
  }

  return (
    <motion.article
      id={step.id}
      variants={reduced ? reducedStepVariants : stepVariants}
      className="scroll-mt-32 rounded-[var(--radius-md)] border border-[var(--border-hair)] border-l-2 bg-[var(--bg-raised)] p-4 sm:p-5"
      style={{ borderLeftColor: 'var(--phase-core)' }}
    >
      {inner}
    </motion.article>
  );
}
