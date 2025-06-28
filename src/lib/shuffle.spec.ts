import { shuffle } from "./shuffle"; // adjust path if needed

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
