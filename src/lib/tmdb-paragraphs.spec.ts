import { tmdbParagraphs } from "./tmdb-paragraphs";

describe("tmdbParagraphs", () => {
  it("should split content into paragraphs", () => {
    expect(
      tmdbParagraphs("First paragraph.\n\nSecond paragraph."),
    ).toStrictEqual(["First paragraph.", "Second paragraph."]);
  });

  it("should drop blank sections", () => {
    expect(tmdbParagraphs("Only one.\n\n\n")).toStrictEqual(["Only one."]);
  });

  it("should split on windows line endings", () => {
    expect(
      tmdbParagraphs("First paragraph.\r\n\r\nSecond paragraph."),
    ).toStrictEqual(["First paragraph.", "Second paragraph."]);
  });

  it("should drop whitespace-only sections", () => {
    expect(
      tmdbParagraphs("First paragraph.\n   \nSecond paragraph."),
    ).toStrictEqual(["First paragraph.", "Second paragraph."]);
  });

  it("should return nothing for content that is only line breaks", () => {
    expect(tmdbParagraphs("\n\n")).toStrictEqual([]);
  });

  it("should leave markup characters untouched", () => {
    expect(
      tmdbParagraphs("Rosencrantz & Guildenstern <Are> Dead"),
    ).toStrictEqual(["Rosencrantz & Guildenstern <Are> Dead"]);
  });
});
