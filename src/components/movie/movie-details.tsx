import { Link, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import { buttonVariants } from "@/components/ui/button";
import { orEmpty } from "@/lib/array";
import { cn } from "@/lib/cn";
import { hasId } from "@/lib/predicates";
import { quote } from "@/lib/string";
import { tmdbImageUrl } from "@/lib/tmdb-images";

import { MediaBackdropStrip } from "../media/media-backdrop-strip";
import { MediaGenres } from "../media/media-genres";
import { MediaRating } from "../media/media-rating";
import { MediaStatus } from "../media/media-status";
import { Prose } from "../shared/prose";
import { ShareButton } from "../shared/share-button";
import { ExternalLinks, ExternalLinksSkeleton } from "./external-links";
import { MovieDetailsTabs } from "./movie-details-tabs";

interface MovieDetailsProps {
  movie: {
    backdrop_path?: string;
    genres?: { id?: number; name?: string }[];
    id?: number;
    overview?: string;
    poster_path?: string;
    status?: string;
    tagline?: string;
    title?: string;
    vote_average?: number;
  };
}

export const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const genres = orEmpty(movie.genres).filter(hasId);

  return (
    <div className="flex min-h-screen flex-col items-center gap-4">
      <MediaBackdropStrip backdropPath={movie.backdrop_path} bleed />
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
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
            <MediaGenres genres={genres} media="movies" />
          </div>
          <Prose size="lg">
            <h1>{movie.title}</h1>
            {movie.tagline ? <p>{quote(movie.tagline)}</p> : null}
            <p>{movie.overview}</p>
          </Prose>
          <div className="flex justify-center gap-2 md:justify-start">
            {movie.id ? (
              <Link
                className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
                params={{ id: movie.id }}
                to="/movies/$id/trailer"
              >
                <span className="sr-only md:not-sr-only">Trailer</span>{" "}
                <span className="icon-[lucide--tv-minimal-play] size-5" />
              </Link>
            ) : null}
            {movie.id ? (
              <Suspense fallback={<ExternalLinksSkeleton />}>
                <ExternalLinks id={movie.id} />
              </Suspense>
            ) : null}
            {movie.title ? (
              <ShareButton title={movie.title} url={`/movies/${movie.id}`} />
            ) : null}
          </div>
        </div>
      </div>
      {movie.id ? <MovieDetailsTabs id={movie.id} /> : null}
      <Outlet />
    </div>
  );
};
