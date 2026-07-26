import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";

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
    vi.unstubAllGlobals();
  });

  it("should call navigator.share when available", async () => {
    const shareMock = vi.fn();

    Object.defineProperty(navigator, "share", {
      value: shareMock,
      writable: true,
    });

    render(<ShareButton title={title} url={url} />);

    await userEvent.click(screen.getByRole("button", { name: /share/i }));

    expect(shareMock).toHaveBeenCalledExactlyOnceWith({
      title,
      url,
    });
  });

  it("should fall back to clipboard when navigator.share is unavailable", async () => {
    vi.spyOn(navigator, "share").mockImplementation(undefined as never);

    const writeTextMock = vi.fn().mockResolvedValue(undefined);

    vi.stubGlobal("navigator", {
      clipboard: { writeText: writeTextMock },
    });

    render(<ShareButton title={title} url={url} />);

    await userEvent.click(screen.getByRole("button", { name: /share/i }));

    expect(writeTextMock).toHaveBeenCalledExactlyOnceWith(url);
    expect(toast.success).toHaveBeenCalledExactlyOnceWith(
      "Link copied to clipboard!",
    );
  });

  it("should render the button with an icon", () => {
    render(<ShareButton title={title} url={url} />);

    expect(screen.getByRole("button", { name: /share/i })).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
  });
});
