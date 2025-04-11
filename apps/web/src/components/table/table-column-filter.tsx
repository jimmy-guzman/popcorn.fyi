import type { Header } from "@tanstack/react-table";

import { Select } from "@popcorn.fyi/ui/select";

export const TableColumnFilter = <T,>({
  header,
}: {
  header: Header<T, unknown>;
}) => {
  const columnFilterValue = header.column.getFilterValue();
  const sortedUniqueValues = [...header.column.getFacetedUniqueValues().keys()];

  return header.column.getCanFilter() ? (
    <Select
      className="grow"
      onChange={(e) => {
        header.column.setFilterValue(e.target.value);
      }}
      size="xs"
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
    </Select>
  ) : (
    <Select className="grow" disabled>
      <option selected>All</option>
    </Select>
  );
};
