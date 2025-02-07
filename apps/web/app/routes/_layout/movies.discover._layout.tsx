import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { MovieDiscoverFilters } from "@/components/movie-discover-filters";
import { Prose } from "@/components/prose";
import { discoverMoviesSortOptions } from "@/config/options";
import { site } from "@/config/site";
import {
  DiscoverSchema,
  movieGenresOptions,
  movieProvidersOptions,
} from "@/lib/movies";
import { providerRegionsOptions } from "@/lib/providers";

export const Route = createFileRoute("/_layout/movies/discover/_layout")({
  component: RouteComponent,
  validateSearch: DiscoverSchema,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(movieGenresOptions()),
      context.queryClient.ensureQueryData(movieProvidersOptions()),
      context.queryClient.ensureQueryData(providerRegionsOptions()),
    ]);
  },
});

function RouteComponent() {
  const { data: genres } = useSuspenseQuery(movieGenresOptions());
  const { data: providers } = useSuspenseQuery(movieProvidersOptions());
  const { data: regions } = useSuspenseQuery(providerRegionsOptions());

  return (
    <div className="flex flex-col gap-8">
      <Prose>
        <h1>{site.pages.discoverMovies.title}</h1>
        <p>{site.pages.discoverMovies.description}</p>
      </Prose>
      <MovieDiscoverFilters
        genres={genres}
        providers={providers}
        regions={regions}
        sortOptions={discoverMoviesSortOptions}
      />
      <Outlet />
    </div>
  );
}
