# 🧪 Testing Strategy for popcorn.fyi

## 🔄 Overview

For _popcorn.fyi_, I wanted a testing setup that ensures reliability without adding unnecessary complexity. The focus is on catching regressions early, maintaining type safety, and ensuring a smooth user experience. Here's how the testing strategy is structured, covering everything from unit tests to end-to-end (E2E) testing.

## 🏆 Testing Philosophy

The testing strategy follows the principles outlined in the [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) by Kent C. Dodds. This approach emphasizes:

- **🏋️‍♂️ Heavy focus on Integration Tests:** Ensuring different parts of the system work well together.
- **🧩 Unit Tests:** For isolated logic, ensuring small components function as expected.
- **🎭 End-to-End Tests:** Verifying real-world user flows and full application functionality.
- **🛡️ Static Analysis:** Leveraging TypeScript and ESLint to catch errors before runtime.

This balanced approach ensures robust coverage while maintaining speed and efficiency.

## 🧰 Testing Stack

- **🧩 Unit & Integration Testing:** [Vitest](https://vitest.dev/) for fast, type-safe testing with coverage handled via **@vitest/coverage-v8**.
- **🧱 Component Testing:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for testing UI components in a way that mirrors user interactions.
- **📚 UI Component Development & Documentation:** [Storybook](https://storybook.js.org/) is specifically used for developing, testing, and documenting UI components within the **libs/ui** package.
- **🛠️ Mocking & API Simulation:** [MSW (Mock Service Worker)](https://mswjs.io/) to mock API requests during tests.
- **🔍 DOM Simulation:** [Happy DOM](https://github.com/capricorn86/happy-dom) to provide a lightweight DOM environment for faster testing.
- **🎭 End-to-End (E2E) Testing:** [Playwright](https://playwright.dev/) for browser-based tests, ensuring the app behaves correctly in real-world scenarios.
- **🛡️ Test Utilities:** Custom render utilities from **@/testing/utils** with **`userEvent`** from **@testing-library/user-event** for simulating realistic user interactions.

## 🗂️ Test Organization

The project follows a **feature-based folder structure**, and the tests are organized similarly to keep everything related in one place. Here's an example:

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

To make sure tests reflect the real app environment, I created a **custom render utility** located at **@/testing/utils**. This wraps components with all the necessary providers like **ClerkProvider** for authentication, **QueryClientProvider** for data fetching, and **RouterProvider** from TanStack Router for navigation. This setup ensures that each test behaves as closely as possible to how the app runs in production.

### ⚙️ Key Features of the Custom Render Utility:

- **🔄 State Management:** Wrapped with `QueryClientProvider` using **TanStack Query** for data fetching and caching.
- **🔑 Authentication Context:** Integrated with `ClerkProvider` to simulate authenticated states in tests.
- **🗺️ Routing Support:** Uses `RouterProvider` with **TanStack Router** to mimic real navigation in the test environment.

### 🧪 Example: Using the Custom Render in Tests

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

Vitest is the backbone of the testing suite. It's fast, integrates well with TypeScript, and plays nicely with React Testing Library.

### 🧪 Example: Testing a Movie Card Component

```tsx
import { render, screen } from "@/testing/utils";
import { MovieCard } from "./movie-card";

const mockMovie = {
  title: "Inception",
  releaseDate: "2010-07-16",
  posterPath: "/poster.jpg",
};

describe("MovieCard", () => {
  it("renders movie title and release date", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
  });
});
```

## 🧱 Component Testing & Documentation with Storybook

**Storybook** is specifically used for developing, testing, and documenting UI components within the **libs/ui** package. It serves as a living style guide and a playground to visualize and interact with UI components in various states.

### 🌟 Key Benefits of Storybook:

- **📚 Documentation:** Easily document UI components and their props within the **libs/ui** package.
- **🎨 Visual Testing:** Spot UI regressions quickly with integrated visual regression tools like Chromatic.
- **🧪 Isolated Testing:** Develop and test UI components in isolation from the application logic.

### 🧪 Example: Creating a Story for a Button Component

```tsx
import { Button } from "./button";

export default {
  title: "UI/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Click Me",
};
```

### 🔍 Running Storybook

To start Storybook and view UI components in isolation:

```bash
pnpm dev
```

> **Note:** Storybook will be available at `http://localhost:6006` when running the development server.

## 🛠️ Mocking API Requests with MSW

**Mock Service Worker (MSW)** is used to mock API requests during testing, which helps simulate real-world scenarios without hitting actual endpoints.

### 🧪 Example: Mocking an API Request

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

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("MovieList", () => {
  it("renders a list of movies", async () => {
    render(<MovieList />);
    expect(await screen.findByText("Inception")).toBeInTheDocument();
    expect(await screen.findByText("Interstellar")).toBeInTheDocument();
  });
});
```

## 🎭 End-to-End (E2E) Testing with Playwright

Playwright ensures the app works across different browsers and handles complex interactions. The tests are split into two main files:

1. **`app.spec.ts`** - Tests in-app navigation, like clicking links and interacting with UI elements.
2. **`navigation.spec.ts`** - Tests direct navigation to different routes to ensure pages load correctly.

### 🧪 Example: Testing Navigation

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

## 🔧 Playwright Configuration Highlights

The Playwright setup is designed to ensure **cross-browser compatibility** and reliable test execution, especially in CI environments.

### ⚙️ Key Configuration Choices:

- **🌍 Cross-Browser Testing:** Tests are run on **Chromium**, **Firefox**, and **WebKit** to ensure broad compatibility.
- **⚡ Fully Parallel Execution:** All tests run in parallel to speed up execution.
- **🔁 Retries in CI:** Tests automatically retry up to **3 times** in CI environments to handle flaky tests.
- **⏱️ Global Timeout:** In CI, tests have a global timeout of **30 minutes** to prevent hangs.
- **📦 Setup Project Dependencies:** A setup step ensures any pre-test configurations are handled before running browser tests.

## 💻 Testing Across Browsers

While the primary focus is on ensuring the app runs smoothly in **Chromium**, Playwright tests have been expanded to include **Firefox** and **WebKit**. This ensures the app remains functional across a wide range of browsers. The main goal is to make sure _popcorn.fyi_ doesn’t break in any browser.

## 🛡️ Enforcing Best Practices

To enforce best practices in testing—like preferring **`userEvent`** over `fireEvent` for more realistic simulations—I use [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library?tab=readme-ov-file#supported-rules). This ensures consistent testing patterns and helps catch potential anti-patterns early.

## 🚀 Future Enhancements

- **🖼️ Visual Regression Testing:** Adding tools like Percy or Chromatic to catch unintended UI changes in the **libs/ui** components.
- **📊 Coverage Thresholds:** Implementing coverage threshold regression prevention with Vitest to ensure we don’t lose test coverage over time.
- **♿ Accessibility Testing:** Integrating tools like [axe-core](https://github.com/dequelabs/axe-core) to ensure accessibility standards are met.

---

This testing setup ensures that _popcorn.fyi_ remains reliable, performant, and user-friendly as the project grows.
