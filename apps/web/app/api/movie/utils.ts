import { year } from "@popcorn.fyi/utils";
import { hash } from "ohash";

export const normalizeMetadata = (metadata: {
  genres?: { id: number; name?: string }[];
  overview?: string;
  release_date?: string;
  title?: string;
}) => {
  const description = metadata.overview ?? "No description available.";
  const genres = metadata.genres?.length
    ? metadata.genres.map(({ name }) => name ?? "Unknown").join(", ")
    : "Unknown Genre(s)";
  const releaseDate = metadata.release_date ?? "Unknown Year";
  const title = metadata.title ?? "Unknown Title";
  const id = hash({ description, genres, releaseDate, title });

  return {
    description,
    genres,
    id,
    releaseDate,
    title,
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
  - **DO NOT simply rephrase or expand on the provided description.**  
  - Instead, construct a full, coherent summary **from start to finish**, following a narrative arc.  
  - The **spoiler field** must be entirely separate and ONLY contain major plot twists, character deaths, or the ending.  
  - Ensure **natural paragraph separation**.

  **Movie Details:**
  - **Title:** ${title}
  - **Genre(s):** ${genres}
  - **Release Date:** ${releaseDate}
  - **Context (NOT the full summary, use only as inspiration):**  
    - "${description}"  
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
  `;
};

export const getExpiry = (releaseDate?: string) => {
  const releaseYear = releaseDate ? year(releaseDate) : 0;

  if (!releaseYear || Number.isNaN(releaseYear)) return 604_800_000;

  const currentYear = new Date().getUTCFullYear();
  const yearsAgo = currentYear - releaseYear;

  if (yearsAgo < 3) return 172_800_000; // 48 hours
  if (yearsAgo < 11) return 604_800_000; // 7 days

  return 2_592_000_000; // 30 days
};
