import { render, screen } from "@/testing/utils";

import { ExpandMoreLess } from "./expand-more-less";

describe("ExpandMoreLess", () => {
  it("should render nothing when summaryLength is 0", async () => {
    const { container } = await render(
      <ExpandMoreLess
        handleExpand={vi.fn()}
        isExpanded={1}
        summaryLength={0}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should render nothing when summaryLength is 1", async () => {
    const { container } = await render(
      <ExpandMoreLess
        handleExpand={vi.fn()}
        isExpanded={1}
        summaryLength={1}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should show only Read More when not fully expanded", async () => {
    await render(
      <ExpandMoreLess
        handleExpand={vi.fn()}
        isExpanded={1}
        summaryLength={3}
      />,
    );

    expect(
      screen.getByRole("button", { name: /read more/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /read less/i }),
    ).not.toBeInTheDocument();
  });

  it("should show both buttons when partially expanded", async () => {
    await render(
      <ExpandMoreLess
        handleExpand={vi.fn()}
        isExpanded={2}
        summaryLength={3}
      />,
    );

    expect(
      screen.getByRole("button", { name: /read more/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /read less/i }),
    ).toBeInTheDocument();
  });

  it("should show only Read Less when fully expanded", async () => {
    await render(
      <ExpandMoreLess
        handleExpand={vi.fn()}
        isExpanded={3}
        summaryLength={3}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /read more/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /read less/i }),
    ).toBeInTheDocument();
  });

  it("should call handleExpand with a function value on Read More click", async () => {
    const handleExpand = vi.fn();
    const { user } = await render(
      <ExpandMoreLess
        handleExpand={handleExpand}
        isExpanded={1}
        summaryLength={3}
      />,
    );

    await user.click(screen.getByRole("button", { name: /read more/i }));

    expect(handleExpand).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should call handleExpand with 1 on Read Less click", async () => {
    const handleExpand = vi.fn();
    const { user } = await render(
      <ExpandMoreLess
        handleExpand={handleExpand}
        isExpanded={3}
        summaryLength={3}
      />,
    );

    await user.click(screen.getByRole("button", { name: /read less/i }));

    expect(handleExpand).toHaveBeenCalledWith(1);
  });
});
