# **@popcorn.fyi/api-clients**

A collection of API clients for fetching **media-related data** from **The Movie Database (TMDB)**, **Wikidata**, and **OpenAI**. This package is part of the [popcorn.fyi](https://popcornfyi.vercel.app) monorepo.

## **Installation**

From the root of the monorepo, run:

```bash
pnpm add @popcorn.fyi/api-clients
```

---

## **Available Clients**

### **TMDB API (v3)**

Provides access to **The Movie Database API v3** for retrieving **movie, TV show, and person data**.

**Import:**

```ts
import { setupClient } from "@popcorn.fyi/api-clients/tmdb-v3";
```

---

### **Wikidata API**

Allows querying **Wikidata** for **additional media-related metadata**.

**Import:**

```ts
import { setupClient } from "@popcorn.fyi/api-clients/wikidata";
```

---

### **OpenAI API**

Provides access to **OpenAI API** for **AI-generated plot summaries**.

**Import:**

```ts
import { setupClient } from "@popcorn.fyi/api-clients/openai";
```

---

## **Utilities**

Shared utilities for working with API data.

**Import:**

```ts
import { someUtility } from "@popcorn.fyi/api-clients/utils";
```

---

## **Scripts**

Run these from the root of the monorepo:

- `pnpm --filter @popcorn.fyi/api-clients run gen` - Generates **TypeScript types** from OpenAPI specs.
- `pnpm --filter @popcorn.fyi/api-clients run test` - Runs tests with **Vitest**.
- `pnpm --filter @popcorn.fyi/api-clients run coverage` - Runs tests and outputs **coverage reports**.
- `pnpm --filter @popcorn.fyi/api-clients run lint` - Lints the codebase.
- `pnpm --filter @popcorn.fyi/api-clients run typecheck` - **Ensures TypeScript correctness**.

---

This package ensures **strongly typed** API interactions, improving maintainability and reliability across _popcorn.fyi_. 🚀
