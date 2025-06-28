import { Link } from "@tanstack/react-router";

import { tmdbImageUrl } from "@/lib/api-clients/urls";
import { year } from "@/lib/year";

import { CardImageFallback } from "../media/card-image-fallback";
import { MediaRating } from "../media/media-rating";
import { MediaType } from "../media/media-type";

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
    <Link params={{ id: movie.id }} to="/movies/$id">
      <div className="dsy-card dsy-card-sm md:dsy-card-normal h-full shadow-xl">
        {movie.poster_path ? (
          <figure>
            <img
              alt={movie.title}
              src={tmdbImageUrl(movie.poster_path, "w500")}
            />
          </figure>
        ) : (
          <CardImageFallback />
        )}
        <div className="dsy-card-body">
          <div className="flex justify-end gap-2">
            <MediaRating average={movie.vote_average} />
            <MediaType mediaType={movie.media_type} />
          </div>
          <h2 className="dsy-card-title">{movie.title}</h2>
          {movie.release_date ? <p>{year(movie.release_date)}</p> : "N/A"}
        </div>
      </div>
    </Link>
  );
};
