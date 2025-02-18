import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { moviesTopRatedOptions } from "@/api/movie/top-rated.list";
import { MovieList } from "@/components/movie/movie-list";
import { ListPagination } from "@/components/shared/list-pagination";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/pagination";

export const Route = createFileRoute("/_layout/movies/top-rated")({
  component: RouteComponent,
  validateSearch: PaginationSchema,
  loaderDeps: ({ search: { page } }) => {
    return { page };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(moviesTopRatedOptions(deps));
  },
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.topRated.movies.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: movies } = useSuspenseQuery(moviesTopRatedOptions(search));

  return (
    <div className="flex flex-col gap-4">
      <MovieList
        description={site.pages.topRated.movies.description}
        movies={movies.results ?? []}
        title={site.pages.topRated.movies.title}
      />
      <ListPagination page={movies.page} totalPages={movies.total_pages} />
    </div>
  );
}
