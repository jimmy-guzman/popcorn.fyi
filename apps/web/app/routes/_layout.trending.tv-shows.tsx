import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { TVShowList } from "@/components/tv-show-list";
import { trendingTVShows } from "@/config/lists";
import { site } from "@/config/site";
import { moviesTopRatedOptions } from "@/lib/movies";
import { seo } from "@/lib/seo";
import { trendingTVOptions } from "@/lib/trending";

export const Route = createFileRoute("/_layout/trending/tv-shows")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${trendingTVShows.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(trendingTVOptions());
  },
});

function RouteComponent() {
  const { data: tvShows } = useSuspenseQuery(moviesTopRatedOptions());

  return (
    <div className="p-8">
      <TVShowList
        description={trendingTVShows.description}
        title={trendingTVShows.title}
        tvShows={tvShows?.results ?? []}
      />
    </div>
  );
}
