import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router';
import { GameHero } from '../components/game/GameHero';
import { PhaseRail } from '../components/game/PhaseRail';
import { PhaseSection } from '../components/game/PhaseSection';
import { QuickReference } from '../components/game/QuickReference';
import { ReferenceDock } from '../components/game/ReferenceDock';
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

      <div className="flex flex-col gap-0 lg:grid lg:grid-cols-[var(--rail-width)_minmax(0,780px)] lg:justify-center lg:gap-12">
        <PhaseRail sections={game.sections} activeId={activeId} timelineRef={timelineRef} />

        <div ref={timelineRef} className="min-w-0">
          {game.sections.map((section) => (
            <PhaseSection key={section.id} section={section} />
          ))}
          <QuickReference title={game.quickReference.title} blocks={game.quickReference.blocks} />
        </div>
      </div>

      <ReferenceDock game={game} />
    </>
  );
}

function phaseVar(phase: string): string {
  return phase === 'preparation' ? 'prep' : phase;
}
