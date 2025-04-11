import { urls } from "@/config/urls";
import { render, screen } from "@/testing/utils";

import { MediaWatch } from "./media-watch";

describe("MediaWatch", () => {
  it("should render the Providers header and provider sections when watchProviders.US is provided", async () => {
    const watchProviders = {
      US: {
        ads: [
          {
            logo_path: "/ads.jpg",
            provider_id: 2,
            provider_name: "AdsProvider",
          },
        ],
        buy: [
          {
            logo_path: "/buy.jpg",
            provider_id: 3,
            provider_name: "BuyProvider",
          },
        ],
        flatrate: [
          {
            logo_path: "/flatrate.jpg",
            provider_id: 1,
            provider_name: "FlatrateProvider",
          },
        ],
        link: "http://example.com",
        rent: [
          {
            logo_path: "/rent.jpg",
            provider_id: 4,
            provider_name: "RentProvider",
          },
        ],
      },
    };

    await render(<MediaWatch watchProviders={watchProviders} />);

    expect(
      screen.getByRole("heading", { name: /providers/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("columnheader", { name: /stream/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /ads/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /buy/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /rent/i }),
    ).toBeInTheDocument();
  });

  it("should render a message when watchProviders.US is not provided", async () => {
    const watchProviders = {}; // No US key provided

    await render(<MediaWatch watchProviders={watchProviders} />);

    expect(screen.getByText(/no providers available/i)).toBeInTheDocument();
  });

  it("should render the JustWatch logo and link in the aside", async () => {
    const watchProviders = {
      US: {},
    };

    await render(<MediaWatch watchProviders={watchProviders} />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", urls.JustWatch);

    const logo = screen.getByRole("img", { name: /justwatch/i });

    expect(logo).toHaveAttribute("src", urls.JustWatchLogo);
  });
});
