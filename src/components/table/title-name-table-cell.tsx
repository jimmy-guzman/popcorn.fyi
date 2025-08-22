import type { CellContext } from "@tanstack/react-table";

import { Link } from "@tanstack/react-router";

import { tmdbImageUrl } from "@/lib/tmdb-images";

export const TitleNameTableCell = (
  props: CellContext<
    { id: number; media_type?: string; poster_path?: string },
    string | undefined
  >,
) => {
  const credit = props.row.original;

  return (
    <Link
      className="flex dsy-link items-center gap-3 dsy-link-hover"
      params={{ id: credit.id }}
      to={credit.media_type === "movie" ? "/movies/$id" : "/tv-shows/$id"}
    >
      {credit.poster_path ? (
        <div className="dsy-avatar hidden md:block">
          <div className="h-12 w-12 rounded">
            <img
              alt={props.getValue()}
              src={tmdbImageUrl(credit.poster_path)}
            />
          </div>
        </div>
      ) : null}
      {props.getValue()}
    </Link>
  );
};
