import type { Header } from "@tanstack/react-table";

import { TableColumnFilter } from "./table-column-filter";
import { TableHeaderContent } from "./table-header-content";

export const TableHeader = <T,>({ header }: { header: Header<T, unknown> }) => {
  return (
    <th className="capitalize" colSpan={header.colSpan} key={header.id}>
      <div className="flex flex-col items-start gap-2">
        <TableHeaderContent header={header} />
        <TableColumnFilter header={header} />
      </div>
    </th>
  );
};
