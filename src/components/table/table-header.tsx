import type { Header } from "@tanstack/react-table";

import { TableHead } from "@/components/ui/table";

import { TableHeaderContent } from "./table-header-content";

export const TableColumnHeader = <T,>({
  header,
}: {
  header: Header<T, unknown>;
}) => {
  const sorted = header.column.getIsSorted();
  const ariaSort =
    sorted === "asc"
      ? "ascending"
      : sorted === "desc"
        ? "descending"
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
