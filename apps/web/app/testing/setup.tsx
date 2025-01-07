import "@testing-library/jest-dom/vitest";

import { server } from "./mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

vi.mock("@clerk/tanstack-start", async () => {
  return {
    ...(await vi.importActual("@clerk/tanstack-start")),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => {
      return children;
    },
    SignIn: () => {
      return <div data-testid="clerk-signin" />;
    },
  };
});
