import type { MediaType } from "./types";

export const pluralMediaType = (mediaType: MediaType) => {
  if (mediaType === "movie") {
    return `movies` as const;
  }

  if (mediaType === "tv") {
    return `tv-shows` as const;
  }

  return `people` as const;
};
