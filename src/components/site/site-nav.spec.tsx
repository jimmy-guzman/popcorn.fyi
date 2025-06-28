import { topNav } from "@/config/nav";
import { site } from "@/config/site";
import { render, screen } from "@/testing/utils";

import { SiteNav } from "./site-nav";

describe("SiteNav", () => {
  it("should render the site logo", async () => {
    await render(<SiteNav />);

    const logo = screen.getByRole("link", { name: site.title });

    expect(logo).toBeInTheDocument();
  });

  it("should link the logo to home", async () => {
    await render(<SiteNav />);

    const homeLink = screen.getByRole("link", { name: site.title });

    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render each top-level nav section title", async () => {
    await render(<SiteNav />);

    for (const [index, item] of topNav.entries()) {
      const role = index === 0 ? "link" : "button";

      expect(screen.getByRole(role, { name: item.title })).toBeInTheDocument();
    }
  });

  it("should render the search input", async () => {
    await render(<SiteNav />);

    const input = screen.getByRole("searchbox", {
      name: "Search movies and TV shows",
    });

    expect(input).toBeInTheDocument();
  });

  it("should render the mobile menu", async () => {
    await render(<SiteNav />);

    const menuButton = screen.getByRole("button", {
      name: "Open Navigation Menu",
    });

    expect(menuButton).toBeInTheDocument();
  });
});
