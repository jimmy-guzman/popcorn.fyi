import { render, screen } from "@/testing/utils";

import { MediaRating } from "./media-rating";

describe("MediaRating", () => {
  it("should render N/A when no status", async () => {
    await render(<MediaRating />);

    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("should render media rating", async () => {
    await render(<MediaRating average={9.8877} />);

    expect(screen.getByText("9.9")).toBeInTheDocument();
  });
});
