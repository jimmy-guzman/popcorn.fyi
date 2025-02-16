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
    useUser: () => {
      return vi.fn();
    },
  };
});

vi.mock("@tanstack/start", async () => {
  const actual = await vi.importActual("@tanstack/start");

  return {
    ...actual,
    createServerFn: () => {
      return {
        validator: () => {
          return {
            handler: () => {
              return vi.fn();
            },
          };
        },
      };
    },
  };
});
