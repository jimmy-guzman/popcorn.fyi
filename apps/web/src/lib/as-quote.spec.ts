import { asQuote } from "./as-quote";

describe("asQuote", () => {
  it("should wrap a string in double quotes if not already quoted", () => {
    expect(asQuote("hello")).toBe('"hello"');
  });

  it("should not modify a string already wrapped in double quotes", () => {
    expect(asQuote('"hello"')).toBe('"hello"');
  });

  it("should not modify a string already wrapped in single quotes", () => {
    expect(asQuote("'hello'")).toBe("'hello'");
  });

  it("should handle an empty string correctly", () => {
    expect(asQuote("")).toBe('""');
  });

  it("should handle strings that contain quotes inside", () => {
    expect(asQuote(`he said "hello"`)).toBe('"he said "hello""');
    expect(asQuote(`he said 'hello'`)).toBe("\"he said 'hello'\"");
  });

  it("should handle strings that already contain mixed quotes", () => {
    expect(asQuote(`'"hello"'`)).toBe(`'"hello"'`);
  });
});
