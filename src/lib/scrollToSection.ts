/**
 * Chromium's native smooth scroll silently stops short on long-distance
 * jumps (confirmed: a ~600px scroll lands exactly, a ~2400px scroll
 * stalls hundreds of pixels early), leaving the target section's heading
 * well below the top of the viewport. `instant` bypasses that animation
 * entirely and always lands on the correct scroll-margin-aware position.
 */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
}
