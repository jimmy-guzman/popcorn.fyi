# 🍿 popcorn.fyi

## 🎁 What's Inside?

A [Turborepo](https://turbo.build/repo) of [apps](#-apps), [libs](#-libs) and [configs](#️-configs) part of [popcorn.fyi](popcornfyi.vercel.app).

### 🚀 Apps

- [web](./apps/web/README.md) a [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview) web app.

### 📦 Libs

- [@popcorn.fyi/tmdb](./libs/tmdb/README.md): a [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) api client.
- [@popcorn.fyi/utils](./libs/utils/README.md): a toolkit full of utility functions.

### ⚙️ Configs

- [@popcorn.fyi/tailwind](./configs/tailwind/README.md): a shareable [Tailwind CSS](https://tailwindcss.com) config that includes [daisyUI](https://daisyui.com), [Tailwind CSS Typography](https://tailwindcss-typography.vercel.app) and [Iconify for Tailwind CSS](https://iconify.design/docs/usage/css/tailwind).
- [@popcorn.fyi/ts](./configs/ts/README.md): a shareable [TypeScript](https://www.typescriptlang.org) configs.
- [@popcorn.fyi/eslint](./configs/eslint/README.md): a shareable [ESLint](https://eslint.org) config powered by [@jimmy.codes/eslint-config](https://github.com/jimmy-guzman/eslint-config).

## 🏁 Getting Started

> [!NOTE]
> This project uses [pnpm](https://pnpm.io) so please [install](https://pnpm.io/installation) it to get started.

Then you can install dependencies, by running the following:

```
pnpm install
```

And to download new browsers for [Playwright](https://playwright.dev), run the following command:

```
pnpm --filter web exec playwright install
```

Then setup environment variables, by running the following:

```
cp apps/web/.env.example apps/web/.env
```

| Environment Variable         | Source                                                                  |
| ---------------------------- | ----------------------------------------------------------------------- |
| `TMDB_API_TOKEN`             | [TMDB API Keys](https://www.themoviedb.org/settings/api)                |
| `VITE_CLERK_PUBLISHABLE_KEY` | [Clerk API Keys](https://dashboard.clerk.com/last-active?path=api-keys) |
| `CLERK_SECRET_KEY`           | [Clerk API Keys](https://dashboard.clerk.com/last-active?path=api-keys) |

Then you start running things, by running the following:

```
pnpm dev
```
