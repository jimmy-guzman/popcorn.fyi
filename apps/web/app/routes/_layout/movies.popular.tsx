import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieList } from "@/components/movie/movie-list";
import { ListPagination } from "@/components/shared/list-pagination";
import { site } from "@/config/site";
import { moviesPopularOptions } from "@/lib/movies";
import { seo } from "@/lib/seo";
import { PaginationSchema } from "@/schemas/pagination";

export const Route = createFileRoute("/_layout/movies/popular")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.popularMovies.title} | ${site.title}`,
      }),
    };
  },
  validateSearch: PaginationSchema,
  loaderDeps: ({ search: { page } }) => {
    return { page };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(moviesPopularOptions(deps));
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: movies } = useSuspenseQuery(moviesPopularOptions(search));

  return (
    <div className="flex flex-col gap-4">
      <MovieList
        description={site.pages.popularMovies.description}
        movies={movies.results ?? []}
        title={site.pages.popularMovies.title}
      />
      <ListPagination page={movies.page} totalPages={movies.total_pages} />
    </div>
  );
}
