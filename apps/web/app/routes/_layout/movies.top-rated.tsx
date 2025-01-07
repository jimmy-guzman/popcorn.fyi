import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ListPagination } from "@/components/list-pagination";
import { MovieList } from "@/components/movie-list";
import { site } from "@/config/site";
import { moviesTopRatedOptions } from "@/lib/movies";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/pagination";

export const Route = createFileRoute("/_layout/movies/top-rated")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.topRatedMovies.title} | ${site.title}`,
      }),
    };
  },
  validateSearch: PaginationSchema,
  loaderDeps: ({ search: { page } }) => {
    return { page };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(moviesTopRatedOptions(deps));
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: movies } = useSuspenseQuery(moviesTopRatedOptions(search));

  return (
    <div className="flex flex-col gap-4 p-8">
      <MovieList
        description={site.pages.topRatedMovies.description}
        movies={movies.results ?? []}
        title={site.pages.topRatedMovies.title}
      />
      <ListPagination page={movies.page} totalPages={movies.total_pages} />
    </div>
  );
}
