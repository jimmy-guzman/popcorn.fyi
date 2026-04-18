# 🍿 popcorn.fyi

> A fast and fun way to explore and discover your favorite movies and TV shows — powered by [TMDB](https://developer.themoviedb.org) and [Wikidata](https://www.wikidata.org/).
>
> **[🌐 Try it live](https://popcorn.fyi)**

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
- **Data Layer:** [TanStack Query](https://tanstack.com/query/latest) + [hey-api](https://heyapi.dev) OpenAPI clients
- **Testing:** [Vitest](https://vitest.dev), [React Testing Library](https://testing-library.com) and [Playwright](https://playwright.dev)

### **Backend**

- **APIs:** [TMDB](https://developer.themoviedb.org/reference/intro/getting-started), [Wikidata](https://www.wikidata.org/w/api.php)

### **Dev & Infra**

- **Build System:** [Turborepo](https://turbo.build/repo) (single-package workspace)
- **Package Manager:** [pnpm](https://pnpm.io)
- **Type Checking:** [TypeScript](https://www.typescriptlang.org)
- **Lint & Format:** [ESLint](https://eslint.org) ([config](https://github.com/jimmy-guzman/eslint-config)), [OXC](https://oxc.rs)
- **Deployment:** [Vercel](https://vercel.com)
- **Coverage:** [Codecov](https://about.codecov.io)

---

## ⚡ Getting Started

Make sure you have [pnpm](https://pnpm.io) installed, then run:

```bash
pnpm install
pnpm --filter web exec playwright install
cp .env.example .env
pnpm dev
```

---

### 🔐 Environment Variables

| Variable         | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `TMDB_API_TOKEN` | [TMDB API Key](https://www.themoviedb.org/settings/api) |

---

## 💪 Contributing

Found a bug or have an idea? Open an issue or submit a PR — contributions are welcome!

---

## 🙌 Acknowledgements

Big thanks to [@oktay](https://github.com/oktay) — this project was inspired by their [movies](https://github.com/oktay/movies) app.
