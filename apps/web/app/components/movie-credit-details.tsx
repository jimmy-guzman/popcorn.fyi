import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { Link } from "@tanstack/react-router";

export const MovieCreditDetails = ({
  credit,
}: {
  credit: {
    character?: string;
    id: number;
    poster_path?: string;
    title?: string;
  };
}) => {
  return (
    <div className="flex items-center gap-3">
      {credit.poster_path ? (
        <div className="dsy-avatar">
          <div className="h-12 w-12 rounded">
            <img alt={credit.title} src={tmdbImageUrl(credit.poster_path)} />
          </div>
        </div>
      ) : null}
      <div>
        <div className="font-bold">
          <Link
            className="dsy-link"
            params={{ id: credit.id.toString() }}
            to="/movies/$id"
          >
            {credit.title}
          </Link>
        </div>
        <div className="text-sm opacity-50">{credit.character}</div>
      </div>
    </div>
  );
};
