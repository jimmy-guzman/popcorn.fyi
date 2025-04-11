import { render, screen } from "@/testing/utils";

import { MediaStatus } from "./media-status";

describe("MediaStatus", () => {
  it("should render empty DOM element when no status", async () => {
    const { container } = await render(<MediaStatus />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render media status", async () => {
    await render(<MediaStatus status="released" />);

    expect(screen.getByText("released")).toBeInTheDocument();
  });
});
