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
import { TvShowDetailsTabs } from "./tv-show-details-tabs";

interface TVShowDetailsProps {
  tvShow: {
    backdrop_path?: string;
    genres?: { id?: number; name?: string }[];
    id?: number;
    name?: string;
    overview?: string;
    poster_path?: string;
    status?: string;
    tagline?: string;
    vote_average?: number;
  };
}

export const TVShowDetails = ({ tvShow }: TVShowDetailsProps) => {
  const genres = orEmpty(tvShow.genres).filter(hasId);
  const card = (
    <Card
      className={cn("min-w-0 flex-1", !tvShow.poster_path && "md:col-span-2")}
    >
      <CardHeader
        className={cn(
          "flex flex-row flex-wrap gap-2 border-0 pb-2",
          "xl:flex-nowrap xl:justify-end",
        )}
      >
        <MediaRating average={tvShow.vote_average} />
        <MediaStatus status={tvShow.status} />
        <MediaGenres genres={genres} media="tv-shows" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-0">
        <Prose size="lg">
          <h1>{tvShow.name}</h1>
          {tvShow.tagline ? <p>{quote(tvShow.tagline)}</p> : null}
          <p>{tvShow.overview}</p>
        </Prose>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-center gap-2 border-0 pt-0 md:justify-start">
        {tvShow.id ? (
          <Button
            className="gap-2"
            nativeButton={false}
            render={
              <Link params={{ id: tvShow.id }} to="/tv-shows/$id/trailer">
                <span className="sr-only md:not-sr-only">Watch Trailer</span>
                <TvMinimalPlayIcon data-icon="inline-end" />
              </Link>
            }
            variant="outline"
          />
        ) : null}
        {tvShow.id ? (
          <Suspense fallback={<ExternalLinksSkeleton />}>
            <ExternalLinks id={tvShow.id} />
          </Suspense>
        ) : null}
        {tvShow.name ? (
          <ShareButton title={tvShow.name} url={`/tv-shows/${tvShow.id}`} />
        ) : null}
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex min-h-screen flex-col gap-0">
      <MediaDetailViewBackdrop
        aria-label={tvShow.name}
        backdropPath={tvShow.backdrop_path}
        role="img"
      />
      <MediaDetailViewRoot>
        <MediaDetailViewHero
          className={
            tvShow.backdrop_path ? "md:-mt-32 xl:-mt-40" : "md:mt-8 xl:mt-12"
          }
        >
          {tvShow.poster_path ? (
            <MediaDetailViewPoster overlap={Boolean(tvShow.backdrop_path)}>
              <img
                alt={tvShow.name ?? ""}
                className="size-full rounded-none object-cover shadow-2xl"
                src={tmdbImageUrl(tvShow.poster_path, "w500")}
              />
            </MediaDetailViewPoster>
          ) : null}
          {card}
        </MediaDetailViewHero>
        <MediaDetailViewContent className="flex flex-col gap-4">
          {tvShow.id ? <TvShowDetailsTabs id={tvShow.id} /> : null}
          <Outlet />
        </MediaDetailViewContent>
      </MediaDetailViewRoot>
    </div>
  );
};
