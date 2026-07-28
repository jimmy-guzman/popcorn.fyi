import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { MovieHero } from "@/components/movie/movie-hero";
import { PersonHero } from "@/components/people/person-hero";
import { TvShowHero } from "@/components/tv/tv-show-hero";
import { movieLogoOptions } from "@/data/movie/details.logo";
import { movieGenresOptions } from "@/data/movie/genres.list";
import { trendingAllOptions } from "@/data/trending.list";
import { tvLogoOptions } from "@/data/tv/details.logo";
import { tvGenresOptions } from "@/data/tv/genres.list";
import { limit, orEmpty } from "@/lib/array";
import { hasId } from "@/lib/predicates";

const HERO_GENRE_LIMIT = 3;

interface Hero {
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  media_type?: string;
  name?: string;
  overview?: string;
  title?: string;
}

const namedGenres = (
  genreIds: number[] | undefined,
  genres: { id?: number; name?: string }[],
) => {
  return limit(
    orEmpty(genreIds).flatMap((genreId) => {
      const genre = genres.find((candidate) => {
        return candidate.id === genreId;
      });

      return genre?.id ? [{ id: genre.id, name: genre.name }] : [];
    }),
    HERO_GENRE_LIMIT,
  );
};

function TrendingMovieHero({ movie }: { movie: Hero }) {
  const { data: images } = useSuspenseQuery(movieLogoOptions(movie.id));
  const { data: genres } = useSuspenseQuery(movieGenresOptions());

  return (
    <MovieHero
      genres={namedGenres(movie.genre_ids, genres)}
      isTrending
      logo={images.logo}
      movie={movie}
    />
  );
}

function TrendingTvShowHero({ tvShow }: { tvShow: Hero }) {
  const { data: images } = useSuspenseQuery(tvLogoOptions(tvShow.id));
  const { data: genres } = useSuspenseQuery(tvGenresOptions());

  return (
    <TvShowHero
      genres={namedGenres(tvShow.genre_ids, genres)}
      isTrending
      logo={images.logo}
      tvShow={tvShow}
    />
  );
}

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
        <TrendingTvShowHero tvShow={hero} />
      </section>
    );
  }

  if (hero.media_type === "movie") {
    return (
      <section className="-mx-4 w-[calc(100%+2rem)] max-w-none">
        <TrendingMovieHero movie={hero} />
      </section>
    );
  }

  return (
    <section className="-mx-4 w-[calc(100%+2rem)] max-w-none">
      <PersonHero person={hero} />
    </section>
  );
}

export const Route = createFileRoute("/_layout/")({
  component: Home,
  loader: async ({ context }) => {
    const trending =
      await context.queryClient.ensureQueryData(trendingAllOptions());
    const hero = trending.find(hasId);

    if (hero?.media_type === "movie") {
      await Promise.all([
        context.queryClient.ensureQueryData(movieLogoOptions(hero.id)),
        context.queryClient.ensureQueryData(movieGenresOptions()),
      ]);
    }

    if (hero?.media_type === "tv") {
      await Promise.all([
        context.queryClient.ensureQueryData(tvLogoOptions(hero.id)),
        context.queryClient.ensureQueryData(tvGenresOptions()),
      ]);
    }
  },
});
