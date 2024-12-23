import { date } from "./date";

describe("date", () => {
  it("should throw when date is an empty string", () => {
    expect(() => {
      return date("");
    }).toThrow("Invalid time value");
  });

  it("should throw when date is an invalid format", () => {
    expect(() => {
      return date("bad");
    }).toThrow("Invalid time value");
  });

  it("should return date as human readable", () => {
    expect(date("02/27/2015")).toBe("Feb 27, 2015");
  });
});
