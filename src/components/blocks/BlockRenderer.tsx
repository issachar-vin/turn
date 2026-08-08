import type { Block } from '../../content/types';
import { TextBlock } from './TextBlock';
import { ListBlock } from './ListBlock';
import { TableBlock } from './TableBlock';
import { CalloutBlock } from './CalloutBlock';
import { FigureBlock } from './FigureBlock';
import { BranchBlock } from './BranchBlock';

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, index) => {
    switch (block.type) {
      case 'text':
        return <TextBlock key={index} content={block.content} />;
      case 'list':
        return <ListBlock key={index} ordered={block.ordered} items={block.items} />;
      case 'table':
        return (
          <TableBlock
            key={index}
            caption={block.caption}
            headers={block.headers}
            rows={block.rows}
          />
        );
      case 'callout':
        return <CalloutBlock key={index} tone={block.tone} content={block.content} />;
      case 'figure':
        return (
          <FigureBlock
            key={index}
            src={block.src}
            alt={block.alt}
            caption={block.caption}
            width={block.width}
            height={block.height}
          />
        );
      case 'branch':
        return <BranchBlock key={index} options={block.options} />;
    }
  });
}
