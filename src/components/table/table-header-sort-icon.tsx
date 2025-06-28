import type { SortDirection } from "@tanstack/react-table";

interface TableHeaderSortIconProps {
  sortDirection: false | SortDirection;
}

export const TableHeaderSortIcon = ({
  sortDirection,
}: TableHeaderSortIconProps) => {
  if (sortDirection === "asc") {
    return (
      <span
        aria-label="Sorted ascending"
        className="icon-[lucide--arrow-up-wide-narrow] ml-2 h-4 w-4 align-bottom"
        role="img"
      />
    );
  }

  if (sortDirection === "desc") {
    return (
      <span
        aria-label="Sorted descending"
        className="icon-[lucide--arrow-down-wide-narrow] ml-2 h-4 w-4 align-bottom"
        role="img"
      />
    );
  }

  return (
    <span
      aria-label="Not sorted"
      className="ml-2 h-4 w-4 align-bottom"
      role="img"
    >
      &nbsp;
    </span>
  );
};
