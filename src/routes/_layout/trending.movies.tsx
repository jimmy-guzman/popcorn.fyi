import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieList } from "@/components/movie/movie-list";
import { site } from "@/config/site";
import { trendingMoviesOptions } from "@/data/movie/trending.list";
import { orEmpty } from "@/lib/array";
import { hasId } from "@/lib/predicates";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/trending/movies")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(trendingMoviesOptions());
  },
  head: () => {
    return {
      meta: seo({
        description: site.pages.trending.movies.description,
        title: `${site.pages.trending.movies.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const { data: movies } = useSuspenseQuery(trendingMoviesOptions());

  return (
    <MovieList
      description={site.pages.trending.movies.description}
      movies={orEmpty(movies.results).filter(hasId)}
      title={site.pages.trending.movies.title}
    />
  );
}
