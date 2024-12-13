import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { MovieList } from "@/components/movie-list";
import { popularMovies } from "@/config/lists";
import { popularMoviesFn } from "@/server/fn";

export const Route = createFileRoute("/_layout/movies/popular")({
  component: RouteComponent,
});

function RouteComponent() {
  const getPopularMovies = useServerFn(popularMoviesFn);

  const { data: movies } = useQuery({
    queryFn: () => {
      return getPopularMovies();
    },
    queryKey: ["movie/popular"],
  });

  return (
    <div className="p-8">
      <MovieList
        description={popularMovies.description}
        movies={movies?.results ?? []}
        title={popularMovies.title}
      />
    </div>
  );
}
