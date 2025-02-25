import { sql } from "drizzle-orm";
import { index, pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-valibot";

import { MediaTypeEnum } from "./media-type";

export const Watchlist = pgTable(
  "watchlist",
  (t) => {
    return {
      createdAt: t.timestamp({ mode: "string" }).defaultNow().notNull(),
      deletedAt: t.timestamp({ mode: "string" }),
      id: t.uuid().primaryKey().defaultRandom(),
      mediaType: MediaTypeEnum().notNull(),
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
      index("watchlist_media_type_idx").on(t.mediaType),
      uniqueIndex("watchlist_user_id_media_type_tmdb_id_idx").on(
        t.userId,
        t.mediaType,
        t.tmdbId,
      ),
    ];
  },
);

export const WatchlistInsertSchema = createInsertSchema(Watchlist);
