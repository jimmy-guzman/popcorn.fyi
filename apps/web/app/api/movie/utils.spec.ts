import { composePrompt, getExpiry, normalizeMetadata } from "./utils";

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
      id: "HENZuewo11yC5OlR9VaTg5EQQ0jzbtNltDSO2UmoC3I",
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
      id: "dmfhNK1J4Uu-ummeyruAl0lEqAhAEyGS_CzKQd-4rIM",
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
      id: "JGur1fiUneM14Dx0av_QUzAWAl0I29eMRL9oasScPxg",
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
      id: "e69X7bCJCdD2c_H8Ce-tHLNyWrSEVWnv2BWYBYCA2Sw",
      releaseDate: "Unknown Year",
      title: "Inception",
    });
  });

  it("should handle completely empty metadata", () => {
    expect(normalizeMetadata({})).toStrictEqual({
      description: "No description available.",
      genres: "Unknown Genre(s)",
      id: "eJbsv_quY_3eyTSlao0yeqkoerT1OPdQ3HAeCAGVcFs",
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

    expect(prompt).toMatchInlineSnapshot(`
      "
        You are an AI movie assistant. Generate a structured **plot summary** of the following movie.

        **Guidelines:**
        - **DO NOT simply rephrase or expand on the provided description.**  
        - Instead, construct a full, coherent summary **from start to finish**, following a narrative arc.  
        - The **spoiler field** must be entirely separate and ONLY contain major plot twists, character deaths, or the ending.  
        - Ensure **natural paragraph separation**.

        **Movie Details:**
        - **Title:** Inception
        - **Genre(s):** Sci-Fi, Thriller
        - **Release Date:** 2010
        - **Context (NOT the full summary, use only as inspiration):**  
          - "A mind-bending thriller."  
          - This is the movie's premise, not its full plot. Use it as a starting point but construct a complete story.  

        **Structure to Follow:**
        - **Act 1** (Setup): Introduce main characters, their goals, and the setting.  
        - **Act 2** (Conflict): The protagonist faces obstacles, challenges, and major turning points.  
        - **Act 3** (Resolution): The climax unfolds, conflicts are resolved, and the story concludes.  

        **Expected JSON Output (STRICT FORMAT):**
        - The response MUST be valid JSON. Do NOT include any extra text, introductions, or explanations.
        - Output must strictly match this structure:

        \`\`\`json
        {
          "long": [
            { "text": "Act 1 setup...", "spoiler": "Major plot twist..." },
            { "text": "Character arcs...", "spoiler": "Hidden betrayal..." },
            { "text": "Climax buildup...", "spoiler": "Shocking ending reveal..." }
          ]
        }
        \`\`\`

        **Edge Cases:**
        - If the movie lacks a traditional three-act structure, describe its **narrative flow** instead.  
        - If details are vague, focus on **themes, tone, and intended audience experience**.  
        - The **spoiler field** must NOT repeat non-spoiler content.  

        **IMPORTANT:**  
        - The response MUST start with '{' and end with '}'.  
        - Do NOT include any preamble, explanations, or markdown formatting.
        "
    `);
  });
});

describe("getExpiry", () => {
  it("should return 48 hours (172,800,000 ms) for movies released within the last 2 years", () => {
    const currentYear = new Date().getUTCFullYear();

    expect(getExpiry(`${currentYear}-01-01`)).toBe(172_800_000);
    expect(getExpiry(`${currentYear - 1}-06-15`)).toBe(172_800_000);
    expect(getExpiry(`${currentYear - 2}-12-31`)).toBe(172_800_000);
  });

  it("should return 7 days (604,800,000 ms) for movies released between 3-10 years ago", () => {
    const currentYear = new Date().getUTCFullYear();

    expect(getExpiry(`${currentYear - 3}-01-01`)).toBe(604_800_000);
    expect(getExpiry(`${currentYear - 5}-06-15`)).toBe(604_800_000);
    expect(getExpiry(`${currentYear - 10}-12-31`)).toBe(604_800_000);
  });

  it("should return 30 days (2,592,000,000 ms) for movies older than 10 years", () => {
    const currentYear = new Date().getUTCFullYear();

    expect(getExpiry(`${currentYear - 11}-01-01`)).toBe(2_592_000_000);
    expect(getExpiry(`${currentYear - 15}-06-15`)).toBe(2_592_000_000);
    expect(getExpiry("2000-12-31")).toBe(2_592_000_000);
  });

  it("should return 7 days (604,800,000 ms) for invalid or missing release date", () => {
    expect(getExpiry(undefined)).toBe(604_800_000);
    expect(getExpiry("")).toBe(604_800_000);
    expect(getExpiry("invalid")).toBe(604_800_000);
  });
});
