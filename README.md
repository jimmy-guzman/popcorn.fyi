# 🍿 popcorn.fyi

> A web app to explore movies, TV shows, and entertainment content using data from [TMDB](https://developer.themoviedb.org). Built with TanStack, Drizzle ORM, and Tailwind CSS for a fast, modular, and visually rich experience.
>
> **[Check out the live app here!](https://popcornfyi.vercel.app)**

## 🛠 Tech Stack

### **Frontend**

- **Framework:** React with [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview)
- **Styling:** Tailwind CSS, daisyUI, Tailwind CSS Typography
- **State Management & Data Fetching:** TanStack Query, [openapi-fetch](https://www.npmjs.com/package/openapi-fetch) (for TMDB API)
- **Authentication:** [Clerk](https://clerk.com) for user authentication and management
- **Testing:** Playwright (end-to-end testing), Vitest (unit testing), React Testing Library, Storybook (component development)

### **Backend**

- **Database:** PostgreSQL (hosted on [Neon](https://neon.tech))
- **ORM:** [Drizzle](https://orm.drizzle.team)
- **API Integration:** [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)

### **Tooling & DevOps**

- **Monorepo Management:** [Turborepo](https://turbo.build/repo)
- **Package Manager:** [pnpm](https://pnpm.io)
- **Type Checking:** TypeScript
- **Linting & Formatting:** ESLint (with [@jimmy.codes/eslint-config](https://github.com/jimmy-guzman/eslint-config)), Prettier
- **Deployment:** [Vercel](https://vercel.com)

## 🎁 What's Inside?

A [Turborepo](https://turbo.build/repo) containing [apps](#-apps), [libs](#-libs), and [configs](#️-configs) that power [popcorn.fyi](https://popcornfyi.vercel.app).

### 🚀 Apps

- [**web**](./apps/web/README.md): The main full-stack application built with [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview). It features dynamic routes, interactive UI components, and optimized API calls to TMDB.

### 📦 Libs

- [**@popcorn.fyi/ui**](./libs/ui/README.md): A reusable component library powered by [daisyUI](https://daisyui.com) and styled with Tailwind CSS. It also includes [Storybook](https://storybook.js.org) for easy component development and testing.
- [**@popcorn.fyi/tmdb**](./libs/tmdb/README.md): A client library for interacting with the [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started), providing typed requests and seamless integration with the web app.
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

| Environment Variable         | Source                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `TMDB_API_TOKEN`             | [TMDB API Keys](https://www.themoviedb.org/settings/api)                             |
| `VITE_CLERK_PUBLISHABLE_KEY` | [Clerk API Keys](https://dashboard.clerk.com/last-active?path=api-keys)              |
| `CLERK_SECRET_KEY`           | [Clerk API Keys](https://dashboard.clerk.com/last-active?path=api-keys)              |
| `DATABASE_URL`               | [Getting Started with Neon](https://neon.tech/docs/get-started-with-neon/signing-up) |

Start the development server with the following command:

```
pnpm dev
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request to add features or fix bugs.

## ❤️ Thanks

- Design inspiration came from [oktay](https://github.com/oktay)'s [movies](https://github.com/oktay/movies).
