import { popularMovies } from "@/config/lists";
import { render, screen } from "@/testing/utils";

import { MovieList } from "./movie-list";

const movie = {
  adult: false,
  backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
  genre_ids: [18, 80],
  id: 238,
  original_language: "en",
  original_title: "The Godfather",
  overview:
    "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
  popularity: 193.247,
  poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  release_date: "1972-03-14",
  title: "The Godfather",
  video: false,
  vote_average: 8.7,
  vote_count: 20_703,
};

describe("MovieList", () => {
  it("should render with title", async () => {
    await render(
      <MovieList
        description={popularMovies.description}
        movies={[]}
        title={popularMovies.title}
      />,
    );

    const title = screen.getByRole("heading", {
      level: 1,
      name: popularMovies.title,
    });

    expect(title).toBeInTheDocument();
  });

  it("should render with description", async () => {
    await render(
      <MovieList
        description={popularMovies.description}
        movies={[]}
        title={popularMovies.title}
      />,
    );

    const description = screen.getByText(popularMovies.description);

    expect(description).toBeInTheDocument();
  });

  it("should render with movie card", async () => {
    await render(
      <MovieList
        description={popularMovies.description}
        movies={[movie]}
        title={popularMovies.title}
      />,
    );

    const tvShowCard = screen.getByRole("heading", {
      level: 2,
      name: movie.title,
    });

    expect(tvShowCard).toBeInTheDocument();
  });
});
