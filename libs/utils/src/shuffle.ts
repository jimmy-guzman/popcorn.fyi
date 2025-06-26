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
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};
