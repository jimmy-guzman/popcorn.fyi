import type { CellContext } from "@tanstack/react-table";

import { render, screen } from "@/testing/utils";

import { MediaTableCell } from "./media-table-cell";

describe("MediaTableCell", () => {
  it("should render TV Show when getValue returns 'tv'", async () => {
    const props = {
      getValue: () => "tv",
    } as CellContext<{ id: number; media_type?: string }, string | undefined>;

    await render(<MediaTableCell {...props} />);

    expect(screen.getByText("TV Show")).toBeInTheDocument();
  });

  it("should render Movie when getValue does not return 'tv'", async () => {
    const props = {
      getValue: () => "movie",
    } as CellContext<{ id: number; media_type?: string }, string | undefined>;

    await render(<MediaTableCell {...props} />);

    expect(screen.getByText("Movie")).toBeInTheDocument();
  });
});
