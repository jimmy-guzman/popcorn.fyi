## **System Design**

```mermaid
graph TD;
    A[User] -->|Interacts| B["Web App (TanStack Start)"]
    B -->|Renders UI| J["daisyUI"]
    B -->|Fetches Data via| C["API Layer"]
    C -->|Calls| D["TMDB API"]
    C -->|Calls| E["Wikidata API"]
    C -->|Uses| F["OpenAPI-Fetch"]
    F -->|Uses| N["Redis Middleware"]
    N -->|Caches Responses| D
    N -->|Stores Data In| O["Upstash Redis"]
    D -->|Respects| M["Cache-Control Headers"]
    B -->|Runs on| H["Vercel (CDN + Edge Functions)"]
    B -->|Manages State| I["TanStack Query"]
```

---

## **Overview**

`popcorn.fyi` is a read-only, server-rendered web app built with TanStack Start. It uses a thin API layer to fetch data from TMDB and Wikidata, with Redis-based server-side caching applied to TMDB responses. Client-side state is managed by TanStack Query, and all frontend UI is composed from `tailwindcss` and `daisyui`. The app is deployed via Vercel, with CI/CD powered by GitHub Actions.

---

## Key Components

1. **Frontend:** Built with **TanStack Start**, **TailwindCSS**, and **DaisyUI**.
2. **API Layer:** Unified functions for fetching data from **TMDB** and **Wikidata**.
3. **HTTP Client:** **OpenAPI-Fetch** with custom Redis caching middleware (currently used only for **TMDB**).
4. **State Management:**
   - **TanStack Query** for client-side state and caching
   - Handles query deduplication and revalidation on the client

5. **Server-Side Caching:**
   - Redis (Upstash) is used to cache **TMDB** responses only
   - **Wikidata** responses are **not cached** at this time

6. **CI/CD:** Handled via **GitHub Actions** with deployment on **Vercel**.
7. **Testing:** Comprehensive coverage using **Vitest** (unit), **React Testing Library**, and **Playwright** (E2E).

---

## Caching Strategy

### Two-Layer Caching:

1. **Client-Side (TanStack Query):**
   - `staleTime: 5 minutes` – Prevents unnecessary refetches
   - `refetchOnWindowFocus: false` – Reduces API calls
   - Designed for smooth and responsive user experience

2. **Server-Side (Redis via API Functions):**
   - **TMDB** HTTP responses cached using Redis
   - Respects `cache-control` headers (e.g., `max-age=21092` → \~6 hours)
   - Falls back to 1-hour TTL if headers are missing
   - **Wikidata is not cached** yet, but may be added in the future
