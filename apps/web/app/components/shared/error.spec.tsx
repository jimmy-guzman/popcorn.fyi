import { render, screen } from "@/testing/utils";

import { Error as ErrorComponent } from "./error";

describe("Error", () => {
  it("should show error when not 'Not authenticated'", async () => {
    await render(
      <ErrorComponent
        error={new Error("Something went wrong")}
        reset={vi.fn()}
      />,
    );

    expect(screen.queryByTestId("clerk-signin")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Error" }),
    ).toBeInTheDocument();
  });
});
