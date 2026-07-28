import type * as v from "valibot";

import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import type { ActiveFilter } from "@/components/shared/discover-active-filters";
import type { DiscoverSchema } from "@/data/tv/discover.list";

import { DiscoverActiveFilters } from "@/components/shared/discover-active-filters";
import { DiscoverDateField } from "@/components/shared/discover-date-field";
import { DiscoverFilterCombobox } from "@/components/shared/discover-filter-combobox";
import { DiscoverFiltersPanel } from "@/components/shared/discover-filters-panel";
import { Field, FieldLabel } from "@/components/ui/field";

type TvDiscoverPatch = Partial<v.InferInput<typeof DiscoverSchema>>;
type TvSortBy = v.InferOutput<typeof DiscoverSchema>["sort_by"];

const sortOptions: { label: string; value: TvSortBy }[] = [
  { label: "Original Name (A-Z)", value: "original_name.asc" },
  { label: "Original Name (Z-A)", value: "original_name.desc" },
  { label: "Popularity (Low to High)", value: "popularity.asc" },
  { label: "Popularity (High to Low)", value: "popularity.desc" },
  { label: "First Air Date (Oldest First)", value: "first_air_date.asc" },
  { label: "First Air Date (Newest First)", value: "first_air_date.desc" },
  { label: "Name (A-Z)", value: "name.asc" },
  { label: "Name (Z-A)", value: "name.desc" },
  { label: "Rating (Low to High)", value: "vote_average.asc" },
  { label: "Rating (High to Low)", value: "vote_average.desc" },
  { label: "Vote Count (Low to High)", value: "vote_count.asc" },
  { label: "Vote Count (High to Low)", value: "vote_count.desc" },
];

const labelFor = (
  options: { label: string; value: string }[],
  value: string | undefined,
) => {
  return (
    options.find((option) => {
      return option.value === value;
    })?.label ?? value
  );
};

interface TvDiscoverFiltersOptions {
  genres: {
    id: number;
    name?: string | undefined;
  }[];
  languages: {
    english_name?: string | undefined;
    iso_639_1?: string | undefined;
    name?: string | undefined;
  }[];
  providers: {
    display_priorities?: Record<string, number> | undefined;
    display_priority?: number;
    logo_path?: string | undefined;
    provider_id?: number;
    provider_name?: string | undefined;
  }[];
  regions: {
    english_name?: string | undefined;
    iso_3166_1?: string | undefined;
    native_name?: string | undefined;
  }[];
}

export const TvDiscoverFilters = ({
  genres,
  languages,
  providers,
  regions,
}: TvDiscoverFiltersOptions) => {
  const search = useSearch({ from: "/_layout/tv-shows/discover/_layout" });
  const navigate = useNavigate();

  const setFilters = (patch: TvDiscoverPatch) => {
    void navigate({
      search: (prev) => {
        return { ...prev, ...patch, page: undefined };
      },
      to: ".",
    });
  };

  const genreOptions = useMemo(() => {
    return genres.map((genre) => {
      return { label: genre.name ?? String(genre.id), value: String(genre.id) };
    });
  }, [genres]);

  const languageOptions = useMemo(() => {
    return languages
      .filter((language) => {
        return language.iso_639_1 !== undefined;
      })
      .map((language) => {
        return {
          label: language.english_name ?? String(language.iso_639_1),
          value: String(language.iso_639_1),
        };
      });
  }, [languages]);

  const providerOptions = useMemo(() => {
    return providers
      .filter((provider) => {
        return provider.provider_id !== undefined;
      })
      .map((provider) => {
        return {
          label: provider.provider_name ?? String(provider.provider_id),
          value: String(provider.provider_id),
        };
      });
  }, [providers]);

  const regionOptions = useMemo(() => {
    return regions
      .filter((region) => {
        return region.iso_3166_1 !== undefined;
      })
      .map((region) => {
        return {
          label: region.english_name ?? String(region.iso_3166_1),
          value: String(region.iso_3166_1),
        };
      });
  }, [regions]);

  const activeFilters: ActiveFilter[] = [];

  if (search.with_genres) {
    activeFilters.push({
      key: "with_genres",
      label: "Genre",
      onClear: () => {
        setFilters({ with_genres: undefined });
      },
      value: labelFor(genreOptions, search.with_genres) ?? "",
    });
  }

  if (search.with_original_language) {
    activeFilters.push({
      key: "with_original_language",
      label: "Language",
      onClear: () => {
        setFilters({ with_original_language: undefined });
      },
      value: labelFor(languageOptions, search.with_original_language) ?? "",
    });
  }

  if (search.with_watch_providers) {
    activeFilters.push({
      key: "with_watch_providers",
      label: "Provider",
      onClear: () => {
        setFilters({ with_watch_providers: undefined });
      },
      value: labelFor(providerOptions, search.with_watch_providers) ?? "",
    });
  }

  if (search.first_air_date_gte) {
    activeFilters.push({
      key: "first_air_date_gte",
      label: "From",
      onClear: () => {
        setFilters({ first_air_date_gte: undefined });
      },
      value: search.first_air_date_gte,
    });
  }

  if (search.first_air_date_lte) {
    activeFilters.push({
      key: "first_air_date_lte",
      label: "To",
      onClear: () => {
        setFilters({ first_air_date_lte: undefined });
      },
      value: search.first_air_date_lte,
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DiscoverFiltersPanel activeCount={activeFilters.length}>
        <Field>
          <FieldLabel htmlFor="discover-genre">Genre</FieldLabel>
          <DiscoverFilterCombobox
            id="discover-genre"
            onChange={(next) => {
              setFilters({ with_genres: next ?? undefined });
            }}
            options={genreOptions}
            placeholder="Pick a Genre"
            value={search.with_genres ?? null}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="discover-language">Language</FieldLabel>
          <DiscoverFilterCombobox
            id="discover-language"
            onChange={(next) => {
              setFilters({ with_original_language: next ?? undefined });
            }}
            options={languageOptions}
            placeholder="Pick a Language"
            value={search.with_original_language ?? null}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="discover-provider">Provider</FieldLabel>
          <DiscoverFilterCombobox
            id="discover-provider"
            onChange={(next) => {
              setFilters({ with_watch_providers: next ?? undefined });
            }}
            options={providerOptions}
            placeholder="Pick a Provider"
            value={search.with_watch_providers ?? null}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="discover-region">Region</FieldLabel>
          <DiscoverFilterCombobox
            id="discover-region"
            onChange={(next) => {
              setFilters({ watch_region: next ?? undefined });
            }}
            options={regionOptions}
            placeholder="Region"
            value={search.watch_region}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="discover-from">From</FieldLabel>
          <DiscoverDateField
            id="discover-from"
            onChange={(next) => {
              setFilters({ first_air_date_gte: next });
            }}
            placeholder="Pick a start date"
            value={search.first_air_date_gte}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="discover-to">To</FieldLabel>
          <DiscoverDateField
            id="discover-to"
            onChange={(next) => {
              setFilters({ first_air_date_lte: next });
            }}
            placeholder="Pick an end date"
            value={search.first_air_date_lte}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="discover-sort">Sort By</FieldLabel>
          <DiscoverFilterCombobox
            id="discover-sort"
            onChange={(next) => {
              setFilters({ sort_by: next ?? undefined });
            }}
            options={sortOptions}
            placeholder="Sort by"
            value={search.sort_by}
          />
        </Field>
      </DiscoverFiltersPanel>
      <DiscoverActiveFilters
        filters={activeFilters}
        onClearAll={() => {
          setFilters({
            first_air_date_gte: undefined,
            first_air_date_lte: undefined,
            with_genres: undefined,
            with_original_language: undefined,
            with_watch_providers: undefined,
          });
        }}
      />
    </div>
  );
};
