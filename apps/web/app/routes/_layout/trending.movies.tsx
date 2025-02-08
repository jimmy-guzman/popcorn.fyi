import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieList } from "@/components/movie/movie-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { trendingMoviesOptions } from "@/lib/trending";

export const Route = createFileRoute("/_layout/trending/movies")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        description: site.pages.trending.movies.description,
        title: `${site.pages.trending.movies.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(trendingMoviesOptions());
  },
});

function RouteComponent() {
  const { data: movies } = useSuspenseQuery(trendingMoviesOptions());

  return (
    <MovieList
      description={site.pages.trending.movies.description}
      movies={movies.results ?? []}
      title={site.pages.trending.movies.title}
    />
  );
}
