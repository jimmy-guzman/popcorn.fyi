import { createColumnHelper } from "@tanstack/react-table";

import { MediaTableCell } from "../media/media-table-cell";
import { Table } from "./table";
import { TitleNameTableCell } from "./title-name-table-cell";
import { YearTableCell } from "./year-table-cell";

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
    cell: MediaTableCell,
    enableSorting: false,
    header: "Media",
  }),
  columnHelper.accessor(
    (originalRow) => originalRow.release_date ?? originalRow.first_air_date,
    {
      cell: YearTableCell,
      header: "Year",
      sortDescFirst: true,
      sortUndefined: "first",
    },
  ),
  columnHelper.accessor(
    (originalRow) => originalRow.title ?? originalRow.name,
    {
      cell: TitleNameTableCell,
      header: "Title/Name",
    },
  ),
  columnHelper.accessor("character", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("episode_count", {
    cell: (info) => info.getValue(),
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
