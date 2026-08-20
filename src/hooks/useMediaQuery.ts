import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** The single desktop breakpoint the layout switches on (plan §7.3). */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

/** True for mouse-and-keyboard input. False on touch, where focus opens a keyboard. */
export const useHasFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
