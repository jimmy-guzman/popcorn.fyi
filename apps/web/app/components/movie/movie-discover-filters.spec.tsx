import { describe, expect, it, vi } from "vitest";

import { render, screen } from "@/testing/utils";

import { MovieDiscoverFilters } from "./movie-discover-filters";

const mockNavigate = vi.fn();
vi.mock("@tanstack/react-router", async () => {
  return {
    ...(await vi.importActual("@tanstack/react-router")),
    useNavigate: vi.fn(() => {
      return mockNavigate;
    }),
    useSearch: vi.fn(() => {
      return {};
    }),
  };
});

const mockGenres = [{ id: 1, name: "Action" }];
const mockProviders = [
  { display_priority: 1, provider_id: 2, provider_name: "Netflix" },
];
const mockRegions = [{ english_name: "United States", iso_3166_1: "US" }];

describe("MovieDiscoverFilters", () => {
  it("renders all filters correctly", async () => {
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

  it("allows selecting a genre", async () => {
    const { user } = await render(
      <MovieDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      { path: "/_layout/movies/discover/_layout" },
    );

    const genreSelect = screen.getByRole("combobox", { name: /genre/i });

    await user.selectOptions(genreSelect, "1");

    expect(genreSelect).toHaveValue("1");
  });

  it("resets the genre when reset button is clicked", async () => {
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

    await user.selectOptions(genreSelect, "1");
    expect(genreSelect).toHaveValue("1");

    await user.click(resetButton);
    expect(genreSelect).toHaveValue("");
  });

  it("calls navigation when filters change", async () => {
    const { user } = await render(
      <MovieDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      { path: "/_layout/movies/discover/_layout" },
    );

    const sortSelect = screen.getByRole("combobox", { name: /sort by/i });
    await user.selectOptions(sortSelect, "popularity.asc");

    expect(mockNavigate).toHaveBeenCalledWith({
      search: expect.any(Function),
      to: "/movies/discover",
    });
  });
});
