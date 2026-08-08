import { RichText } from './RichText';

export function TextBlock({ content }: { content: string }) {
  return (
    <p className="t-body measure text-[var(--text-secondary)]">
      <RichText value={content} />
    </p>
  );
}
