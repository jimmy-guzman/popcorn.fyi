import { limit, shuffle, unique } from "./array";

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

describe("unique", () => {
  it("should return an empty array if input is empty", () => {
    const result = unique([], "id");

    expect(result).toStrictEqual([]);
  });

  it("should return the same array if it has only one item", () => {
    const input = [{ id: 1, name: "Alice" }];
    const result = unique(input, "id");

    expect(result).toStrictEqual(input);
    expect(result).not.toBe(input); // ensure it's a new array
  });

  it("should remove duplicates based on the specified key", () => {
    const input = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 1, name: "Alice again" },
    ];
    const result = unique(input, "id");

    expect(result).toStrictEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ]);
  });

  it("should keep the first occurrence of each unique key", () => {
    const input = [
      { id: "x", value: 1 },
      { id: "y", value: 2 },
      { id: "x", value: 3 }, // should be ignored
    ];
    const result = unique(input, "id");

    expect(result).toStrictEqual([
      { id: "x", value: 1 },
      { id: "y", value: 2 },
    ]);
  });

  it("should work with numbers, strings, and booleans as keys", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }];

    expect(unique(input, "id")).toStrictEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);

    const inputStr = [{ key: "a" }, { key: "b" }, { key: "a" }];

    expect(unique(inputStr, "key")).toStrictEqual([{ key: "a" }, { key: "b" }]);

    const inputBool = [{ active: true }, { active: false }, { active: true }];

    expect(unique(inputBool, "active")).toStrictEqual([
      { active: true },
      { active: false },
    ]);
  });
});
