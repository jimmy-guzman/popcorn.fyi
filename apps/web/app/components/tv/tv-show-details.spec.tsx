import { render, screen } from "@/testing/utils";

import { TVShowDetails } from "./tv-show-details";

const tvShow = {
  backdrop_path: "/backdrop.jpg",
  genres: [{ id: 1, name: "Drama" }],
  id: 200,
  name: "Breaking Bad",
  overview: "A high school chemistry teacher turned methamphetamine producer.",
  poster_path: "/poster.jpg",
  status: "Ended",
  tagline: "All bad things must come to an end.",
  vote_average: 9.5,
};

describe("<TVShowDetails />", () => {
  it("should render the TV show title as a heading", async () => {
    await render(<TVShowDetails tvShow={tvShow} />, {
      queryData: [[["tv", "details", 200, "external"], {}]],
    });

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Breaking Bad",
    });

    expect(heading).toBeInTheDocument();
  });

  it("should render the tagline as a quote", async () => {
    await render(<TVShowDetails tvShow={tvShow} />, {
      queryData: [[["tv", "details", 200, "external"], {}]],
    });

    const tagline = screen.getByText(/all bad things must come to an end/i);

    expect(tagline).toBeInTheDocument();
  });

  it("should render the TV show overview", async () => {
    await render(<TVShowDetails tvShow={tvShow} />, {
      queryData: [[["tv", "details", 200, "external"], {}]],
    });

    const overview = screen.getByText(
      /a high school chemistry teacher turned methamphetamine producer/i,
    );

    expect(overview).toBeInTheDocument();
  });

  it("should display TV show genres", async () => {
    await render(<TVShowDetails tvShow={tvShow} />, {
      queryData: [[["tv", "details", 200, "external"], {}]],
    });

    const genre = screen.getByText("Drama");

    expect(genre).toBeInTheDocument();
  });
});
