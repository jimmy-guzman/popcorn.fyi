import { tmdbImageUrl } from "./tmdb-images";

describe("tmdbImageUrl", () => {
  it("should default to the original size", () => {
    expect(tmdbImageUrl("/abc.jpg")).toBe(
      "https://image.tmdb.org/t/p/original//abc.jpg",
    );
  });

  it("should use the given size", () => {
    expect(tmdbImageUrl("/abc.jpg", "w500")).toBe(
      "https://image.tmdb.org/t/p/w500//abc.jpg",
    );
  });
});
