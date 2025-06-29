import { quote } from "./string";

describe("quote", () => {
  it("should wrap a string in double quotes if not already quoted", () => {
    expect(quote("hello")).toBe('"hello"');
  });

  it("should not modify a string already wrapped in double quotes", () => {
    expect(quote('"hello"')).toBe('"hello"');
  });

  it("should not modify a string already wrapped in single quotes", () => {
    expect(quote("'hello'")).toBe("'hello'");
  });

  it("should handle an empty string correctly", () => {
    expect(quote("")).toBe('""');
  });

  it("should handle strings that contain quotes inside", () => {
    expect(quote(`he said "hello"`)).toBe('"he said "hello""');
    expect(quote(`he said 'hello'`)).toBe("\"he said 'hello'\"");
  });

  it("should handle strings that already contain mixed quotes", () => {
    expect(quote(`'"hello"'`)).toBe(`'"hello"'`);
  });
});
