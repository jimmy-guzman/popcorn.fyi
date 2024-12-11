import { render, screen } from "@/testing/utils";

import { TvShowHero } from "./tv-show-hero";

describe("TVShowHero", () => {
  it("should render image when it exists", async () => {
    const tvShow = {
      backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      name: "Venom: The Last Dance",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
    };

    await render(<TvShowHero tvShow={tvShow} />);

    const image = screen.getByRole("img", { name: tvShow.name });

    expect(image).toBeInTheDocument();
  });

  it("should render NOT image when it doesn't exists", async () => {
    const tvShow = {
      name: "Venom: The Last Dance",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
    };

    await render(<TvShowHero tvShow={tvShow} />);

    const image = screen.queryByRole("img", { name: tvShow.name });

    expect(image).not.toBeInTheDocument();
  });

  it("should render name", async () => {
    const tvShow = {
      backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      name: "Venom: The Last Dance",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
    };

    await render(<TvShowHero tvShow={tvShow} />);

    const name = screen.getByRole("heading", {
      level: 1,
      name: tvShow.name,
    });

    expect(name).toBeInTheDocument();
  });

  it("should render overview", async () => {
    const tvShow = {
      backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      name: "Venom: The Last Dance",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
    };

    await render(<TvShowHero tvShow={tvShow} />);

    const overview = screen.getByText(tvShow.overview);

    expect(overview).toBeInTheDocument();
  });
});
