export const selectYoutubeTrailer = ({
  results,
}: {
  results?: {
    name?: string;
    official?: boolean;
    site?: string;
    type?: string;
  }[];
}) => {
  return results
    ?.toSorted((a) => (a.official ? -1 : 1))
    .find((result) => result.type === "Trailer" && result.site === "YouTube");
};

export const youtubeVideoUrl = (
  key: string,
  { autoplay = false }: { autoplay?: boolean } = {},
) => {
  return `https://www.youtube.com/embed/${key}?rel=0&showinfo=0${
    autoplay ? "&autoplay=1&mute=1" : "&autoplay=0"
  }`;
};
