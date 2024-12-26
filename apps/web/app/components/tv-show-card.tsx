import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { year } from "@popcorn.fyi/utils";
import { Link } from "@tanstack/react-router";

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
    <Link
      className="dsy-card hover:bg-base-300 shadow-xl delay-150 hover:scale-105"
      params={{ id: tvShow.id.toString() }}
      to="/tv-shows/$id"
    >
      {tvShow.poster_path ? (
        <figure>
          <img
            alt={tvShow.name}
            src={tmdbImageUrl(tvShow.poster_path, "w500")}
          />
        </figure>
      ) : null}
      <div className="dsy-card-body">
        <div className="flex justify-end gap-2">
          <MediaRating average={tvShow.vote_average} />
          <MediaType mediaType={tvShow.media_type} />
        </div>
        <h2 className="dsy-card-title">{tvShow.name}</h2>
        {tvShow.first_air_date ? <p>{year(tvShow.first_air_date)}</p> : "N/A"}
      </div>
    </Link>
  );
};
