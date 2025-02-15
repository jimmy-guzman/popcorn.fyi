import { render, screen } from "@testing-library/react";

import { Badge } from "./badge";

describe("Badge", () => {
  it("should render with default styles", () => {
    render(<Badge>Default Badge</Badge>);

    const badge = screen.getByText("Default Badge");

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("dsy-badge dsy-badge-md");
    expect(badge).not.toHaveClass(
      "dsy-badge-primary",
      "dsy-badge-success",
      "dsy-badge-outline",
    );
  });

  it("should apply color variants", () => {
    render(<Badge color="primary">Primary Badge</Badge>);

    const badge = screen.getByText("Primary Badge");

    expect(badge).toHaveClass("dsy-badge-primary");
  });

  it("should apply size variants", () => {
    render(<Badge size="xl">XL Badge</Badge>);

    const badge = screen.getByText("XL Badge");

    expect(badge).toHaveClass("dsy-badge-xl");
  });

  it("should apply variant styles", () => {
    render(<Badge variant="outline">Outline Badge</Badge>);

    const badge = screen.getByText("Outline Badge");

    expect(badge).toHaveClass("dsy-badge-outline");
  });

  it("should combine color, size, and variant props correctly", () => {
    render(
      <Badge color="success" size="lg" variant="soft">
        Success Large Soft Badge
      </Badge>,
    );

    const badge = screen.getByText("Success Large Soft Badge");

    expect(badge).toHaveClass("dsy-badge-success dsy-badge-lg dsy-badge-soft");
  });

  it("should merge additional class names", () => {
    render(<Badge className="extra-class">Styled Badge</Badge>);

    const badge = screen.getByText("Styled Badge");

    expect(badge).toHaveClass("extra-class");
  });

  it("should render as different elements when using `asChild`", () => {
    render(
      <Badge asChild>
        <button type="button">Button Badge</button>
      </Badge>,
    );

    const button = screen.getByRole("button", { name: "Button Badge" });

    expect(button).toBeInTheDocument();
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  it("should forward additional props", () => {
    render(<Badge data-testid="custom-badge">Custom Badge</Badge>);

    expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
  });
});
