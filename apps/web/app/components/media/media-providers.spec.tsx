import { render, screen } from "@/testing/utils";

import { MediaProviders } from "./media-providers";

describe("MediaProviders", () => {
  it("should render without crashing when provided with an empty providers array", async () => {
    await render(<MediaProviders providers={[]} title="buy" />);

    const header = screen.getByRole("columnheader", { name: /buy/i });

    expect(header).toBeInTheDocument();

    const images = screen.queryAllByRole("img");

    expect(images).toHaveLength(0);
  });

  it("should render a table row for each provider that has a logo_path", async () => {
    const providers = [
      { logo_path: "/logo1.jpg", provider_id: 1, provider_name: "Provider1" },
      { provider_id: 2, provider_name: "Provider2" },
      { logo_path: "/logo3.jpg", provider_id: 3, provider_name: "Provider3" },
    ];

    await render(<MediaProviders providers={providers} title="stream" />);

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(2);
  });

  it("should display the provider's name and render the image with correct alt attribute and src", async () => {
    const provider = {
      logo_path: "/netflix.jpg",
      provider_id: 1,
      provider_name: "Netflix",
    };

    await render(<MediaProviders providers={[provider]} title="rent" />);

    expect(screen.getByText("Netflix")).toBeInTheDocument();

    const image = screen.getByRole("img", { name: /netflix/i });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/original//netflix.jpg",
    );
  });
});
