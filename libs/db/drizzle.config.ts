import type { Config } from "drizzle-kit";

export default {
  casing: "snake_case",
  dbCredentials: {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it's okay
    url: process.env.DATABASE_URL!,
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/schemas",
} satisfies Config;
