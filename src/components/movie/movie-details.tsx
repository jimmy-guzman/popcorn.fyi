import { Link, Outlet } from "@tanstack/react-router";
import { TvMinimalPlayIcon } from "lucide-react";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { orEmpty } from "@/lib/array";
import { cn } from "@/lib/cn";
import { hasId } from "@/lib/predicates";
import { quote } from "@/lib/string";
import { tmdbImageUrl } from "@/lib/tmdb-images";

import {
  MediaDetailViewBackdrop,
  MediaDetailViewContent,
  MediaDetailViewHero,
  MediaDetailViewPoster,
  MediaDetailViewRoot,
} from "../media/media-detail-view";
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
  const card = (
    <Card
      className={cn("min-w-0 flex-1", !movie.poster_path && "md:col-span-2")}
    >
      <CardHeader
        className={cn(
          "flex flex-row flex-wrap gap-2 border-0 pb-2",
          "xl:flex-nowrap xl:justify-end",
        )}
      >
        <MediaRating average={movie.vote_average} />
        <MediaStatus status={movie.status} />
        <MediaGenres genres={genres} media="movies" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-0">
        <Prose size="lg">
          <h1>{movie.title}</h1>
          {movie.tagline ? <p>{quote(movie.tagline)}</p> : null}
          <p>{movie.overview}</p>
        </Prose>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-center gap-2 border-0 pt-0 md:justify-start">
        {movie.id ? (
          <Button
            className="gap-2"
            nativeButton={false}
            render={
              <Link params={{ id: movie.id }} to="/movies/$id/trailer">
                <span className="sr-only md:not-sr-only">Trailer</span>
                <TvMinimalPlayIcon data-icon="inline-end" />
              </Link>
            }
            variant="outline"
          />
        ) : null}
        {movie.id ? (
          <Suspense fallback={<ExternalLinksSkeleton />}>
            <ExternalLinks id={movie.id} />
          </Suspense>
        ) : null}
        {movie.title ? (
          <ShareButton title={movie.title} url={`/movies/${movie.id}`} />
        ) : null}
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex min-h-screen flex-col gap-0">
      <MediaDetailViewBackdrop
        aria-label={movie.title}
        backdropPath={movie.backdrop_path}
        role="img"
      />
      <MediaDetailViewRoot>
        <MediaDetailViewHero
          className={
            movie.backdrop_path ? "md:-mt-32 xl:-mt-40" : "md:mt-8 xl:mt-12"
          }
        >
          {movie.poster_path ? (
            <MediaDetailViewPoster overlap={Boolean(movie.backdrop_path)}>
              <img
                alt={movie.title ?? ""}
                className="size-full rounded-none object-cover shadow-2xl"
                src={tmdbImageUrl(movie.poster_path, "w500")}
              />
            </MediaDetailViewPoster>
          ) : null}
          {card}
        </MediaDetailViewHero>
        <MediaDetailViewContent className="flex flex-col gap-8">
          {movie.id ? <MovieDetailsTabs id={movie.id} /> : null}
          <Outlet />
        </MediaDetailViewContent>
      </MediaDetailViewRoot>
    </div>
  );
};
