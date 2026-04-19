import type { Header } from "@tanstack/react-table";

import { flexRender } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";

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

  return header.column.getCanSort() ? (
    <Button
      className="-ml-3 h-8 gap-0 px-3 capitalize"
      onClick={() => {
        header.column.toggleSorting(header.column.getIsSorted() === "asc");
      }}
      size="sm"
      type="button"
      variant="ghost"
    >
      {headerContent}
      <ArrowUpDownIcon aria-hidden className="ml-2 size-4 shrink-0" />
    </Button>
  ) : (
    <span className="capitalize">{headerContent}</span>
  );
};
