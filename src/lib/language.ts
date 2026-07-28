const languageNames = new Intl.DisplayNames(undefined, { type: "language" });

/**
 * Resolves an ISO 639-1 code into a human-readable language name.
 *
 * @param code - The ISO 639-1 code, e.g. `"ja"`.
 *
 * @returns The language name, or the code itself when it cannot be resolved.
 */
export const language = (code: string) => {
  try {
    return languageNames.of(code) ?? code;
  } catch {
    return code;
  }
};
