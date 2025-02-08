import { createFileRoute } from "@tanstack/react-router";

import { favoriteMoviesFn } from "@/api/favorites";
import { MovieList } from "@/components/movie-list";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_layout/_auth/favorites/movies")({
  component: RouteComponent,
  head: () => {
    return {
      meta: seo({
        title: `${site.pages.favoriteMovies.title} | ${site.title}`,
      }),
    };
  },
  loader: async ({ context }) => {
    const data = await favoriteMoviesFn({ data: context.userId });

    return data;
  },
});

function RouteComponent() {
  const favorites = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <MovieList
        description={site.pages.favoriteMovies.description}
        movies={favorites}
        title={site.pages.favoriteMovies.title}
      />
    </div>
  );
}
