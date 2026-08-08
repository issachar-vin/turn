import { useReducedMotion } from 'motion/react';

/** Single guard feeding every Motion variant in the app (plan §6). */
export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}
