import { site } from "@/config/site";
import { render, screen } from "@/testing/utils";

import { PeopleList } from "./people-list";

const person = {
  adult: false,
  gender: 2,
  id: 64,
  known_for: [
    {
      adult: false,
      backdrop_path: "/y2DB71C4nyIdMrANijz8mzvQtk6.jpg",
      genre_ids: [28, 80, 18, 53],
      id: 49_026,
      media_type: "movie",
      original_language: "en",
      original_title: "The Dark Knight Rises",
      overview:
        "Following the death of District Attorney Harvey Dent, Batman assumes responsibility for Dent's crimes to protect the late attorney's reputation and is subsequently hunted by the Gotham City Police Department. Eight years later, Batman encounters the mysterious Selina Kyle and the villainous Bane, a new terrorist leader who overwhelms Gotham's finest. The Dark Knight resurfaces to protect a city that has branded him an enemy.",
      popularity: 88.934,
      poster_path: "/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg",
      release_date: "2012-07-17",
      title: "The Dark Knight Rises",
      video: false,
      vote_average: 7.781,
      vote_count: 22_732,
    },
    {
      adult: false,
      backdrop_path: "/oOv2oUXcAaNXakRqUPxYq5lJURz.jpg",
      genre_ids: [18, 28, 80, 53],
      id: 155,
      media_type: "movie",
      original_language: "en",
      original_title: "The Dark Knight",
      overview:
        "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
      popularity: 139.009,
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      release_date: "2008-07-16",
      title: "The Dark Knight",
      video: false,
      vote_average: 8.517,
      vote_count: 32_991,
    },
    {
      adult: false,
      backdrop_path: "/tyBkBHKDrJyVUeCs550kMr61jnq.jpg",
      genre_ids: [10_749, 27],
      id: 6114,
      media_type: "movie",
      original_language: "en",
      original_title: "Bram Stoker's Dracula",
      overview:
        "In 19th century England, Count Dracula travels to London and meets Mina Harker, a young woman who appears as the reincarnation of his lost love.",
      popularity: 37.916,
      poster_path: "/scFDS0U5uYAjcVTyjNc7GmcZw1q.jpg",
      release_date: "1992-11-13",
      title: "Bram Stoker's Dracula",
      video: false,
      vote_average: 7.5,
      vote_count: 5109,
    },
  ],
  known_for_department: "Acting",
  name: "Gary Oldman",
  original_name: "Gary Oldman",
  popularity: 225.51,
  profile_path: "/2v9FVVBUrrkW2m3QOcYkuhq9A6o.jpg",
};

describe("PeopleList", () => {
  it("should render with title", async () => {
    await render(
      <PeopleList
        description={site.pages.popularPeople.description}
        people={[]}
        title={site.pages.popularPeople.title}
      />,
    );

    const title = screen.getByRole("heading", {
      level: 1,
      name: site.pages.popularPeople.title,
    });

    expect(title).toBeInTheDocument();
  });

  it("should render with description", async () => {
    await render(
      <PeopleList
        description={site.pages.popularPeople.description}
        people={[]}
        title={site.pages.popularPeople.title}
      />,
    );

    const description = screen.getByText(site.pages.popularPeople.description);

    expect(description).toBeInTheDocument();
  });

  it("should render with movie card", async () => {
    await render(
      <PeopleList
        description={site.pages.popularPeople.description}
        people={[person]}
        title={site.pages.popularPeople.title}
      />,
    );

    const tvShowCard = screen.getByRole("heading", {
      level: 2,
      name: person.name,
    });

    expect(tvShowCard).toBeInTheDocument();
  });
});
