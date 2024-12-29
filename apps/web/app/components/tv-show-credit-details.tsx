import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link } from "@tanstack/react-router";

export const TVCreditDetails = ({
  credit,
}: {
  credit: {
    character?: string;
    episode_count?: number;
    id: number;
    name?: string;
    poster_path?: string;
  };
}) => {
  return (
    <div className="flex items-center gap-3">
      {credit.poster_path ? (
        <div className="dsy-avatar">
          <div className="h-12 w-12 rounded">
            <img alt={credit.name} src={tmdbImageUrl(credit.poster_path)} />
          </div>
        </div>
      ) : null}
      <div>
        <div className="font-bold">
          <Link
            className="dsy-link"
            params={{ id: credit.id.toString() }}
            to="/tv-shows/$id"
          >
            {credit.name}
          </Link>
        </div>
        {credit.episode_count ? (
          <div className="text-sm opacity-50">
            {credit.episode_count} episode
            {credit.episode_count > 1 ? "s" : ""}{" "}
            {credit.character ? `as ${credit.character}` : ""}
          </div>
        ) : null}
      </div>
    </div>
  );
};
