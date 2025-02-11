import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Button } from "@popcorn.fyi/ui/button";
import { Hero, HeroContent } from "@popcorn.fyi/ui/hero";
import { Link, Outlet } from "@tanstack/react-router";

import { MediaGenres } from "../media/media-genres";
import { MediaRating } from "../media/media-rating";
import { MediaStatus } from "../media/media-status";
import { Favorite } from "../shared/favorite";
import { Prose } from "../shared/prose";

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
  wikipediaUrl?: string | undefined;
}

export const MovieDetails = ({ movie, wikipediaUrl }: MovieDetailsProps) => {
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
            <div className="flex justify-center gap-4 md:justify-start">
              <Button asChild color="primary">
                <Link
                  params={{ id: movie.id.toString() }}
                  to="/movies/$id/trailer"
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
                favorite={movie.favorite}
                mediaType="movie"
                tmdbId={movie.id}
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
