import { screen } from "@testing-library/react";

import { render } from "@/testing/utils"; // your custom render

import { CardImageFallback } from "./card-image-fallback";

describe("CardImageFallback", () => {
  it("should render an accessible fallback image container", async () => {
    await render(<CardImageFallback />);

    const fallback = screen.getByRole("img", {
      name: /image unavailable/i,
    });

    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveClass("aspect-2/3");
  });

  it("should let the caller override the aspect ratio", async () => {
    await render(<CardImageFallback className="aspect-video" />);

    const fallback = screen.getByRole("img", {
      name: /image unavailable/i,
    });

    expect(fallback).toHaveClass("aspect-video");
    expect(fallback).not.toHaveClass("aspect-2/3");
  });
});
