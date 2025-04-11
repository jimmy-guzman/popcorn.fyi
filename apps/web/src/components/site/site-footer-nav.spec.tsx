import { render, screen } from "@/testing/utils";

import { SiteFooterNav } from "./site-footer-nav";

describe("SiteFooterNav", () => {
  it("should render GitHub and Storybook links", async () => {
    await render(<SiteFooterNav />);

    const githubLink = screen.getByRole("link", { name: /github/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      expect.stringContaining("github"),
    );

    const storybookLink = screen.getByRole("link", { name: /storybook/i });

    expect(storybookLink).toBeInTheDocument();
    expect(storybookLink).toHaveAttribute(
      "href",
      expect.stringContaining("storybook"),
    );
  });
});
