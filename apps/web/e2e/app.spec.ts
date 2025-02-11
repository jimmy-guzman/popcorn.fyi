import { expect, test } from "@playwright/test";

test.describe("Home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to Home", async ({ page }) => {
    await page.getByRole("link", { name: "Home" }).click();

    await expect(page).toHaveTitle("popcorn.fyi");
  });
});

test.describe("Discover", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to Discover > Movies", async ({ page }) => {
    await page.getByRole("button", { name: "Discover" }).click();
    await page.getByRole("link", { name: "Movies" }).click();

    await expect(page).toHaveTitle("Discover Movies | popcorn.fyi");
  });

  test("should navigate to Discover > TV Shows", async ({ page }) => {
    await page.getByRole("button", { name: "Discover" }).click();
    await page.getByRole("link", { name: "TV Shows" }).click();

    await expect(page).toHaveTitle("Discover TV Shows | popcorn.fyi");
  });
});

test.describe("Trending", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to Trending > Movies", async ({ page }) => {
    await page.getByRole("button", { name: "Trending" }).click();
    await page.getByRole("link", { name: "Movies" }).click();

    await expect(page).toHaveTitle("Trending Movies | popcorn.fyi");
  });

  test("should navigate to Trending > TV Shows", async ({ page }) => {
    await page.getByRole("button", { name: "Trending" }).click();
    await page.getByRole("link", { name: "TV Shows" }).click();

    await expect(page).toHaveTitle("Trending TV Shows | popcorn.fyi");
  });

  test("should navigate to Trending > People", async ({ page }) => {
    await page.getByRole("button", { name: "Trending" }).click();
    await page.getByRole("link", { name: "People" }).click();

    await expect(page).toHaveTitle("Trending People | popcorn.fyi");
  });
});

test.describe("Popular", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to Popular > Movies", async ({ page }) => {
    await page.getByRole("button", { name: "Popular" }).click();
    await page.getByRole("link", { name: "Movies" }).click();

    await expect(page).toHaveTitle("Popular Movies | popcorn.fyi");
  });

  test("should navigate to Popular > TV Shows", async ({ page }) => {
    await page.getByRole("button", { name: "Popular" }).click();
    await page.getByRole("link", { name: "TV Shows" }).click();

    await expect(page).toHaveTitle("Popular TV Shows | popcorn.fyi");
  });

  test("should navigate to Popular > People", async ({ page }) => {
    await page.getByRole("button", { name: "Popular" }).click();
    await page.getByRole("link", { name: "People" }).click();

    await expect(page).toHaveTitle("Popular People | popcorn.fyi");
  });
});

test.describe("Top Rated", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to Top Rated > Movies", async ({ page }) => {
    await page.getByRole("button", { name: "Top Rated" }).click();
    await page.getByRole("link", { name: "Movies" }).click();

    await expect(page).toHaveTitle("Top Rated Movies | popcorn.fyi");
  });

  test("should navigate to Top Rated > TV Shows", async ({ page }) => {
    await page.getByRole("button", { name: "Top Rated" }).click();
    await page.getByRole("link", { name: "TV Shows" }).click();

    await expect(page).toHaveTitle("Top Rated TV Shows | popcorn.fyi");
  });
});
