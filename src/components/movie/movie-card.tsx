import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { year } from "@/lib/date";
import { tmdbImageUrl } from "@/lib/tmdb-images";

import { CardImageFallback } from "../media/card-image-fallback";
import { MediaPreview } from "../media/media-preview";
import { MediaRating } from "../media/media-rating";
import { MediaType } from "../media/media-type";

interface MovieCardProps {
  movie: {
    backdrop_path?: string;
    id: number;
    media_type?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    poster_path?: string;
    release_date?: string;
    title?: string;
    vote_average?: number;
    vote_count?: number;
  };
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const title =
    [movie.title, movie.original_title]
      .map((value) => {
        return value?.trim();
      })
      .find((value) => {
        return value !== undefined && value !== "";
      }) ?? "Untitled movie";

  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <Link aria-label={title} params={{ id: movie.id }} to="/movies/$id" />
        }
      >
        <Card className="h-full pt-0 shadow-lg" size="sm">
          {movie.poster_path ? (
            <img
              alt={title}
              className="aspect-2/3 w-full shrink-0 object-cover"
              src={tmdbImageUrl(movie.poster_path, "w500")}
            />
          ) : (
            <CardImageFallback />
          )}
          <CardHeader className="gap-2">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <CardDescription className="tabular-nums">
              {movie.release_date ? year(movie.release_date) : "N/A"}
            </CardDescription>
            <CardAction className="flex gap-2">
              <MediaRating average={movie.vote_average} />
              <MediaType mediaType={movie.media_type} />
            </CardAction>
          </CardHeader>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-96 p-0" side="right">
        <MediaPreview
          action={
            <Button
              nativeButton={false}
              render={
                <Link params={{ id: movie.id }} to="/movies/$id">
                  View details
                </Link>
              }
              size="sm"
              variant="outline"
            />
          }
          backdropPath={movie.backdrop_path}
          dateLabel="Released"
          originalLanguage={movie.original_language}
          originalTitle={movie.original_title}
          overview={movie.overview}
          posterPath={movie.poster_path}
          releaseDate={movie.release_date}
          title={title}
          voteCount={movie.vote_count}
        />
      </HoverCardContent>
    </HoverCard>
  );
};
