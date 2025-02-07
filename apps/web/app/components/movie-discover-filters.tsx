import type * as v from "valibot";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "@popcorn.fyi/ui/button";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { DiscoverSchema } from "@/lib/movies";

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
  sortOptions: readonly { label: string; value: string }[];
}

export const MovieDiscoverFilters = ({
  genres,
  providers,
  regions,
  sortOptions,
}: MovieDiscoverFiltersOptions) => {
  const search = useSearch({ from: "/_layout/movies/discover/_layout" });
  const navigate = useNavigate();

  const { control, handleSubmit, register, resetField } = useForm({
    resolver: valibotResolver(DiscoverSchema),
    values: search,
  });

  const values = useWatch({ control });

  useEffect(() => {
    const debouncedNavigate = setTimeout(() => {
      if (JSON.stringify(values) !== JSON.stringify(search)) {
        void navigate({
          search: (prevSearch) => {
            return { ...prevSearch, ...values };
          },
          to: "/movies/discover",
        });
      }
    }, 200);

    return () => {
      clearTimeout(debouncedNavigate);
    };
  }, [values, navigate, search]);

  const handleReset = (
    field: keyof v.InferInput<typeof DiscoverSchema>,
    defaultValue = "",
  ) => {
    resetField(field, { defaultValue });
  };

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
              handleReset("with_genres");
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
              handleReset("with_watch_providers");
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
              handleReset("watch_region", "US");
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
              handleReset("primary_release_date_gte");
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
              handleReset("primary_release_date_lte");
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
              handleReset("sort_by", "popularity.desc");
            }}
          >
            <span className="icon-[lucide--x]" />
          </Button>
        </div>
      </div>
    </form>
  );
};
