import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { year } from "@popcorn.fyi/utils";
import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

import { Table } from "./table";

interface Credit {
  character?: string;
  episode_count?: number;
  first_air_date?: string;
  id: number;
  media_type?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  title?: string;
}

const columnHelper = createColumnHelper<Credit>();

const columns = [
  columnHelper.accessor("media_type", {
    cell: (info) => {
      return info.getValue() === "tv" ? (
        <>
          <span className="icon-[lucide--tv]" />{" "}
          <span className="sr-only md:not-sr-only">TV Show</span>
        </>
      ) : (
        <>
          <span className="icon-[lucide--clapperboard]" />{" "}
          <span className="sr-only md:not-sr-only">Movie</span>
        </>
      );
    },
    enableSorting: false,
    header: () => {
      return <span className="sr-only">Media</span>;
    },
  }),
  columnHelper.accessor(
    (originalRow) => {
      return originalRow.release_date ?? originalRow.first_air_date;
    },
    {
      cell: (info) => {
        const value = info.getValue();

        return value ? year(value) : "N/A";
      },
      enableColumnFilter: false,
      header: "Year",
      sortDescFirst: true,
      sortUndefined: "first",
    },
  ),
  columnHelper.accessor(
    (originalRow) => {
      return originalRow.title ?? originalRow.name;
    },
    {
      cell: (info) => {
        const credit = info.row.original;

        return (
          <Link
            className="dsy-link md:dsy-link-hover flex items-center gap-3"
            params={{ id: credit.id.toString() }}
            to={credit.media_type === "movie" ? "/movies/$id" : "/tv-shows/$id"}
          >
            {credit.poster_path ? (
              <div className="dsy-avatar hidden md:block">
                <div className="h-12 w-12 rounded">
                  <img
                    alt={credit.title}
                    src={tmdbImageUrl(credit.poster_path)}
                  />
                </div>
              </div>
            ) : null}
            {info.getValue()}
          </Link>
        );
      },
      enableColumnFilter: false,
      header: "Title/Name",
    },
  ),
  columnHelper.accessor("character", {
    cell: (info) => {
      return info.getValue();
    },
    enableColumnFilter: false,
  }),
  columnHelper.accessor("episode_count", {
    cell: (info) => {
      return info.getValue();
    },
    enableColumnFilter: false,
    header: "Episodes",
    sortUndefined: "last",
  }),
];

interface CastCreditsTableProps {
  credits: Credit[];
}

export const CastCreditsTable = ({ credits }: CastCreditsTableProps) => {
  return <Table columns={columns} data={credits} />;
};
