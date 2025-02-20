import { sql } from "drizzle-orm";
import { index, pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-valibot";

export const UserFavorites = pgTable(
  "user_favorites",
  (t) => {
    return {
      createdAt: t.timestamp({ mode: "string" }).defaultNow().notNull(),
      id: t.uuid().primaryKey().defaultRandom(),
      mediaType: t.text({ enum: ["tv", "movie", "person"] }).notNull(),
      tmdbId: t.integer().notNull(),
      updatedAt: t
        .timestamp({ mode: "string" })
        .defaultNow()
        .$onUpdate(() => sql`now()`)
        .notNull(),
      userId: t.text().notNull(),
    };
  },
  (t) => {
    return [
      index("media_type_idx").on(t.mediaType),
      uniqueIndex("media_type_tmdb_id_idx").on(t.mediaType, t.tmdbId),
    ];
  },
);

export const UserFavoritesInsertSchema = createInsertSchema(UserFavorites);
