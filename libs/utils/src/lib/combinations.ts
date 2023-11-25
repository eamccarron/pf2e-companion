export const findCombinations = <T>(arr: Array<T>, k: number): Array<T[]> => {
  if (k === 1) {
    return arr.map((item) => [item]);
  }

  if (k > arr.length || k === 0) {
    return [];
  }

  if (k === arr.length) {
    return [arr];
  }

  const combinations: Array<T[]> = [];

  arr.forEach((item, index) => {
    const subCombinations = findCombinations(arr.slice(index + 1), k - 1);
    subCombinations.forEach((subCombination) => {
      combinations.push([item, ...subCombination]);
    });
  });
  return combinations;
};
