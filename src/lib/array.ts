/**
 *  Shuffles the elements of an array into a random order.
 *
 * @param arr the input array to be shuffled.
 *
 * @returns   A new array containing the elements of the input array in random order.
 */
export const shuffle = <T>(arr: T[]): T[] => {
  return arr
    .map((item) => ({ item, sort: Math.random() }))
    .toSorted((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

/**
 * Limits the length of an array to a specified maximum length.
 *
 * @param array the input array to be limited
 *
 * @param maxLength non-negative integer specifying the maximum length of the returned array
 *
 * @returns A new array containing only the first `maxLength` elements of the input array. If the input array's length is less than or equal to `maxLength`, the original array is returned.
 */
export const limit = <T>(array: T[], maxLength: number) => {
  if (array.length <= maxLength) {
    return array;
  }

  return array.slice(0, maxLength);
};

/**
 * Removes duplicate objects from an array based on a specified key.
 * Optimized version with improved performance characteristics.
 *
 * @param array the input array containing objects to be filtered
 *
 * @param key the key of the object to determine uniqueness
 *
 * @returns A new array containing only unique objects based on the specified key.
 */
export const unique = <T>(array: T[], key: keyof T): T[] => {
  if (array.length === 0) return [];
  if (array.length === 1) return [...array];

  const seen = new Set<T[keyof T]>();
  const result: T[] = [];

  for (const item of array) {
    const k = item[key];

    if (!seen.has(k)) {
      seen.add(k);
      result.push(item);
    }
  }

  return result;
};
