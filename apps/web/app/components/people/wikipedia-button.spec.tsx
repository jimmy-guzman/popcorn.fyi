import { render, screen } from "@/testing/utils";

import { WikipediaButton } from "./wikipedia-button";

describe("WikipediaButton", () => {
  it("should render Wikipedia button when URL is available", async () => {
    await render(<WikipediaButton id={64} />, {
      queryData: [
        [
          ["person", "details", 64, "external"],
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

  it("should not render button when Wikipedia URL is missing", async () => {
    await render(<WikipediaButton id={64} />, {
      queryData: [[["person", "details", 64, "external"], {}]],
    });

    expect(
      screen.queryByRole("link", { name: /wikipedia/i }),
    ).not.toBeInTheDocument();
  });
});
