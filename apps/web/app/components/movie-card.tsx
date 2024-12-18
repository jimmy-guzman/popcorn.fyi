import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { formatDateAsYearOnly } from "@popcorn.fyi/utils";
import { Link } from "@tanstack/react-router";

import { MediaRating } from "./media-rating";

interface MovieCardProps {
  movie: {
    id: number;
    poster_path?: string;
    release_date?: string;
    title?: string;
    vote_average: number;
  };
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="dsy-card bg-base-100 shadow-xl">
      {movie.poster_path ? (
        <figure>
          <img
            alt={movie.title}
            src={tmdbImageUrl(movie.poster_path, "w500")}
          />
        </figure>
      ) : null}
      <div className="dsy-card-body">
        <div className="flex">
          <MediaRating average={movie.vote_average} />
        </div>
        <h2 className="dsy-card-title">{movie.title}</h2>
        {movie.release_date ? (
          <p>{formatDateAsYearOnly(movie.release_date)}</p>
        ) : null}
        <div className="dsy-card-actions justify-end">
          <Link
            className="dsy-btn dsy-btn-secondary dsy-btn-sm"
            params={{ id: movie.id.toString() }}
            to="/movies/$id"
          >
            Details <span className="icon-[lucide--arrow-right] h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
