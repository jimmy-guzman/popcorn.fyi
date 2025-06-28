import { year } from "./year";

describe("year", () => {
  it("should return NaN when year is an empty string", () => {
    expect(year("")).toBeNaN();
  });

  it("should return NaN when year is an invalid format", () => {
    expect(year("bad")).toBeNaN();
  });

  it("should return full year from date", () => {
    expect(year("02/27/2015")).toBe(2015);
  });
});
