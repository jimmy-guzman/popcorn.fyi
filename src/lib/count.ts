const countFormatter = new Intl.NumberFormat("en");

/**
 * Formats a count with digit grouping.
 *
 * @param value - The count to format.
 *
 * @returns The grouped count, e.g. `12,043`.
 */
export const count = (value: number) => {
  return countFormatter.format(value);
};
