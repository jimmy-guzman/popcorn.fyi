import { http, HttpResponse } from "msw";

import { server } from "@/testing/mocks/server";
import { render, screen } from "@/testing/utils";

import { MediaTrailerDialog } from "./media-trailer-dialog";

describe("MediaTrailerDialog", () => {
  it("should render and open the dialog when mounted", async () => {
    const handleClose = vi.fn();

    await render(<MediaTrailerDialog handleClose={handleClose} />);

    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();
  });

  it("should render trailer details and iframe when a trailer is provided", async () => {
    const handleClose = vi.fn();
    const trailer = { key: "testKey", name: "Test Trailer" };

    server.use(
      http.get("https://www.youtube.com/embed/testKey", () =>
        HttpResponse.json({}),
      ),
    );

    await render(
      <MediaTrailerDialog handleClose={handleClose} trailer={trailer} />,
    );

    expect(screen.getByText("Test Trailer")).toBeInTheDocument();

    const iframe = screen.getByTitle("Test Trailer");

    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/testKey?rel=0&showinfo=0&autoplay=1&mute=1",
    );
  });

  it("should display 'No trailer found.' when no trailer is provided", async () => {
    const handleClose = vi.fn();

    await render(<MediaTrailerDialog handleClose={handleClose} />);

    expect(screen.getByText("No trailer found.")).toBeInTheDocument();
  });

  it("should call handleClose when ESC key is pressed", async () => {
    const handleClose = vi.fn();
    const { user } = await render(
      <MediaTrailerDialog handleClose={handleClose} />,
    );

    await user.keyboard("{Escape}");

    expect(handleClose).toHaveBeenCalledExactlyOnceWith();
  });

  it("should call handleClose when clicking outside the modal", async () => {
    const handleClose = vi.fn();
    const { user } = await render(
      <MediaTrailerDialog handleClose={handleClose} />,
    );

    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(handleClose).toHaveBeenCalledExactlyOnceWith();
  });
});
