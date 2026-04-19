import type { ColumnDef, SortingState } from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@/components/ui/table";
import { fuzzyFilter } from "@/lib/fuzzy-filter";

import { TableGlobalFilter } from "./table-global-filter";
import { TableColumnHeader } from "./table-header";

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

  // eslint-disable-next-line react-hooks/incompatible-library -- TODO: revisit once eslint rule is stable
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: { globalFilter, sorting },
  });

  const { rows } = table.getRowModel();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center py-4">
        <TableGlobalFilter
          globalFilter={globalFilter}
          resetGlobalFilter={table.resetGlobalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <UITable className={className}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableColumnHeader header={header} key={header.id} />
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
    </div>
  );
};
