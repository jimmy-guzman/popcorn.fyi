import { limit } from "./limit";

describe("limit", () => {
  it("should return the original array if its length is less than maxLength", () => {
    const input = [1, 2, 3];
    const result = limit(input, 5);

    expect(result).toStrictEqual(input);
    expect(result).toBe(input);
  });

  it("should return the original array if its length equals maxLength", () => {
    const input = ["a", "b"];
    const result = limit(input, 2);

    expect(result).toStrictEqual(input);
  });

  it("should return a new array sliced to maxLength if input is longer", () => {
    const input = [1, 2, 3, 4, 5];
    const result = limit(input, 3);

    expect(result).toStrictEqual([1, 2, 3]);
    expect(result).not.toBe(input);
  });

  it("should return an empty array when maxLength is 0", () => {
    const input = [1, 2, 3];
    const result = limit(input, 0);

    expect(result).toStrictEqual([]);
  });

  it("should return an empty array when input is empty", () => {
    const input: number[] = [];
    const result = limit(input, 5);

    expect(result).toStrictEqual([]);
  });
});
