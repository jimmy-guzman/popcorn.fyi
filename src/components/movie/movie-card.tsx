import { Link } from "@tanstack/react-router";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <Card className="h-full pt-0 shadow-lg" size="sm">
        {movie.poster_path ? (
          <img
            alt={movie.title ?? ""}
            className="aspect-2/3 w-full shrink-0 object-cover"
            src={tmdbImageUrl(movie.poster_path, "w500")}
          />
        ) : (
          <CardImageFallback />
        )}
        <CardHeader className="gap-2">
          <CardTitle className="text-base font-medium">{movie.title}</CardTitle>
          <CardDescription>
            {movie.release_date ? year(movie.release_date) : "N/A"}
          </CardDescription>
          <CardAction className="flex gap-2">
            <MediaRating average={movie.vote_average} />
            <MediaType mediaType={movie.media_type} />
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
};
