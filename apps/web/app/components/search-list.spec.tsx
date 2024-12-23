import { render, screen } from "@/testing/utils";

import { SearchList } from "./search-list";

const results = [
  {
    adult: false,
    gender: 1,
    id: 1_392_137,
    known_for: [
      {
        adult: false,
        backdrop_path: "/xwgBHC2FgoIrQitl8jZwXXdsR9u.jpg",
        genre_ids: [35, 18, 53],
        id: 466_272,
        media_type: "movie",
        original_language: "en",
        original_title: "Once Upon a Time... in Hollywood",
        overview:
          "Los Angeles, 1969. TV star Rick Dalton, a struggling actor specializing in westerns, and stuntman Cliff Booth, his best friend, try to survive in a constantly changing movie industry. Dalton is the neighbor of the young and promising actress and model Sharon Tate, who has just married the prestigious Polish director Roman Polanski…",
        popularity: 87.903,
        poster_path: "/wQKeS2JrsRF8XSfd9zqflrc5gad.jpg",
        release_date: "2019-07-24",
        title: "Once Upon a Time... in Hollywood",
        video: false,
        vote_average: 7.438,
        vote_count: 13_458,
      },
      {
        adult: false,
        backdrop_path: "/oLp6ueqQXNWvWCFwrb6tXDnH0Ye.jpg",
        genre_ids: [35, 80, 28],
        id: 290_250,
        media_type: "movie",
        original_language: "en",
        original_title: "The Nice Guys",
        overview:
          "A private eye investigates the apparent suicide of a fading porn star in 1970s Los Angeles and uncovers a conspiracy.",
        popularity: 42.761,
        poster_path: "/clq4So9spa9cXk3MZy2iMdqkxP2.jpg",
        release_date: "2016-05-15",
        title: "The Nice Guys",
        video: false,
        vote_average: 7.121,
        vote_count: 7905,
      },
      {
        adult: false,
        backdrop_path: "/tirhxzSR6g1A9Iayo2lpYW4luUF.jpg",
        genre_ids: [878],
        id: 433_249,
        media_type: "movie",
        original_language: "en",
        original_title: "IO",
        overview:
          "As a young scientist searches for a way to save a dying Earth, she finds a connection with a man who's racing to catch the last shuttle off the planet.",
        popularity: 18.562,
        poster_path: "/utH781EwjzzXQC6fZUO3cw8L5Ht.jpg",
        release_date: "2019-01-18",
        title: "IO",
        video: false,
        vote_average: 4.953,
        vote_count: 1357,
      },
    ],
    known_for_department: "Acting",
    media_type: "person",
    name: "Margaret Qualley",
    original_name: "Margaret Qualley",
    popularity: 88.639,
    profile_path: "/jStNyMj3acpLuH48awLVLqqlyaV.jpg",
  },
];

describe("SearchList", () => {
  it("should show person when media type is 'person'", async () => {
    await render(<SearchList query="Margaret Qualley" results={results} />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Margaret Qualley",
    });

    expect(heading).toBeInTheDocument();
  });
});
