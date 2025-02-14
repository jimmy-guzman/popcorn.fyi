/**
 * Wraps a string in double quotes if it's not already wrapped in single or double quotes.
 * @param value - The value to process.
 *
 * @returns The string wrapped in double quotes if not already quoted.
 *
 * @example
 * asQuote("hello"); // => "\"hello\""
 * asQuote('"hello"'); // => '"hello"'
 * asQuote("'hello'"); // => "'hello'"
 */
export const asQuote = (value: string): string => {
  return /^(['"]).*\1$/.test(value) ? value : `"${value}"`;
};
