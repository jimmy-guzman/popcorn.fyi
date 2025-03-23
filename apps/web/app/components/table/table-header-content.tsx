import type { Header } from "@tanstack/react-table";

import { flexRender } from "@tanstack/react-table";

import { TableHeaderSortIcon } from "./table-header-sort-icon";

export const TableHeaderContent = <T,>({
  header,
}: {
  header: Header<T, unknown>;
}) => {
  if (header.isPlaceholder) {
    return null;
  }

  const headerContent = flexRender(
    header.column.columnDef.header,
    header.getContext(),
  );

  return header.column.getCanSort() ? (
    <button
      className="cursor-pointer capitalize"
      onClick={header.column.getToggleSortingHandler()}
      type="button"
    >
      {headerContent}
      <TableHeaderSortIcon sortDirection={header.column.getIsSorted()} />
    </button>
  ) : (
    <span>{headerContent}</span>
  );
};
