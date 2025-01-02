import type { CellContext } from "@tanstack/react-table";

export const MediaTableCell = (
  props: CellContext<{ id: number; media_type?: string }, string | undefined>,
) => {
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
