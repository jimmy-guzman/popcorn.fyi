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
