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

interface TVShowCardProps {
  tvShow: {
    backdrop_path?: string;
    first_air_date?: string;
    id: number;
    media_type?: string;
    name?: string;
    original_language?: string;
    original_name?: string;
    overview?: string;
    poster_path?: string;
    vote_average?: number;
    vote_count?: number;
  };
}

export const TVShowCard = ({ tvShow }: TVShowCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <Link
            aria-label={tvShow.name}
            params={{ id: tvShow.id }}
            to="/tv-shows/$id"
          />
        }
      >
        <Card className="h-full pt-0 shadow-lg" size="sm">
          {tvShow.poster_path ? (
            <img
              alt={tvShow.name ?? ""}
              className="aspect-2/3 w-full shrink-0 object-cover"
              src={tmdbImageUrl(tvShow.poster_path, "w500")}
            />
          ) : (
            <CardImageFallback />
          )}
          <CardHeader className="gap-2">
            <CardTitle className="text-base font-medium">
              {tvShow.name}
            </CardTitle>
            <CardDescription className="tabular-nums">
              {tvShow.first_air_date ? year(tvShow.first_air_date) : "N/A"}
            </CardDescription>
            <CardAction className="flex gap-2">
              <MediaRating average={tvShow.vote_average} />
              <MediaType mediaType={tvShow.media_type} />
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
                <Link params={{ id: tvShow.id }} to="/tv-shows/$id">
                  View details
                </Link>
              }
              size="sm"
              variant="outline"
            />
          }
          backdropPath={tvShow.backdrop_path}
          dateLabel="First aired"
          originalLanguage={tvShow.original_language}
          originalTitle={tvShow.original_name}
          overview={tvShow.overview}
          posterPath={tvShow.poster_path}
          releaseDate={tvShow.first_air_date}
          title={tvShow.name ?? "Untitled TV show"}
          voteCount={tvShow.vote_count}
        />
      </HoverCardContent>
    </HoverCard>
  );
};
