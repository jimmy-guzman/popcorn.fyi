import { sanitize } from "isomorphic-dompurify";

export const tmdbContent = (string: string) => {
  const html = string
    .split("\n")
    .filter((section) => {
      return section !== "";
    })
    .map((section) => {
      return `<p>${section}</p>`;
    })
    .join("");

  return sanitize(html);
};
