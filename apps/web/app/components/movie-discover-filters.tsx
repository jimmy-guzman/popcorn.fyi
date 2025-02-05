import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "@popcorn.fyi/ui/button";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { DiscoverSchema } from "@/lib/movies";

const sortOptions = [
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
    display_priority: number;
    logo_path?: string | undefined;
    provider_id: number;
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

  const { control, handleSubmit, register, resetField } = useForm({
    resolver: valibotResolver(DiscoverSchema),
    values: search,
  });

  const values = useWatch({ control });

  useEffect(() => {
    void navigate({
      search: (prevSearch) => {
        return { ...prevSearch, ...values };
      },
      to: "/movies/discover",
    });
  }, [values, navigate]);

  return (
    <form
      className="grid grid-cols-1 gap-4"
      onSubmit={handleSubmit(async (values) => {
        await navigate({
          search: (prevSearch) => {
            return { ...prevSearch, ...values };
          },
          to: "/movies/discover",
        });
      })}
    >
      <div className="grid gap-2 md:grid-cols-3">
        <div className="dsy-join">
          <label className="dsy-select dsy-join-item w-full">
            <span className="dsy-label">Genre</span>
            <select {...register("with_genres")} defaultValue="">
              <option disabled value="">
                Pick a Genre
              </option>
              {genres.map((genre) => {
                return (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </label>
          <Button
            aria-label="Reset Genre"
            className="dsy-join-item"
            color="neutral"
            onClick={() => {
              resetField("with_genres", { defaultValue: "" });
            }}
          >
            <span className="icon-[lucide--x]" />
          </Button>
        </div>
        <div className="dsy-join">
          <label className="dsy-select dsy-join-item w-full">
            <span className="dsy-label">Provider</span>
            <select defaultValue="" {...register("with_watch_providers")}>
              <option disabled value="">
                Pick a Provider
              </option>
              {providers.map((provider) => {
                return (
                  <option
                    key={provider.provider_id}
                    value={provider.provider_id}
                  >
                    {provider.provider_name}
                  </option>
                );
              })}
            </select>
          </label>
          <Button
            aria-label="Reset Provider"
            className="dsy-join-item"
            color="neutral"
            onClick={() => {
              resetField("with_watch_providers", { defaultValue: "" });
            }}
          >
            <span className="icon-[lucide--x]" />
          </Button>
        </div>
        <div className="dsy-join">
          <label className="dsy-select dsy-join-item w-full">
            <span className="dsy-label">Region</span>
            <select className="dsy-select" {...register("watch_region")}>
              {regions.map((region) => {
                return (
                  <option key={region.iso_3166_1} value={region.iso_3166_1}>
                    {region.english_name}
                  </option>
                );
              })}
            </select>
          </label>
          <Button
            aria-label="Reset Region"
            className="dsy-join-item"
            color="neutral"
            onClick={() => {
              resetField("watch_region", { defaultValue: "US" });
            }}
          >
            <span className="icon-[lucide--x]" />
          </Button>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        <div className="dsy-join">
          <label className="dsy-input dsy-join-item w-full">
            <span className="dsy-label">From</span>
            <input {...register("primary_release_date_gte")} type="date" />
          </label>
          <Button
            aria-label="Reset From"
            className="dsy-join-item"
            color="neutral"
            onClick={() => {
              resetField("primary_release_date_gte", { defaultValue: "" });
            }}
          >
            <span className="icon-[lucide--x]" />
          </Button>
        </div>
        <div className="dsy-join">
          <label className="dsy-input dsy-join-item w-full">
            <span className="dsy-label">To</span>
            <input {...register("primary_release_date_lte")} type="date" />
          </label>
          <Button
            aria-label="Reset To"
            className="dsy-join-item"
            color="neutral"
            onClick={() => {
              resetField("primary_release_date_lte", { defaultValue: "" });
            }}
          >
            <span className="icon-[lucide--x]" />
          </Button>
        </div>
        <div className="dsy-join">
          <label className="dsy-select dsy-join-item w-full">
            <span className="dsy-label">Sort By</span>
            <select {...register("sort_by")}>
              <option value="" />
              {sortOptions.map((sortOption) => {
                return (
                  <option key={sortOption.value} value={sortOption.value}>
                    {sortOption.label}
                  </option>
                );
              })}
            </select>
          </label>
          <Button
            aria-label="Reset Sort By"
            className="dsy-join-item"
            color="neutral"
            onClick={() => {
              resetField("sort_by", { defaultValue: "popularity.desc" });
            }}
          >
            <span className="icon-[lucide--x]" />
          </Button>
        </div>
      </div>
    </form>
  );
};
