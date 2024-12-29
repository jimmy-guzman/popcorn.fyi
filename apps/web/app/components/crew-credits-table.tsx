import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { year } from "@popcorn.fyi/utils";
import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

import { Table } from "./table";

interface Credit {
  department?: string;
  episode_count?: number;
  first_air_date?: string;
  id: number;
  job?: string;
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
          <span className="icon-[lucide--tv]" /> TV Show
        </>
      ) : (
        <>
          <span className="icon-[lucide--clapperboard]" /> Movie
        </>
      );
    },
    enableSorting: false,
    header: () => {
      return null;
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
          <div className="flex items-center gap-3">
            {credit.poster_path ? (
              <div className="dsy-avatar">
                <div className="h-12 w-12 rounded">
                  <img
                    alt={credit.title}
                    src={tmdbImageUrl(credit.poster_path)}
                  />
                </div>
              </div>
            ) : null}
            <div>
              <div className="font-bold">
                <Link
                  className="dsy-link"
                  params={{ id: credit.id.toString() }}
                  to={
                    credit.media_type === "movie"
                      ? "/movies/$id"
                      : "/tv-shows/$id"
                  }
                >
                  {info.getValue()}
                </Link>
              </div>
              <div className="text-sm opacity-50">{credit.job}</div>
            </div>
          </div>
        );
      },
      enableColumnFilter: false,
      id: "Details",
    },
  ),
];

interface CrewCreditsTableProps {
  credits: Credit[];
}

export const CrewCreditsTable = ({ credits }: CrewCreditsTableProps) => {
  return <Table columns={columns} data={credits} />;
};
