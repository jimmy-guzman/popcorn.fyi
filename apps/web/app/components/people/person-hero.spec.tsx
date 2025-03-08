import { render, screen } from "@/testing/utils";

import { PersonHero } from "./person-hero";

const person = {
  backdrop_path: "/backdrop.jpg",
  id: 300,
  known_for_department: "Acting",
  media_type: "person",
  name: "Leonardo DiCaprio",
};

describe("<PersonHero />", () => {
  it("should render the person's name as an accessible label", async () => {
    await render(<PersonHero person={person} />);

    const hero = screen.getByLabelText("Leonardo DiCaprio");

    expect(hero).toBeInTheDocument();
  });

  it("should render the person's name as a title", async () => {
    await render(<PersonHero person={person} />);

    const title = screen.getByRole("heading", {
      level: 1,
      name: "Leonardo DiCaprio",
    });

    expect(title).toBeInTheDocument();
  });

  it("should display the person's known department", async () => {
    await render(<PersonHero person={person} />);

    const department = screen.getByText("Known for Acting");

    expect(department).toBeInTheDocument();
  });

  it("should render the details button with correct link", async () => {
    await render(<PersonHero person={person} />);

    const button = screen.getByRole("link", { name: /details/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/tv-shows/300");
  });

  it("should render with a backdrop image if provided", async () => {
    await render(<PersonHero person={person} />);

    const hero = screen.getByLabelText("Leonardo DiCaprio");

    expect(hero).toBeInTheDocument();
    expect(hero).toHaveStyle(
      'background-image: url("https://image.tmdb.org/t/p/original//backdrop.jpg")',
    );
  });

  it("should render without a backdrop image if not provided", async () => {
    const { backdrop_path, ...rest } = person;

    await render(<PersonHero person={rest} />);

    const hero = screen.getByLabelText("Leonardo DiCaprio");

    expect(hero).toBeInTheDocument();
    expect(hero).not.toHaveStyle(
      'background-image: url("https://image.tmdb.org/t/p/original//backdrop.jpg")',
    );
  });
});
