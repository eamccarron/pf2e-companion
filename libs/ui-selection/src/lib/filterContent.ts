import type { Selection } from '../components/SelectionContextProvider';

type primitive = string | number | boolean;

export interface Filter<T extends Selection<unknown>> {
  label: string;
  identifier: keyof T;
  value: primitive;
  comparator: (a: primitive, b: primitive) => boolean;
}

export const filterContent = <T>(
  content: Selection<T>[],
  filters: Filter<T>[]
) =>
  content.filter((item) => {
    return filters.every((filter) => {
      const itemValue = item.content[filter.identifier];
      return filter.comparator(itemValue as primitive, filter.value);
    });
  });
