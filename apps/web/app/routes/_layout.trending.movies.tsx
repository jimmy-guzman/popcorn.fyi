import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieList } from "@/components/movie-list";
import { trendingMovies } from "@/config/lists";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { trendingMoviesOptions } from "@/lib/trending";

export const Route = createFileRoute("/_layout/trending/movies")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${trendingMovies.title} | ${site.title}`,
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
    <div className="p-8">
      <MovieList
        description={trendingMovies.description}
        movies={movies?.results ?? []}
        title={trendingMovies.title}
      />
    </div>
  );
}
