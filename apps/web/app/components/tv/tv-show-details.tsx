import { tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { Button } from "@popcorn.fyi/ui/button";
import { Hero, HeroContent } from "@popcorn.fyi/ui/hero";
import { Link, Outlet } from "@tanstack/react-router";

import { MediaGenres } from "../media/media-genres";
import { MediaRating } from "../media/media-rating";
import { MediaStatus } from "../media/media-status";
import { Favorite } from "../shared/favorite";
import { Prose } from "../shared/prose";

interface TVShowDetailsProps {
  tvShow: {
    backdrop_path?: string;
    favorite: boolean;
    genres?: { id: number; name?: string }[];
    id: number;
    name?: string;
    overview?: string;
    poster_path?: string;
    status?: string;
    tagline?: string;
    vote_average: number;
  };
  wikipediaUrl?: string | undefined;
}

export const TVShowDetails = ({ tvShow, wikipediaUrl }: TVShowDetailsProps) => {
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
              <MediaGenres genres={tvShow.genres} />
            </div>
            <Prose size="lg">
              <h1>{tvShow.name}</h1>
              {tvShow.tagline ? <p>&quot;{tvShow.tagline}&quot;</p> : null}
              <p>{tvShow.overview}</p>
            </Prose>
            <div className="flex justify-center gap-4 md:justify-start">
              <Button asChild color="primary">
                <Link
                  params={{ id: tvShow.id.toString() }}
                  to="/tv-shows/$id/trailer"
                >
                  <span className="sr-only md:not-sr-only">Watch Trailer</span>{" "}
                  <span className="icon-[lucide--tv-minimal-play] h-5 w-5" />
                </Link>
              </Button>
              {wikipediaUrl ? (
                <Button asChild color="secondary">
                  <a href={wikipediaUrl} rel="noreferrer" target="_blank">
                    <span className="sr-only md:not-sr-only">Wikipedia</span>{" "}
                    <span className="icon-[simple-icons--wikipedia] h-5 w-5" />
                  </a>
                </Button>
              ) : null}
              <Favorite
                favorite={tvShow.favorite}
                mediaType="tv"
                tmdbId={tvShow.id}
              />
            </div>
          </div>
        </HeroContent>
      </Hero>
      <div className="dsy-tabs dsy-tabs-box w-full md:w-auto" role="tablist">
        <Link
          activeOptions={{ exact: true }}
          activeProps={{ className: "dsy-tab-active" }}
          className="dsy-tab"
          hash="overview"
          params={{ id: tvShow.id.toString() }}
          role="tab"
          to="/tv-shows/$id"
        >
          Overview
        </Link>
        <Link
          activeProps={{ className: "dsy-tab-active" }}
          className="dsy-tab"
          hash="cast"
          params={{ id: tvShow.id.toString() }}
          role="tab"
          to="/tv-shows/$id/credits"
        >
          Credits
        </Link>
        <Link
          activeProps={{ className: "dsy-tab-active" }}
          className="dsy-tab"
          hash="providers"
          params={{ id: tvShow.id.toString() }}
          role="tab"
          to="/tv-shows/$id/watch"
        >
          Watch
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
