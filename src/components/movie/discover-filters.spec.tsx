import { DiscoverSchema } from "@/data/movie/discover.list";
import { render, screen, waitFor } from "@/testing/utils";

import { MovieDiscoverFilters } from "./discover-filters";

const mockGenres = [{ id: 1, name: "Action" }];
const mockProviders = [
  { display_priority: 1, provider_id: 2, provider_name: "Netflix" },
];
const mockRegions = [{ english_name: "United States", iso_3166_1: "US" }];

const discoverRenderOptions = {
  path: "/_layout/movies/discover/_layout" as const,
  validateSearch: DiscoverSchema,
};

describe("MovieDiscoverFilters", () => {
  it("should renders all filters correctly", async () => {
    await render(
      <MovieDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      discoverRenderOptions,
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
      discoverRenderOptions,
    );

    const genreSelect = screen.getByRole("combobox", { name: /genre/i });

    await user.click(genreSelect);
    await user.click(await screen.findByRole("option", { name: "Action" }));

    await waitFor(() => {
      expect(genreSelect).toHaveValue("Action");
    });
  });

  it("should reset the genre when reset button is clicked", async () => {
    const { user } = await render(
      <MovieDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      discoverRenderOptions,
    );

    const genreSelect = screen.getByRole("combobox", { name: /genre/i });

    await user.click(genreSelect);
    await user.click(await screen.findByRole("option", { name: "Action" }));

    await waitFor(() => {
      expect(genreSelect).toHaveValue("Action");
    });

    await user.click(screen.getByRole("button", { name: /reset genre/i }));

    await waitFor(() => {
      expect(screen.getByRole("combobox", { name: /genre/i })).toHaveValue("");
    });
  });

  it("should update sort when a different option is chosen", async () => {
    const { user } = await render(
      <MovieDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      discoverRenderOptions,
    );

    const sortSelect = screen.getByRole("combobox", { name: /sort by/i });

    await user.click(sortSelect);
    await user.click(
      await screen.findByRole("option", { name: "Popularity (Low to High)" }),
    );

    await waitFor(() => {
      expect(sortSelect).toHaveValue("Popularity (Low to High)");
    });
  });

  it("should hydrate and keep selected values visible from URL search", async () => {
    await render(
      <MovieDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      {
        ...discoverRenderOptions,
        initialEntries: [
          '/_layout/movies/discover/_layout?sort_by=popularity.asc&with_genres="1"&watch_region=US',
        ],
      },
    );

    await waitFor(() => {
      expect(screen.getByRole("combobox", { name: /genre/i })).toHaveValue(
        "Action",
      );
      expect(screen.getByRole("combobox", { name: /sort by/i })).toHaveValue(
        "Popularity (Low to High)",
      );
      expect(screen.getByRole("combobox", { name: /region/i })).toHaveValue(
        "United States",
      );
    });
  });
});
