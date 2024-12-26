import { render, screen } from "@/testing/utils";

import { MediaType } from "./media-type";

describe("MediaType", () => {
  it("should render empty DOM element when no genres", async () => {
    const { container } = await render(<MediaType />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render TV Show when tv media type", async () => {
    await render(<MediaType mediaType="tv" />);

    expect(screen.getByText("TV Show")).toBeInTheDocument();
  });

  it("should render media type", async () => {
    await render(<MediaType mediaType="movie" />);

    expect(screen.getByText("movie")).toBeInTheDocument();
  });
});
