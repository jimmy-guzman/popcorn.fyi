import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { TVShowList } from "@/components/tv-show-list";
import { topRatedTVShows } from "@/config/lists";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";
import { tvTopRatedOptions } from "@/lib/tv-shows";

export const Route = createFileRoute("/_layout/tv-shows/top-rated")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${topRatedTVShows.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(tvTopRatedOptions());
  },
});

function RouteComponent() {
  const { data: tvShows } = useSuspenseQuery(tvTopRatedOptions());

  return (
    <div className="p-8">
      <TVShowList
        description={topRatedTVShows.description}
        title={topRatedTVShows.title}
        tvShows={tvShows?.results ?? []}
      />
    </div>
  );
}
