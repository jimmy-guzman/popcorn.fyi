import { language } from "./language";

describe("language", () => {
  it("should resolve an ISO 639-1 code to a language name", () => {
    expect(language("ja")).toBe("Japanese");
  });

  it("should fall back to the code when it is unknown", () => {
    expect(language("zz")).toBe("zz");
  });

  it("should fall back to the code when it is malformed", () => {
    expect(language("")).toBe("");
  });
});
