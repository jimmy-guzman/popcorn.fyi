import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

import { cn } from "@popcorn.fyi/ui/utils";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { fuzzyFilter } from "@/lib/fuzzy-filter";

import { TableGlobalFilter } from "./table-global-filter";
import { TableHeader } from "./table-header";

export const Table = <TData,>({
  className,
  columns,
  data,
}: {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: refactor
  columns: ColumnDef<TData, any>[];
  data: TData[];
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: { columnFilters, globalFilter, sorting },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid w-full grid-cols-1 items-center md:w-3/4 lg:w-1/2">
        <TableGlobalFilter
          globalFilter={globalFilter}
          resetGlobalFilter={table.resetGlobalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="overflow-x-auto">
        <table className={cn("dsy-table", className)}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHeader header={header} key={header.id} />
                  ))}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
