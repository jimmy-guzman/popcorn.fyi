import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Outlet } from "@tanstack/react-router";

import { MediaGenres } from "./media-genres";
import { MediaRating } from "./media-rating";

interface TVShowDetailsProps {
  tvShow: {
    backdrop_path?: string;
    genres?: { id: number; name?: string }[];
    id: number;
    name?: string;
    overview?: string;
    poster_path?: string;
    tagline?: string;
    vote_average: number;
  };
}

export const TVShowDetails = ({ tvShow }: TVShowDetailsProps) => {
  return (
    <div className="flex min-h-screen flex-col gap-4 p-8">
      <div className="mx-auto max-w-7xl">
        {tvShow.backdrop_path ? (
          <img
            alt={tvShow.name}
            className="size-full rounded-md object-cover"
            src={tmdbImageUrl(tvShow.backdrop_path)}
          />
        ) : null}
      </div>
      <div className="dsy-hero">
        <div className="dsy-hero-content flex-col lg:flex-row">
          {tvShow.poster_path ? (
            <img
              alt={tvShow.name}
              className="max-w-xl rounded-lg shadow-2xl"
              src={tmdbImageUrl(tvShow.poster_path, "w300")}
            />
          ) : null}
          <div>
            <div className="flex justify-end gap-2">
              <MediaRating average={tvShow.vote_average} />
              <MediaGenres genres={tvShow.genres} />
            </div>
            <div className="prose dsy-prose prose-lg">
              <h1>{tvShow.name}</h1>
              {tvShow.tagline ? <p>&quot;{tvShow.tagline}&quot;</p> : null}
              <p>{tvShow.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
