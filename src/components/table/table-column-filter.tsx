import type { Header } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TableColumnFilterProps<T> {
  header: Header<T, unknown>;
}

export const TableColumnFilter = <T,>({
  header,
}: TableColumnFilterProps<T>) => {
  const columnFilterValue = header.column.getFilterValue();
  const sortedUniqueValues = [...header.column.getFacetedUniqueValues().keys()];
  const value = (() => {
    const v = columnFilterValue;

    if (v === undefined || v === null) {
      return "";
    }

    if (
      typeof v === "string" ||
      typeof v === "number" ||
      typeof v === "boolean"
    ) {
      return String(v);
    }

    return "";
  })();

  return header.column.getCanFilter() ? (
    <Select
      onValueChange={(next) => {
        header.column.setFilterValue(next);
      }}
      value={value}
    >
      <SelectTrigger className="h-8 min-w-0 grow" size="sm">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All</SelectItem>
        {sortedUniqueValues.map((unique) => {
          return (
            <SelectItem key={String(unique)} value={String(unique)}>
              {String(unique)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  ) : (
    <Select disabled value="">
      <SelectTrigger className="h-8 min-w-0 grow" size="sm">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All</SelectItem>
      </SelectContent>
    </Select>
  );
};
