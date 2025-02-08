import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { DiscoverSchema, discoverTvOptions } from "@/api/tv/discover.list";
import { TvDiscoverList } from "@/components/tv/discover-list";

export const Route = createFileRoute("/_layout/tv-shows/discover/_layout/")({
  component: RouteComponent,
  validateSearch: DiscoverSchema,
  loaderDeps: ({ search: { page, with_genres } }) => {
    return { page, with_genres };
  },
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(discoverTvOptions(deps));
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data: tv } = useSuspenseQuery(discoverTvOptions(search));

  return (
    <TvDiscoverList
      page={tv.page}
      totalPages={tv.total_pages}
      tv={tv.results ?? []}
    />
  );
}
