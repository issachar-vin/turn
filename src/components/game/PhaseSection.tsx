import { motion } from 'motion/react';
import type { Section } from '../../content/types';
import { StepCard } from './StepCard';
import { Filigree } from '../layout/Filigree';
import { stepListVariants } from './motion';

export function PhaseSection({ section }: { section: Section }) {
  const headingId = `${section.id}-heading`;

  return (
    <section
      id={section.id}
      data-phase={section.phase}
      data-section-id={section.id}
      aria-labelledby={headingId}
      className="py-14 sm:py-20"
    >
      <header className="mb-8">
        <p className="t-eyebrow mb-2 text-[var(--phase-text)]">{section.tagline}</p>
        <h2 id={headingId} className="t-phase-title text-[var(--text-primary)]">
          {section.name}
        </h2>
        <Filigree className="mt-3" />
        {section.note && (
          <p className="t-body-sm measure mt-4 text-[var(--text-secondary)]">{section.note}</p>
        )}
      </header>

      <motion.div
        className="flex flex-col gap-4"
        variants={stepListVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {section.steps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </motion.div>
    </section>
  );
}
