import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { trendingTVOptions } from "@/api/tv/trending.list";
import { TVShowList } from "@/components/tv/tv-show-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/trending/tv-shows")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.trending.tvShows.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(trendingTVOptions());
  },
});

function RouteComponent() {
  const { data: tvShows } = useSuspenseQuery(trendingTVOptions());

  return (
    <TVShowList
      description={site.pages.trending.tvShows.description}
      title={site.pages.trending.tvShows.title}
      tvShows={tvShows.results ?? []}
    />
  );
}
