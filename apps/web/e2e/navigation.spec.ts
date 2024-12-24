import { expect, test } from "@playwright/test";

test("should navigate to Home", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Home" }).click();

  await expect(page).toHaveTitle("popcorn.fyi");
});

test.describe("TV Shows", () => {
  test("should navigate to TV Shows > Popular", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "TV Shows" }).click();
    await page.getByRole("link", { name: "Popular" }).click();

    await expect(page).toHaveTitle("Popular TV Shows | popcorn.fyi");
  });

  test("should navigate to TV Shows > Top Rated", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "TV Shows" }).click();
    await page.getByRole("link", { name: "Top Rated" }).click();

    await expect(page).toHaveTitle("Top Rated TV Shows | popcorn.fyi");
  });
});

test.describe("Movies", () => {
  test("should navigate to Movies > Popular", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Movies" }).click();
    await page.getByRole("link", { name: "Popular" }).click();

    await expect(page).toHaveTitle("Popular Movies | popcorn.fyi");
  });

  test("should navigate to Movies > Top Rated", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Movies" }).click();
    await page.getByRole("link", { name: "Top Rated" }).click();

    await expect(page).toHaveTitle("Top Rated Movies | popcorn.fyi");
  });
});

test.describe("People", () => {
  test("should navigate to People > Popular", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "People" }).click();
    await page.getByRole("link", { name: "Popular" }).click();

    await expect(page).toHaveTitle("Popular People | popcorn.fyi");
  });
});

test.describe("Trending", () => {
  test("should navigate to Trending > Movies", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Trending" }).click();
    await page.getByRole("link", { name: "Movies" }).click();

    await expect(page).toHaveTitle("Trending Movies | popcorn.fyi");
  });

  test("should navigate to Trending > TV Shows", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Trending" }).click();
    await page.getByRole("link", { name: "TV Shows" }).click();

    await expect(page).toHaveTitle("Trending TV Shows | popcorn.fyi");
  });
});

test("should search", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("textbox", { name: "Search" })
    .pressSequentially("Marvel");

  await expect(page).toHaveTitle('Search results for "Marvel" | popcorn.fyi');
});
