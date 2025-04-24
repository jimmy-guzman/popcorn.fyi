import { random } from "./random";

describe("random", () => {
  it("should return a number", () => {
    const result = random(0, 100);

    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });
});
