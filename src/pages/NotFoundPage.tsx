import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-start gap-4 py-24">
      <h1 className="t-phase-title text-[var(--text-primary)]">Lost in the mist</h1>
      <p className="t-body text-[var(--text-secondary)]">There is no player aid at this address.</p>
      <Link to="/" className="t-eyebrow flex h-11 items-center text-[var(--text-gold)]">
        ← Back to all games
      </Link>
    </div>
  );
}
