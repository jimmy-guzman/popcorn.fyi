import { render, screen } from "@/testing/utils";

import { TrendingCarousel } from "./trending-carousel";

const mockTrendingData = [
  {
    id: 1,
    media_type: "movie",
  },
  {
    id: 2,
    media_type: "tv",
  },
  {
    id: 3,
    media_type: "person",
  },
  {
    id: 4,
  },
];

describe("<TrendingCarousel />", () => {
  it("should render carousel items for each trending item", async () => {
    await render(<TrendingCarousel trending={mockTrendingData} />);

    const carouselItems = document.querySelectorAll(".dsy-carousel-item");

    expect(carouselItems).toHaveLength(4);
  });

  it("should render navigation dots for each trending item", async () => {
    await render(<TrendingCarousel trending={mockTrendingData} />);

    expect(screen.getByLabelText("Go to slide 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to slide 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to slide 3")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to slide 4")).toBeInTheDocument();
  });

  it("should handle empty trending array", async () => {
    await render(<TrendingCarousel trending={[]} />);

    const carouselItems = document.querySelectorAll(".dsy-carousel-item");

    expect(carouselItems).toHaveLength(0);

    expect(screen.queryByLabelText(/Go to slide/)).not.toBeInTheDocument();
  });

  it("should render different media types", async () => {
    const mixedData = [
      { id: 1, media_type: "movie" },
      { id: 2, media_type: "tv" },
      { id: 3, media_type: "person" },
      { id: 4 },
    ];

    await render(<TrendingCarousel trending={mixedData} />);

    const carouselItems = document.querySelectorAll(".dsy-carousel-item");

    expect(carouselItems).toHaveLength(4);
  });
});
