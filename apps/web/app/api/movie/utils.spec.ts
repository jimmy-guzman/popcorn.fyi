import { describe, expect, it } from "vitest";

import { composePrompt, getTTL, normalizeMetadata } from "./utils";

describe("normalizeMetadata", () => {
  it("should return correct metadata when all fields are provided", () => {
    const metadata = {
      genres: [
        { id: 1, name: "Sci-Fi" },
        { id: 2, name: "Thriller" },
      ],
      overview: "A mind-bending thriller.",
      release_date: "2010",
      title: "Inception",
    };

    expect(normalizeMetadata(metadata)).toStrictEqual({
      description: "A mind-bending thriller.",
      genres: "Sci-Fi, Thriller",
      releaseDate: "2010",
      title: "Inception",
    });
  });

  it("should handle missing overview", () => {
    const metadata = {
      genres: [{ id: 1, name: "Sci-Fi" }],
      release_date: "2010",
      title: "Inception",
    };

    expect(normalizeMetadata(metadata)).toStrictEqual({
      description: "No description available.",
      genres: "Sci-Fi",
      releaseDate: "2010",
      title: "Inception",
    });
  });

  it("should handle missing genres", () => {
    const metadata = {
      overview: "A mind-bending thriller.",
      release_date: "2010",
      title: "Inception",
    };

    expect(normalizeMetadata(metadata)).toStrictEqual({
      description: "A mind-bending thriller.",
      genres: "Unknown Genre(s)",
      releaseDate: "2010",
      title: "Inception",
    });
  });

  it("should handle missing release date", () => {
    const metadata = {
      genres: [{ id: 1, name: "Sci-Fi" }],
      overview: "A mind-bending thriller.",
      title: "Inception",
    };

    expect(normalizeMetadata(metadata)).toStrictEqual({
      description: "A mind-bending thriller.",
      genres: "Sci-Fi",
      releaseDate: "Unknown Year",
      title: "Inception",
    });
  });

  it("should handle completely empty metadata", () => {
    expect(normalizeMetadata({})).toStrictEqual({
      description: "No description available.",
      genres: "Unknown Genre(s)",
      releaseDate: "Unknown Year",
      title: "Unknown Title",
    });
  });
});

describe("composePrompt", () => {
  it("should generate a valid prompt with given metadata", () => {
    const metadata = {
      description: "A mind-bending thriller.",
      genres: "Sci-Fi, Thriller",
      releaseDate: "2010",
      title: "Inception",
    };

    const prompt = composePrompt(metadata);

    expect(prompt).toContain("Title: Inception");
    expect(prompt).toContain("Genre(s): Sci-Fi, Thriller");
    expect(prompt).toContain("Release Date: 2010");
    expect(prompt).toContain("Overview: A mind-bending thriller.");
    expect(prompt).toContain("Follow a three-act structure:");
    expect(prompt).toContain('"long": [');
  });

  it("should handle missing metadata gracefully", () => {
    const metadata = {
      description: "No description available.",
      genres: "Unknown Genre(s)",
      releaseDate: "Unknown Year",
      title: "Unknown Title",
    };

    const prompt = composePrompt(metadata);

    expect(prompt).toContain("Title: Unknown Title");
    expect(prompt).toContain("Genre(s): Unknown Genre(s)");
    expect(prompt).toContain("Release Date: Unknown Year");
    expect(prompt).toContain("Overview: No description available.");
  });
});

describe("getTTL", () => {
  it("should return 6 hours (21,600,000 ms) for movies released within the last 2 years", () => {
    const currentYear = new Date().getUTCFullYear();

    expect(getTTL(`${currentYear}-01-01`)).toBe(21_600_000);
    expect(getTTL(`${currentYear - 1}-06-15`)).toBe(21_600_000);
    expect(getTTL(`${currentYear - 2}-12-31`)).toBe(21_600_000);
  });

  it("should return 24 hours (86,400,000 ms) for movies released between 3-10 years ago", () => {
    const currentYear = new Date().getUTCFullYear();

    expect(getTTL(`${currentYear - 3}-01-01`)).toBe(86_400_000);
    expect(getTTL(`${currentYear - 5}-06-15`)).toBe(86_400_000);
    expect(getTTL(`${currentYear - 10}-12-31`)).toBe(86_400_000);
  });

  it("should return 72 hours (259,200,000 ms) for movies older than 10 years", () => {
    const currentYear = new Date().getUTCFullYear();

    expect(getTTL(`${currentYear - 11}-01-01`)).toBe(259_200_000);
    expect(getTTL(`${currentYear - 15}-06-15`)).toBe(259_200_000);
    expect(getTTL("2000-12-31")).toBe(259_200_000);
  });

  it("should return 24 hours (86,400,000 ms) for invalid or missing release date", () => {
    expect(getTTL(undefined)).toBe(86_400_000);
    expect(getTTL("")).toBe(86_400_000);
    expect(getTTL("invalid")).toBe(86_400_000);
  });
});
