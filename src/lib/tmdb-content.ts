import { sanitize } from "isomorphic-dompurify";

export const tmdbContent = (string: string) => {
  const html = string
    .split("\n")
    .filter((section) => section !== "")
    .map((section) => `<p>${section}</p>`)
    .join("");

  return sanitize(html);
};
