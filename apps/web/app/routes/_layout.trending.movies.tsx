import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/start";

import { MovieList } from "@/components/movie-list";
import { trendingMovies } from "@/config/lists";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { trendingMovieFn } from "@/server/fn";

export const Route = createFileRoute("/_layout/trending/movies")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${trendingMovies.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const getTrendingMovies = useServerFn(trendingMovieFn);

  const { data: movies } = useQuery({
    queryFn: () => {
      return getTrendingMovies();
    },
    queryKey: ["trending/movie"],
  });

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
