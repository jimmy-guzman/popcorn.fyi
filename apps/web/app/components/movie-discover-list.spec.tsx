import { describe, expect, it } from "vitest";

import { render, screen } from "@/testing/utils";

import { MovieDiscoverList } from "./movie-discover-list";

describe("MovieDiscoverList", () => {
  it("should render a list of movies", async () => {
    await render(
      <MovieDiscoverList
        movies={[
          { id: 1, title: "Movie One", vote_average: 7.5 },
          { id: 2, title: "Movie Two", vote_average: 8.2 },
        ]}
        page={1}
        totalPages={2}
      />,
    );

    expect(screen.getByText("Movie One")).toBeInTheDocument();
    expect(screen.getByText("Movie Two")).toBeInTheDocument();
  });

  it("should render pagination if totalPages > 1", async () => {
    await render(
      <MovieDiscoverList
        movies={[
          { id: 1, title: "Movie One", vote_average: 7.5 },
          { id: 2, title: "Movie Two", vote_average: 8.2 },
        ]}
        page={1}
        totalPages={3}
      />,
    );

    expect(screen.getByLabelText("Next Page")).toBeInTheDocument();
  });

  it("should not render pagination if totalPages is 1", async () => {
    await render(
      <MovieDiscoverList
        movies={[{ id: 1, title: "Movie One", vote_average: 7.5 }]}
        page={1}
        totalPages={1}
      />,
    );

    expect(screen.queryByLabelText("Next Page")).not.toBeInTheDocument();
  });

  it("should show an alert message when there are no movies", async () => {
    await render(<MovieDiscoverList movies={[]} page={1} totalPages={1} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByText(/no results available based on your filters/i),
    ).toBeInTheDocument();
  });
});
