import { shuffle } from "./shuffle";

describe("shuffle", () => {
  it("should return a list with same number of items", () => {
    const list = [1, 2, 3, 4, 5];
    const result = shuffle(list);

    expect(list).toHaveLength(result.length);
  });

  it("should return a copy of list without mutating input", () => {
    const list = [1, 2, 3, 4, 5];
    const result = shuffle(list);

    expect(list).not.toStrictEqual(result);
    expect(list).toStrictEqual([1, 2, 3, 4, 5]);
  });
});
