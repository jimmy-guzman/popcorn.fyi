import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Select } from "./select";

describe("Select", () => {
  it("should render without crashing", () => {
    render(
      <Select>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </Select>,
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<Select className="custom-class" />);
    expect(screen.getByRole("combobox")).toHaveClass("custom-class");
  });

  it("should call onChange when an option is selected", async () => {
    const handleChange = vi.fn();

    render(
      <Select onChange={handleChange}>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
      </Select>,
    );

    await userEvent.selectOptions(screen.getByRole("combobox"), "banana");

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should forward ref correctly", () => {
    const ref = { current: null };

    render(<Select ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it("should render children correctly", () => {
    render(
      <Select>
        <option value="one">One</option>
        <option value="two">Two</option>
      </Select>,
    );

    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});
