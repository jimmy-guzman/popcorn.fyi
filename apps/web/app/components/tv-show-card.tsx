import { formatDateAsYearOnly } from "@/lib/date";
import { tmdbImageUrl } from "@/lib/url";

interface TVShowCardProps {
  tvShow: {
    first_air_date?: string;
    name?: string;
    poster_path?: string;
    vote_average?: number;
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
          <div className="dsy-badge dsy-badge-accent">
            {tvShow.vote_average?.toFixed(1) ?? "N/A"}
          </div>
        </div>
        <h2 className="dsy-card-title">{tvShow.name}</h2>
        {tvShow.first_air_date ? (
          <p>{formatDateAsYearOnly(tvShow.first_air_date)}</p>
        ) : null}
        <div className="dsy-card-actions justify-end">
          <button
            className="dsy-btn dsy-btn-secondary dsy-btn-sm"
            type="button"
          >
            Details <span className="icon-[lucide--arrow-right] h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
