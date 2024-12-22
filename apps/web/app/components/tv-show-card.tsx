import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { year } from "@popcorn.fyi/utils";
import { Link } from "@tanstack/react-router";

import { MediaRating } from "./media-rating";

interface TVShowCardProps {
  tvShow: {
    first_air_date?: string;
    id: number;
    name?: string;
    poster_path?: string;
    vote_average: number;
  };
}

export const TVShowCard = ({ tvShow }: TVShowCardProps) => {
  return (
    <div className="dsy-card bg-base-100 shadow-xl">
      {tvShow.poster_path ? (
        <figure>
          <img
            alt={tvShow.name}
            src={tmdbImageUrl(tvShow.poster_path, "w500")}
          />
        </figure>
      ) : null}
      <div className="dsy-card-body">
        <div className="flex">
          <MediaRating average={tvShow.vote_average} />
        </div>
        <h2 className="dsy-card-title">{tvShow.name}</h2>
        {tvShow.first_air_date ? <p>{year(tvShow.first_air_date)}</p> : "N/A"}
        <div className="dsy-card-actions justify-end">
          <Link
            className="dsy-btn dsy-btn-secondary dsy-btn-sm"
            params={{ id: tvShow.id.toString() }}
            to="/tv-shows/$id"
          >
            Details <span className="icon-[lucide--arrow-right] h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
