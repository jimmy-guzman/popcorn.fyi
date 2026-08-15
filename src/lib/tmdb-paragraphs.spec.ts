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

  it("should leave markup characters untouched", () => {
    expect(
      tmdbParagraphs("Rosencrantz & Guildenstern <Are> Dead"),
    ).toStrictEqual(["Rosencrantz & Guildenstern <Are> Dead"]);
  });
});
