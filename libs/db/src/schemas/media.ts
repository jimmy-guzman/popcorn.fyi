import { sql } from "drizzle-orm";
import { index, pgTable, uniqueIndex } from "drizzle-orm/pg-core";

export const Media = pgTable(
  "media",
  (t) => {
    return {
      createdAt: t.timestamp({ mode: "string" }).defaultNow().notNull(),
      description: t.text().notNull(),
      embedding: t.vector({
        dimensions: 1536, // text-embedding-3-small
      }),
      genres: t
        .text()
        .array()
        .default(sql`ARRAY[]::TEXT[]`),
      id: t.uuid().primaryKey().defaultRandom(),
      language: t.text().default("en"),
      mediaType: t.text().notNull().$type<"movie" | "tv">(),
      releaseYear: t.integer(),
      title: t.text().notNull(),
      tmdbId: t.integer().notNull(),
      updatedAt: t
        .timestamp({ mode: "string" })
        .defaultNow()
        .$onUpdate(() => sql`now()`)
        .notNull(),
    };
  },
  (t) => {
    return [
      index("media_embedding_idx").using(
        "hnsw",
        t.embedding.op("vector_l2_ops"),
      ),
      index("media_type_release_idx").on(t.mediaType, t.releaseYear),
      uniqueIndex("media_tmdb_id_type_idx").on(t.tmdbId, t.mediaType),
    ];
  },
);
