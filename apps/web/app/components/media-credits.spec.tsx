import { render, screen } from "@/testing/utils";

import { MediaCredits } from "./media-credits";

describe("MediaCredits", () => {
  it("should show cast when available", async () => {
    await render(<MediaCredits credits={{ cast: [{ id: 1 }] }} />);

    expect(screen.getByRole("list", { name: "Cast" })).toBeInTheDocument();
  });
  it("should NOT show cast when unavailable", async () => {
    await render(<MediaCredits credits={{}} />);

    expect(
      screen.getByText("No cast information available."),
    ).toBeInTheDocument();
  });
  it("should NOT show cast when no cast", async () => {
    await render(<MediaCredits credits={{ cast: [] }} />);

    expect(
      screen.getByText("No cast information available."),
    ).toBeInTheDocument();
  });
  it("should show crew when available", async () => {
    await render(<MediaCredits credits={{ crew: [{ id: 1 }] }} />);

    expect(screen.getByRole("list", { name: "Crew" })).toBeInTheDocument();
  });
  it("should NOT show crew when unavailable", async () => {
    await render(<MediaCredits credits={{}} />);

    expect(
      screen.getByText("No crew information available."),
    ).toBeInTheDocument();
  });
  it("should NOT show cast when no crew", async () => {
    await render(<MediaCredits credits={{ crew: [] }} />);

    expect(
      screen.getByText("No crew information available."),
    ).toBeInTheDocument();
  });
});
