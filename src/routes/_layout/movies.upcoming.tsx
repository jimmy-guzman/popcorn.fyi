import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieList } from "@/components/movie/movie-list";
import { ListPagination } from "@/components/shared/list-pagination";
import { site } from "@/config/site";
import { moviesUpcomingOptions } from "@/data/movie/upcoming.list";
import { orEmpty } from "@/lib/array";
import { hasId } from "@/lib/predicates";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/pagination";

export const Route = createFileRoute("/_layout/movies/upcoming")({
  component: RouteComponent,
  validateSearch: PaginationSchema,
  loaderDeps: ({ search: { page } }) => {
    return { page };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(moviesUpcomingOptions(deps));
  },
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.upcoming.movies.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: movies } = useSuspenseQuery(moviesUpcomingOptions(search));

  return (
    <div className="flex flex-col gap-4">
      <MovieList
        description={site.pages.upcoming.movies.description}
        movies={orEmpty(movies.results).filter(hasId)}
        title={site.pages.upcoming.movies.title}
      />
      {movies.page && movies.total_pages ? (
        <ListPagination page={movies.page} totalPages={movies.total_pages} />
      ) : null}
    </div>
  );
}
