import type { MediaType } from "./types";

export const pluralMediaType = (mediaType: MediaType) => {
  if (mediaType === "movie") {
    return `movies` as const;
  }

  return "tv-shows";
};
