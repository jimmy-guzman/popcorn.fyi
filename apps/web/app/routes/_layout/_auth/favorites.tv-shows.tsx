import { createFileRoute } from "@tanstack/react-router";

import { favoriteTvShowsFn } from "@/api/favorites";
import { TVShowList } from "@/components/tv/tv-show-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/_auth/favorites/tv-shows")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.favoriteMovies.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    const data = await favoriteTvShowsFn({ data: context.userId });

    return data;
  },
});

function RouteComponent() {
  const favorites = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <TVShowList
        description={site.pages.favoriteMovies.description}
        title={site.pages.favoriteMovies.title}
        tvShows={favorites}
      />
    </div>
  );
}
