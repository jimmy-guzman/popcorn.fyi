import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { DiscoverSchema } from "@/api/tv/discover.list";
import { tvGenresOptions } from "@/api/tv/genres";
import { tvProvidersOptions } from "@/api/tv/providers.list";
import { regionsOptions } from "@/api/tv/regions.list";
import { Prose } from "@/components/shared/prose";
import { TvDiscoverFilters } from "@/components/tv/discover-filters";

export const Route = createFileRoute("/_layout/tv-shows/discover/_layout")({
  component: RouteComponent,
  validateSearch: DiscoverSchema,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(tvGenresOptions()),
      context.queryClient.ensureQueryData(tvProvidersOptions()),
      context.queryClient.ensureQueryData(regionsOptions()),
    ]);
  },
});

function RouteComponent() {
  const { data: genres } = useSuspenseQuery(tvGenresOptions());
  const { data: providers } = useSuspenseQuery(tvProvidersOptions());
  const { data: regions } = useSuspenseQuery(regionsOptions());

  return (
    <div className="flex flex-col gap-4">
      <Prose>
        <h1>test</h1>
        <p>test</p>
      </Prose>
      <TvDiscoverFilters
        genres={genres}
        providers={providers}
        regions={regions}
      />
      <Outlet />
    </div>
  );
}
