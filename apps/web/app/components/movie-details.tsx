import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Outlet } from "@tanstack/react-router";

import { MediaGenres } from "./media-genres";
import { MediaRating } from "./media-rating";

interface MovieDetailsProps {
  movie: {
    backdrop_path?: string;
    genres?: { id: number; name?: string }[];
    id: number;
    overview?: string;
    poster_path?: string;
    tagline?: string;
    title?: string;
    vote_average: number;
  };
}

export const MovieDetails = ({ movie }: MovieDetailsProps) => {
  return (
    <div className="flex min-h-screen flex-col gap-4 p-8">
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
        <div className="dsy-hero-content flex-col lg:flex-row">
          {movie.poster_path ? (
            <img
              alt={movie.title}
              className="max-w-xl rounded-lg shadow-2xl md:hidden lg:block"
              src={tmdbImageUrl(movie.poster_path, "w300")}
            />
          ) : null}
          <div>
            <div className="flex justify-end gap-2">
              <MediaRating average={movie.vote_average} />
              <MediaGenres genres={movie.genres} />
            </div>
            <div className="prose dsy-prose prose-lg">
              <h1>{movie.title}</h1>
              {movie.tagline ? <p>&quot;{movie.tagline}&quot;</p> : null}
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
