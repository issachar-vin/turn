import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Block } from '../../content/types';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { useIsDesktop } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface QuickReferenceProps {
  title: string;
  blocks: Block[];
}

export function QuickReference({ title, blocks }: QuickReferenceProps) {
  return (
    <section
      id="quick-reference"
      aria-labelledby="quick-reference-heading"
      // The TiebreakerFab already surfaces this content on mobile — no need to duplicate it inline.
      className="hidden scroll-mt-32 rounded-[var(--radius-lg)] border border-[var(--border-gold-dim)] bg-[var(--bg-raised)] p-5 sm:p-6 lg:block"
    >
      <p className="t-eyebrow text-[var(--text-gold)]">Quick Reference</p>
      <h2 id="quick-reference-heading" className="t-section mt-1 text-[var(--text-primary)]">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-3">
        <BlockRenderer blocks={blocks} />
      </div>
    </section>
  );
}

/**
 * The tiebreaker order is referenced from three separate places in the rules,
 * so on mobile it also rides along as a floating disclosure (plan §7.6).
 */
export function TiebreakerFab({ title, blocks }: QuickReferenceProps) {
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);

  if (isDesktop) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            id="tiebreaker-panel"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[60svh] overflow-y-auto rounded-[var(--radius-md)] border border-[var(--border-gold-dim)] bg-[var(--bg-overlay)] p-4 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.7)]"
          >
            <p className="t-eyebrow mb-2 text-[var(--text-gold)]">{title}</p>
            <div className="flex flex-col gap-2">
              <BlockRenderer blocks={blocks} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="tiebreaker-panel"
        onClick={() => setOpen((value) => !value)}
        className="t-eyebrow flex h-11 items-center gap-2 rounded-full border border-[var(--border-gold-dim)] bg-[var(--bg-overlay)] px-4 text-[var(--text-gold)] shadow-[0_8px_24px_-8px_rgb(0_0_0/0.8)]"
      >
        <span aria-hidden>✦</span>
        Tiebreakers
      </button>
    </div>
  );
}
