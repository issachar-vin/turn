import type { Block } from '../../content/types';
import { BlockRenderer } from '../blocks/BlockRenderer';

interface QuickReferenceProps {
  title: string;
  blocks: Block[];
}

export function QuickReference({ title, blocks }: QuickReferenceProps) {
  return (
    <section
      id="quick-reference"
      aria-labelledby="quick-reference-heading"
      // The ReferenceDock already surfaces this content on mobile — no need to duplicate it inline.
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
