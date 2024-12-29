import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, useState } from "react";

import { cn } from "@/lib/cn";
import { fuzzyFilter } from "@/lib/fuzzy-filter";

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
    <div>
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
        <div className="col-span-2 flex w-full items-center gap-2">
          <label className="dsy-input flex w-full items-center">
            <span className="sr-only">Search</span>
            <input
              className="w-full"
              onChange={(event) => {
                setGlobalFilter(String(event.target.value));
              }}
              placeholder="Search..."
              type="text"
              value={globalFilter}
            />
            <span className="icon-[lucide--search]" />
          </label>
          {globalFilter ? (
            <button
              className="dsy-btn dsy-btn-neutral dsy-btn-sm"
              onClick={() => {
                table.resetGlobalFilter();
              }}
              type="button"
            >
              Reset <span className="icon-[lucide--list-restart]" />
            </button>
          ) : null}
        </div>

        <div className="flex w-full">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnFilterValue = header.column.getFilterValue();

                  const sortedUniqueValues = [
                    ...header.column.getFacetedUniqueValues().keys(),
                  ];

                  return header.column.getCanFilter() ? (
                    <select
                      className="dsy-select grow"
                      key={header.id}
                      onChange={(e) => {
                        header.column.setFilterValue(e.target.value);
                      }}
                      value={columnFilterValue?.toString()}
                    >
                      <option value="">All</option>
                      {sortedUniqueValues.map((value) => {
                        return (
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- typed as any
                          <option key={value} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  ) : null;
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className={cn("dsy-table", className)}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return <TableHeader header={header} key={header.id} />;
                  })}
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
