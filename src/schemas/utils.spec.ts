import * as v from "valibot";

import { Filter } from "./utils";

describe("Filter", () => {
  it("should pass strings through unchanged", () => {
    expect(v.parse(Filter, "28")).toBe("28");
    expect(v.parse(Filter, "28,12")).toBe("28,12");
    expect(v.parse(Filter, "2020-01-01")).toBe("2020-01-01");
  });

  it("should treat an empty string as no filter", () => {
    expect(v.parse(Filter, "")).toBeUndefined();
  });

  it("should leave an absent filter absent", () => {
    expect(v.parse(Filter, undefined)).toBeUndefined();
  });

  it("should coerce numbers to strings since the router JSON-parses search params", () => {
    expect(v.parse(Filter, 28)).toBe("28");
    expect(v.parse(Filter, 0)).toBe("0");
    expect(v.parse(Filter, -1)).toBe("-1");
  });

  it("should fall back to no filter for unsupported values", () => {
    expect(v.parse(Filter, true)).toBeUndefined();
    expect(v.parse(Filter, null)).toBeUndefined();
    expect(v.parse(Filter, ["28"])).toBeUndefined();
    expect(v.parse(Filter, {})).toBeUndefined();
  });
});
