import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { TVShowList } from "@/components/tv-show-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { tvPopularOptions } from "@/lib/tv-shows";

export const Route = createFileRoute("/_layout/tv-shows/popular")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.popularTVShows.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(tvPopularOptions());
  },
});

function RouteComponent() {
  const { data: tvShows } = useSuspenseQuery(tvPopularOptions());

  return (
    <div className="p-8">
      <TVShowList
        description={site.pages.popularTVShows.description}
        title={site.pages.popularTVShows.title}
        tvShows={tvShows?.results ?? []}
      />
    </div>
  );
}
