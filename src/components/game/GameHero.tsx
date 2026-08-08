import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { Game } from '../../content/types';
import { SeasonFlow } from './SeasonFlow';
import { Filigree } from '../layout/Filigree';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export function GameHero({ game }: { game: Game }) {
  const heroRef = useRef<HTMLElement>(null);
  const [cueVisible, setCueVisible] = useState(true);
  const reduced = usePrefersReducedMotion();

  // Pause the mist loops once the hero scrolls away (plan §11).
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setCueVisible(window.scrollY < 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Full-bleed: the aurora has to reach the viewport edges, or its blurred
  // backdrop reads as a rectangle floating on the page.
  return (
    <section
      ref={heroRef}
      aria-labelledby="game-title"
      className={`relative isolate mx-[calc(50%-50vw)] w-screen overflow-hidden px-4 pb-16 pt-14 sm:px-6 md:pt-20 ${
        paused ? 'mist-paused' : ''
      }`}
      style={{ minHeight: '72svh' }}
    >
      {/* The cover's palette *is* the aurora palette, so hero and tokens agree
          by construction rather than by eye (plan §10). */}
      <img
        src={game.cover}
        alt=""
        aria-hidden
        width={game.coverWidth}
        height={game.coverHeight}
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-full max-w-none -translate-x-1/2 scale-150 object-cover opacity-25 blur-3xl"
        style={{
          maskImage: 'radial-gradient(60% 60% at 50% 40%, #000 25%, transparent 80%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="mist-layer mist-layer--a" />
        <div className="mist-layer mist-layer--b" />
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[var(--bg-void)]"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <motion.p
          className="t-eyebrow text-[var(--text-gold)]"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Turn Order Player Aid
        </motion.p>

        <motion.h1
          id="game-title"
          className="t-display text-[var(--text-primary)]"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {game.title}
        </motion.h1>

        <p className="t-phase-title text-[var(--mist-cyan)]">{game.subtitle}</p>

        <Filigree />

        <p className="t-meta text-[var(--text-secondary)]">
          {game.players} <span className="text-[var(--text-muted)]">·</span> {game.playtime}
        </p>

        <div className="mt-6 w-full">
          <SeasonFlow nodes={game.overview} />
        </div>
      </div>

      <motion.p
        aria-hidden
        className="t-meta mt-10 text-center text-[var(--text-muted)]"
        animate={{ opacity: cueVisible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        Scroll for the full turn order ↓
      </motion.p>
    </section>
  );
}
