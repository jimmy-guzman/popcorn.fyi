import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { formatDateAsYearOnly } from "@popcorn.fyi/utils";

interface MovieCardProps {
  movie: {
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
          <div className="dsy-badge dsy-badge-accent">
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
        <h2 className="dsy-card-title">{movie.title}</h2>
        {movie.release_date ? (
          <p>{formatDateAsYearOnly(movie.release_date)}</p>
        ) : null}
        <div className="dsy-card-actions justify-end">
          <button
            className="dsy-btn dsy-btn-secondary dsy-btn-sm"
            type="button"
          >
            Details <span className="icon-[lucide--arrow-right] h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
