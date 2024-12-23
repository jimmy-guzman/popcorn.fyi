import { render, screen } from "@/testing/utils";

import { MediaGenres } from "./media-genres";

describe("MediaGenres", () => {
  it("should render empty DOM element when no genres", async () => {
    const { container } = await render(<MediaGenres genres={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render empty DOM element when no genres provided", async () => {
    const { container } = await render(<MediaGenres />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render genres", async () => {
    await render(<MediaGenres genres={[{ id: 1, name: "Fantasy" }]} />);

    expect(screen.getByText("Fantasy")).toBeInTheDocument();
  });
});
