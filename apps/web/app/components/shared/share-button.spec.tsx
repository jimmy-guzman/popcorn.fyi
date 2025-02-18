import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";

import { site } from "@/config/site";

import { ShareButton } from "./share-button";

vi.mock("sonner", () => {
  return {
    toast: { success: vi.fn() },
  };
});

describe("ShareButton", () => {
  const title = "Inception";
  const url = "/movies/123";

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call navigator.share when available", async () => {
    const shareMock = vi.fn();
    Object.defineProperty(navigator, "share", {
      value: shareMock,
      writable: true,
    });

    render(<ShareButton title={title} url={url} />);

    await userEvent.click(screen.getByRole("button", { name: /share/i }));

    expect(shareMock).toHaveBeenCalledWith({
      text: `Check out "${title}" on ${site.title}!`,
      title,
      url,
    });
  });

  it("should fall back to clipboard when navigator.share is unavailable", async () => {
    vi.spyOn(navigator, "share").mockImplementation(undefined as never);

    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    render(<ShareButton title={title} url={url} />);

    await userEvent.click(screen.getByRole("button", { name: /share/i }));

    // eslint-disable-next-line @typescript-eslint/unbound-method -- it's ok due to stubGlobal
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(url);
    expect(toast.success).toHaveBeenCalledWith("Link copied to clipboard!");
  });

  it("should render the button with an icon", () => {
    render(<ShareButton title={title} url={url} />);

    expect(screen.getByRole("button", { name: /share/i })).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
  });
});
