import { render, screen, waitFor } from "@/testing/utils";

import { ScrollTop } from "./scroll-top";

const scrollTo = (scrollY: number) => {
  Object.defineProperty(globalThis, "scrollY", {
    configurable: true,
    value: scrollY,
    writable: true,
  });

  globalThis.dispatchEvent(new Event("scroll"));
};

describe("<ScrollTop />", () => {
  it("should NOT render at the top of the page", async () => {
    await render(<ScrollTop />);

    expect(
      screen.queryByRole("button", { name: /scroll to top/i }),
    ).not.toBeInTheDocument();
  });

  it("should render once scrolled past a viewport", async () => {
    await render(<ScrollTop />);

    scrollTo(window.innerHeight + 1);

    await expect(
      screen.findByRole("button", { name: /scroll to top/i }),
    ).resolves.toBeInTheDocument();
  });

  it("should scroll back to the top when clicked", async () => {
    const scrollToSpy = vi
      .spyOn(globalThis, "scrollTo")
      .mockReturnValue(undefined);

    const { user } = await render(<ScrollTop />);

    scrollTo(window.innerHeight + 1);

    await user.click(
      await screen.findByRole("button", { name: /scroll to top/i }),
    );

    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0 }),
    );
  });

  it("should stop rendering once scrolled back to the top", async () => {
    await render(<ScrollTop />);

    scrollTo(window.innerHeight + 1);

    await expect(
      screen.findByRole("button", { name: /scroll to top/i }),
    ).resolves.toBeInTheDocument();

    scrollTo(0);

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /scroll to top/i }),
      ).not.toBeInTheDocument();
    });
  });
});
