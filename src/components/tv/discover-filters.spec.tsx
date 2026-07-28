import { DiscoverSchema } from "@/data/tv/discover.list";
import { render, screen, waitFor } from "@/testing/utils";

import { TvDiscoverFilters } from "./discover-filters";

const mockGenres = [{ id: 1, name: "Drama" }];
const mockLanguages = [{ english_name: "English", iso_639_1: "en" }];
const mockProviders = [{ provider_id: 2, provider_name: "Netflix" }];
const mockRegions = [{ english_name: "United States", iso_3166_1: "US" }];

const discoverRenderOptions = {
  path: "/_layout/tv-shows/discover/_layout" as const,
  validateSearch: DiscoverSchema,
};

const filters = (
  <TvDiscoverFilters
    genres={mockGenres}
    languages={mockLanguages}
    providers={mockProviders}
    regions={mockRegions}
  />
);

/** Filters live behind a trigger, so every case opens the panel first. */
const openFilters = async (user: { click: (el: Element) => Promise<void> }) => {
  await user.click(screen.getByRole("button", { name: /filters/i }));
};

describe("TvDiscoverFilters", () => {
  it("should render all filters correctly", async () => {
    const { user } = await render(filters, discoverRenderOptions);

    await openFilters(user);

    await expect(
      screen.findByRole("combobox", { name: /genre/i }),
    ).resolves.toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /language/i }),
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
    const { user } = await render(filters, discoverRenderOptions);

    await openFilters(user);

    const genreSelect = await screen.findByRole("combobox", { name: /genre/i });

    await user.click(genreSelect);
    await user.click(await screen.findByRole("option", { name: "Drama" }));

    await waitFor(() => {
      expect(genreSelect).toHaveValue("Drama");
    });
  });

  it("should clear a filter from its active chip", async () => {
    const { user } = await render(filters, {
      ...discoverRenderOptions,
      initialEntries: [
        '/_layout/tv-shows/discover/_layout?with_genres="1"&watch_region=US',
      ],
    });

    await user.click(
      await screen.findByRole("button", { name: /clear genre/i }),
    );

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /clear genre/i }),
      ).not.toBeInTheDocument();
    });
  });

  it("should hydrate and keep selected values visible from URL search", async () => {
    const { user } = await render(filters, {
      ...discoverRenderOptions,
      initialEntries: [
        '/_layout/tv-shows/discover/_layout?sort_by=popularity.asc&with_genres="1"&watch_region=US',
      ],
    });

    await openFilters(user);

    await waitFor(async () => {
      await expect(
        screen.findByRole("combobox", { name: /genre/i }),
      ).resolves.toHaveValue("Drama");
      expect(screen.getByRole("combobox", { name: /sort by/i })).toHaveValue(
        "Popularity (Low to High)",
      );
      expect(screen.getByRole("combobox", { name: /region/i })).toHaveValue(
        "United States",
      );
    });
  });
});
