# 🍿 popcorn.fyi

> A web app to explore movies, TV shows, and entertainment content using data from [TMDB](https://developer.themoviedb.org) and [Wikidata](https://www.wikidata.org/). Built with TanStack, Drizzle ORM, and Tailwind CSS for a fast, modular, and visually rich experience.
>
> **[Check out the live app here!](https://popcornfyi.vercel.app)**

## 🏆 Features

👉 **AI-Generated Expanded Plot Summaries** – See a **structured breakdown** of a movie’s story with **spoiler control**.  
👉 **Discover Movies & TV Shows** – Browse trending, popular, and personalized recommendations.  
👉 **Filter & Sort** – Advanced filters for **genres, ratings, and release year**.  
👉 **User Accounts** – **Save favorites** and **track your watched content** (powered by Clerk).  
👉 **Fast & Modular UI** – Built with **TanStack Start**, **daisyUI**, and **Tailwind CSS** for a responsive and smooth experience.

## 🎥 Demo

Explore movies, TV shows, and more with advanced filters, personalized recommendations, and a sleek UI.

<p align="center">
  <img src="./assets/discover-movies.png" alt="Discover Movies Page" width="700"/>
</p>

## 🛠 Tech Stack

### **Frontend**

- **Framework:** [React](https://react.dev) with [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview)
- **Styling:** [Tailwind CSS](https://tailwindcss.com), [daisyUI](https://daisyui.com), [Tailwind CSS Typography](https://tailwindcss.com/docs/typography-plugin)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest)
- **Data Fetching:** [openapi-fetch](https://www.npmjs.com/package/openapi-fetch) (for TMDB and Wikidata APIs)
- **Authentication:** [Clerk](https://clerk.com) for user authentication and management
- **Testing:** [Playwright](https://playwright.dev) (end-to-end testing), [Vitest](https://vitest.dev) (unit testing), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), [Storybook](https://storybook.js.org) (component development)

### **Backend**

- **AI-Powered Summaries:** [OpenAI](https://platform.openai.com/) is used to generate **expanded movie plot summaries** with **spoiler control**.
- **Database:** [PostgreSQL](https://www.postgresql.org) (hosted on [Neon](https://neon.tech))
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **API Integration:** [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started), [Wikidata API](https://www.wikidata.org/w/api.php)
- **Caching:** Uses **Redis (Upstash)** for caching AI-generated summaries and performance optimizations.

### **Tooling & DevOps**

- **Monorepo Management:** [Turborepo](https://turbo.build/repo)
- **Package Manager:** [pnpm](https://pnpm.io)
- **Type Checking:** [TypeScript](https://www.typescriptlang.org)
- **Linting & Formatting:** [ESLint](https://eslint.org) (with [@jimmy.codes/eslint-config](https://github.com/jimmy-guzman/eslint-config)), [Prettier](https://prettier.io)
- **Deployment:** [Vercel](https://vercel.com)
- **Test Coverage Reporting:** [Codecov](https://about.codecov.io) for tracking test coverage and preventing regressions.

## 🎁 What's Inside?

A [Turborepo](https://turbo.build/repo) containing [apps](#-apps), [libs](#-libs), and [configs](#️-configs) that power [popcorn.fyi](https://popcornfyi.vercel.app).

### 🚀 Apps

- [**web**](./apps/web/README.md): The main full-stack application built with [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview). It features dynamic routes, interactive UI components, and optimized API calls to TMDB and Wikidata.

### 📚 Libs

- [**@popcorn.fyi/ui**](./libs/ui/README.md): A reusable component library powered by [daisyUI](https://daisyui.com) and styled with Tailwind CSS. It also includes [Storybook](https://storybook.js.org) for easy component development and testing.
- [**@popcorn.fyi/api-clients**](./libs/api-clients/README.md): A client library for interacting with the [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started), [Wikidata API](https://www.wikidata.org/w/api.php), and [OpenAI API](https://platform.openai.com/docs) to fetch movie data, metadata, and generate AI-powered expanded plot summaries. It provides **typed requests** and **seamless integration** with the web app.
- [**@popcorn.fyi/db**](./libs/db/README.md): Manages database interactions using [drizzle](https://orm.drizzle.team) ORM and [neon](https://neon.tech) for serverless PostgreSQL hosting.
- [**@popcorn.fyi/utils**](./libs/utils/README.md): A collection of utility functions to simplify common tasks across the codebase.

### ⚙️ Configs

- [**@popcorn.fyi/tailwind**](./configs/tailwind/README.md): A shareable [Tailwind CSS](https://tailwindcss.com) configuration with extensions like [daisyUI](https://daisyui.com) and [Tailwind CSS Typography](https://tailwindcss-typography.vercel.app) for consistent styling.
- [**@popcorn.fyi/ts**](./configs/ts/README.md): Centralized [TypeScript](https://www.typescriptlang.org) configuration to ensure consistent type checking across apps and libraries.
- [**@popcorn.fyi/eslint**](./configs/eslint/README.md): A unified [ESLint](https://eslint.org) configuration based on [@jimmy.codes/eslint-config](https://github.com/jimmy-guzman/eslint-config), ensuring code quality and consistent style throughout the project.

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

| Environment Variable         | Source                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| `TMDB_API_TOKEN`             | [TMDB API Keys](https://www.themoviedb.org/settings/api)                                |
| `VITE_CLERK_PUBLISHABLE_KEY` | [Clerk API Keys](https://dashboard.clerk.com/last-active?path=api-keys)                 |
| `CLERK_SECRET_KEY`           | [Clerk API Keys](https://dashboard.clerk.com/last-active?path=api-keys)                 |
| `DATABASE_URL`               | [Getting Started with Neon](https://neon.tech/docs/get-started-with-neon/signing-up)    |
| `OPENAI_API_KEY`             | [Getting started with OpenAI](https://platform.openai.com/docs/quickstart)              |
| `KV_REST_API_URL`            | [Getting started with Upstash Redis](https://upstash.com/docs/redis/overall/getstarted) |
| `KV_REST_API_TOKEN`          | [Getting started with Upstash Redis](https://upstash.com/docs/redis/overall/getstarted) |

Start the development server with the following command:

```
pnpm dev
```

## 💪 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request to add features or fix bugs.

## ❤️ Thanks

- Design inspiration came from [oktay](https://github.com/oktay)'s [movies](https://github.com/oktay/movies).
