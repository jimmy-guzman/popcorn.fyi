# **@popcorn.fyi/tailwind**

A shared Tailwind CSS configuration package for _popcorn.fyi_, providing a consistent design system across the monorepo.

## **Installation**

From the root of the monorepo, install dependencies:

```bash
pnpm add -D @popcorn.fyi/tailwind
```

## **Included Plugins**

This package extends TailwindCSS with additional utilities and components:

- **[@iconify/tailwind4](https://www.npmjs.com/package/@iconify/tailwind4)** – Optimized icon support for Tailwind CSS v4.
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** – Enhanced typographic styles for rich content.
- **[daisyUI](https://daisyui.com/)** – A component library for building modern UIs with Tailwind.

## **Usage**

### **Importing Tailwind CSS in a Root Layout**

To apply global styles in an app, import the Tailwind CSS file in a root layout component (e.g., `apps/routes/__root.tsx`):

```tsx
import rootCSS from "@popcorn.fyi/tailwind/tailwind.css?url";

export default function RootLayout() {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={rootCSS} />
      </head>
      <body>{/* App content */}</body>
    </html>
  );
}
```

## **Features**

- **Pre-configured UI components** with DaisyUI themes.
- **Optimized typography** for articles, summaries, and content pages.
- **Icon support** with Tailwind 4-compatible utilities.
- **Consistent design system** across all _popcorn.fyi_ projects.

## **Scripts**

Run from the root of the monorepo:

- `pnpm --filter @popcorn.fyi/tailwind run lint` - Lints the codebase using ESLint.
- `pnpm --filter @popcorn.fyi/tailwind run typecheck` - Ensures TypeScript correctness.

---

This package ensures that styling across _popcorn.fyi_ remains **consistent, scalable, and maintainable**. 🚀
