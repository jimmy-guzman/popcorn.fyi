import { tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { Button } from "@popcorn.fyi/ui/button";
import { Hero, HeroContent } from "@popcorn.fyi/ui/hero";
import { Link, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import { asQuote } from "@/lib/as-quote";

import { MediaGenres } from "../media/media-genres";
import { MediaRating } from "../media/media-rating";
import { MediaStatus } from "../media/media-status";
import { Favorite } from "../shared/favorite";
import { Prose } from "../shared/prose";
import { ShareButton } from "../shared/share-button";
import { MovieDetailsTabs } from "./movie-details-tabs";
import { WikipediaButton } from "./wikipedia-button";

interface MovieDetailsProps {
  movie: {
    backdrop_path?: string;
    favorite: boolean;
    genres?: { id: number; name?: string }[];
    id: number;
    overview?: string;
    poster_path?: string;
    status?: string;
    tagline?: string;
    title?: string;
    vote_average: number;
  };
}

export const MovieDetails = ({ movie }: MovieDetailsProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4">
      <div className="hidden md:block">
        {movie.backdrop_path ? (
          <img
            alt={movie.title}
            className="size-full rounded-md object-cover"
            src={tmdbImageUrl(movie.backdrop_path)}
          />
        ) : null}
      </div>
      <Hero>
        <HeroContent className="flex-col gap-4 lg:flex-row">
          {movie.poster_path ? (
            <img
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl md:hidden md:w-auto md:max-w-xs lg:block"
              src={tmdbImageUrl(movie.poster_path, "w500")}
            />
          ) : null}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 xl:flex-nowrap xl:justify-end">
              <MediaRating average={movie.vote_average} />
              <MediaStatus status={movie.status} />
              <MediaGenres genres={movie.genres} media="movies" />
            </div>
            <Prose size="lg">
              <h1>{movie.title}</h1>
              {movie.tagline ? <p>{asQuote(movie.tagline)}</p> : null}
              <p>{movie.overview}</p>
            </Prose>
            <div className="flex justify-center gap-2 md:justify-start">
              <Button asChild color="neutral">
                <Link
                  params={{ id: movie.id.toString() }}
                  to="/movies/$id/trailer"
                >
                  <span className="sr-only md:not-sr-only">Watch Trailer</span>{" "}
                  <span className="icon-[lucide--tv-minimal-play] h-5 w-5" />
                </Link>
              </Button>
              <Suspense
                fallback={<div className="dsy-skeleton h-10 w-10 md:w-32" />}
              >
                <WikipediaButton id={movie.id} />
              </Suspense>
              {movie.title ? (
                <ShareButton title={movie.title} url={`/movies/${movie.id}`} />
              ) : null}
              <Favorite
                favorite={movie.favorite}
                mediaType="movie"
                tmdbId={movie.id}
              />
            </div>
          </div>
        </HeroContent>
      </Hero>
      <MovieDetailsTabs id={movie.id.toString()} />
      <Outlet />
    </div>
  );
};
