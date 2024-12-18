type TMDBImageSize = "original" | "w300" | "w500";

export const tmdbImageUrl = (
  path: string,
  size: TMDBImageSize = "original",
) => {
  return `https://image.tmdb.org/t/p/${size}/${path}`;
};
