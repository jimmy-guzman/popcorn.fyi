import { createFileRoute } from "@tanstack/react-router";

import { watchlistTvShowsFn } from "@/api/watchlist";
import { TVShowList } from "@/components/tv/tv-show-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/_auth/watch/tv-shows")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const data = await watchlistTvShowsFn({ data: context.userId });

    return data;
  },
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.watchlist.tvShows.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const watchlist = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <TVShowList
        description={site.pages.watchlist.tvShows.description}
        title={site.pages.watchlist.tvShows.title}
        tvShows={watchlist}
      />
    </div>
  );
}
