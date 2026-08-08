import { Fragment, type ReactNode } from 'react';

/**
 * Inline formatting for content strings: `**bold**` for emphasis, and Holy Grail
 * mentions tinted with --grail (plan §3, semantic tokens). The Grail drives three
 * separate rules, so it is worth spotting mid-sentence.
 */
const PATTERN = /(\*\*[^*]+\*\*|Holy Grail)/g;

export function RichText({ value }: { value: string }): ReactNode {
  const parts = value.split(PATTERN);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-[var(--text-primary)]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part === 'Holy Grail') {
      return (
        <span key={index} className="font-medium text-[var(--grail)]">
          {part}
        </span>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}
