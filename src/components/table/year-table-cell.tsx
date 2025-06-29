import type { CellContext } from "@tanstack/react-table";

import { year } from "@/lib/date";

export const YearTableCell = (
  props: CellContext<
    { first_air_date?: string; id: number; release_date?: string },
    string | undefined
  >,
) => {
  const value = props.getValue();

  return value ? year(value) : "N/A";
};
