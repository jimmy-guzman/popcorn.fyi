export const tmdbContent = (string: string) => {
  return string
    .split("\n")
    .filter((section) => section !== "")
    .map((section) => `<p>${section}</p>`)
    .join("");
};
