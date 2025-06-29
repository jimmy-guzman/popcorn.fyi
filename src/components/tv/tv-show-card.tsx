import { Link } from "@tanstack/react-router";

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
    <Link params={{ id: tvShow.id }} to="/tv-shows/$id">
      <div className="dsy-card dsy-card-sm md:dsy-card-normal h-full shadow-xl">
        {tvShow.poster_path ? (
          <figure>
            <img
              alt={tvShow.name}
              src={tmdbImageUrl(tvShow.poster_path, "w500")}
            />
          </figure>
        ) : (
          <CardImageFallback />
        )}
        <div className="dsy-card-body">
          <div className="flex justify-end gap-2">
            <MediaRating average={tvShow.vote_average} />
            <MediaType mediaType={tvShow.media_type} />
          </div>
          <h2 className="dsy-card-title">{tvShow.name}</h2>
          {tvShow.first_air_date ? <p>{year(tvShow.first_air_date)}</p> : "N/A"}
        </div>
      </div>
    </Link>
  );
};
