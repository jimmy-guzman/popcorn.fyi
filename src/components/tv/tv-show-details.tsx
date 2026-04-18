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

  return (
    <div className="flex min-h-screen flex-col items-center gap-4">
      <MediaBackdropStrip backdropPath={tvShow.backdrop_path} bleed />
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
        {tvShow.poster_path ? (
          <img
            alt={tvShow.name}
            className="w-full rounded-lg shadow-2xl md:hidden md:w-auto md:max-w-xs lg:block"
            src={tmdbImageUrl(tvShow.poster_path, "w500")}
          />
        ) : null}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 xl:flex-nowrap xl:justify-end">
            <MediaRating average={tvShow.vote_average} />
            <MediaStatus status={tvShow.status} />
            <MediaGenres genres={genres} media="tv-shows" />
          </div>
          <Prose size="lg">
            <h1>{tvShow.name}</h1>
            {tvShow.tagline ? <p>{quote(tvShow.tagline)}</p> : null}
            <p>{tvShow.overview}</p>
          </Prose>
          <div className="flex justify-center gap-2 md:justify-start">
            {tvShow.id ? (
              <Link
                className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
                params={{ id: tvShow.id }}
                to="/tv-shows/$id/trailer"
              >
                <span className="sr-only md:not-sr-only">Watch Trailer</span>{" "}
                <span className="icon-[lucide--tv-minimal-play] size-5" />
              </Link>
            ) : null}
            {tvShow.id ? (
              <Suspense fallback={<ExternalLinksSkeleton />}>
                <ExternalLinks id={tvShow.id} />
              </Suspense>
            ) : null}
            {tvShow.name ? (
              <ShareButton title={tvShow.name} url={`/tv-shows/${tvShow.id}`} />
            ) : null}
          </div>
        </div>
      </div>
      {tvShow.id ? <TvShowDetailsTabs id={tvShow.id} /> : null}
      <Outlet />
    </div>
  );
};
