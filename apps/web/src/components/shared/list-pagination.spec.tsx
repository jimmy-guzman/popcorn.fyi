import { describe, expect, it } from "vitest";

import { render, screen } from "@/testing/utils";

import { ListPagination } from "./list-pagination";

describe("ListPagination", () => {
  it("should render the correct page numbers", async () => {
    await render(<ListPagination page={2} totalPages={5} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should hide 'Previous' button on the first page", async () => {
    await render(<ListPagination page={1} totalPages={5} />);

    expect(screen.queryByLabelText("Previous Page")).not.toBeInTheDocument();
  });

  it("should hide 'Next' button on the last page", async () => {
    await render(<ListPagination page={5} totalPages={5} />);

    expect(screen.queryByLabelText("Next Page")).not.toBeInTheDocument();
  });

  it("should render ellipsis when pagination is large", async () => {
    await render(<ListPagination page={10} totalPages={50} />);

    expect(screen.getAllByLabelText("Ellipsis").length).toBeGreaterThan(0);
  });
});
