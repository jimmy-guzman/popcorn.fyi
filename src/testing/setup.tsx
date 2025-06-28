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
