# 🍿 popcorn.fyi

> A fast and modular to explore movies and TV shows using data from [TMDB](https://developer.themoviedb.org) and [Wikidata](https://www.wikidata.org/).
>
> **[Check it out live!](https://popcornfyi.vercel.app)**

## 🏆 Features

🔍 **Discover Movies & TV Shows** – Browse trending, popular, and personalized recommendations.  
🎛 **Advanced Filters** – Sort by **genre, rating, release year, and more**.  
⭐ **Favorites & Watchlist** – Save what you love and track what you’ve watched (powered by Clerk).  
⚡ **Fast & Modern UI** – Built with **TanStack Start**, **daisyUI**, and **Tailwind CSS** for a smooth experience.

## 🎥 Demo

<p align="center">
  <img src="./assets/discover-movies.png" alt="Discover Movies Page" width="700"/>
</p>

## 🛠 Tech Stack

### **Frontend**

- **Framework:** [React](https://react.dev) with [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) + [daisyUI](https://daisyui.com)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest)
- **Data Fetching:** [openapi-fetch](https://www.npmjs.com/package/openapi-fetch) (for TMDB and Wikidata)
- **Auth:** [Clerk](https://clerk.com)
- **Testing:** [Playwright](https://playwright.dev) (E2E), [Vitest](https://vitest.dev) (unit), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), [Storybook](https://storybook.js.org)

### **Backend**

- **Database:** [PostgreSQL](https://www.postgresql.org) (hosted on [Neon](https://neon.tech))
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **APIs:** [TMDB](https://developer.themoviedb.org/reference/intro/getting-started) & [Wikidata](https://www.wikidata.org/w/api.php)
- **Caching:** [Redis (Upstash)](https://upstash.com) for performance optimization

### **Tooling & DevOps**

- **Monorepo:** [Turborepo](https://turbo.build/repo)
- **Package Manager:** [pnpm](https://pnpm.io)
- **Type Checking:** [TypeScript](https://www.typescriptlang.org)
- **Linting & Formatting:** [ESLint](https://eslint.org) ([@jimmy.codes/eslint-config](https://github.com/jimmy-guzman/eslint-config)), [Prettier](https://prettier.io)
- **Deployment:** [Vercel](https://vercel.com)
- **Test Coverage:** [Codecov](https://about.codecov.io)

## 🎁 What's Inside?

A [Turborepo](https://turbo.build/repo) containing apps, libs, and configs that power [popcorn.fyi](https://popcornfyi.vercel.app).

### 🚀 Apps

- [**web**](./apps/web/README.md): The main full-stack app, built with [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview). It features dynamic routes, interactive UI, and optimized API calls.

### 📚 Libs

- [**@popcorn.fyi/ui**](./libs/ui/README.md) – Component library powered by [daisyUI](https://daisyui.com) with [Storybook](https://storybook.js.org).
- [**@popcorn.fyi/api-clients**](./libs/api-clients/README.md) – API client for TMDB, Wikidata, and OpenAI with **typed requests**.
- [**@popcorn.fyi/db**](./libs/db/README.md) – Database interactions with [Drizzle ORM](https://orm.drizzle.team) and [Neon](https://neon.tech).
- [**@popcorn.fyi/utils**](./libs/utils/README.md) – Shared utilities used across the project.

### ⚙️ Configs

- [**@popcorn.fyi/tailwind**](./configs/tailwind/README.md) – Shared TailwindCSS config.
- [**@popcorn.fyi/ts**](./configs/ts/README.md) – Centralized TypeScript config.
- [**@popcorn.fyi/eslint**](./configs/eslint/README.md) – Unified ESLint config.

## 🚀 Getting Started

Make sure you have [pnpm](https://pnpm.io) installed.

```sh
pnpm install
pnpm --filter web exec playwright install
cp apps/web/.env.example apps/web/.env
pnpm dev
```

### Environment Variables

| Variable                     | Description / Source                                          |
| ---------------------------- | ------------------------------------------------------------- |
| `TMDB_API_TOKEN`             | [TMDB API Key](https://www.themoviedb.org/settings/api)       |
| `VITE_CLERK_PUBLISHABLE_KEY` | [Clerk API Key](https://dashboard.clerk.com)                  |
| `CLERK_SECRET_KEY`           | [Clerk API Key](https://dashboard.clerk.com)                  |
| `DATABASE_URL`               | [Neon Database URL](https://neon.tech/docs)                   |
| `OPENAI_API_KEY`             | [OpenAI API Key](https://platform.openai.com/docs/quickstart) |
| `KV_REST_API_URL`            | [Upstash Redis](https://upstash.com/docs/redis)               |
| `KV_REST_API_TOKEN`          | [Upstash Redis](https://upstash.com/docs/redis)               |

## 💪 Contributing

Got an idea? Found a bug? Open an issue or submit a PR.

## ❤️ Thanks

- Inspired by [oktay](https://github.com/oktay)'s [movies](https://github.com/oktay/movies).
