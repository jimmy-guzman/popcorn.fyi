import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "./input";

describe("Input", () => {
  it("should render without crashing", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("should call onChange when typing", async () => {
    const handleChange = vi.fn();

    render(<Input onChange={handleChange} />);

    await userEvent.type(screen.getByRole("textbox"), "hello");

    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it("should forward ref correctly", () => {
    const ref = { current: null };

    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("should render with specified type", () => {
    render(<Input type="email" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", "email");
  });
});
