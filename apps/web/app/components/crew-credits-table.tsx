import { tmdbImageUrl } from "@popcorn.fyi/tmdb";
import { year } from "@popcorn.fyi/utils";
import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";

import { Table } from "./table";

interface Credit {
  department?: string;
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
    header: "Media",
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
            className="dsy-link dsy-link-hover flex items-center gap-3"
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
      id: "Title/Name",
    },
  ),
  columnHelper.accessor("job", {
    cell: (info) => {
      return info.getValue();
    },
    enableColumnFilter: false,
  }),
  columnHelper.accessor("department", {
    cell: (info) => {
      return info.getValue();
    },
  }),
];

interface CrewCreditsTableProps {
  credits: Credit[];
}

export const CrewCreditsTable = ({ credits }: CrewCreditsTableProps) => {
  return <Table columns={columns} data={credits} />;
};
