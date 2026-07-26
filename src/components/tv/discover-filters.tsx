import type * as v from "valibot";

import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import type { DiscoverSchema } from "@/data/tv/discover.list";

import { DiscoverDateField } from "@/components/shared/discover-date-field";
import { DiscoverFilterCombobox } from "@/components/shared/discover-filter-combobox";
import { DiscoverFilterRow } from "@/components/shared/discover-filter-row";
import { hasKey } from "@/lib/predicates";

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

interface TvDiscoverFiltersOptions {
  genres: { id: number; name?: string }[];
  providers: { provider_id?: number; provider_name?: string }[];
  regions: { english_name?: string; iso_3166_1?: string }[];
}

export const TvDiscoverFilters = ({
  genres,
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

  const providerOptions = useMemo(() => {
    return providers.filter(hasKey("provider_id")).map((provider) => {
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
            setFilters({ first_air_date_gte: undefined });
          }}
          resetLabel="Reset From"
        >
          {(id) => {
            return (
              <DiscoverDateField
                id={id}
                onChange={(next) => {
                  setFilters({ first_air_date_gte: next });
                }}
                placeholder="Pick a start date"
                value={search.first_air_date_gte}
              />
            );
          }}
        </DiscoverFilterRow>
        <DiscoverFilterRow
          label="To"
          onReset={() => {
            setFilters({ first_air_date_lte: undefined });
          }}
          resetLabel="Reset To"
        >
          {(id) => {
            return (
              <DiscoverDateField
                id={id}
                onChange={(next) => {
                  setFilters({ first_air_date_lte: next });
                }}
                placeholder="Pick an end date"
                value={search.first_air_date_lte}
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
