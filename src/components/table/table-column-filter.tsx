import type { Header } from "@tanstack/react-table";

interface TableColumnFilterProps<T> {
  header: Header<T, unknown>;
}

export const TableColumnFilter = <T,>({
  header,
}: TableColumnFilterProps<T>) => {
  const columnFilterValue = header.column.getFilterValue();
  const sortedUniqueValues = [...header.column.getFacetedUniqueValues().keys()];

  return header.column.getCanFilter() ? (
    <select
      className="dsy-select grow dsy-select-xs"
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
    <select className="dsy-select grow dsy-select-xs" disabled value="">
      <option value="">All</option>
    </select>
  );
};
