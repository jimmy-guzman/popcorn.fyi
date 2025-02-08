import type { Header } from "@tanstack/react-table";

export const TableColumnFilter = <T,>({
  header,
}: {
  header: Header<T, unknown>;
}) => {
  const columnFilterValue = header.column.getFilterValue();
  const sortedUniqueValues = [...header.column.getFacetedUniqueValues().keys()];

  return header.column.getCanFilter() ? (
    <select
      className="dsy-select dsy-select-xs grow"
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
  ) : (
    <select className="dsy-select dsy-select-xs grow" disabled>
      <option selected>All</option>
    </select>
  );
};
