import { urls } from "@/config/urls";
import { render, screen } from "@/testing/utils";

import { SiteFooterNav } from "./site-footer-nav";

describe("SiteFooterNav", () => {
  it("should render GitHub link", async () => {
    await render(<SiteFooterNav />);

    const githubLink = screen.getByRole("link", { name: /github/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", urls.github);
  });

  it("should render GitHub issues link", async () => {
    await render(<SiteFooterNav />);

    const githubIssuesLink = screen.getByRole("link", {
      name: /report a bug/i,
    });

    expect(githubIssuesLink).toBeInTheDocument();
    expect(githubIssuesLink).toHaveAttribute("href", `${urls.github}/issues`);
  });
});
