/**
 * Formats a date string into a human-readable format.
 *
 * Uses UTC to prevent timezone shifts.
 *
 * @param  date - The date string in ISO (YYYY-MM-DD) or other valid formats.
 *
 * @returns The formatted date in a medium-length human-readable style.
 *
 * @throws {RangeError} If the date string is invalid.
 */
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeZone: "UTC",
});

export const date = (date: string): string => {
  return dateFormatter.format(new Date(date));
};
