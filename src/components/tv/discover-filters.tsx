import { valibotResolver } from "@hookform/resolvers/valibot";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DiscoverSchema } from "@/data/tv/discover.list";
import { hasKey } from "@/lib/predicates";

import { DiscoverFilterRow } from "../shared/discover-filter-row";

/** Radix/Base UI Select reserves `""`; use a sentinel for “no filter” so the control stays controlled. */
const FILTER_UNSET = "__filter_unset__";

const tvSortOptions = [
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
  const navigate = useNavigate({ from: "/tv-shows/discover" });

  const { control, handleSubmit, register, resetField } = useForm({
    defaultValues: {
      watch_region: "US",
    },
    resolver: valibotResolver(DiscoverSchema),
    values: search,
  });

  const values = useWatch({ control });

  useEffect(() => {
    void navigate({
      search: (prevSearch) => ({ ...prevSearch, ...values }),
      to: "/tv-shows/discover",
    });
  }, [values, navigate]);

  return (
    <form
      className="grid grid-cols-1 gap-4"
      onSubmit={handleSubmit(async (values) => {
        await navigate({
          search: (prevSearch) => ({ ...prevSearch, ...values }),
          to: "/tv-shows/discover",
        });
      })}
    >
      <div className="grid gap-2 md:grid-cols-3">
        <DiscoverFilterRow
          label="Genre"
          onReset={() => {
            resetField("with_genres", { defaultValue: undefined });
          }}
          resetLabel="Reset Genre"
        >
          {(id) => {
            return (
              <Controller
                control={control}
                name="with_genres"
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={(next) => {
                        field.onChange(
                          next === FILTER_UNSET ? undefined : next,
                        );
                      }}
                      value={field.value ?? FILTER_UNSET}
                    >
                      <SelectTrigger className="w-full" id={id} size="default">
                        <SelectValue placeholder="Pick a Genre">
                          {(value: string) => {
                            if (value === FILTER_UNSET) return "Pick a Genre";

                            const genre = genres.find(
                              (g) => String(g.id) === value,
                            );

                            return genre?.name ?? value;
                          }}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={FILTER_UNSET}>
                          Pick a Genre
                        </SelectItem>
                        {genres.map((genre) => {
                          return (
                            <SelectItem key={genre.id} value={String(genre.id)}>
                              {genre.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            );
          }}
        </DiscoverFilterRow>

        <DiscoverFilterRow
          label="Provider"
          onReset={() => {
            resetField("with_watch_providers", { defaultValue: undefined });
          }}
          resetLabel="Reset Provider"
        >
          {(id) => {
            return (
              <Controller
                control={control}
                name="with_watch_providers"
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={(next) => {
                        field.onChange(
                          next === FILTER_UNSET ? undefined : next,
                        );
                      }}
                      value={field.value ?? FILTER_UNSET}
                    >
                      <SelectTrigger className="w-full" id={id} size="default">
                        <SelectValue placeholder="Pick a Provider">
                          {(value: string) => {
                            if (value === FILTER_UNSET)
                              return "Pick a Provider";

                            const provider = providers.find(
                              (p) => String(p.provider_id) === value,
                            );

                            return provider?.provider_name ?? value;
                          }}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={FILTER_UNSET}>
                          Pick a Provider
                        </SelectItem>
                        {providers
                          .filter(hasKey("provider_id"))
                          .map((provider) => {
                            return (
                              <SelectItem
                                key={provider.provider_id}
                                value={String(provider.provider_id)}
                              >
                                {provider.provider_name}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            );
          }}
        </DiscoverFilterRow>

        <DiscoverFilterRow
          label="Region"
          onReset={() => {
            resetField("watch_region", { defaultValue: "US" });
          }}
          resetLabel="Reset Region"
        >
          {(id) => {
            return (
              <Controller
                control={control}
                name="watch_region"
                render={({ field }) => {
                  return (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full" id={id} size="default">
                        <SelectValue placeholder="Region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions
                          .filter((region) => region.iso_3166_1)
                          .map((region) => {
                            return (
                              <SelectItem
                                key={region.iso_3166_1}
                                value={String(region.iso_3166_1)}
                              >
                                {region.english_name}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            );
          }}
        </DiscoverFilterRow>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        <DiscoverFilterRow
          label="From"
          onReset={() => {
            resetField("first_air_date_gte", { defaultValue: "" });
          }}
          resetLabel="Reset From"
        >
          {(id) => {
            return (
              <Input id={id} type="date" {...register("first_air_date_gte")} />
            );
          }}
        </DiscoverFilterRow>

        <DiscoverFilterRow
          label="To"
          onReset={() => {
            resetField("first_air_date_lte", { defaultValue: "" });
          }}
          resetLabel="Reset To"
        >
          {(id) => {
            return (
              <Input id={id} type="date" {...register("first_air_date_lte")} />
            );
          }}
        </DiscoverFilterRow>

        <DiscoverFilterRow
          label="Sort By"
          onReset={() => {
            resetField("sort_by", { defaultValue: "popularity.desc" });
          }}
          resetLabel="Reset Sort By"
        >
          {(id) => {
            return (
              <Controller
                control={control}
                name="sort_by"
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? "popularity.desc"}
                    >
                      <SelectTrigger className="w-full" id={id} size="default">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        {tvSortOptions.map((sortOption) => {
                          return (
                            <SelectItem
                              key={sortOption.value}
                              value={sortOption.value}
                            >
                              {sortOption.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            );
          }}
        </DiscoverFilterRow>
      </div>
    </form>
  );
};
