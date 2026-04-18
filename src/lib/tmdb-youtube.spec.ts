import { selectYoutubeTrailer, youtubeVideoUrl } from "./tmdb-youtube";

describe("selectYoutubeTrailer", () => {
  it("should return undefined when site is not YouTube", () => {
    expect(
      selectYoutubeTrailer({
        results: [{ official: true, site: "NotYouTube" }],
      }),
    ).toBeUndefined();
  });

  it("should return undefined when type is not Trailer", () => {
    expect(
      selectYoutubeTrailer({
        results: [{ official: true, site: "YouTube", type: "Featurette" }],
      }),
    ).toBeUndefined();
  });

  it("should return official trailer first", () => {
    expect(
      selectYoutubeTrailer({
        results: [
          {
            name: "Not Official",
            official: false,
            site: "YouTube",
            type: "Trailer",
          },
          {
            name: "Official",
            official: true,
            site: "YouTube",
            type: "Trailer",
          },
        ],
      }),
    ).toStrictEqual({
      name: "Official",
      official: true,
      site: "YouTube",
      type: "Trailer",
    });
  });

  it("should return trailer when no official", () => {
    expect(
      selectYoutubeTrailer({
        results: [
          {
            name: "Not Official",
            official: false,
            site: "YouTube",
            type: "Trailer",
          },
          {
            name: "Not Official",
            official: false,
            site: "YouTube",
            type: "Trailer",
          },
        ],
      }),
    ).toStrictEqual({
      name: "Not Official",
      official: false,
      site: "YouTube",
      type: "Trailer",
    });
  });

  it("should return trailer", () => {
    expect(
      selectYoutubeTrailer({
        results: [{ official: true, site: "YouTube", type: "Trailer" }],
      }),
    ).toStrictEqual({
      official: true,
      site: "YouTube",
      type: "Trailer",
    });
  });
});

describe("youtubeVideUrl", () => {
  it("should enable autoplay", () => {
    expect(youtubeVideoUrl("123", { autoplay: true })).toBe(
      "https://www.youtube.com/embed/123?rel=0&showinfo=0&autoplay=1&mute=1",
    );
  });

  it("should NOT enable autoplay", () => {
    expect(youtubeVideoUrl("123", { autoplay: false })).toBe(
      "https://www.youtube.com/embed/123?rel=0&showinfo=0&autoplay=0",
    );
  });

  it("should NOT enable autoplay by default", () => {
    expect(youtubeVideoUrl("123")).toBe(
      "https://www.youtube.com/embed/123?rel=0&showinfo=0&autoplay=0",
    );
  });
});
