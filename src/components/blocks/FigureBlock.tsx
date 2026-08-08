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
        className="group w-full max-w-[420px]"
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="w-full transition-[filter] duration-[var(--dur-standard)] [filter:drop-shadow(0_0_44px_rgb(95_211_227_/_0.18))] group-hover:[filter:drop-shadow(0_0_60px_rgb(95_211_227_/_0.28))]"
        />
      </button>
      {caption && (
        <figcaption className="t-meta text-center text-[var(--text-muted)]">{caption}</figcaption>
      )}
      <Lightbox open={open} onClose={() => setOpen(false)} src={src} alt={alt} />
    </figure>
  );
}
