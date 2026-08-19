import type { BranchOption } from '../../content/types';
import { BlockRenderer } from './BlockRenderer';

/**
 * Two mutually exclusive paths. Side by side with a vertical OR divider on
 * desktop; stacked with a horizontal OR chip on mobile (plan §7.6).
 */
export function BranchBlock({ options }: { options: BranchOption[] }) {
  return (
    <div className="measure relative flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
      {options.map((option, index) => (
        <div key={option.label} className="flex flex-1 flex-col sm:contents">
          {index > 0 && <OrDivider />}
          <div className="min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--border-hair)] bg-[var(--bg-base)]/60 p-3.5">
            <p className="t-eyebrow mb-2 text-[var(--phase-text)]">{option.label}</p>
            <div className="flex flex-col gap-2">
              <BlockRenderer blocks={option.blocks} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OrDivider() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-center gap-3 py-0.5 sm:w-auto sm:shrink-0 sm:flex-col sm:gap-2 sm:self-stretch sm:py-0"
    >
      <span className="h-px flex-1 bg-[var(--border-hair)] sm:h-auto sm:w-px sm:flex-1" />
      <span className="t-numeral shrink-0 whitespace-nowrap rounded-full border border-[var(--border-hair)] bg-[var(--bg-overlay)] px-2 py-1 text-[var(--text-secondary)]">
        OR
      </span>
      <span className="h-px flex-1 bg-[var(--border-hair)] sm:h-auto sm:w-px sm:flex-1" />
    </div>
  );
}
