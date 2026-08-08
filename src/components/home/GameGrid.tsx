import { motion } from 'motion/react';
import type { Game } from '../../content/types';
import { GameCard } from './GameCard';

export function GameGrid({ games }: { games: Game[] }) {
  return (
    <motion.div
      className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-6"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      initial="hidden"
      animate="visible"
    >
      {games.map((game) => (
        <GameCard key={game.slug} game={game} />
      ))}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
        }}
        className="flex aspect-square flex-col items-center justify-center self-start rounded-[var(--radius-lg)] border border-dashed border-[var(--border-hair)] p-6 text-center"
      >
        <p className="t-eyebrow text-[var(--text-muted)]">More games</p>
        <p className="t-meta mt-1 text-[var(--text-muted)]">coming soon</p>
      </motion.div>
    </motion.div>
  );
}
