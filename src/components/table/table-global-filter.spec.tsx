import { render, screen } from "@/testing/utils";

import { TableGlobalFilter } from "./table-global-filter";

describe("TableGlobalFilter", () => {
  it("should show the input field and only display reset button when filtering", async () => {
    await render(
      <TableGlobalFilter
        globalFilter=""
        resetGlobalFilter={vi.fn()}
        setGlobalFilter={vi.fn()}
      />,
    );

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /reset/i }),
    ).not.toBeInTheDocument();
  });

  it("should allow users to type in the search field and update the filter", async () => {
    const setGlobalFilter = vi.fn();

    const { user } = await render(
      <TableGlobalFilter
        globalFilter=""
        resetGlobalFilter={vi.fn()}
        setGlobalFilter={setGlobalFilter}
      />,
    );

    const input = screen.getByPlaceholderText("Search...");

    await user.type(input, "test");

    expect(setGlobalFilter).toHaveBeenLastCalledWith("t");
  });

  it("should allow users to reset the search filter by clicking the reset button", async () => {
    const resetGlobalFilter = vi.fn();

    const { user } = await render(
      <TableGlobalFilter
        globalFilter="test"
        resetGlobalFilter={resetGlobalFilter}
        setGlobalFilter={vi.fn()}
      />,
    );

    const resetButton = screen.getByRole("button", { name: /reset/i });

    // eslint-disable-next-line testing-library/no-node-access -- this is not applicable here
    await user.click(resetButton);

    expect(resetGlobalFilter).toHaveBeenCalledWith();
  });
});
