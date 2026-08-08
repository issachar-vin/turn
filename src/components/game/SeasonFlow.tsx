import { motion } from 'motion/react';
import type { FlowNode } from '../../content/types';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { scrollToSection } from '../../lib/scrollToSection';

/**
 * The season structure in one glance: three phases, an end-of-season step, and
 * a loop back to the Mist. The loop-back is the clearest way to teach that a
 * game is 2–3 repetitions of the same shape (plan §7.2).
 */
export function SeasonFlow({ nodes }: { nodes: FlowNode[] }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="w-full">
      <ol className="flex list-none flex-col items-stretch gap-0 md:flex-row md:items-stretch md:justify-center">
        {nodes.map((node, index) => (
          <li key={node.id} className="contents">
            {index > 0 && <Connector index={index} reduced={reduced} />}
            <motion.div
              data-phase={node.phase}
              className="flex flex-1 md:max-w-[190px]"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.8,
                delay: reduced ? 0 : index * 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <a
                href={`#${node.target}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(node.target);
                  history.replaceState(null, '', `#${node.target}`);
                }}
                className="flex w-full flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] border px-4 py-3.5 text-center transition-all duration-[var(--dur-standard)] hover:brightness-125"
                style={{
                  borderColor: 'color-mix(in srgb, var(--phase-core) 45%, transparent)',
                  background: 'color-mix(in srgb, var(--phase-core) 8%, var(--bg-raised))',
                  boxShadow: '0 0 24px -8px var(--phase-glow)',
                }}
              >
                <span className="t-section leading-tight text-[var(--phase-text)]">
                  {node.label}
                </span>
                <span className="t-meta text-[var(--text-muted)]">{node.detail}</span>
              </a>
            </motion.div>
          </li>
        ))}
      </ol>

      <LoopBack reduced={reduced} />
    </div>
  );
}

/**
 * The loop from End of Season back to the Mist. This single arrow is what makes
 * the season structure legible — without it the flow reads as a one-shot
 * sequence rather than a cycle repeated 2–3 times (plan §7.2).
 */
function LoopBack({ reduced }: { reduced: boolean }) {
  return (
    <div className="mt-2 flex flex-col items-center">
      <svg
        aria-hidden
        viewBox="0 0 800 44"
        preserveAspectRatio="none"
        className="hidden h-9 w-full max-w-[840px] md:block"
        fill="none"
      >
        <motion.path
          d="M770 0v22a10 10 0 0 1-10 10H44a10 10 0 0 0-10 10v2"
          stroke="var(--border-gold-dim)"
          strokeWidth="1.5"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.6 }}
        />
        <path d="M30 38l4 6 4-6z" fill="var(--border-gold-dim)" />
      </svg>

      <p className="t-meta flex items-center gap-2 text-[var(--text-muted)] md:mt-1">
        <span aria-hidden>↻</span>
        Repeat for each season — a game is 2 or 3 seasons.
      </p>
    </div>
  );
}

function Connector({ index, reduced }: { index: number; reduced: boolean }) {
  return (
    <span
      aria-hidden
      className="flex items-center justify-center py-1.5 md:w-10 md:self-center md:py-0"
    >
      <svg viewBox="0 0 40 12" className="h-3 w-6 rotate-90 md:w-10 md:rotate-0" fill="none">
        <motion.path
          d="M2 6h30"
          stroke="var(--border-gold-dim)"
          strokeWidth="1.5"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : index * 0.14 - 0.05 }}
        />
        <path d="M31 2l6 4-6 4z" fill="var(--border-gold-dim)" />
      </svg>
    </span>
  );
}
