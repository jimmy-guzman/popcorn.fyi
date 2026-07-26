import type { CellContext } from "@tanstack/react-table";

import { ClapperboardIcon, TvIcon } from "lucide-react";

type MediaTableCellProps = CellContext<
  { id: number; media_type?: string },
  string | undefined
>;

export const MediaTableCell = ({ getValue }: MediaTableCellProps) => {
  return getValue() === "tv" ? (
    <>
      <TvIcon className="inline size-4 align-text-bottom" /> TV Show
    </>
  ) : (
    <>
      <ClapperboardIcon className="inline size-4 align-text-bottom" /> Movie
    </>
  );
};
