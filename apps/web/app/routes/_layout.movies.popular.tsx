import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieList } from "@/components/movie-list";
import { site } from "@/config/site";
import { moviesPopularOptions } from "@/lib/movies";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/movies/popular")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.popularMovies.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(moviesPopularOptions());
  },
});

function RouteComponent() {
  const { data: movies } = useSuspenseQuery(moviesPopularOptions());

  return (
    <div className="p-8">
      <MovieList
        description={site.pages.popularMovies.description}
        movies={movies?.results ?? []}
        title={site.pages.popularMovies.title}
      />
    </div>
  );
}
