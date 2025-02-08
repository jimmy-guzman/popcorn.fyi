import { createColumnHelper } from "@tanstack/react-table";

import { MediaTableCell } from "../media/media-table-cell";
import { Table } from "./table";
import { TitleNameTableCell } from "./title-name-table-cell";
import { YearTableCell } from "./year-table-cell";

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
    cell: MediaTableCell,
    enableSorting: false,
    header: "Media",
  }),
  columnHelper.accessor(
    (originalRow) => {
      return originalRow.release_date ?? originalRow.first_air_date;
    },
    {
      cell: YearTableCell,
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
      cell: TitleNameTableCell,
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
