import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieList } from "@/components/movie/movie-list";
import { ListPagination } from "@/components/shared/list-pagination";
import { site } from "@/config/site";
import { moviesNowPlayingOptions } from "@/data/movie/now-playing.list";
import { orEmpty } from "@/lib/array";
import { hasId } from "@/lib/predicates";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/pagination";

export const Route = createFileRoute("/_layout/movies/now-playing")({
  component: RouteComponent,
  validateSearch: PaginationSchema,
  loaderDeps: ({ search: { page } }) => {
    return { page };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(moviesNowPlayingOptions(deps));
  },
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.nowPlaying.movies.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: movies } = useSuspenseQuery(moviesNowPlayingOptions(search));

  return (
    <div className="flex flex-col gap-4">
      <MovieList
        description={site.pages.nowPlaying.movies.description}
        movies={orEmpty(movies.results).filter(hasId)}
        title={site.pages.nowPlaying.movies.title}
      />
      {movies.page && movies.total_pages ? (
        <ListPagination page={movies.page} totalPages={movies.total_pages} />
      ) : null}
    </div>
  );
}
