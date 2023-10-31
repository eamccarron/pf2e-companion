import type { Selection } from '../components/SelectionContextProvider';

type primitive = string | number | boolean;

export interface Filter<T extends Selection<T['content']>> {
  label: string;
  identifier: keyof T['content'];
  value: primitive;
  comparator: (a: primitive, b: primitive) => boolean;
}

export const filterContent = <T extends Selection<T['content']>>(
  content: Array<T>,
  filters: Filter<T>[]
) =>
  content.filter((item) => {
    return filters.every((filter) => {
      const itemValue = item.content[filter.identifier];
      return filter.comparator(itemValue as primitive, filter.value);
    });
  });
