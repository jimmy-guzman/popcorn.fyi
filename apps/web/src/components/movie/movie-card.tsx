import { tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { Card, CardContent, CardImage, CardTitle } from "@popcorn.fyi/ui/card";
import { year } from "@popcorn.fyi/utils";
import { Link } from "@tanstack/react-router";

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
    <Link params={{ id: movie.id.toString() }} to="/movies/$id">
      <Card>
        {movie.poster_path ? (
          <CardImage
            alt={movie.title}
            src={tmdbImageUrl(movie.poster_path, "w500")}
          />
        ) : null}
        <CardContent>
          <div className="flex justify-end gap-2">
            <MediaRating average={movie.vote_average} />
            <MediaType mediaType={movie.media_type} />
          </div>
          <CardTitle>{movie.title}</CardTitle>
          {movie.release_date ? <p>{year(movie.release_date)}</p> : "N/A"}
        </CardContent>
      </Card>
    </Link>
  );
};
