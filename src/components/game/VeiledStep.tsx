import type { ReactNode } from 'react';
import type { Condition } from '../../content/types';

/**
 * The signature component (plan §7.5). Conditional rules sit *in the mist* until
 * they apply: shrouded at rest, lifting to full on hover or keyboard focus.
 * Deliberately not aria-hidden — the condition label is real text placed before
 * the content, so screen readers hear the condition first.
 */
export function VeiledStep({ condition, children }: { condition: Condition; children: ReactNode }) {
  return (
    // Seated on --bg-void rather than --bg-raised: the veil should recede behind
    // the solid step cards, and the darker floor is what lets the mist stay
    // strong while shrouded body copy still clears 4.5:1 (plan §7.5, §11).
    <div className="veil-shimmer group relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--mist-cyan)]/25 bg-[var(--bg-void)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-[var(--dur-standard)] group-hover:opacity-60 group-focus-within:opacity-60"
        style={{
          background:
            'radial-gradient(28rem 14rem at 18% 0%, rgb(95 211 227 / 0.10), transparent 70%),' +
            'radial-gradient(24rem 16rem at 90% 100%, rgb(139 123 216 / 0.12), transparent 72%)',
        }}
      />
      <div className="relative p-4 sm:p-5">
        <p className="t-eyebrow mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--mist-cyan)]/30 bg-[var(--bg-void)]/50 px-3 py-1.5 text-[var(--mist-cyan)]">
          <span aria-hidden>◈</span>
          {condition.label}
        </p>
        <div className="opacity-[0.88] transition-opacity duration-[var(--dur-standard)] group-hover:opacity-100 group-focus-within:opacity-100">
          {children}
        </div>
      </div>
    </div>
  );
}
