import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieList } from "@/components/movie-list";
import { topRatedMovies } from "@/config/lists";
import { site } from "@/config/site";
import { moviesTopRatedOptions } from "@/lib/movies";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/movies/top-rated")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${topRatedMovies.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(moviesTopRatedOptions());
  },
});

function RouteComponent() {
  const { data: movies } = useSuspenseQuery(moviesTopRatedOptions());

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
