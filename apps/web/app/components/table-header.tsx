import type { Header } from "@tanstack/react-table";

import { flexRender } from "@tanstack/react-table";

import { TableColumnFilter } from "./table-column-filter";

export const TableHeader = <T,>({ header }: { header: Header<T, unknown> }) => {
  return (
    <th className="capitalize" colSpan={header.colSpan} key={header.id}>
      <div className="flex flex-col gap-2">
        {header.isPlaceholder ? null : (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- TODO: refactor
          <div
            className={
              header.column.getCanSort() ? "cursor-pointer select-none" : ""
            }
            onClick={header.column.getToggleSortingHandler()}
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
          </div>
        )}
        <TableColumnFilter header={header} />
      </div>
    </th>
  );
};
