import { useEffect, useState } from 'react';

/**
 * One IntersectionObserver for the whole page (plan §11) — no per-step scroll
 * handlers.
 *
 * The root margin collapses the viewport to a thin band just under the header,
 * so "active" means "the section currently crossing the reading line". Comparing
 * intersection *ratios* instead would be wrong: ratio is relative to each
 * element's own height, so a short section beats a tall one that fills the
 * screen.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const crossing = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id);
          else crossing.delete(entry.target.id);
        }

        // Latest in document order wins, so entering a section claims the rail.
        for (let index = sectionIds.length - 1; index >= 0; index -= 1) {
          if (crossing.has(sectionIds[index])) {
            setActiveId(sectionIds[index]);
            return;
          }
        }
      },
      { rootMargin: '-20% 0px -75% 0px', threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
