import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

config({ quiet: true });

const IS_CI = process.env.CI;
const GLOBAL_TIMEOUT = 1_800_000;
const CI_RETRIES = 3;

export default defineConfig({
  forbidOnly: true,
  fullyParallel: true,
  globalTimeout: IS_CI ? GLOBAL_TIMEOUT : undefined,
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
  reporter: IS_CI ? [["html"], ["github"]] : "html",
  retries: IS_CI ? CI_RETRIES : 0,
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
    trace: IS_CI ? "retain-on-failure" : "on-first-retry",
  },
  webServer: {
    command: "pnpm preview --port 3000",
    port: 3000,
    reuseExistingServer: !IS_CI,
    timeout: 120_000,
  },
});
