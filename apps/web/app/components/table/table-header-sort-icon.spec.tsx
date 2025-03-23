import { render, screen } from "@/testing/utils";

import { TableHeaderSortIcon } from "./table-header-sort-icon";

describe("TableHeaderSortIcon", () => {
  it("should render ascending icon", async () => {
    await render(<TableHeaderSortIcon sortDirection="asc" />);

    const icon = screen.getByRole("img", { name: /sorted ascending/i });

    expect(icon).toBeInTheDocument();
  });

  it("should render descending icon", async () => {
    await render(<TableHeaderSortIcon sortDirection="desc" />);

    const icon = screen.getByRole("img", { name: /sorted descending/i });

    expect(icon).toBeInTheDocument();
  });

  it("should render fallback spacer for unsorted", async () => {
    await render(<TableHeaderSortIcon sortDirection={false} />);

    const icon = screen.getByRole("img", { name: /not sorted/i });

    expect(icon).toBeInTheDocument();
  });
});
