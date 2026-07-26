import type { Header } from "@tanstack/react-table";

import { flexRender } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

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

  const sorted = header.column.getIsSorted();

  const SortIcon =
    sorted === "asc"
      ? ArrowUpIcon
      : sorted === "desc"
        ? ArrowDownIcon
        : ArrowUpDownIcon;

  const sortDirectionLabel =
    sorted === "asc"
      ? "sorted ascending"
      : sorted === "desc"
        ? "sorted descending"
        : "not sorted";

  return header.column.getCanSort() ? (
    <Button
      className="-ml-3 h-8 gap-0 px-3 capitalize"
      onClick={header.column.getToggleSortingHandler()}
      size="sm"
      type="button"
      variant="ghost"
    >
      {headerContent}
      <SortIcon aria-hidden className="ml-2 size-4 shrink-0" />
      <span className="sr-only">{sortDirectionLabel}</span>
    </Button>
  ) : (
    <span className="capitalize">{headerContent}</span>
  );
};
