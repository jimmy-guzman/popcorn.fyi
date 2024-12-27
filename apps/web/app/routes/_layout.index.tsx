import { shuffle } from "@popcorn.fyi/utils";
import { createFileRoute } from "@tanstack/react-router";

import { MovieHero } from "@/components/movie-hero";
import { PersonHero } from "@/components/person-hero";
import { TvShowHero } from "@/components/tv-show-hero";
import { trendingAllFn } from "@/lib/trending";

export const Route = createFileRoute("/_layout/")({
  component: Home,
  loader: async () => {
    const data = await trendingAllFn();

    return shuffle(data?.results ?? []);
  },
});

function Home() {
  const trending = Route.useLoaderData();

  return (
    <div className="dsy-carousel w-full">
      {trending.map((result) => {
        if (result.media_type === "tv") {
          return (
            <div className="dsy-carousel-item w-full" key={result.id}>
              <TvShowHero tvShow={result} />
            </div>
          );
        }

        if (result.media_type === "movie") {
          return (
            <div className="dsy-carousel-item w-full" key={result.id}>
              <MovieHero movie={result} />
            </div>
          );
        }

        if (result.media_type === "person") {
          return (
            <div className="dsy-carousel-item w-full" key={result.id}>
              <PersonHero person={result} />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
