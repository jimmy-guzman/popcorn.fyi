import { render, screen } from "@/testing/utils";

import { MediaGenres } from "./media-genres";

describe("MediaGenres", () => {
  it("should render an empty component when genres is an empty array", async () => {
    await render(<MediaGenres genres={[]} media="movies" />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

  it("should render an empty component when no genres are provided", async () => {
    await render(<MediaGenres media="movies" />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

  it("should render genres correctly", async () => {
    await render(
      <MediaGenres genres={[{ id: 1, name: "Fantasy" }]} media="movies" />,
    );

    expect(screen.getByText("Fantasy")).toBeInTheDocument();
  });

  it("should generate the correct link for a movie genre", async () => {
    await render(
      <MediaGenres genres={[{ id: 1, name: "Fantasy" }]} media="movies" />,
    );

    const link = screen.getByRole("link", { name: "Fantasy" });
    expect(link).toHaveAttribute(
      "href",
      "/movies/discover?with_genres=%221%22",
    );
  });

  it("should generate the correct link for a TV show genre", async () => {
    await render(
      <MediaGenres genres={[{ id: 5, name: "Drama" }]} media="tv-shows" />,
    );

    const link = screen.getByRole("link", { name: "Drama" });
    expect(link).toHaveAttribute(
      "href",
      "/tv-shows/discover?with_genres=%225%22",
    );
  });

  it("should handle missing genre name gracefully", async () => {
    await render(
      <MediaGenres genres={[{ id: 2, name: undefined }]} media="movies" />,
    );

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});
