import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { TVShowList } from "@/components/tv/tv-show-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { trendingTVOptions } from "@/lib/trending";

export const Route = createFileRoute("/_layout/trending/tv-shows")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.trendingTVShows.title} | ${site.title}`,
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
      description={site.pages.trendingTVShows.description}
      title={site.pages.trendingTVShows.title}
      tvShows={tvShows.results ?? []}
    />
  );
}
