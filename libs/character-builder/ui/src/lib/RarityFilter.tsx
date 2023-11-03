import { ContentListFilter } from '@pf2-companion/ui-selection';
import type { Selection } from '@pf2-companion/ui-selection';

export function RarityFilter<T extends { rarity: string }>({
  content,
  setContent,
  initialContent,
}: {
  content: Selection<T>[];
  initialContent: Selection<T>[];
  setContent: React.Dispatch<React.SetStateAction<Selection<T>[]>>;
}) {
  return (
    <ContentListFilter<Selection<T>>
      filterMode="any"
      filters={[
        {
          label: 'Common',
          identifier: 'rarity',
          value: 'common',
          comparator: (a, b) => a === b,
        },
        {
          label: 'Uncommon',
          identifier: 'rarity',
          value: 'uncommon',
          comparator: (a, b) => a === b,
        },
        {
          label: 'Rare',
          identifier: 'rarity',
          value: 'rare',
          comparator: (a, b) => a === b,
        },
      ]}
      content={content}
      initialContent={initialContent}
      setContent={setContent}
    />
  );
}
