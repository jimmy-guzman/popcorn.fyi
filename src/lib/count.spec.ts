import { count } from "./count";

describe("count", () => {
  it("should group thousands", () => {
    expect(count(12_043)).toBe("12,043");
  });

  it("should format zero", () => {
    expect(count(0)).toBe("0");
  });
});
