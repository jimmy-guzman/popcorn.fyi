import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { MovieList } from "@/components/movie-list";
import { topRatedMovies } from "@/config/lists";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { topRatedMoviesFn } from "@/server/fn";

export const Route = createFileRoute("/_layout/movies/top-rated")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${topRatedMovies.title} | ${site.title}`,
      }),
    };
  },
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
