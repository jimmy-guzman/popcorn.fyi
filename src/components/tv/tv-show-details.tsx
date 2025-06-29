import { Link, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import { quote } from "@/lib/string";
import { tmdbImageUrl } from "@/lib/tmdb-images";

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
    genres?: { id: number; name?: string }[];
    id: number;
    name?: string;
    overview?: string;
    poster_path?: string;
    status?: string;
    tagline?: string;
    vote_average: number;
  };
}

export const TVShowDetails = ({ tvShow }: TVShowDetailsProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4">
      <div className="hidden md:block">
        {tvShow.backdrop_path ? (
          <img
            alt={tvShow.name}
            className="size-full rounded-md object-cover"
            src={tmdbImageUrl(tvShow.backdrop_path)}
          />
        ) : null}
      </div>
      <div className="dsy-hero w-full">
        <div className="dsy-hero-content flex-col gap-4 lg:flex-row">
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
              <MediaGenres genres={tvShow.genres} media="tv-shows" />
            </div>
            <Prose size="lg">
              <h1>{tvShow.name}</h1>
              {tvShow.tagline ? <p>{quote(tvShow.tagline)}</p> : null}
              <p>{tvShow.overview}</p>
            </Prose>
            <div className="flex justify-center gap-2 md:justify-start">
              <Link
                className="dsy-btn dsy-btn-neutral"
                params={{ id: tvShow.id }}
                to="/tv-shows/$id/trailer"
              >
                <span className="sr-only md:not-sr-only">Watch Trailer</span>{" "}
                <span className="icon-[lucide--tv-minimal-play] h-5 w-5" />
              </Link>
              <Suspense fallback={<ExternalLinksSkeleton />}>
                <ExternalLinks id={tvShow.id} />
              </Suspense>
              {tvShow.name ? (
                <ShareButton
                  title={tvShow.name}
                  url={`/tv-shows/${tvShow.id}`}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <TvShowDetailsTabs id={tvShow.id} />
      <Outlet />
    </div>
  );
};
