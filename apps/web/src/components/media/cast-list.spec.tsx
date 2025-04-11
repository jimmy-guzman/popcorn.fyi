import { render, screen } from "@/testing/utils";

import { CastList } from "./cast-list";

const cast = [
  {
    character: "Dom Cobb",
    id: 1,
    name: "Leonardo DiCaprio",
    profile_path: "/leo.jpg",
  },
  {
    character: "Arthur",
    id: 2,
    name: "Joseph Gordon-Levitt",
    profile_path: "/joseph.jpg",
  },
];

describe("<CastList />", () => {
  it("should render a list of cast members", async () => {
    await render(<CastList cast={cast} />);

    expect(screen.getByText("Leonardo DiCaprio")).toBeInTheDocument();
    expect(screen.getByText("Dom Cobb")).toBeInTheDocument();
    expect(screen.getByText("Joseph Gordon-Levitt")).toBeInTheDocument();
    expect(screen.getByText("Arthur")).toBeInTheDocument();
  });

  it("should generate correct links for cast members", async () => {
    await render(<CastList cast={cast} />);

    expect(
      screen.getByRole("link", { name: "Leonardo DiCaprio" }),
    ).toHaveAttribute("href", "/people/1");
    expect(
      screen.getByRole("link", { name: "Joseph Gordon-Levitt" }),
    ).toHaveAttribute("href", "/people/2");
  });

  it("should not render an image if profile_path is missing", async () => {
    const castWithoutImage = [{ character: "Eames", id: 3, name: "Tom Hardy" }];

    await render(<CastList cast={castWithoutImage} />);

    expect(screen.getByText("Tom Hardy")).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: "Tom Hardy" }),
    ).not.toBeInTheDocument();
  });
});
