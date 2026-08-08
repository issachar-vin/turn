import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

export function Lightbox({ open, onClose, src, alt }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<Element | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement;
    closeRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    // Only one focusable element inside, so trapping is just keeping focus on it.
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      (restoreRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-void)]/92 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.25 }}
          onClick={onClose}
        >
          <motion.img
            src={src}
            alt={alt}
            className="max-h-full max-w-full rounded-[var(--radius-lg)]"
            initial={reduced ? undefined : { scale: 0.94 }}
            animate={reduced ? undefined : { scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="t-eyebrow absolute right-4 top-4 rounded-full border border-[var(--border-hair)] bg-[var(--bg-overlay)] px-4 py-3 text-[var(--text-secondary)] transition-colors duration-[var(--dur-micro)] hover:text-[var(--text-primary)]"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
