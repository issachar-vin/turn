import type { CalloutTone } from '../../content/types';
import { RichText } from './RichText';

const TONES: Record<CalloutTone, { color: string; glyph: string; label: string }> = {
  note: { color: 'var(--note)', glyph: '◈', label: 'Note' },
  grail: { color: 'var(--grail)', glyph: '✦', label: 'Holy Grail' },
  warning: { color: 'var(--danger)', glyph: '▲', label: 'Careful' },
};

export function CalloutBlock({ tone, content }: { tone: CalloutTone; content: string }) {
  const { color, glyph, label } = TONES[tone];

  return (
    <div
      className="measure flex gap-3 rounded-[var(--radius-sm)] border-l-2 py-2.5 pl-3 pr-3"
      style={{
        borderLeftColor: color,
        background: `color-mix(in srgb, ${color} 8%, transparent)`,
      }}
    >
      <span aria-hidden className="t-meta select-none pt-0.5" style={{ color }}>
        {glyph}
      </span>
      <p className="t-body-sm text-[var(--text-secondary)]">
        <span className="sr-only">{label}: </span>
        <RichText value={content} />
      </p>
    </div>
  );
}
