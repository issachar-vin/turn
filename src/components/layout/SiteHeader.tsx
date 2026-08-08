import { Link, useLocation } from 'react-router';

export function SiteHeader() {
  const onHome = useLocation().pathname === '/';

  return (
    <header className="sticky top-0 z-40 h-[var(--header-height)] border-b border-[var(--border-hair)] bg-[var(--bg-void)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="t-eyebrow text-[var(--text-gold)]">
          Player Aids
        </Link>
        {!onHome && (
          <Link
            to="/"
            className="t-meta flex h-11 items-center text-[var(--text-muted)] transition-colors duration-[var(--dur-micro)] hover:text-[var(--text-primary)]"
          >
            ← All games
          </Link>
        )}
      </div>
    </header>
  );
}
