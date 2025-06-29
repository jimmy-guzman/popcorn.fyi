/**
 * Wraps a string in double quotes if it's not already wrapped in single or double quotes.
 *
 * @param value - The value to process.
 *
 * @returns The string wrapped in double quotes if not already quoted.
 *
 * @example
 * quote("hello"); // => "\"hello\""
 * quote('"hello"'); // => '"hello"'
 * quote("'hello'"); // => "'hello'"
 */
export const quote = (value: string) => {
  return /^(['"]).*\1$/.test(value) ? value : `"${value}"`;
};
