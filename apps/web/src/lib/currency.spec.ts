import { currency } from "./currency";

describe("currency", () => {
  it("should return currency as human readable", () => {
    expect(currency(310_000_000)).toBe("$310,000,000");
  });
});
