import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router';
import { GameHero } from '../components/game/GameHero';
import { PhaseRail } from '../components/game/PhaseRail';
import { PhaseSection } from '../components/game/PhaseSection';
import { QuickReference, TiebreakerFab } from '../components/game/QuickReference';
import { getGame } from '../content/games';
import { useActiveSection } from '../hooks/useActiveSection';
import NotFoundPage from './NotFoundPage';

export default function GamePage() {
  const { slug } = useParams();
  const game = slug ? getGame(slug) : undefined;

  if (!game) return <NotFoundPage />;
  return <GameDetail game={game} />;
}

function GameDetail({ game }: { game: NonNullable<ReturnType<typeof getGame>> }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionIds = useMemo(() => game.sections.map((section) => section.id), [game]);
  const activeId = useActiveSection(sectionIds);

  const activePhase = game.sections.find((section) => section.id === activeId)?.phase;

  // Phase handoff: the page-level channel drives the ambient wash, so background
  // glow washes blue → green → red as the rail crosses phases (plan §6).
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.pagePhase = activePhase ?? '';
    const styles = getComputedStyle(root);
    const source = activePhase ? `--${phaseVar(activePhase)}-glow` : '--phase-glow';
    root.style.setProperty('--page-phase-glow', styles.getPropertyValue(source).trim());
    return () => {
      delete root.dataset.pagePhase;
      root.style.removeProperty('--page-phase-glow');
    };
  }, [activePhase]);

  useEffect(() => {
    document.title = `${game.title}: ${game.subtitle} — Player Aids`;
  }, [game]);

  return (
    <>
      <GameHero game={game} />

      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[var(--rail-width)_minmax(0,780px)] lg:justify-center lg:gap-12">
        <div className="lg:pt-20">
          <PhaseRail sections={game.sections} activeId={activeId} timelineRef={timelineRef} />
        </div>

        {/* Bottom padding on mobile clears the floating Tiebreakers button. */}
        <div ref={timelineRef} className="min-w-0 pb-24 lg:pb-0">
          {game.sections.map((section) => (
            <PhaseSection key={section.id} section={section} />
          ))}
          <QuickReference title={game.quickReference.title} blocks={game.quickReference.blocks} />
        </div>
      </div>

      <TiebreakerFab title={game.quickReference.title} blocks={game.quickReference.blocks} />
    </>
  );
}

function phaseVar(phase: string): string {
  return phase === 'preparation' ? 'prep' : phase;
}
