import { useState } from 'react';
import { Lightbox } from '../ui/Lightbox';

/**
 * The region-order source art carries an olive backdrop in its corners that
 * clashes with --bg-void. The board is inscribed in the square, so a circular
 * clip removes the backdrop entirely and leaves a clean disc (plan §7.6).
 */
export function FigureBlock({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <figure className="my-2 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge figure: ${alt}`}
        className="group relative w-full max-w-[420px] rounded-full"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full transition-shadow duration-[var(--dur-standard)] group-hover:shadow-[0_0_60px_rgb(95_211_227/0.28)]"
          style={{ boxShadow: '0 0 44px rgb(95 211 227 / 0.18)' }}
        />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="w-full rounded-full border border-[var(--mist-cyan)]/25"
        />
      </button>
      {caption && (
        <figcaption className="t-meta text-center text-[var(--text-muted)]">{caption}</figcaption>
      )}
      <Lightbox open={open} onClose={() => setOpen(false)} src={src} alt={alt} />
    </figure>
  );
}
