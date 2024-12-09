const themeScript = `document.documentElement.dataset['theme'] = globalThis.matchMedia("(prefers-color-scheme: dark)",).matches ? "black" : "lofi";`;

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
