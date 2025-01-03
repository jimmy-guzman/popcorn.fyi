import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link, Outlet } from "@tanstack/react-router";

import { MediaGenres } from "./media-genres";
import { MediaRating } from "./media-rating";
import { MediaStatus } from "./media-status";
import { Prose } from "./prose";

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
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-4 p-4 lg:p-8">
      <div className="mx-auto hidden max-w-7xl md:block">
        {tvShow.backdrop_path ? (
          <img
            alt={tvShow.name}
            className="size-full rounded-md object-cover"
            src={tmdbImageUrl(tvShow.backdrop_path)}
          />
        ) : null}
      </div>
      <div className="dsy-hero">
        <div className="dsy-hero-content flex-col gap-4 lg:flex-row">
          {tvShow.poster_path ? (
            <img
              alt={tvShow.name}
              className="w-full rounded-lg shadow-2xl md:hidden md:w-auto md:max-w-xs lg:block"
              src={tmdbImageUrl(tvShow.poster_path, "w500")}
            />
          ) : null}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:justify-end">
              <MediaRating average={tvShow.vote_average} />
              <MediaStatus status={tvShow.status} />
              <MediaGenres genres={tvShow.genres} />
            </div>
            <Prose size="lg">
              <h1>{tvShow.name}</h1>
              {tvShow.tagline ? <p>&quot;{tvShow.tagline}&quot;</p> : null}
              <p>{tvShow.overview}</p>
            </Prose>
          </div>
        </div>
      </div>
      <div className="dsy-tabs dsy-tabs-boxed w-full md:w-auto" role="tablist">
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
