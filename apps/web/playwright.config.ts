import { defineConfig, devices } from "@playwright/test";

const IS_CI = process.env.CI;

export default defineConfig({
  forbidOnly: true,
  fullyParallel: true,
  globalTimeout: IS_CI ? 30 * 60 * 1000 : undefined,
  projects: [
    {
      name: "setup",
      testMatch: /playwright\.setup\.ts/,
    },
    {
      dependencies: ["setup"],
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      dependencies: ["setup"],
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      dependencies: ["setup"],
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  reporter: "html",
  retries: IS_CI ? 3 : 0,
  testDir: "./e2e",
  webServer: {
    command: "pnpm build --preset node-server && pnpm preview",
    port: 3000,
  },
});
