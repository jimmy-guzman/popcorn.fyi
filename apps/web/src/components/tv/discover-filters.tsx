import { valibotResolver } from "@hookform/resolvers/valibot";
import { Input } from "@popcorn.fyi/ui/input";
import { Select } from "@popcorn.fyi/ui/select";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { DiscoverSchema } from "@/api/tv/discover.list";

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
  providers: { provider_id: number; provider_name?: string }[];
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
        <div className="dsy-join">
          <label className="dsy-floating-label w-full">
            <span>Genre</span>
            <Select
              {...register("with_genres")}
              className="w-full"
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
            </Select>
          </label>
          <button
            aria-label="Reset Genre"
            className="dsy-btn dsy-btn-neutral dsy-join-item"
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
            <Select
              {...register("with_watch_providers")}
              className="w-full"
              defaultValue=""
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
            </Select>
          </label>
          <button
            aria-label="Reset Provider"
            className="dsy-btn dsy-btn-neutral dsy-join-item"
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
            <Select {...register("watch_region")} className="w-full">
              {regions.map((region) => {
                return (
                  <option key={region.iso_3166_1} value={region.iso_3166_1}>
                    {region.english_name}
                  </option>
                );
              })}
            </Select>
          </label>
          <button
            aria-label="Reset Region"
            className="dsy-btn dsy-btn-neutral dsy-join-item"
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
            <Input
              {...register("first_air_date_gte")}
              className="w-full"
              type="date"
            />
          </label>
          <button
            aria-label="Reset From"
            className="dsy-btn dsy-btn-neutral dsy-join-item"
            onClick={() => {
              resetField("first_air_date_gte", { defaultValue: "" });
            }}
            type="button"
          >
            <span className="icon-[lucide--x]" />
          </button>
        </div>

        <div className="dsy-join">
          <label className="dsy-floating-label w-full">
            <span>To</span>
            <Input
              {...register("first_air_date_lte")}
              className="w-full"
              type="date"
            />
          </label>
          <button
            aria-label="Reset To"
            className="dsy-btn dsy-btn-neutral dsy-join-item"
            onClick={() => {
              resetField("first_air_date_lte", { defaultValue: "" });
            }}
            type="button"
          >
            <span className="icon-[lucide--x]" />
          </button>
        </div>

        <div className="dsy-join">
          <label className="dsy-floating-label w-full">
            <span>Sort By</span>
            <Select {...register("sort_by")} className="w-full">
              <option value="" />
              {tvSortOptions.map((sortOption) => {
                return (
                  <option key={sortOption.value} value={sortOption.value}>
                    {sortOption.label}
                  </option>
                );
              })}
            </Select>
          </label>
          <button
            aria-label="Reset Sort By"
            className="dsy-btn dsy-btn-neutral dsy-join-item"
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
