/**
 * Splits TMDB long-form text into paragraphs.
 *
 * TMDB returns biographies and overviews as plain text separated by newlines,
 * so the sections are rendered as text nodes rather than markup.
 *
 * @param content the raw TMDB text
 *
 * @returns The non-empty sections, in order.
 */
export const tmdbParagraphs = (content: string): string[] => {
  return content.split(/\r?\n/).filter((section) => {
    return section.trim() !== "";
  });
};
