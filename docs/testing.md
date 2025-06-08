# 🧪 Testing Strategy for popcorn.fyi

## 🔄 Overview

For _popcorn.fyi_, I wanted a testing setup that ensures reliability without adding unnecessary complexity. The focus is on **catching regressions early**, maintaining **type safety**, and ensuring a **smooth user experience**. The strategy covers everything from **unit tests** to **end-to-end (E2E) testing**.

## 🏆 Testing Philosophy

This testing strategy follows the **[Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)** approach by Kent C. Dodds, emphasizing:

- **🏋️‍♂️ Integration Tests:** Ensuring different parts of the system work together.
- **🧩 Unit Tests:** Testing isolated logic for small components.
- **🎭 End-to-End Tests:** Verifying real-world user flows and full application behavior.
- **🛡️ Static Analysis:** Using TypeScript and ESLint to catch errors early.

This approach balances coverage with speed and efficiency.

## 🧰 Testing Stack

- **🧩 Unit & Integration Testing:** [Vitest](https://vitest.dev/) for fast, type-safe testing with coverage via **@vitest/coverage-v8**.
- **🧱 Component Testing:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for user-driven component tests.
- **📚 UI Component Documentation:** [Storybook](https://storybook.js.org/) for testing and visualizing components in **libs/ui**.
- **🛠️ Mocking & API Simulation:** [MSW (Mock Service Worker)](https://mswjs.io/) to mock API requests.
- **🔍 DOM Simulation:** [Happy DOM](https://github.com/capricorn86/happy-dom) for lightweight, fast DOM testing.
- **🎭 End-to-End (E2E) Testing:** [Playwright](https://playwright.dev/) for browser-based tests.
- **🛡️ Test Utilities:** Custom render utilities from **@/testing/utils**, using **userEvent** for realistic interactions.
- **📊 Coverage Enforcement:** [Codecov](https://about.codecov.io/) to track and enforce test coverage thresholds.

## 🗂️ Test Organization

Tests follow a **feature-based folder structure**:

```
src/
  movie/
    movie-card.tsx
    movie-card.test.tsx
  tv-show/
    trending-carousel.tsx
    trending-carousel.test.tsx
  shared/
    button.tsx
    button.test.tsx
libs/
  ui/
    button.tsx
    button.test.tsx
    button.stories.tsx
```

## 🏗️ Custom Render Utility

Tests use a **custom render utility** (`@/testing/utils`) that wraps components with:

- **🔄 State Management:** `QueryClientProvider` (TanStack Query).
- **🗺️ Routing Support:** `RouterProvider` (TanStack Router).

### 🧪 Example Usage:

```tsx
import { render, screen } from "@/testing/utils";
import { MovieCard } from "./movie-card";

describe("MovieCard", () => {
  it("renders with authentication and query context", () => {
    render(
      <MovieCard movie={{ title: "Inception", releaseDate: "2010-07-16" }} />,
    );
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });
});
```

## 🧩 Unit & Integration Testing with Vitest

Vitest ensures fast, type-safe tests.

### 🧪 Example:

```tsx
import { render, screen } from "@/testing/utils";
import { MovieCard } from "./movie-card";

describe("MovieCard", () => {
  it("renders title and release date", () => {
    render(
      <MovieCard movie={{ title: "Inception", releaseDate: "2010-07-16" }} />,
    );
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
  });
});
```

## 🧱 UI Testing & Documentation with Storybook

Storybook is used to **develop, test, and document** UI components in **libs/ui**.

### 🧪 Example:

```tsx
import { Button } from "./button";

export default {
  title: "UI/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = { children: "Click Me" };
```

### 🔍 Running Storybook:

```bash
pnpm dev
```

> **Storybook available at:** `http://localhost:6006`

## 🛠️ Mocking API Requests with MSW

**Mock Service Worker (MSW)** is used to mock API calls.

### 🧪 Example:

```tsx
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@/testing/utils";
import { MovieList } from "./movie-list";

const server = setupServer(
  rest.get("/api/movies", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, title: "Inception" },
        { id: 2, title: "Interstellar" },
      ]),
    );
  }),
);

describe("MovieList", () => {
  it("should render a list of movies", async () => {
    render(<MovieList />);

    expect(await screen.findByText("Inception")).toBeInTheDocument();
    expect(await screen.findByText("Interstellar")).toBeInTheDocument();
  });
});
```

## 🎭 End-to-End (E2E) Testing with Playwright

Playwright ensures real-world testing across browsers.

### 🧪 Example:

```ts
import { test, expect } from "@playwright/test";

test("should navigate to the Movies page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Discover");
  await page.click("text=Movies");
  await expect(page).toHaveURL("/discover/movies");
  await expect(page.getByText("Popular Movies")).toBeVisible();
});
```

## 📊 Coverage & Best Practices

- **Codecov:** Tracks test coverage in PRs and enforces thresholds.
- **ESLint Plugin:** Enforces best practices for testing.
- **Playwright in CI:** Runs tests in Chromium, Firefox, and WebKit.

## 🚀 Future Enhancements

- **🖼️ Visual Regression Testing:** Using Percy or Chromatic.
- **♿ Accessibility Testing:** Ensuring compliance with axe-core.

---

This setup ensures _popcorn.fyi_ stays **reliable, fast, and user-friendly** as the project evolves. 🚀
