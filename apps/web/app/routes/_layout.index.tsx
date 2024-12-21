import { random } from "@popcorn.fyi/utils";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieHero } from "@/components/movie-hero";
import { TvShowHero } from "@/components/tv-show-hero";
import { trendingMoviesOptions, trendingTVOptions } from "@/lib/trending";

function Home() {
  const { movie, tvShow } = useSuspenseQueries({
    combine: ([{ data: tvShows }, { data: movies }]) => {
      return {
        // TODO: fix Text content does not match server-rendered HTML.
        movie: movies?.results?.[random(0, movies.results.length)],
        // TODO: Text content does not match server-rendered HTML.
        tvShow: tvShows?.results?.[random(0, tvShows.results.length)],
      };
    },
    queries: [trendingTVOptions(), trendingMoviesOptions()],
  });

  return movie && random(0, 1) === 0 ? (
    <MovieHero movie={movie} />
  ) : tvShow ? (
    <TvShowHero tvShow={tvShow} />
  ) : null;
}

export const Route = createFileRoute("/_layout/")({
  component: Home,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(trendingMoviesOptions());
    await context.queryClient.ensureQueryData(trendingTVOptions());
  },
});
