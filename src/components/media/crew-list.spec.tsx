import { render, screen } from "@/testing/utils";

import { CrewList } from "./crew-list";

const crew = [
  {
    id: 1,
    job: "Director",
    name: "Christopher Nolan",
    profile_path: "/nolan.jpg",
  },
  {
    id: 2,
    job: "Composer",
    name: "Hans Zimmer",
    profile_path: "/zimmer.jpg",
  },
];

describe("<CrewList />", () => {
  it("should render a list of crew members", async () => {
    await render(<CrewList crew={crew} />);

    expect(screen.getByText("Christopher Nolan")).toBeInTheDocument();
    expect(screen.getByText("Director")).toBeInTheDocument();
    expect(screen.getByText("Hans Zimmer")).toBeInTheDocument();
    expect(screen.getByText("Composer")).toBeInTheDocument();
  });

  it("should generate correct links for crew members", async () => {
    await render(<CrewList crew={crew} />);

    expect(
      screen.getByRole("link", { name: "Christopher Nolan" }),
    ).toHaveAttribute("href", "/people/1");
    expect(screen.getByRole("link", { name: "Hans Zimmer" })).toHaveAttribute(
      "href",
      "/people/2",
    );
  });

  it("should render fallback image if profile_path is missing", async () => {
    const crewWithoutImage = [{ id: 3, job: "Producer", name: "Emma Thomas" }];

    await render(<CrewList crew={crewWithoutImage} />);

    expect(
      screen.getByRole("img", { name: "Image unavailable" }),
    ).toBeInTheDocument();
  });
});
