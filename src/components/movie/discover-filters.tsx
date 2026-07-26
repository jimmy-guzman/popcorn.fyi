import type * as v from "valibot";

import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import type { DiscoverSchema } from "@/data/movie/discover.list";

import { DiscoverDateField } from "@/components/shared/discover-date-field";
import { DiscoverFilterCombobox } from "@/components/shared/discover-filter-combobox";
import { DiscoverFilterRow } from "@/components/shared/discover-filter-row";

type MovieDiscoverPatch = Partial<v.InferInput<typeof DiscoverSchema>>;
type MovieSortBy = v.InferOutput<typeof DiscoverSchema>["sort_by"];

const sortOptions: { label: string; value: MovieSortBy }[] = [
  { label: "Original Title (A-Z)", value: "original_title.asc" },
  { label: "Original Title (Z-A)", value: "original_title.desc" },
  { label: "Popularity (Low to High)", value: "popularity.asc" },
  { label: "Popularity (High to Low)", value: "popularity.desc" },
  { label: "Revenue (Low to High)", value: "revenue.asc" },
  { label: "Revenue (High to Low)", value: "revenue.desc" },
  { label: "Release Date (Oldest First)", value: "primary_release_date.asc" },
  { label: "Release Date (Newest First)", value: "primary_release_date.desc" },
  { label: "Title (A-Z)", value: "title.asc" },
  { label: "Title (Z-A)", value: "title.desc" },
  { label: "Rating (Low to High)", value: "vote_average.asc" },
  { label: "Rating (High to Low)", value: "vote_average.desc" },
  { label: "Vote Count (Low to High)", value: "vote_count.asc" },
  { label: "Vote Count (High to Low)", value: "vote_count.desc" },
];

interface MovieDiscoverFiltersOptions {
  genres: {
    id: number;
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

export const MovieDiscoverFilters = ({
  genres,
  providers,
  regions,
}: MovieDiscoverFiltersOptions) => {
  const search = useSearch({ from: "/_layout/movies/discover/_layout" });
  const navigate = useNavigate();

  const setFilters = (patch: MovieDiscoverPatch) => {
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

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid gap-2 md:grid-cols-3">
        <DiscoverFilterRow
          label="Genre"
          onReset={() => {
            setFilters({ with_genres: undefined });
          }}
          resetLabel="Reset Genre"
        >
          {(id) => {
            return (
              <DiscoverFilterCombobox
                id={id}
                onChange={(next) => {
                  setFilters({ with_genres: next ?? undefined });
                }}
                options={genreOptions}
                placeholder="Pick a Genre"
                value={search.with_genres ?? null}
              />
            );
          }}
        </DiscoverFilterRow>
        <DiscoverFilterRow
          label="Provider"
          onReset={() => {
            setFilters({ with_watch_providers: undefined });
          }}
          resetLabel="Reset Provider"
        >
          {(id) => {
            return (
              <DiscoverFilterCombobox
                id={id}
                onChange={(next) => {
                  setFilters({ with_watch_providers: next ?? undefined });
                }}
                options={providerOptions}
                placeholder="Pick a Provider"
                value={search.with_watch_providers ?? null}
              />
            );
          }}
        </DiscoverFilterRow>
        <DiscoverFilterRow
          label="Region"
          onReset={() => {
            setFilters({ watch_region: undefined });
          }}
          resetLabel="Reset Region"
        >
          {(id) => {
            return (
              <DiscoverFilterCombobox
                id={id}
                onChange={(next) => {
                  setFilters({ watch_region: next ?? undefined });
                }}
                options={regionOptions}
                placeholder="Region"
                value={search.watch_region}
              />
            );
          }}
        </DiscoverFilterRow>
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        <DiscoverFilterRow
          label="From"
          onReset={() => {
            setFilters({ primary_release_date_gte: undefined });
          }}
          resetLabel="Reset From"
        >
          {(id) => {
            return (
              <DiscoverDateField
                id={id}
                onChange={(next) => {
                  setFilters({ primary_release_date_gte: next });
                }}
                placeholder="Pick a start date"
                value={search.primary_release_date_gte}
              />
            );
          }}
        </DiscoverFilterRow>
        <DiscoverFilterRow
          label="To"
          onReset={() => {
            setFilters({ primary_release_date_lte: undefined });
          }}
          resetLabel="Reset To"
        >
          {(id) => {
            return (
              <DiscoverDateField
                id={id}
                onChange={(next) => {
                  setFilters({ primary_release_date_lte: next });
                }}
                placeholder="Pick an end date"
                value={search.primary_release_date_lte}
              />
            );
          }}
        </DiscoverFilterRow>
        <DiscoverFilterRow
          label="Sort By"
          onReset={() => {
            setFilters({ sort_by: undefined });
          }}
          resetLabel="Reset Sort By"
        >
          {(id) => {
            return (
              <DiscoverFilterCombobox
                id={id}
                onChange={(next) => {
                  setFilters({ sort_by: next ?? undefined });
                }}
                options={sortOptions}
                placeholder="Sort by"
                value={search.sort_by}
              />
            );
          }}
        </DiscoverFilterRow>
      </div>
    </div>
  );
};
