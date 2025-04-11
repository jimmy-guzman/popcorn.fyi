import type { CellContext } from "@tanstack/react-table";

type MediaTableCellProps = CellContext<
  { id: number; media_type?: string },
  string | undefined
>;

export const MediaTableCell = (props: MediaTableCellProps) => {
  return props.getValue() === "tv" ? (
    <>
      <span className="icon-[lucide--tv]" /> TV Show
    </>
  ) : (
    <>
      <span className="icon-[lucide--clapperboard]" /> Movie
    </>
  );
};
