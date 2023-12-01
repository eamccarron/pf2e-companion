import type { ValueOf } from './type-utils/ValueOf';

interface EnumType {
  [k: string | number]: number | string;
}

export const mapEnum = <T extends EnumType, V>(
  enumerable: T,
  mapFn: (item: ValueOf<T>) => V
): Array<V> => {
  const keys = Object.values(enumerable).filter(
    (value) => typeof value === 'string'
  ) as Array<keyof typeof enumerable>;

  return keys.map((key) => mapFn(enumerable[key]));
};
