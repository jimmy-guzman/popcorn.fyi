import { render, screen } from "@/testing/utils";

import { MediaPreview } from "./media-preview";

describe("<MediaPreview />", () => {
  it("should render the overview", async () => {
    await render(
      <MediaPreview
        dateLabel="Released"
        overview="A thief who enters the dreams of others."
        title="Inception"
      />,
    );

    expect(
      screen.getByText("A thief who enters the dreams of others."),
    ).toBeInTheDocument();
  });

  it("should fall back when there is no overview", async () => {
    await render(<MediaPreview dateLabel="Released" title="Inception" />);

    expect(screen.getByText("No overview available.")).toBeInTheDocument();
  });

  it("should label the release date for the media type", async () => {
    await render(
      <MediaPreview
        dateLabel="First aired"
        releaseDate="2010-07-16"
        title="Inception"
      />,
    );

    expect(screen.getByText("First aired")).toBeInTheDocument();
  });

  it("should name the original language", async () => {
    await render(
      <MediaPreview
        dateLabel="Released"
        originalLanguage="ja"
        title="Spirited Away"
      />,
    );

    expect(screen.getByText("Japanese")).toBeInTheDocument();
  });

  it("should group the vote count", async () => {
    await render(
      <MediaPreview
        dateLabel="Released"
        title="Inception"
        voteCount={12_043}
      />,
    );

    expect(screen.getByText("12,043")).toBeInTheDocument();
  });

  it("should NOT repeat the original title when it matches the title", async () => {
    await render(
      <MediaPreview
        dateLabel="Released"
        originalTitle="Inception"
        title="Inception"
      />,
    );

    expect(screen.getAllByText("Inception")).toHaveLength(1);
  });

  it("should show the original title when it differs", async () => {
    await render(
      <MediaPreview
        dateLabel="Released"
        originalTitle="千と千尋の神隠し"
        title="Spirited Away"
      />,
    );

    expect(screen.getByText("千と千尋の神隠し")).toBeInTheDocument();
  });

  it("should keep the vote count when nothing has been rated yet", async () => {
    await render(
      <MediaPreview dateLabel="Released" title="Inception" voteCount={0} />,
    );

    expect(screen.getByText("Votes")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render its call to action", async () => {
    await render(
      <MediaPreview
        action={<a href="/movies/27205">View details</a>}
        dateLabel="Released"
        title="Inception"
      />,
    );

    expect(
      screen.getByRole("link", { name: "View details" }),
    ).toBeInTheDocument();
  });

  it("should NOT expose its images to assistive tech", async () => {
    await render(
      <MediaPreview
        backdropPath="/backdrop.jpg"
        dateLabel="Released"
        posterPath="/poster.jpg"
        title="Inception"
      />,
    );

    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });

  it("should keep its content when both images are missing", async () => {
    await render(
      <MediaPreview
        dateLabel="Released"
        originalLanguage="en"
        overview="A thief who enters the dreams of others."
        releaseDate="2010-07-16"
        title="Inception"
        voteCount={12_043}
      />,
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(
      screen.getByText("A thief who enters the dreams of others."),
    ).toBeInTheDocument();
    expect(screen.getByText("Released")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("12,043")).toBeInTheDocument();
  });
});
