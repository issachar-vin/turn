import type { ReactNode } from 'react';
import { SiteHeader } from './SiteHeader';
import { Filigree } from './Filigree';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div aria-hidden className="page-wash" />
      <div className="relative z-10 flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">{children}</main>
        <footer className="mt-20 flex flex-col items-center gap-3 border-t border-[var(--border-hair)] py-10">
          <Filigree />
          <p className="t-meta text-[var(--text-muted)]">
            An unofficial player aid. Rules content belongs to its publisher.
          </p>
        </footer>
      </div>
    </>
  );
}
