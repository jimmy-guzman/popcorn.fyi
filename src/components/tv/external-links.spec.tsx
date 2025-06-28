import { render, screen } from "@/testing/utils";

import { ExternalLinks } from "./external-links";

describe("ExternalLinks", () => {
  it("should render Wikipedia button when URL is available", async () => {
    await render(<ExternalLinks id={64} />, {
      queryData: [
        [
          ["tv", "details", 64, "external"],
          { wikipedia_url: "https://en.wikipedia.org/wiki/Test_Person" },
        ],
      ],
    });

    const link = await screen.findByRole("link", { name: /wikipedia/i });

    expect(link).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/Test_Person",
    );
  });

  it("should not render buttons when urls are missing", async () => {
    await render(<ExternalLinks id={64} />, {
      queryData: [[["tv", "details", 64, "external"], {}]],
    });

    expect(
      screen.queryByRole("link", { name: /wikipedia/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: /imdb/i }),
    ).not.toBeInTheDocument();
  });

  it("should render imdb button when URL is available", async () => {
    await render(<ExternalLinks id={64} />, {
      queryData: [
        [
          ["tv", "details", 64, "external"],
          { imdb_url: "https://www.imdb.com/title/tt16311594" },
        ],
      ],
    });

    const link = await screen.findByRole("link", { name: /imdb/i });

    expect(link).toHaveAttribute(
      "href",
      "https://www.imdb.com/title/tt16311594",
    );
  });
});
