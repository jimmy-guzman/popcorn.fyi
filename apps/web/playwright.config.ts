import { defineConfig, devices } from "@playwright/test";

const IS_CI = process.env.CI;
const THIRTY_MINUTES_MS = 1_800_000;
const CI_RETRIES = 3;

export default defineConfig({
  forbidOnly: true,
  fullyParallel: true,
  globalTimeout: IS_CI ? THIRTY_MINUTES_MS : undefined,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  reporter: "html",
  retries: IS_CI ? CI_RETRIES : 0,
  testDir: "./e2e",
  webServer: {
    command: "pnpm build --preset node-server && pnpm preview",
    port: 3000,
  },
});
