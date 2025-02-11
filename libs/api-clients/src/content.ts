export const tmdbContent = (string: string) => {
  return string
    .split("\n")
    .filter((section) => {
      return section !== "";
    })
    .map((section) => {
      return `<p>${section}</p>`;
    })
    .join("");
};
