import { date } from "./date";

describe("date", () => {
  it("should throw when date is an empty string", () => {
    expect(() => date("")).toThrow("Invalid time value");
  });

  it("should throw when date is an invalid format", () => {
    expect(() => date("bad")).toThrow("Invalid time value");
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
