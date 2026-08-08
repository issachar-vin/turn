import { useState } from 'react';
import { Lightbox } from '../ui/Lightbox';

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
        className="w-full max-w-[420px]"
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="w-full"
        />
      </button>
      {caption && (
        <figcaption className="t-meta text-center text-[var(--text-muted)]">{caption}</figcaption>
      )}
      <Lightbox open={open} onClose={() => setOpen(false)} src={src} alt={alt} />
    </figure>
  );
}
