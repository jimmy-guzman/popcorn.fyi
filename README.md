# 🍿 popcorn.fyi

> A fast and fun way to explore and discover your favorite movies and TV shows — powered by [TMDB](https://developer.themoviedb.org) and [Wikidata](https://www.wikidata.org/).
>
> **[🌐 Try it live](https://popcornfyi.vercel.app)**

---

## 🏆 Features

- Discover movies and TV shows by genre, provider, region, and release year
- Browse what's Trending, Popular, or Top Rated across film, TV, and people
- Dive into rich detail pages with overviews, trailers, cast, and more
- Explore similar titles and see where to watch them
- Find people and explore their full acting and crew history
- Preview what's hot on the homepage with a trending carousel
- Share pages or jump to Wikipedia with one click

---

## 🎥 Demo

<p align="center">
  <img src="./assets/discover-movies.png" alt="Discover Movies Page" width="700"/>
</p>

---

## 🛠 Tech Stack

### **Frontend**

- **Framework:** [React](https://react.dev) + [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) + [daisyUI](https://daisyui.com)
- **Data Layer:** [TanStack Query](https://tanstack.com/query/latest) + [openapi-fetch](https://www.npmjs.com/package/openapi-fetch)
- **Testing:** [Vitest](https://vitest.dev), [React Testing Library](https://testing-library.com), [Playwright](https://playwright.dev), [Storybook](https://storybook.js.org)

### **Backend**

- **Database:** [PostgreSQL](https://www.postgresql.org) (via [Neon](https://neon.tech))
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **APIs:** [TMDB](https://developer.themoviedb.org/reference/intro/getting-started), [Wikidata](https://www.wikidata.org/w/api.php)
- **Caching:** [Upstash Redis](https://upstash.com)

### **Dev & Infra**

- **Monorepo:** [Turborepo](https://turbo.build/repo)
- **Package Manager:** [pnpm](https://pnpm.io)
- **Type Checking:** [TypeScript](https://www.typescriptlang.org)
- **Lint & Format:** [ESLint](https://eslint.org) ([config](https://github.com/jimmy-guzman/eslint-config)), [Prettier](https://prettier.io)
- **Deployment:** [Vercel](https://vercel.com)
- **Coverage:** [Codecov](https://about.codecov.io)

---

## 📦 What's Inside

This repo is powered by [Turborepo](https://turbo.build/repo), with clearly scoped apps, libraries, and shared configs.

### 🚀 Apps

- [`web`](./apps/web/README.md) – The main full-stack app. Built with TanStack Start, it handles routing, data fetching, and all UI interactions.

### 📚 Libraries

- [`@popcorn.fyi/ui`](./libs/ui/README.md) – UI components built with daisyUI, showcased via Storybook.
- [`@popcorn.fyi/api-clients`](./libs/api-clients/README.md) – Typed clients for TMDB, Wikidata, and OpenAI.
- [`@popcorn.fyi/db`](./libs/db/README.md) – Drizzle ORM setup for interacting with a Postgres database via Neon.
- [`@popcorn.fyi/utils`](./libs/utils/README.md) – Shared utilities for common logic and helpers.

### ⚙️ Configs

- [`@popcorn.fyi/tailwind`](./configs/tailwind/README.md) – Shared Tailwind CSS config.
- [`@popcorn.fyi/ts`](./configs/ts/README.md) – Centralized TypeScript config.
- [`@popcorn.fyi/eslint`](./configs/eslint/README.md) – Unified ESLint rules.

---

## ⚡ Getting Started

Make sure you have [pnpm](https://pnpm.io) installed, then run:

```bash
pnpm install
pnpm --filter web exec playwright install
cp apps/web/.env.example apps/web/.env
pnpm dev
```

---

### 🔐 Environment Variables

| Variable            | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| `TMDB_API_TOKEN`    | [TMDB API Key](https://www.themoviedb.org/settings/api)       |
| `DATABASE_URL`      | [Neon Database URL](https://neon.tech/docs)                   |
| `OPENAI_API_KEY`    | [OpenAI API Key](https://platform.openai.com/docs/quickstart) |
| `KV_REST_API_URL`   | [Upstash Redis URL](https://upstash.com/docs/redis)           |
| `KV_REST_API_TOKEN` | [Upstash Redis Token](https://upstash.com/docs/redis)         |

---

## 💪 Contributing

Found a bug or have an idea? Open an issue or submit a PR — contributions are welcome!

---

## 🙌 Acknowledgements

Big thanks to [@oktay](https://github.com/oktay) — this project was inspired by their [movies](https://github.com/oktay/movies) app.
