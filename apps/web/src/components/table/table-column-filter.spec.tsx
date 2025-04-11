import type { Header } from "@tanstack/react-table";

import { render, screen } from "@/testing/utils";

import { TableColumnFilter } from "./table-column-filter";

const createMockHeader = (
  canFilter: boolean,
  filterValue: unknown,
  setFilterValue = vi.fn(),
) => {
  return {
    column: {
      getCanFilter: () => canFilter,
      getFacetedUniqueValues: () => {
        return new Map([
          ["A", 1],
          ["B", 2],
          ["C", 3],
        ]);
      },
      getFilterValue: () => filterValue,
      setFilterValue,
    },
  } as unknown as Header<unknown, unknown>;
};

describe("TableColumnFilter", () => {
  it("should render a select dropdown with options when filtering is enabled", async () => {
    await render(<TableColumnFilter header={createMockHeader(true, "")} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("should update the filter value when an option is selected", async () => {
    const setFilterValue = vi.fn();

    const { user } = await render(
      <TableColumnFilter header={createMockHeader(true, "", setFilterValue)} />,
    );

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "B");

    expect(setFilterValue).toHaveBeenCalledWith("B");
  });

  it("should render a disabled select when filtering is not allowed", async () => {
    await render(<TableColumnFilter header={createMockHeader(false, "")} />);

    const select = screen.getByRole("combobox");

    expect(select).toBeDisabled();
    expect(screen.getByText("All")).toBeInTheDocument();
  });
});
