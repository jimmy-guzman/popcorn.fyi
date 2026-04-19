import type { Header } from "@tanstack/react-table";

import { TableHead } from "@/components/ui/table";

import { TableHeaderContent } from "./table-header-content";

export const TableColumnHeader = <T,>({
  header,
}: {
  header: Header<T, unknown>;
}) => {
  const ariaSort = header.column.getCanSort()
    ? header.column.getIsSorted() === "asc"
      ? "ascending"
      : header.column.getIsSorted() === "desc"
        ? "descending"
        : "none"
    : undefined;

  return (
    <TableHead
      aria-sort={ariaSort}
      className="capitalize"
      colSpan={header.colSpan}
    >
      <div className="min-w-0">
        <TableHeaderContent header={header} />
      </div>
    </TableHead>
  );
};
