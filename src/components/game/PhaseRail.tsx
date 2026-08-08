import type { RefObject } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import type { Section } from '../../content/types';
import { useIsDesktop } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface PhaseRailProps {
  sections: Section[];
  activeId: string;
  timelineRef: RefObject<HTMLElement | null>;
}

export function PhaseRail({ sections, activeId, timelineRef }: PhaseRailProps) {
  const isDesktop = useIsDesktop();
  return isDesktop ? (
    <DesktopRail sections={sections} activeId={activeId} timelineRef={timelineRef} />
  ) : (
    <MobileRail sections={sections} activeId={activeId} />
  );
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' });
}

function DesktopRail({ sections, activeId, timelineRef }: PhaseRailProps) {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end end'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const scaleY = useTransform(reduced ? scrollYProgress : smooth, (value) => Math.max(value, 0));

  return (
    <nav aria-label="Phases" className="sticky top-[calc(var(--header-height)+40px)]">
      <ol className="relative flex list-none flex-col gap-7 pl-6">
        <span
          aria-hidden
          className="absolute bottom-2 left-[5px] top-2 w-px bg-[var(--border-hair)]"
        />
        <motion.span
          aria-hidden
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-[var(--phase-core)]"
          style={{ scaleY }}
        />

        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id} data-phase={section.phase} className="relative">
              <span
                aria-hidden
                className="absolute -left-6 top-[7px] h-[11px] w-[11px] rounded-full border transition-all duration-[var(--dur-standard)]"
                style={{
                  borderColor: active ? 'var(--phase-core)' : 'var(--border-hair)',
                  background: active ? 'var(--phase-core)' : 'var(--bg-base)',
                  transform: active ? 'scale(1.35)' : 'scale(1)',
                  boxShadow: active ? '0 0 0 6px var(--phase-glow)' : 'none',
                }}
              />
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-current={active ? 'true' : undefined}
                className="t-eyebrow block text-left transition-colors duration-[var(--dur-standard)]"
                style={{ color: active ? 'var(--phase-text)' : 'var(--text-muted)' }}
              >
                {section.name}
              </button>

              {active && (
                <motion.ul
                  initial={reduced ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2 flex list-none flex-col gap-1.5 overflow-hidden"
                >
                  {section.steps.map((step) => (
                    <li key={step.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(step.id)}
                        className="t-meta block text-left text-[var(--text-muted)] transition-colors duration-[var(--dur-micro)] hover:text-[var(--text-secondary)]"
                      >
                        {step.title}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function MobileRail({ sections, activeId }: { sections: Section[]; activeId: string }) {
  return (
    <nav
      aria-label="Phases"
      className="sticky top-[var(--header-height)] z-30 -mx-4 border-b border-[var(--border-hair)] bg-[var(--bg-overlay)]/85 backdrop-blur-md sm:-mx-6"
    >
      <ul className="flex list-none items-center gap-2 overflow-x-auto px-4 py-2 sm:px-6">
        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id} data-phase={section.phase} className="shrink-0">
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-current={active ? 'true' : undefined}
                className="t-eyebrow flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-4 transition-colors duration-[var(--dur-standard)]"
                // A solid --phase-core fill only clears 4.5:1 against dark text
                // for mist and preparation — crimson lands at 3.7:1. A deep tint
                // of the same hue reads just as "filled" and works for all three.
                style={{
                  borderColor: active ? 'var(--phase-core)' : 'var(--border-hair)',
                  background: active
                    ? 'color-mix(in srgb, var(--phase-core) 32%, var(--bg-void))'
                    : 'transparent',
                  color: active ? 'var(--phase-text)' : 'var(--text-muted)',
                }}
              >
                {section.name.replace(' Phase', '')}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
