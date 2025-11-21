import "@testing-library/jest-dom/vitest";

import { server } from "./mocks/server";

beforeEach(() => {
  Object.defineProperty(globalThis, "origin", {
    configurable: true,
    value: "http://localhost:3000",
    writable: true,
  });
});

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
    createServerFn: () => ({
      validator: () => ({
        handler: () => vi.fn(),
      }),
    }),
  };
});
