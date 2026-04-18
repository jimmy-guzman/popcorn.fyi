import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieHero } from "@/components/movie/movie-hero";
import { PersonHero } from "@/components/people/person-hero";
import { TvShowHero } from "@/components/tv/tv-show-hero";
import { trendingAllOptions } from "@/data/trending.list";
import { hasId } from "@/lib/predicates";

export const Route = createFileRoute("/_layout/")({
  component: Home,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(trendingAllOptions());
  },
});

function Home() {
  const { data: trending } = useSuspenseQuery(trendingAllOptions());
  const hero = trending.find(hasId);

  if (!hero) {
    return (
      <section className="-mx-4 flex min-h-[calc(100dvh-5rem)] w-[calc(100%+2rem)] items-center justify-center px-4">
        <p className="text-center text-muted-foreground">
          Nothing trending right now.
        </p>
      </section>
    );
  }

  if (hero.media_type === "tv") {
    return (
      <section className="-mx-4 w-[calc(100%+2rem)] max-w-none">
        <TvShowHero isTrending tvShow={hero} />
      </section>
    );
  }

  if (hero.media_type === "movie") {
    return (
      <section className="-mx-4 w-[calc(100%+2rem)] max-w-none">
        <MovieHero isTrending movie={hero} />
      </section>
    );
  }

  return (
    <section className="-mx-4 w-[calc(100%+2rem)] max-w-none">
      <PersonHero person={hero} />
    </section>
  );
}
