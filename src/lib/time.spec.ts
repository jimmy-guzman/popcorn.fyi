import { time } from "./time";

describe("time", () => {
  it("should not throw an error", () => {
    expect(() => {
      time(500);
    }).not.toThrowError();
  });

  it("should support milliseconds", () => {
    expect(time(500)).toBe("500 ms");

    expect(time(-500)).toBe("-500 ms");
  });

  it("should support seconds", () => {
    expect(time(1000)).toBe("1 second");
    expect(time(1200)).toBe("1 second");
    expect(time(10_000)).toBe("10 seconds");

    expect(time(-1000)).toBe("-1 second");
    expect(time(-1200)).toBe("-1 second");
    expect(time(-10_000)).toBe("-10 seconds");
  });

  it("should support minutes", () => {
    expect(time(60 * 1000)).toBe("1 minute");
    expect(time(60 * 1200)).toBe("1 minute");
    expect(time(60 * 10_000)).toBe("10 minutes");

    expect(time(-1 * 60 * 1000)).toBe("-1 minute");
    expect(time(-1 * 60 * 1200)).toBe("-1 minute");
    expect(time(-1 * 60 * 10_000)).toBe("-10 minutes");
  });
});
