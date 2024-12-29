import { year } from "@popcorn.fyi/utils";
import { createColumnHelper } from "@tanstack/react-table";

import { MovieCreditDetails } from "./movie-credit-details";
import { Table } from "./table";
import { TVCreditDetails } from "./tv-show-credit-details";

interface Credit {
  character?: string;
  episode_count?: number;
  first_air_date?: string;
  id: number;
  media_type?: string;
  name?: string;
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
        const mediaType = info.row.original.media_type;

        return mediaType === "tv" ? (
          <TVCreditDetails credit={info.row.original} />
        ) : (
          <MovieCreditDetails credit={info.row.original} />
        );
      },
      enableColumnFilter: false,
      header: "Details",
    },
  ),
];

interface CastCreditsTableProps {
  credits: Credit[];
}

export const CastCreditsTable = ({ credits }: CastCreditsTableProps) => {
  return <Table columns={columns} data={credits} />;
};
