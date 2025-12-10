import { date, year } from "./date";

describe("date", () => {
  it("should throw when date is an empty string", () => {
    expect(() => date("")).toThrowError("Invalid time value");
  });

  it("should throw when date is an invalid format", () => {
    expect(() => date("bad")).toThrowError("Invalid time value");
  });

  it("should return date as human readable (YYYY-MM-DD)", () => {
    expect(date("2015-02-27")).toBe("Feb 27, 2015");
  });

  it("should return date as human readable (MM/DD/YYYY)", () => {
    expect(date("02/27/2015")).toBe("Feb 27, 2015");
  });

  it("should format as UTC", () => {
    expect(date("1974-11-11")).toBe("Nov 11, 1974");
  });
});

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
