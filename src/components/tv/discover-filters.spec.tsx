import { DiscoverSchema } from "@/data/tv/discover.list";
import { render, screen, waitFor } from "@/testing/utils";

import { TvDiscoverFilters } from "./discover-filters";

const mockGenres = [{ id: 1, name: "Drama" }];
const mockProviders = [{ provider_id: 2, provider_name: "Netflix" }];
const mockRegions = [{ english_name: "United States", iso_3166_1: "US" }];

const discoverRenderOptions = {
  path: "/_layout/tv-shows/discover/_layout" as const,
  validateSearch: DiscoverSchema,
};

describe("TvDiscoverFilters", () => {
  it("should render all filters correctly", async () => {
    await render(
      <TvDiscoverFilters
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

  it("should reset selected genre", async () => {
    const { user } = await render(
      <TvDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      discoverRenderOptions,
    );

    const genreSelect = screen.getByRole("combobox", { name: /genre/i });

    await user.click(genreSelect);
    await user.click(await screen.findByRole("option", { name: "Drama" }));

    await waitFor(() => {
      expect(genreSelect).toHaveValue("Drama");
    });

    await user.click(screen.getByRole("button", { name: /reset genre/i }));

    await waitFor(() => {
      expect(screen.getByRole("combobox", { name: /genre/i })).toHaveValue("");
    });
  });

  it("should hydrate and keep selected values visible from URL search", async () => {
    await render(
      <TvDiscoverFilters
        genres={mockGenres}
        providers={mockProviders}
        regions={mockRegions}
      />,
      {
        ...discoverRenderOptions,
        initialEntries: [
          '/_layout/tv-shows/discover/_layout?sort_by=popularity.asc&with_genres="1"&watch_region=US',
        ],
      },
    );

    await waitFor(() => {
      expect(screen.getByRole("combobox", { name: /genre/i })).toHaveValue(
        "Drama",
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
