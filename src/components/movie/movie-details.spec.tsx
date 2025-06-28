import { render, screen } from "@/testing/utils";

import { MovieDetails } from "./movie-details";

const movie = {
  backdrop_path: "/backdrop.jpg",
  genres: [{ id: 1, name: "Sci-Fi" }],
  id: 100,
  overview: "A thief who enters the dreams of others to steal their secrets.",
  poster_path: "/poster.jpg",
  status: "Released",
  tagline: "Your mind is the scene of the crime.",
  title: "Inception",
  vote_average: 8.8,
};

describe("<MovieDetails />", () => {
  it("should render the movie title as a heading", async () => {
    await render(<MovieDetails movie={movie} />, {
      queryData: [[["movie", "details", 100, "external"], {}]],
    });

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Inception",
    });

    expect(heading).toBeInTheDocument();
  });

  it("should render the tagline as a quote", async () => {
    await render(<MovieDetails movie={movie} />, {
      queryData: [[["movie", "details", 100, "external"], {}]],
    });

    const tagline = screen.getByText(/your mind is the scene of the crime/i);

    expect(tagline).toBeInTheDocument();
  });

  it("should render the movie overview", async () => {
    await render(<MovieDetails movie={movie} />, {
      queryData: [[["movie", "details", 100, "external"], {}]],
    });

    const overview = screen.getByText(
      /a thief who enters the dreams of others/i,
    );

    expect(overview).toBeInTheDocument();
  });

  it("should display movie genres", async () => {
    await render(<MovieDetails movie={movie} />, {
      queryData: [[["movie", "details", 100, "external"], {}]],
    });

    const genre = screen.getByText("Sci-Fi");

    expect(genre).toBeInTheDocument();
  });
});
