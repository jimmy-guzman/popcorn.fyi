export const selectYoutubeTrailer = ({
  results,
}: {
  id: number;
  results?: {
    key?: string;
    name?: string;
    official: boolean;
    site?: string;
    type?: string;
  }[];
}) => {
  return results
    ?.sort((a) => {
      return a.official ? -1 : 1;
    })
    .find((result) => {
      return result.type === "Trailer" && result.site === "YouTube";
    });
};

export const youtubeVideoUrl = (
  key: string,
  { autoplay = false }: { autoplay?: boolean } = {},
) => {
  return `https://www.youtube.com/embed/${key}?rel=0&showinfo=0${
    autoplay ? "&autoplay=1&mute=1" : "&autoplay=0"
  }`;
};
