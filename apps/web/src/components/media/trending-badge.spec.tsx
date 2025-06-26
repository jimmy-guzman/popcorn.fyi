import { render, screen } from "@/testing/utils";

import { TrendingBadge } from "./trending-badge";

describe("TrendingBadge", () => {
  it("should render the 'Trending' badge with correct text", async () => {
    await render(<TrendingBadge />);

    expect(screen.getByText("Trending")).toBeInTheDocument();
  });
});
