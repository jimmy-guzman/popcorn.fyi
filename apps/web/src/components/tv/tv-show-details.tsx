import { tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { Button } from "@popcorn.fyi/ui/button";
import { Hero, HeroContent } from "@popcorn.fyi/ui/hero";
import { Link, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import { asQuote } from "@/lib/as-quote";

import { MediaGenres } from "../media/media-genres";
import { MediaRating } from "../media/media-rating";
import { MediaStatus } from "../media/media-status";
import { Prose } from "../shared/prose";
import { ShareButton } from "../shared/share-button";
import { TvShowDetailsTabs } from "./tv-show-details-tabs";
import { WikipediaButton } from "./wikipedia-button";

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
      <Hero>
        <HeroContent className="flex-col gap-4 lg:flex-row">
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
              {tvShow.tagline ? <p>{asQuote(tvShow.tagline)}</p> : null}
              <p>{tvShow.overview}</p>
            </Prose>
            <div className="flex justify-center gap-2 md:justify-start">
              <Button asChild color="neutral">
                <Link params={{ id: tvShow.id }} to="/tv-shows/$id/trailer">
                  <span className="sr-only md:not-sr-only">Watch Trailer</span>{" "}
                  <span className="icon-[lucide--tv-minimal-play] h-5 w-5" />
                </Link>
              </Button>
              <Suspense
                fallback={<div className="dsy-skeleton h-10 w-10 md:w-32" />}
              >
                <WikipediaButton id={tvShow.id} />
              </Suspense>
              {tvShow.name ? (
                <ShareButton
                  title={tvShow.name}
                  url={`/tv-shows/${tvShow.id}`}
                />
              ) : null}
            </div>
          </div>
        </HeroContent>
      </Hero>
      <TvShowDetailsTabs id={tvShow.id} />
      <Outlet />
    </div>
  );
};
