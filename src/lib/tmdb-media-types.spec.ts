import { pluralMediaType } from "./tmdb-media-types";

describe("pluralMediaType", () => {
  it.each([
    { expected: "movies", mediaType: "movie" },
    { expected: "tv-shows", mediaType: "tv" },
    { expected: "people", mediaType: "person" },
  ] as const)(
    "should return $mediaType when $expected",
    ({ expected, mediaType }) => {
      expect(pluralMediaType(mediaType)).toBe(expected);
    },
  );
});
