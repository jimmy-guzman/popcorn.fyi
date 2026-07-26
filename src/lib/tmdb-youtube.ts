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
    ?.toSorted((a) => {
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

export const youtubeWatchUrl = (key: string) => {
  return `https://www.youtube.com/watch?v=${key}`;
};

export const youtubeThumbnailUrl = (key: string) => {
  return `https://i.ytimg.com/vi/${key}/hqdefault.jpg`;
};
