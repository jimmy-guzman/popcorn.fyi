import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { MovieHero } from "@/components/movie-hero";
import { TvShowHero } from "@/components/tv-show-hero";
import { random } from "@/lib/random";
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

  return (
    <div className="grid min-h-[calc(100vh-8rem)] place-content-center">
      <div className="grid grid-cols-1 gap-8">
        {movie && random(0, 1) === 0 ? (
          <MovieHero movie={movie} />
        ) : tvShow ? (
          <TvShowHero tvShow={tvShow} />
        ) : null}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_layout/")({
  component: Home,
});
