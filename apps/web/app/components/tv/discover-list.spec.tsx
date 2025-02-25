import { render, screen } from "@/testing/utils";

import { TvDiscoverList } from "./discover-list";

const tvShows = [
  {
    first_air_date: "2008-01-20",
    id: 1,
    name: "Breaking Bad",
    poster_path: "/breaking-bad.jpg",
    vote_average: 9.5,
  },
  {
    first_air_date: "2016-07-15",
    id: 2,
    name: "Stranger Things",
    poster_path: "/stranger-things.jpg",
    vote_average: 8.7,
  },
];

describe("<TvDiscoverList />", () => {
  it("should render a list of TV shows", async () => {
    await render(<TvDiscoverList page={1} totalPages={5} tv={tvShows} />);

    expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
    expect(screen.getByText("Stranger Things")).toBeInTheDocument();
  });

  it("should show pagination when totalPages is greater than 1", async () => {
    await render(<TvDiscoverList page={1} totalPages={5} tv={tvShows} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should not show pagination when totalPages is 1", async () => {
    await render(<TvDiscoverList page={1} totalPages={1} tv={tvShows} />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("should show an alert when there are no results", async () => {
    await render(<TvDiscoverList page={1} totalPages={1} tv={[]} />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "No results available based on your filters.",
    );
  });
});
