import { GameGrid } from '../components/home/GameGrid';
import { Filigree } from '../components/layout/Filigree';
import { games } from '../content/games';

export default function HomePage() {
  return (
    <div className="py-14 sm:py-20">
      <header className="mb-10">
        <h1 className="t-phase-title text-[var(--text-primary)]">Player Aids</h1>
        <Filigree className="mt-3" />
      </header>
      <GameGrid games={games} />
    </div>
  );
}
