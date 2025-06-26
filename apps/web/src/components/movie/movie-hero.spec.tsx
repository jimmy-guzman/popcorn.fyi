import { render, screen } from "@/testing/utils";

import { MovieHero } from "./movie-hero";

describe("MovieHero", () => {
  it("should render image when it exists", async () => {
    const movie = {
      backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      id: 1,
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      title: "Venom: The Last Dance",
    };

    await render(<MovieHero movie={movie} />);

    const image = screen.getByRole("img", { name: movie.title });

    expect(image).toBeInTheDocument();
  });

  it("should NOT render image when it doesn't exists", async () => {
    const movie = {
      id: 1,
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      title: "Venom: The Last Dance",
    };

    await render(<MovieHero movie={movie} />);

    const image = screen.queryByRole("img", { name: movie.title });

    expect(image).not.toBeInTheDocument();
  });

  it("should render title", async () => {
    const movie = {
      backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      id: 1,
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      title: "Venom: The Last Dance",
    };

    await render(<MovieHero movie={movie} />);

    const title = screen.getByRole("heading", {
      level: 1,
      name: movie.title,
    });

    expect(title).toBeInTheDocument();
  });

  it("should render overview", async () => {
    const movie = {
      backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      id: 1,
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      title: "Venom: The Last Dance",
    };

    await render(<MovieHero movie={movie} />);

    const overview = screen.getByText(movie.overview);

    expect(overview).toBeInTheDocument();
  });

  it("should render trending badge", async () => {
    const movie = {
      backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      id: 1,
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      title: "Venom: The Last Dance",
    };

    await render(<MovieHero isTrending movie={movie} />);

    const trendingBadge = screen.getByText("Trending");

    expect(trendingBadge).toBeInTheDocument();
  });

  it("should NOT render trending badge when NOT trending", async () => {
    const movie = {
      backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      id: 1,
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      title: "Venom: The Last Dance",
    };

    await render(<MovieHero movie={movie} />);

    const trendingBadge = screen.queryByText("Trending");

    expect(trendingBadge).not.toBeInTheDocument();
  });
});
