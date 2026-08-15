import { cacheControlHeader } from "./cache-control";

describe("cacheControlHeader", () => {
  it("should cache reference data for a day", () => {
    expect(cacheControlHeader("reference")).toBe(
      "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    );
  });

  it("should cache details for an hour", () => {
    expect(cacheControlHeader("detail")).toBe(
      "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    );
  });

  it("should cache lists for five minutes", () => {
    expect(cacheControlHeader("list")).toBe(
      "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
    );
  });

  it("should cache searches for a minute", () => {
    expect(cacheControlHeader("search")).toBe(
      "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    );
  });
});
