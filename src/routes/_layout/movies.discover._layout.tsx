import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { MovieDiscoverFilters } from "@/components/movie/discover-filters";
import { Prose } from "@/components/shared/prose";
import { site } from "@/config/site";
import { languagesOptions } from "@/data/languages.list";
import { DiscoverSchema } from "@/data/movie/discover.list";
import { movieGenresOptions } from "@/data/movie/genres.list";
import { movieProvidersOptions } from "@/data/movie/providers.list";
import { regionsOptions } from "@/data/regions.list";
import { hasId } from "@/lib/predicates";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/movies/discover/_layout")({
  component: RouteComponent,
  validateSearch: DiscoverSchema,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(movieGenresOptions()),
      context.queryClient.ensureQueryData(movieProvidersOptions()),
      context.queryClient.ensureQueryData(regionsOptions()),
      context.queryClient.ensureQueryData(languagesOptions()),
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
  const { data: languages } = useSuspenseQuery(languagesOptions());

  return (
    <div className="flex flex-col gap-4">
      <Prose>
        <h1>{site.pages.discover.movies.title}</h1>
        <p>{site.pages.discover.movies.description}</p>
      </Prose>
      <MovieDiscoverFilters
        genres={genres.filter(hasId)}
        languages={languages}
        providers={providers}
        regions={regions}
      />
      <Outlet />
    </div>
  );
}
