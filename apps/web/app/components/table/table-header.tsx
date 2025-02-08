import type { Header } from "@tanstack/react-table";

import { flexRender } from "@tanstack/react-table";

import { TableColumnFilter } from "./table-column-filter";

export const TableHeader = <T,>({ header }: { header: Header<T, unknown> }) => {
  return (
    <th className="capitalize" colSpan={header.colSpan} key={header.id}>
      <div className="flex flex-col items-start gap-2">
        {header.isPlaceholder ? null : header.column.getCanSort() ? (
          <button
            className="cursor-pointer capitalize"
            onClick={header.column.getToggleSortingHandler()}
            type="button"
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {{
              asc: (
                <span className="icon-[lucide--arrow-up-wide-narrow] ml-2 h-4 w-4 align-bottom" />
              ),
              desc: (
                <span className="icon-[lucide--arrow-down-wide-narrow] ml-2 h-4 w-4 align-bottom" />
              ),
            }[header.column.getIsSorted() as string] ?? (
              <span className="ml-2 h-4 w-4 align-bottom">&nbsp;</span>
            )}
          </button>
        ) : (
          <span>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </span>
        )}
        <TableColumnFilter header={header} />
      </div>
    </th>
  );
};
