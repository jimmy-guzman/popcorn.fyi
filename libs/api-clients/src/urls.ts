type TMDBImageSize = "original" | "w185" | "w300" | "w500" | "w1280";

export const tmdbImageUrl = (
  path: string,
  size: TMDBImageSize = "original",
) => {
  return `https://image.tmdb.org/t/p/${size}/${path}`;
};
