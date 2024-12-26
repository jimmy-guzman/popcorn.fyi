import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { year } from "@popcorn.fyi/utils";
import { Link } from "@tanstack/react-router";

import { MediaRating } from "./media-rating";
import { MediaType } from "./media-type";

interface MovieCardProps {
  movie: {
    id: number;
    media_type?: string;
    poster_path?: string;
    release_date?: string;
    title?: string;
    vote_average?: number;
  };
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      className="dsy-card hover:bg-base-300 shadow-xl hover:mix-blend-plus-lighter"
      params={{ id: movie.id.toString() }}
      to="/movies/$id"
    >
      {movie.poster_path ? (
        <figure>
          <img
            alt={movie.title}
            src={tmdbImageUrl(movie.poster_path, "w500")}
          />
        </figure>
      ) : null}
      <div className="dsy-card-body">
        <div className="flex justify-end gap-2">
          <MediaRating average={movie.vote_average} />
          <MediaType mediaType={movie.media_type} />
        </div>
        <h2 className="dsy-card-title">{movie.title}</h2>
        {movie.release_date ? <p>{year(movie.release_date)}</p> : "N/A"}
      </div>
    </Link>
  );
};
