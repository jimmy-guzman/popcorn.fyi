import { nextCacheControl, NO_STORE } from "./cache-control";

describe("nextCacheControl", () => {
  it("should cache reference data for a day", () => {
    expect(nextCacheControl(undefined, "reference")).toBe(
      "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    );
  });

  it("should cache details for an hour", () => {
    expect(nextCacheControl(undefined, "detail")).toBe(
      "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    );
  });

  it("should cache lists for five minutes", () => {
    expect(nextCacheControl(undefined, "list")).toBe(
      "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
    );
  });

  it("should cache searches for a minute", () => {
    expect(nextCacheControl(undefined, "search")).toBe(
      "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    );
  });

  it("should shorten a longer tier already on the response", () => {
    const reference = nextCacheControl(undefined, "reference");

    expect(nextCacheControl(reference, "list")).toBe(
      "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
    );
  });

  it("should leave a shorter tier already on the response alone", () => {
    const list = nextCacheControl(undefined, "list");

    expect(nextCacheControl(list, "reference")).toBeUndefined();
  });

  it("should leave an equal tier alone", () => {
    const detail = nextCacheControl(undefined, "detail");

    expect(nextCacheControl(detail, "detail")).toBeUndefined();
  });

  it("should never cache once a function has failed", () => {
    expect(nextCacheControl(NO_STORE, "reference")).toBeUndefined();
    expect(nextCacheControl(NO_STORE, "search")).toBeUndefined();
  });

  it("should not cache when a failure follows a success", () => {
    const reference = nextCacheControl(undefined, "reference");

    expect(nextCacheControl(reference, "list")).toBeDefined();
    expect(nextCacheControl(NO_STORE, "list")).toBeUndefined();
  });

  it("should not cache when a success follows a failure", () => {
    expect(nextCacheControl(NO_STORE, "detail")).toBeUndefined();
    expect(nextCacheControl(NO_STORE, "list")).toBeUndefined();
  });
});
