import { render, screen } from "@/testing/utils";

import { MovieCard } from "./movie-card";

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

describe("MovieCard", () => {
  it("should render image when it exists", async () => {
    await render(<MovieCard movie={movie} />);

    const image = screen.getByRole("img", { name: movie.title });

    expect(image).toBeInTheDocument();
  });

  it("should NOT render image when it doesn't exists", async () => {
    const { poster_path, ...rest } = movie;

    await render(<MovieCard movie={rest} />);

    const image = screen.queryByRole("img", { name: movie.title });

    expect(image).not.toBeInTheDocument();
  });

  it("should render average vote", async () => {
    await render(<MovieCard movie={movie} />);

    const averageVote = screen.getByText("8.7");

    expect(averageVote).toBeInTheDocument();
  });

  it("should render year vote when it exists", async () => {
    await render(<MovieCard movie={movie} />);

    const year = screen.getByText("1972");

    expect(year).toBeInTheDocument();
  });

  it("should NOT render year when it doesn't exists", async () => {
    const { release_date, ...rest } = movie;

    await render(<MovieCard movie={rest} />);

    const year = screen.queryByText("1972");

    expect(year).not.toBeInTheDocument();
  });
});
