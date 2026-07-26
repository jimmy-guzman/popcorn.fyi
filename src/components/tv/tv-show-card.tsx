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

interface TVShowCardProps {
  tvShow: {
    first_air_date?: string;
    id: number;
    media_type?: string;
    name?: string;
    poster_path?: string;
    vote_average?: number;
  };
}

export const TVShowCard = ({ tvShow }: TVShowCardProps) => {
  return (
    <Link
      aria-label={tvShow.name}
      params={{ id: tvShow.id }}
      to="/tv-shows/$id"
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
          <CardTitle className="text-base font-medium">{tvShow.name}</CardTitle>
          <CardDescription>
            {tvShow.first_air_date ? year(tvShow.first_air_date) : "N/A"}
          </CardDescription>
          <CardAction className="flex gap-2">
            <MediaRating average={tvShow.vote_average} />
            <MediaType mediaType={tvShow.media_type} />
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
};
