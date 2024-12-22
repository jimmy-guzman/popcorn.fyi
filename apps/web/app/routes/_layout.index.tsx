import { random } from "@popcorn.fyi/utils";
import { useSuspenseQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieHero } from "@/components/movie-hero";
import { TvShowHero } from "@/components/tv-show-hero";
import { trendingMoviesOptions, trendingTVOptions } from "@/lib/trending";

export const Route = createFileRoute("/_layout/")({
  component: Home,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(trendingMoviesOptions()),
      context.queryClient.ensureQueryData(trendingTVOptions()),
    ]);

    return [random(0, 1), random(0, 19)];
  },
});

function Home() {
  const [shouldShowMovie, randomTrending = 0] = Route.useLoaderData();
  const { movie, tvShow } = useSuspenseQueries({
    combine: ([{ data: tvShows }, { data: movies }]) => {
      return {
        movie: movies?.results?.[randomTrending],
        tvShow: tvShows?.results?.[randomTrending],
      };
    },
    queries: [trendingTVOptions(), trendingMoviesOptions()],
  });

  if (movie && shouldShowMovie) {
    return <MovieHero movie={movie} />;
  }

  return tvShow ? <TvShowHero tvShow={tvShow} /> : null;
}
