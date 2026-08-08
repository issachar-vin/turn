import { Link } from 'react-router';
import { motion } from 'motion/react';
import type { Game } from '../../content/types';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * The cover's lower third is bright cloud carrying the game's own logotype, so
 * an overlaid title would fight the artwork and repeat itself. Square image on
 * top, hairline, text block beneath (plan §7.1).
 */
export function GameCard({ game }: { game: Game }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
      }}
      style={{ ['--phase-core' as string]: game.accent }}
    >
      <Link
        to={`/${game.slug}`}
        className="group block overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-hair)] bg-[var(--bg-raised)] transition-all duration-[var(--dur-standard)] hover:border-[var(--phase-core)] hover:shadow-[0_0_40px_-12px_var(--mist-glow)]"
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={game.cover}
            alt={`${game.title}: ${game.subtitle} box art`}
            width={game.coverWidth}
            height={game.coverHeight}
            className={`h-full w-full object-cover transition-transform duration-[var(--dur-standard)] ${
              reduced ? '' : 'group-hover:scale-[1.06]'
            }`}
          />
        </div>
        <div className="border-t border-[var(--border-hair)] p-4">
          <h2 className="t-section text-[var(--text-primary)]">{game.title}</h2>
          <p className="t-body-sm mt-0.5 text-[var(--mist-cyan)]">{game.subtitle}</p>
          <p className="t-meta mt-2 text-[var(--text-muted)]">
            {game.players} · {game.playtime}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
