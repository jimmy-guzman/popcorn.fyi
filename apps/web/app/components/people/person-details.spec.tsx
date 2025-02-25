import { render, screen } from "@/testing/utils";

import { PersonDetails } from "./person-details";

const person = {
  biography: "An American actor, film producer, and environmentalist.",
  birthday: "1974-11-11",
  id: 300,
  known_for_department: "Acting",
  name: "Leonardo DiCaprio",
  place_of_birth: "Los Angeles, California, USA",
  popularity: 95.6,
  profile_path: "/profile.jpg",
};

describe("<PersonDetails />", () => {
  it("should render the person's name as a heading", async () => {
    await render(<PersonDetails person={person} />, {
      queryData: [[["person", "details", 300, "external"], {}]],
    });

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Leonardo DiCaprio",
    });

    expect(heading).toBeInTheDocument();
  });

  it("should render the person's biography", async () => {
    await render(<PersonDetails person={person} />, {
      queryData: [[["person", "details", 300, "external"], {}]],
    });

    const biography = screen.getByText(
      /an american actor, film producer, and environmentalist/i,
    );
    expect(biography).toBeInTheDocument();
  });

  it("should display the person's birthdate and place of birth", async () => {
    await render(<PersonDetails person={person} />, {
      queryData: [[["person", "details", 300, "external"], {}]],
    });

    const birthInfo = screen.getByText(
      /Nov 11, 1974\s*-\s*Los Angeles, California, USA/i,
    );

    expect(birthInfo).toBeInTheDocument();
  });

  it("should render 'No birthday available.' when birthdate is missing", async () => {
    const { birthday, ...rest } = person;
    await render(<PersonDetails person={rest} />, {
      queryData: [[["person", "details", 300, "external"], {}]],
    });

    const missingBirthday = screen.getByText("No birthday available.");

    expect(missingBirthday).toBeInTheDocument();
  });

  it("should render 'No biography available.' when biography is missing", async () => {
    const { biography, ...rest } = person;

    await render(<PersonDetails person={rest} />, {
      queryData: [[["person", "details", 300, "external"], {}]],
    });

    const missingBiography = screen.getByText("No biography available.");

    expect(missingBiography).toBeInTheDocument();
  });
});
