/**
 * The one ornament in the system: a hairline rule with a celtic knot terminal.
 * Used only for section header rules, the hero divider and the footer cap —
 * never per-card (plan §5).
 */
export function Filigree({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 16"
      className={`h-4 w-[240px] max-w-full ${className}`}
      fill="none"
    >
      <path d="M0 8h88" stroke="var(--border-gold-dim)" strokeWidth="1" />
      <path d="M152 8h88" stroke="var(--border-gold-dim)" strokeWidth="1" />
      <path
        d="M104 8c0-4 4-6 8-6s8 2 8 6-4 6-8 6-8-2-8-6z"
        stroke="var(--border-gold)"
        strokeWidth="1"
      />
      <path
        d="M120 8c0-4 4-6 8-6s8 2 8 6-4 6-8 6-8-2-8-6z"
        stroke="var(--border-gold)"
        strokeWidth="1"
      />
      <path d="M120 2v12" stroke="var(--border-gold)" strokeWidth="1" opacity="0.5" />
      <path d="M88 8h8M144 8h8" stroke="var(--border-gold-dim)" strokeWidth="1" />
    </svg>
  );
}
