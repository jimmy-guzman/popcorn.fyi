import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { year } from "@popcorn.fyi/utils";
import { Link } from "@tanstack/react-router";

import { Card, CardContent, CardImage, CardTitle } from "./card";
import { MediaRating } from "./media-rating";
import { MediaType } from "./media-type";

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
    <Link params={{ id: tvShow.id.toString() }} to="/tv-shows/$id">
      <Card>
        {tvShow.poster_path ? (
          <CardImage
            alt={tvShow.name}
            src={tmdbImageUrl(tvShow.poster_path, "w500")}
          />
        ) : null}
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
