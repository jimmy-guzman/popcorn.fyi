import { tmdbImageUrl } from "@popcorn.fyi/api-clients/utils";
import { Card, CardContent, CardImage, CardTitle } from "@popcorn.fyi/ui/card";
import { year } from "@popcorn.fyi/utils";
import { Link } from "@tanstack/react-router";

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
    <Link params={{ id: tvShow.id }} to="/tv-shows/$id">
      <Card>
        {tvShow.poster_path ? (
          <CardImage
            alt={tvShow.name}
            src={tmdbImageUrl(tvShow.poster_path, "w500")}
          />
        ) : (
          <CardImageFallback />
        )}
        <CardContent>
          <div className="flex justify-end gap-2">
            <MediaRating average={tvShow.vote_average} />
            <MediaType mediaType={tvShow.media_type} />
          </div>
          <CardTitle>{tvShow.name}</CardTitle>
          {tvShow.first_air_date ? <p>{year(tvShow.first_air_date)}</p> : "N/A"}
        </CardContent>
      </Card>
    </Link>
  );
};
