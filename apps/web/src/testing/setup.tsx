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

vi.mock("@clerk/tanstack-react-start", async () => {
  return {
    ...(await vi.importActual("@clerk/tanstack-react-start")),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
    SignedIn: ({ children: _children }: { children: React.ReactNode }) =>
      undefined,
    SignIn: () => <div data-testid="clerk-signin" />,
    // eslint-disable-next-line @eslint-react/hooks-extra/no-unnecessary-use-prefix -- mocking
    useAuth: () => vi.fn(),
    // eslint-disable-next-line @eslint-react/hooks-extra/no-unnecessary-use-prefix -- mocking
    useUser: () => vi.fn(),
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
            handler: () => vi.fn(),
          };
        },
      };
    },
  };
});
