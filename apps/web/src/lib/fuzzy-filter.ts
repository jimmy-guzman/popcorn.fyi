import type { FilterFn } from "@tanstack/react-table";

import { rankItem } from "@tanstack/match-sorter-utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: refactor
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- TODO: refactor
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({ itemRank });

  return itemRank.passed;
};
