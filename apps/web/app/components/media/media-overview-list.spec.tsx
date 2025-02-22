import { render, screen } from "@/testing/utils";

import { MediaOverviewList } from "./media-overview-list";

describe("MediaOverviewList", () => {
  it("should render without crashing when provided with an empty items array", async () => {
    await render(<MediaOverviewList items={[]} />);

    const list = screen.getByRole("list");

    expect(list).toBeInTheDocument();
  });

  it("should render a list item for each item in the items array", async () => {
    const items = [
      { title: "Title1", value: "Value1" },
      { title: "Title2", value: 123 },
      { title: "Title3" },
    ];

    await render(<MediaOverviewList items={items} />);

    const listItems = screen.getAllByRole("listitem");

    expect(listItems).toHaveLength(3);
  });

  it("should display the correct title and value for each item", async () => {
    const items = [
      { title: "Title1", value: "Value1" },
      { title: "Title2", value: 123 },
      { title: "Title3" },
    ];

    await render(<MediaOverviewList items={items} />);

    expect(screen.getByText("Title1")).toBeInTheDocument();
    expect(screen.getByText("Title2")).toBeInTheDocument();
    expect(screen.getByText("Title3")).toBeInTheDocument();

    expect(screen.getByText("Value1")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("should render JSX elements if value is provided as an array of JSX elements", async () => {
    const items = [
      {
        title: "TitleJSX",
        value: [
          <span key="1">JSX Value 1</span>,
          <span key="2">JSX Value 2</span>,
        ],
      },
    ];

    await render(<MediaOverviewList items={items} />);

    expect(screen.getByText("JSX Value 1")).toBeInTheDocument();
    expect(screen.getByText("JSX Value 2")).toBeInTheDocument();
  });
});
