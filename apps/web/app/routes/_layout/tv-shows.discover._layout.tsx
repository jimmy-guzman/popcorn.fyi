import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { regionsOptions } from "@/api/regions.list";
import { DiscoverSchema } from "@/api/tv/discover.list";
import { tvGenresOptions } from "@/api/tv/genres.list";
import { tvProvidersOptions } from "@/api/tv/providers.list";
import { Prose } from "@/components/shared/prose";
import { TvDiscoverFilters } from "@/components/tv/discover-filters";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

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
  head: () => {
    return {
      meta: seo({
        description: site.pages.discover.tvShows.description,
        title: `${site.pages.discover.tvShows.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const { data: genres } = useSuspenseQuery(tvGenresOptions());
  const { data: providers } = useSuspenseQuery(tvProvidersOptions());
  const { data: regions } = useSuspenseQuery(regionsOptions());

  return (
    <div className="flex flex-col gap-4">
      <Prose>
        <h1>{site.pages.discover.tvShows.title}</h1>
        <p>{site.pages.discover.tvShows.description}</p>
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
