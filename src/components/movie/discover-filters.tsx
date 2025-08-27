import { valibotResolver } from "@hookform/resolvers/valibot";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { DiscoverSchema } from "@/api/movie/discover.list";

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
  const navigate = useNavigate({ from: "/movies/discover" });

  const { control, handleSubmit, register, resetField } = useForm({
    resolver: valibotResolver(DiscoverSchema),
    values: search,
  });

  const values = useWatch({ control });

  useEffect(() => {
    void navigate({
      search: (prevSearch) => ({ ...prevSearch, ...values }),
      to: "/movies/discover",
    });
  }, [values, navigate]);

  return (
    <form
      className="grid grid-cols-1 gap-4"
      onSubmit={handleSubmit(async (values) => {
        await navigate({
          search: (prevSearch) => ({ ...prevSearch, ...values }),
          to: "/movies/discover",
        });
      })}
    >
      <div className="grid gap-2 md:grid-cols-3">
        <div className="dsy-join">
          <label className="dsy-floating-label w-full">
            <span>Genre</span>
            <select
              {...register("with_genres")}
              className="dsy-select w-full"
              defaultValue=""
            >
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
          <button
            aria-label="Reset Genre"
            className="dsy-btn dsy-join-item dsy-btn-neutral"
            onClick={() => {
              resetField("with_genres", { defaultValue: "" });
            }}
            type="button"
          >
            <span className="icon-[lucide--x]" />
          </button>
        </div>
        <div className="dsy-join">
          <label className="dsy-floating-label w-full">
            <span>Provider</span>
            <select
              defaultValue=""
              {...register("with_watch_providers")}
              className="dsy-select w-full"
            >
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
          <button
            aria-label="Reset Provider"
            className="dsy-btn dsy-join-item dsy-btn-neutral"
            onClick={() => {
              resetField("with_watch_providers", { defaultValue: "" });
            }}
            type="button"
          >
            <span className="icon-[lucide--x]" />
          </button>
        </div>
        <div className="dsy-join">
          <label className="dsy-floating-label w-full">
            <span>Region</span>
            <select {...register("watch_region")} className="dsy-select w-full">
              {regions.map((region) => {
                return (
                  <option key={region.iso_3166_1} value={region.iso_3166_1}>
                    {region.english_name}
                  </option>
                );
              })}
            </select>
          </label>
          <button
            aria-label="Reset Region"
            className="dsy-btn dsy-join-item dsy-btn-neutral"
            onClick={() => {
              resetField("watch_region", { defaultValue: "US" });
            }}
            type="button"
          >
            <span className="icon-[lucide--x]" />
          </button>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        <div className="dsy-join">
          <label className="dsy-floating-label w-full">
            <span>From</span>
            <input
              {...register("primary_release_date_gte")}
              className="dsy-input w-full"
              type="date"
            />
          </label>
          <button
            aria-label="Reset From"
            className="dsy-btn dsy-join-item dsy-btn-neutral"
            onClick={() => {
              resetField("primary_release_date_gte", { defaultValue: "" });
            }}
            type="button"
          >
            <span className="icon-[lucide--x]" />
          </button>
        </div>
        <div className="dsy-join">
          <label className="dsy-floating-label w-full">
            <span>To</span>
            <input
              {...register("primary_release_date_lte")}
              className="dsy-input w-full"
              type="date"
            />
          </label>
          <button
            aria-label="Reset To"
            className="dsy-btn dsy-join-item dsy-btn-neutral"
            onClick={() => {
              resetField("primary_release_date_lte", { defaultValue: "" });
            }}
            type="button"
          >
            <span className="icon-[lucide--x]" />
          </button>
        </div>
        <div className="dsy-join">
          <label className="dsy-floating-label w-full">
            <span>Sort By</span>
            <select {...register("sort_by")} className="dsy-select w-full">
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
          <button
            aria-label="Reset Sort By"
            className="dsy-btn dsy-join-item dsy-btn-neutral"
            onClick={() => {
              resetField("sort_by", { defaultValue: "popularity.desc" });
            }}
            type="button"
          >
            <span className="icon-[lucide--x]" />
          </button>
        </div>
      </div>
    </form>
  );
};
