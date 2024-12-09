import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env["BASE_URL"] ?? "http://localhost:3000";
const isCI = Boolean(process.env["CI"]);
const vercelAutomationBypassSecret =
  process.env["VERCEL_AUTOMATION_BYPASS_SECRET"];

export default defineConfig({
  forbidOnly: isCI,
  fullyParallel: true,
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
  retries: isCI ? 2 : 0,
  testDir: "./e2e",
  use: {
    baseURL,
    trace: "on-first-retry",
    ...(isCI &&
      vercelAutomationBypassSecret && {
        extraHTTPHeaders: {
          "x-vercel-protection-bypass": vercelAutomationBypassSecret,
          "x-vercel-set-bypass-cookie": "true",
        },
      }),
  },
  ...(isCI && { workers: 1 }),
});
