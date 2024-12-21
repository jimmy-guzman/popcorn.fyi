import { theme } from "@popcorn.fyi/tailwind/theme";

const themeScript = `document.documentElement.dataset['theme'] = globalThis.matchMedia("(prefers-color-scheme: dark)",).matches ? "${theme.dark}" : "${theme.light}";`;

export const ThemeScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
      suppressHydrationWarning
    />
  );
};
