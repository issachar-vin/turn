import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Game, GlossaryEntry } from '../../content/types';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { useIsDesktop } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type PanelId = 'tiebreakers' | 'glossary';
type GlossaryMode = 'list' | 'grid';

/**
 * Lookups that are needed at any point in the rules ride along as floating
 * disclosures rather than living at one place in the timeline: the tiebreaker
 * order on mobile (the QuickReference section covers desktop, plan §7.6), and
 * the icon glossary everywhere.
 */
export function ReferenceDock({ game }: { game: Game }) {
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState<PanelId | null>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(null);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function toggle(panel: PanelId) {
    setOpen((current) => (current === panel ? null : panel));
  }

  return (
    <>
      {/* Sits above the sticky header, so the whole app dims behind an open panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden
            onClick={() => setOpen(null)}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="fixed inset-0 z-40 bg-[var(--bg-void)]/65"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2">
        <AnimatePresence>
          {open && (
            <motion.div
              id={`dock-panel-${open}`}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              // PANEL_MAX_H is the room between the sticky header and the dock buttons.
              className={`flex max-h-[var(--panel-max-h)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-gold-dim)] bg-[var(--bg-overlay)] shadow-[0_12px_40px_-12px_rgb(0_0_0/0.7)] sm:w-[26rem] ${
                open === 'glossary' ? 'h-[var(--panel-max-h)] sm:h-auto' : ''
              }`}
              style={
                { '--panel-max-h': 'calc(100svh - var(--header-height) - 5.5rem)' } as CSSProperties
              }
            >
              {open === 'tiebreakers' ? (
                <div className="overflow-y-auto p-4">
                  <p className="t-eyebrow mb-2 text-[var(--text-gold)]">
                    {game.quickReference.title}
                  </p>
                  <div className="flex flex-col gap-2">
                    <BlockRenderer blocks={game.quickReference.blocks} />
                  </div>
                </div>
              ) : (
                <GlossaryPanel title={game.glossary.title} entries={game.glossary.entries} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap justify-end gap-2">
          {!isDesktop && (
            <DockButton
              label="Tiebreakers"
              glyph="✦"
              panel="tiebreakers"
              open={open}
              onToggle={toggle}
            />
          )}
          <DockButton label="Icons" glyph="◈" panel="glossary" open={open} onToggle={toggle} />
        </div>
      </div>
    </>
  );
}

function DockButton({
  label,
  glyph,
  panel,
  open,
  onToggle,
}: {
  label: string;
  glyph: string;
  panel: PanelId;
  open: PanelId | null;
  onToggle: (panel: PanelId) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const isOpen = open === panel;
  const fade = { duration: reduced ? 0 : 0.15 };

  return (
    <motion.button
      type="button"
      layout
      transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-expanded={isOpen}
      aria-controls={`dock-panel-${panel}`}
      // The label is gone once open, so the name has to come from somewhere.
      aria-label={isOpen ? `Close ${label}` : undefined}
      onClick={() => onToggle(panel)}
      className={`t-eyebrow flex h-11 items-center gap-2 overflow-hidden rounded-full border border-[var(--border-gold-dim)] whitespace-nowrap text-[var(--text-gold)] shadow-[0_8px_24px_-8px_rgb(0_0_0/0.8)] transition-colors duration-[var(--dur-standard)] ${
        isOpen ? 'w-11 justify-center bg-[var(--bg-overlay-lift)]' : 'bg-[var(--bg-overlay)] px-4'
      }`}
    >
      {/* mode="wait": the old face fades out before the new one fades in. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isOpen ? 'close' : 'label'}
          layout="position"
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
        >
          {/* The ✕ carries the whole button on its own, so it outsizes the eyebrow type. */}
          <span aria-hidden className={isOpen ? 'text-xl leading-none' : undefined}>
            {isOpen ? '✕' : glyph}
          </span>
          {!isOpen && label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function GlossaryPanel({ title, entries }: { title: string; entries: GlossaryEntry[] }) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<GlossaryMode>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const needle = query.trim().toLowerCase();
  const inName = (entry: GlossaryEntry) => entry.name.toLowerCase().includes(needle);
  // In list mode a description hit is a useful related term, ranked under the name
  // hits. Grid mode shows no descriptions, so such a hit would just look wrong.
  const matches = !needle
    ? entries
    : mode === 'grid'
      ? entries.filter(inName)
      : [
          ...entries.filter(inName),
          ...entries.filter(
            (entry) => !inName(entry) && entry.description.toLowerCase().includes(needle),
          ),
        ];

  // A card the search has filtered away can't stay open underneath the grid.
  const selected = matches.find((entry) => entry.id === selectedId) ?? null;

  return (
    <>
      <div className="border-b border-[var(--border-hair)] p-4 pb-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="t-eyebrow text-[var(--text-gold)]">{title}</p>
          <div className="flex gap-1 rounded-full border border-[var(--border-hair)] p-0.5">
            {(['list', 'grid'] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => {
                  setMode(value);
                  setSelectedId(null);
                }}
                className="t-eyebrow rounded-full px-3 py-1 text-[var(--text-muted)] aria-pressed:bg-[var(--bg-raised)] aria-pressed:text-[var(--text-gold)]"
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search icons…"
          aria-label="Search icons"
          className="t-body-sm h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-hair)] bg-[var(--bg-raised)] px-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
        />
      </div>

      {matches.length === 0 ? (
        <p className="t-body-sm p-4 text-[var(--text-muted)]">No icons match “{query}”.</p>
      ) : mode === 'list' ? (
        <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
          {matches.map((entry) => (
            <li key={entry.id} className="flex gap-3">
              <GlossaryIcon entry={entry} className="mt-0.5 size-10" />
              <div className="min-w-0">
                <p className="t-step-title text-[var(--text-primary)]">{entry.name}</p>
                <p className="t-body-sm text-[var(--text-secondary)]">{entry.description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul
          // content-start, or a short result set stretches its rows down the panel.
          className="grid min-h-0 flex-1 auto-rows-min grid-cols-3 content-start gap-1 overflow-y-auto p-4 sm:grid-cols-4"
        >
          {matches.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                aria-pressed={selected?.id === entry.id}
                aria-controls="glossary-detail"
                onClick={() => setSelectedId(selected?.id === entry.id ? null : entry.id)}
                className="flex h-full w-full flex-col items-center gap-2 rounded-[var(--radius-sm)] border border-transparent p-2 aria-pressed:border-[var(--border-gold-dim)] aria-pressed:bg-[var(--bg-raised)]"
              >
                <GlossaryIcon entry={entry} className="size-11" />
                <span className="t-meta text-center text-[var(--text-secondary)]">
                  {entry.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && mode === 'grid' && (
        <div
          id="glossary-detail"
          className="max-h-40 shrink-0 overflow-y-auto border-t border-[var(--border-hair)] bg-[var(--bg-raised)] p-4"
        >
          <p className="t-step-title text-[var(--text-primary)]">{selected.name}</p>
          <p className="t-body-sm text-[var(--text-secondary)]">{selected.description}</p>
        </div>
      )}
    </>
  );
}

/** Fixed slot, so a prefixed icon still lines its text up with the rest. */
function GlossaryIcon({ entry, className }: { entry: GlossaryEntry; className: string }) {
  return (
    <span aria-hidden className={`flex shrink-0 items-center justify-center gap-0.5 ${className}`}>
      {entry.prefix && (
        <span className="text-2xl leading-none font-semibold text-[var(--text-gold)]">
          {entry.prefix}
        </span>
      )}
      <span
        className="h-full min-w-0 flex-1 bg-[var(--text-gold)]"
        style={{
          maskImage: `url('${entry.icon}')`,
          WebkitMaskImage: `url('${entry.icon}')`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      />
    </span>
  );
}
