import { createFileRoute } from "@tanstack/react-router";

import { favoriteTvShowsFn } from "@/api/favorites";
import { TVShowList } from "@/components/tv/tv-show-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/_auth/favorites/tv-shows")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const data = await favoriteTvShowsFn({ data: context.userId });

    return data;
  },
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.favorites.tvShows.title} | ${site.title}`,
      }),
    };
  },
});

function RouteComponent() {
  const favorites = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <TVShowList
        description={site.pages.favorites.tvShows.description}
        title={site.pages.favorites.tvShows.title}
        tvShows={favorites}
      />
    </div>
  );
}
