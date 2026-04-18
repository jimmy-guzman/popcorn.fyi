import { Link } from "@tanstack/react-router";

import { Card, CardContent } from "@/components/ui/card";
import { year } from "@/lib/date";
import { tmdbImageUrl } from "@/lib/tmdb-images";

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
    <Link aria-label={movie.title} params={{ id: movie.id }} to="/movies/$id">
      <Card className="h-full shadow-lg" size="sm">
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
        <CardContent className="flex flex-col gap-2 pt-0">
          <div className="flex justify-end gap-2">
            <MediaRating average={movie.vote_average} />
            <MediaType mediaType={movie.media_type} />
          </div>
          <h2 className="font-heading text-base font-medium">{movie.title}</h2>
          {movie.release_date ? <p>{year(movie.release_date)}</p> : "N/A"}
        </CardContent>
      </Card>
    </Link>
  );
};
