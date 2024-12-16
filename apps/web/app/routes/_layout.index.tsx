import { random } from "@popcorn.fyi/utils";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { MovieHero } from "@/components/movie-hero";
import { TvShowHero } from "@/components/tv-show-hero";
import { trendingMovieFn, trendingTvFn } from "@/server/fn";

function Home() {
  const getTrendingMovies = useServerFn(trendingMovieFn);
  const getTrendingTvShows = useServerFn(trendingTvFn);

  const { data: movies } = useQuery({
    queryFn: () => {
      return getTrendingMovies();
    },
    queryKey: ["trending/movie"],
  });

  const { data: tvShows } = useQuery({
    queryFn: () => {
      return getTrendingTvShows();
    },
    queryKey: ["trending/tv"],
  });

  const movie = movies?.results?.[random(0, movies.results.length)];
  const tvShow = tvShows?.results?.[random(0, tvShows.results.length)];

  return movie && random(0, 1) === 0 ? (
    <MovieHero movie={movie} />
  ) : tvShow ? (
    <TvShowHero tvShow={tvShow} />
  ) : null;
}

export const Route = createFileRoute("/_layout/")({
  component: Home,
});
