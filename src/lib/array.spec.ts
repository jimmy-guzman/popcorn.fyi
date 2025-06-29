import { limit, shuffle } from "./array";

describe("shuffle", () => {
  it("should return a new array with the same elements", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);

    // Same elements (ignoring order)
    expect(result).toHaveLength(input.length);
    expect(result.sort()).toStrictEqual([...input].sort());
  });

  it("should not mutate the original array", () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];

    shuffle(input);

    expect(input).toStrictEqual(copy);
  });

  it("should return an empty array when given an empty array", () => {
    expect(shuffle([])).toStrictEqual([]);
  });

  it("should return the same array if it has one element", () => {
    expect(shuffle([42])).toStrictEqual([42]);
  });

  it("should sometimes change the order", () => {
    const input = [1, 2, 3, 4, 5];
    let changed = false;

    // Try 10 times to catch a shuffle that changes the order
    for (let i = 0; i < 10; i++) {
      const result = shuffle(input);

      if (result.join(",") !== input.join(",")) {
        changed = true;
        break;
      }
    }

    expect(changed).toBe(true);
  });
});

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
