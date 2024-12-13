import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { MovieList } from "@/components/movie-list";
import { topRatedMovies } from "@/config/lists";
import { topRatedMoviesFn } from "@/server/fn";

export const Route = createFileRoute("/_layout/movies/top-rated")({
  component: RouteComponent,
});

function RouteComponent() {
  const getTopRatedMovies = useServerFn(topRatedMoviesFn);

  const { data: movies } = useQuery({
    queryFn: () => {
      return getTopRatedMovies();
    },
    queryKey: ["movie/top-rated"],
  });

  return (
    <div className="p-8">
      <MovieList
        description={topRatedMovies.description}
        movies={movies?.results ?? []}
        title={topRatedMovies.title}
      />
    </div>
  );
}
