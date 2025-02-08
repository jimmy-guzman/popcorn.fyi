import { render, screen } from "@/testing/utils";

import { TVShowCard } from "./tv-show-card";

const tvShow = {
  adult: false,
  backdrop_path: "/zSPvARNCFpZxmWjgJCsBu5PUlR9.jpg",
  first_air_date: "2024-10-21",
  genre_ids: [35, 18, 10_751, 10_762, 10_759],
  id: 247_885,
  name: "Papás por Conveniencia",
  origin_country: ["MX", "US"],
  original_language: "en",
  original_name: "Papás por Conveniencia",
  overview:
    "Tino, a single father who faces great challenges in raising his two children, finds out one day that he is also the father of two rebellious teenagers, children of Aidé, a former high school classmate who has become an important businesswoman. For Tino, this news becomes an opportunity to take on the role of father of the children he never knew he had. Thus, he begins to work at Aidé's company, but everything gets complicated when Tino and his family move into Aidé's house to integrate into her new life. The house becomes a battlefield, both of their children have problems adapting, and love resurfaces between Tino and Aidé and a torrid romance begins. But building this new life for Aidé, Tino and their children will not be easy; they will have to face serious obstacles, always supported by the strength of their love and that of their children.",
  popularity: 3167.389,
  poster_path: "/y7yIu9PKx2WTphhYgbBq9C1RNzV.jpg",
  vote_average: 8,
  vote_count: 30,
};

describe("TVShowCard", () => {
  it("should render image when it exists", async () => {
    await render(<TVShowCard tvShow={tvShow} />);

    const image = screen.getByRole("img", { name: tvShow.name });

    expect(image).toBeInTheDocument();
  });

  it("should NOT render image when it doesn't exists", async () => {
    const { poster_path, ...rest } = tvShow;

    await render(<TVShowCard tvShow={rest} />);

    const image = screen.queryByRole("img", { name: tvShow.name });

    expect(image).not.toBeInTheDocument();
  });

  it("should render average vote", async () => {
    await render(<TVShowCard tvShow={tvShow} />);

    const averageVote = screen.getByText("8.0");

    expect(averageVote).toBeInTheDocument();
  });

  it("should render year vote when it exists", async () => {
    await render(<TVShowCard tvShow={tvShow} />);

    const year = screen.getByText("2024");

    expect(year).toBeInTheDocument();
  });

  it("should NOT render year when it doesn't exists", async () => {
    const { first_air_date, ...rest } = tvShow;

    await render(<TVShowCard tvShow={rest} />);

    const year = screen.queryByText("2024");

    expect(year).not.toBeInTheDocument();
  });
});
