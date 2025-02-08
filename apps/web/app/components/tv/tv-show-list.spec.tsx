import { site } from "@/config/site";
import { render, screen } from "@/testing/utils";

import { TVShowList } from "./tv-show-list";

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

describe("TVShowList", () => {
  it("should render with title", async () => {
    await render(
      <TVShowList
        description={site.pages.popularTVShows.description}
        title={site.pages.popularTVShows.title}
        tvShows={[]}
      />,
    );

    const title = screen.getByRole("heading", {
      level: 1,
      name: site.pages.popularTVShows.title,
    });

    expect(title).toBeInTheDocument();
  });

  it("should render with description", async () => {
    await render(
      <TVShowList
        description={site.pages.popularTVShows.description}
        title={site.pages.popularTVShows.title}
        tvShows={[]}
      />,
    );

    const description = screen.getByText(site.pages.popularTVShows.description);

    expect(description).toBeInTheDocument();
  });

  it("should render with tv show card", async () => {
    await render(
      <TVShowList
        description={site.pages.popularTVShows.description}
        title={site.pages.popularTVShows.title}
        tvShows={[tvShow]}
      />,
    );

    const tvShowCard = screen.getByRole("heading", {
      level: 2,
      name: tvShow.name,
    });

    expect(tvShowCard).toBeInTheDocument();
  });
});
