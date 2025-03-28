import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { DiscoverSchema } from "@/api/movie/discover.list";
import { movieGenresOptions } from "@/api/movie/genres.list";
import { movieProvidersOptions } from "@/api/movie/providers.list";
import { regionsOptions } from "@/api/regions.list";
import { MovieDiscoverFilters } from "@/components/movie/discover-filters";
import { Prose } from "@/components/shared/prose";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/movies/discover/_layout")({
  component: RouteComponent,
  validateSearch: DiscoverSchema,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(movieGenresOptions()),
      context.queryClient.ensureQueryData(movieProvidersOptions()),
      context.queryClient.ensureQueryData(regionsOptions()),
    ]);
  },
  head: () => {
    return {
      meta: seo({
        description: site.pages.discover.movies.description,
        title: `${site.pages.discover.movies.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const { data: genres } = useSuspenseQuery(movieGenresOptions());
  const { data: providers } = useSuspenseQuery(movieProvidersOptions());
  const { data: regions } = useSuspenseQuery(regionsOptions());

  return (
    <div className="flex flex-col gap-4">
      <Prose>
        <h1>{site.pages.discover.movies.title}</h1>
        <p>{site.pages.discover.movies.description}</p>
      </Prose>
      <MovieDiscoverFilters
        genres={genres}
        providers={providers}
        regions={regions}
      />
      <Outlet />
    </div>
  );
}
