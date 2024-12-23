import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ListPagination } from "@/components/list-pagination";
import { TVShowList } from "@/components/tv-show-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { tvTopRatedOptions } from "@/lib/tv-shows";
import { PaginationSchema } from "@/schemas/lists";

export const Route = createFileRoute("/_layout/tv-shows/top-rated")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.topRatedTVShows.title} | ${site.title}`,
      }),
    };
  },
  loaderDeps: ({ search: { page } }) => {
    return { page };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(tvTopRatedOptions(deps));
  },
  validateSearch: PaginationSchema,
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: tvShows } = useSuspenseQuery(tvTopRatedOptions(search));

  return (
    <div className="flex flex-col gap-4 p-8">
      <TVShowList
        description={site.pages.topRatedTVShows.description}
        title={site.pages.topRatedTVShows.title}
        tvShows={tvShows?.results ?? []}
      />
      {tvShows ? (
        <ListPagination page={tvShows.page} totalPages={tvShows.total_pages} />
      ) : null}
    </div>
  );
}
