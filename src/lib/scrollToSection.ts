/**
 * Chromium's native smooth scroll (scrollIntoView / window.scrollTo with
 * behavior:'smooth') silently stops short on long-distance jumps (confirmed:
 * a ~600px scroll lands exactly, a ~2400px scroll stalls hundreds of pixels
 * early). This animates the scroll manually so it always reaches the target,
 * and bails out if the user scrolls or touches the screen so it never fights
 * manual input.
 */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const destination = getScrollDestination(target);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: destination, behavior: 'instant' });
    return;
  }

  animateScrollTo(destination);
}

function getScrollDestination(target: HTMLElement): number {
  const scrollPaddingTop = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const documentTop = target.getBoundingClientRect().top + window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(documentTop - scrollPaddingTop, maxScroll));
}

let cancelActiveScroll: (() => void) | null = null;

function animateScrollTo(destination: number, duration = 600) {
  cancelActiveScroll?.();

  const start = window.scrollY;
  const distance = destination - start;
  const startTime = performance.now();
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    cancelActiveScroll = null;
  };

  const step = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = 1 - (1 - t) ** 3;
    window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
    if (t < 1) {
      frame = requestAnimationFrame(step);
    } else {
      stop();
    }
  };

  window.addEventListener('wheel', stop, { passive: true, once: true });
  window.addEventListener('touchstart', stop, { passive: true, once: true });
  frame = requestAnimationFrame(step);
  cancelActiveScroll = stop;
}
