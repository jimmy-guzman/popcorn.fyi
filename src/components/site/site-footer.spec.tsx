import { render, screen } from "@/testing/utils";

import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it("should render TMDB link", async () => {
    await render(<SiteFooter />);

    const link = screen.getByRole("link", { name: "TMDB Logo" });

    expect(link).toBeInTheDocument();
  });

  it("should render wikidata link", async () => {
    await render(<SiteFooter />);

    const link = screen.getByRole("link", { name: "Wikidata Logo" });

    expect(link).toBeInTheDocument();
  });

  it("should render Author link", async () => {
    await render(<SiteFooter />);

    const link = screen.getByRole("link", { name: "Jimmy Guzman Moreno" });

    expect(link).toBeInTheDocument();
  });

  it("should render TanStack Start link", async () => {
    await render(<SiteFooter />);

    const link = screen.getByRole("link", { name: "TanStack Start" });

    expect(link).toBeInTheDocument();
  });

  it("should render daisyUI Start link", async () => {
    await render(<SiteFooter />);

    const link = screen.getByRole("link", { name: "daisyUI" });

    expect(link).toBeInTheDocument();
  });

  it("should render vercel Start link", async () => {
    await render(<SiteFooter />);

    const link = screen.getByRole("link", { name: "Vercel" });

    expect(link).toBeInTheDocument();
  });

  it("should display the current year", async () => {
    await render(<SiteFooter />);

    const currentYear = new Date().getFullYear().toString();

    const timeElement = screen.getByRole("time");

    expect(timeElement).toHaveTextContent(currentYear);
  });
});
