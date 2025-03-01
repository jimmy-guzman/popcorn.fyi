## **System Design**

```mermaid
graph TD;
    A[User] -->|Interacts| B[Web App TanStack Start]
    B -->|Uses Components| J[@popcorn.fyi/ui Library]
    J -->|Deploys Storybook| K[Vercel]
    B -->|API Calls| C[@popcorn.fyi/api-clients]
    C -->|Fetches Data| D[TMDB API]
    C -->|Fetches Data| E[Wikidata API]
    C -->|Fetches Data| L[OpenAI API]
    C -->|Interacts with| F[@popcorn.fyi/db Drizzle + Neon]
    F -->|Stores Data| G[PostgreSQL Neon]
    B -->|Uses CDN & Edge Functions| H[Vercel]
    B -->|Manages State & Caching| I[TanStack Query + LRU Cache]
```

---

## **Overview**

Popcorn.fyi is a **modular, performant, and scalable** movie discovery platform built with a **monorepo architecture** using **Turborepo**. It leverages modern web technologies for an optimized experience.

---

## **🔹 Key Components**

1. **Frontend:** Built with **TanStack Start**, TailwindCSS, and DaisyUI.
2. **UI Library:** `@popcorn.fyi/ui` – A reusable component library with **Storybook** deployed on **Vercel**.
3. **API Clients:** `@popcorn.fyi/api-clients` – Handles data fetching from **TMDB, Wikidata, and OpenAI**.
4. **State Management & Caching:** **TanStack Query + LRU caching** with **dynamic TTL** based on movie release year.
5. **Database:** PostgreSQL (via **Neon**) with **Drizzle ORM**.
6. **CI/CD:** GitHub Actions + Vercel for deployment.
7. **Testing:** Vitest (unit), Playwright (E2E), and React Testing Library.
