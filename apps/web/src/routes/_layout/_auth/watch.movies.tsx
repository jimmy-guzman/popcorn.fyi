import { createFileRoute } from "@tanstack/react-router";

import { watchlistMoviesFn } from "@/api/watchlist";
import { MovieList } from "@/components/movie/movie-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/_auth/watch/movies")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const data = await watchlistMoviesFn({ data: context.userId });

    return data;
  },
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.watchlist.movies.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const watchlist = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <MovieList
        description={site.pages.watchlist.movies.description}
        movies={watchlist}
        title={site.pages.watchlist.movies.title}
      />
    </div>
  );
}
