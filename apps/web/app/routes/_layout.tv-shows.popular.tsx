import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { TVShowList } from "@/components/tv-show-list";
import { popularTVShows } from "@/config/lists";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { tvPopularOptions } from "@/lib/tv-shows";

export const Route = createFileRoute("/_layout/tv-shows/popular")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${popularTVShows.title} | ${site.title}`,
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
        description={popularTVShows.description}
        title={popularTVShows.title}
        tvShows={tvShows?.results ?? []}
      />
    </div>
  );
}
