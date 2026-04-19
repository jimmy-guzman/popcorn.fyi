import { render, screen } from "@/testing/utils";

import { MovieDiscoverFilters } from "./discover-filters";

const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", async () => {
  return {
    ...(await vi.importActual("@tanstack/react-router")),
    useNavigate: vi.fn(() => mockNavigate),
    useSearch: vi.fn(() => ({})),
  };
});

const mockGenres = [{ id: 1, name: "Action" }];
const mockProviders = [
  { display_priority: 1, provider_id: 2, provider_name: "Netflix" },
];
const mockRegions = [{ english_name: "United States", iso_3166_1: "US" }];

describe("MovieDiscoverFilters", () => {
  it("should renders all filters correctly", async () => {
    await render(
      <MovieDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      { path: "/_layout/movies/discover/_layout" },
    );

    expect(
      screen.getByRole("combobox", { name: /genre/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /provider/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /region/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("From")).toBeInTheDocument();
    expect(screen.getByLabelText("To")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /sort by/i }),
    ).toBeInTheDocument();
  });

  it("should allow selecting a genre", async () => {
    const { user } = await render(
      <MovieDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      { path: "/_layout/movies/discover/_layout" },
    );

    const genreSelect = screen.getByRole("combobox", { name: /genre/i });

    await user.click(genreSelect);
    await user.click(await screen.findByRole("option", { name: "Action" }));

    expect(genreSelect).toHaveTextContent(/Action/);
  });

  it("should reset the genre when reset button is clicked", async () => {
    const { user } = await render(
      <MovieDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      { path: "/_layout/movies/discover/_layout" },
    );

    const genreSelect = screen.getByRole("combobox", { name: /genre/i });
    const resetButton = screen.getByRole("button", { name: /reset genre/i });

    await user.click(genreSelect);
    await user.click(await screen.findByRole("option", { name: "Action" }));

    expect(genreSelect).toHaveTextContent(/Action/);

    await user.click(resetButton);

    expect(genreSelect).toHaveTextContent("Pick a Genre");
  });

  it("should call navigation when filters change", async () => {
    const { user } = await render(
      <MovieDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      { path: "/_layout/movies/discover/_layout" },
    );

    mockNavigate.mockClear();

    const sortSelect = screen.getByRole("combobox", { name: /sort by/i });

    await user.click(sortSelect);
    await user.click(
      await screen.findByRole("option", { name: "Popularity (Low to High)" }),
    );

    expect(mockNavigate).toHaveBeenLastCalledWith({
      search: expect.any(Function),
      to: "/movies/discover",
    });
  });
});
