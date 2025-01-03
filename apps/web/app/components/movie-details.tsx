import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link, Outlet } from "@tanstack/react-router";

import { MediaGenres } from "./media-genres";
import { MediaRating } from "./media-rating";
import { MediaStatus } from "./media-status";
import { Prose } from "./prose";

interface MovieDetailsProps {
  movie: {
    backdrop_path?: string;
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
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-4 p-4 lg:p-8">
      <div className="mx-auto hidden max-w-7xl md:block">
        {movie.backdrop_path ? (
          <img
            alt={movie.title}
            className="size-full rounded-md object-cover"
            src={tmdbImageUrl(movie.backdrop_path)}
          />
        ) : null}
      </div>
      <div className="dsy-hero">
        <div className="dsy-hero-content flex-col gap-4 lg:flex-row">
          {movie.poster_path ? (
            <img
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl md:hidden md:w-auto md:max-w-xs lg:block"
              src={tmdbImageUrl(movie.poster_path, "w500")}
            />
          ) : null}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:justify-end">
              <MediaRating average={movie.vote_average} />
              <MediaStatus status={movie.status} />
              <MediaGenres genres={movie.genres} />
            </div>
            <Prose size="lg">
              <h1>{movie.title}</h1>
              {movie.tagline ? <p>&quot;{movie.tagline}&quot;</p> : null}
              <p>{movie.overview}</p>
            </Prose>
            <div>
              <Link
                className="dsy-btn dsy-btn-secondary"
                params={{ id: movie.id.toString() }}
                to="/movies/$id/trailer"
              >
                Watch Trailer{" "}
                <span className="icon-[lucide--tv-minimal-play] h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="dsy-tabs dsy-tabs-boxed w-full md:w-auto" role="tablist">
        <Link
          activeOptions={{ exact: true }}
          activeProps={{ className: "dsy-tab-active" }}
          className="dsy-tab"
          hash="overview"
          params={{ id: movie.id.toString() }}
          role="tab"
          to="/movies/$id"
        >
          Overview
        </Link>
        <Link
          activeProps={{ className: "dsy-tab-active" }}
          className="dsy-tab"
          hash="cast"
          params={{ id: movie.id.toString() }}
          role="tab"
          to="/movies/$id/credits"
        >
          Credits
        </Link>
        <Link
          activeProps={{ className: "dsy-tab-active" }}
          className="dsy-tab"
          hash="providers"
          params={{ id: movie.id.toString() }}
          role="tab"
          to="/movies/$id/watch"
        >
          Watch
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
