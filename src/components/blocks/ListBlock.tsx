import type { ListItem } from '../../content/types';
import { RichText } from './RichText';
import { BlockRenderer } from './BlockRenderer';

export function ListBlock({ ordered, items }: { ordered: boolean; items: ListItem[] }) {
  const List = ordered ? 'ol' : 'ul';

  return (
    <List className="measure flex list-none flex-col gap-2">
      {items.map((item, index) => {
        const content = typeof item === 'string' ? item : item.content;
        const nested = typeof item === 'string' ? undefined : item.blocks;

        return (
          <li key={index} className="t-body relative pl-6 text-[var(--text-secondary)]">
            <span
              aria-hidden
              className="absolute left-0 top-0 select-none text-[var(--phase-text)]"
            >
              {ordered ? (
                <span className="t-numeral inline-block leading-[1.65]">{index + 1}.</span>
              ) : (
                <span className="inline-block leading-[1.65]">&#8226;</span>
              )}
            </span>
            <RichText value={content} />
            {nested && (
              <div className="mt-2 flex flex-col gap-2">
                <BlockRenderer blocks={nested} />
              </div>
            )}
          </li>
        );
      })}
    </List>
  );
}
