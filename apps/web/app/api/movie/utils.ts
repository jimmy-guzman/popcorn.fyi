import { year } from "@popcorn.fyi/utils";

export const normalizeMetadata = (metadata: {
  genres?: { id: number; name?: string }[];
  overview?: string;
  release_date?: string;
  title?: string;
}) => {
  return {
    description: metadata.overview ?? "No description available.",
    genres: metadata.genres?.length
      ? metadata.genres.map(({ name }) => name ?? "Unknown").join(", ")
      : "Unknown Genre(s)",
    releaseDate: metadata.release_date ?? "Unknown Year",
    title: metadata.title ?? "Unknown Title",
  };
};

export const composePrompt = ({
  description,
  genres,
  releaseDate,
  title,
}: {
  description: string;
  genres: string;
  releaseDate: string;
  title: string;
}) => {
  return `
  You are an AI movie assistant. Generate a structured **plot summary** of the following movie.
  
  **Guidelines:**
  - Provide a **base summary** without spoilers.
  - The spoiler field should be entirely separate and ONLY contain major plot twists, character deaths, or the ending.
  - Ensure **natural paragraph separation**.

  **Movie Details:**
  - Title: ${title}
  - Genre(s): ${genres}
  - Release Date: ${releaseDate}
  - Overview: ${description}  
    - Expand beyond this overview by summarizing key plot points.  
    - Follow a three-act structure:  
      - Act 1 (Setup)  
      - Act 2 (Conflict)  
      - Act 3 (Resolution)  
    - Describe the main character arcs and themes.  

  **Expected JSON Output (STRICT FORMAT):**
  - The output must be valid JSON and match this exact structure. Do NOT include any extra text or explanations.

  {
    "long": [
      { "text": "Act 1 setup...", "spoiler": "Major plot twist..." },
      { "text": "Character arcs...", "spoiler": "Hidden betrayal..." },
      { "text": "Climax buildup...", "spoiler": "Shocking ending reveal..." }
    ]
  }

  **Edge Cases:**
  - If the movie lacks a traditional three-act structure, describe its narrative flow instead.
  - If details are vague, focus on themes, tone, and the intended audience experience.
`;
};

export const getExpiry = (releaseDate?: string) => {
  const releaseYear = releaseDate ? year(releaseDate) : 0;

  if (!releaseYear || Number.isNaN(releaseYear)) return 172_800_000; // 48 hours

  const currentYear = new Date().getUTCFullYear();
  const yearsAgo = currentYear - releaseYear;

  if (yearsAgo < 3) return 43_200_000; // 12 hours
  if (yearsAgo < 11) return 172_800_000; // 48 hours

  return 604_800_000; // 7 days
};
