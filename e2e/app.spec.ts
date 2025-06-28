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

  test("should navigate to Movies > Popular", async ({ page }) => {
    await page.getByRole("button", { name: "Movies" }).click();
    await page.getByRole("link", { name: "Popular" }).click();

    await expect(page).toHaveTitle("Popular Movies | popcorn.fyi");
  });

  test("should navigate to TV Shows > Popular", async ({ page }) => {
    await page.getByRole("button", { name: "TV Shows" }).click();
    await page.getByRole("link", { name: "Popular" }).click();

    await expect(page).toHaveTitle("Popular TV Shows | popcorn.fyi");
  });

  test("should navigate to People > Popular", async ({ page }) => {
    await page.getByRole("button", { name: "People" }).click();
    await page.getByRole("link", { name: "Popular" }).click();

    await expect(page).toHaveTitle("Popular People | popcorn.fyi");
  });
});

test.describe("Top Rated", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to Movies > Top Rated", async ({ page }) => {
    await page.getByRole("button", { name: "Movies" }).click();
    await page.getByRole("link", { name: "Top Rated" }).click();

    await expect(page).toHaveTitle("Top Rated Movies | popcorn.fyi");
  });

  test("should navigate to TV Shows > Top Rated", async ({ page }) => {
    await page.getByRole("button", { name: "TV Shows" }).click();
    await page.getByRole("link", { name: "Top Rated" }).click();

    await expect(page).toHaveTitle("Top Rated TV Shows | popcorn.fyi");
  });
});

test.describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should search", async ({ page }) => {
    await page
      .getByRole("searchbox", { name: "Search movies and TV shows" })
      .pressSequentially("Marvel");

    await expect(page).toHaveTitle('Search results for "Marvel" | popcorn.fyi');
  });
});
