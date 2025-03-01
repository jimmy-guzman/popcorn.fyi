import { render, screen } from "@/testing/utils";

import { ExpandedPlot } from "./expanded-plot";

describe("ExpandedPlot", () => {
  it("should render without crashing", async () => {
    await render(<ExpandedPlot />);

    expect(
      screen.getByRole("heading", { name: /expanded plot/i }),
    ).toBeInTheDocument();
  });

  it("should show AI disclaimer", async () => {
    await render(<ExpandedPlot />);

    expect(
      screen.getByText(/this content was generated by ai/i),
    ).toBeInTheDocument();
  });

  it("should render first summary paragraph", async () => {
    await render(
      <ExpandedPlot
        summaries={{
          long: [
            { spoiler: "Spoiler 1", text: "Paragraph 1" },
            { spoiler: "Spoiler 2", text: "Paragraph 2" },
          ],
        }}
      />,
    );

    expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
    expect(screen.queryByText("Paragraph 2")).not.toBeInTheDocument();
  });

  it("should hide spoilers by default", async () => {
    await render(
      <ExpandedPlot
        summaries={{
          long: [{ spoiler: "Secret twist", text: "Main plot" }],
        }}
      />,
    );

    const spoilerText = screen.getByText("Secret twist");
    expect(spoilerText).toHaveClass("blur-sm");
  });

  it("should reveal spoilers when toggled", async () => {
    const { user } = await render(
      <ExpandedPlot
        summaries={{
          long: [{ spoiler: "Secret twist", text: "Main plot" }],
        }}
      />,
    );

    const toggle = screen.getByRole("checkbox", { name: /reveal spoilers/i });
    await user.click(toggle);
    expect(screen.getByText("Secret twist")).not.toHaveClass("blur-sm");
  });

  it("should expand and collapse content", async () => {
    const { user } = await render(
      <ExpandedPlot
        summaries={{
          long: [
            { text: "Paragraph 1" },
            { text: "Paragraph 2" },
            { text: "Paragraph 3" },
          ],
        }}
      />,
    );

    expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
    expect(screen.queryByText("Paragraph 2")).not.toBeInTheDocument();

    const readMoreButton = screen.getByRole("button", { name: /read more/i });
    await user.click(readMoreButton);
    expect(screen.getByText("Paragraph 2")).toBeInTheDocument();

    await user.click(readMoreButton);
    expect(screen.getByText("Paragraph 3")).toBeInTheDocument();

    const readLessButton = screen.getByRole("button", { name: /read less/i });
    await user.click(readLessButton);
    expect(screen.queryByText("Paragraph 2")).not.toBeInTheDocument();
  });
});
