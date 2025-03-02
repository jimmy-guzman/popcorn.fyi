import { sql } from "drizzle-orm";
import { pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-valibot";

import { Media } from "./media";

export const MediaList = pgTable(
  "media_list",
  (t) => {
    return {
      createdAt: t.timestamp({ mode: "string" }).defaultNow().notNull(),
      deletedAt: t.timestamp({ mode: "string" }),
      id: t.uuid().primaryKey().defaultRandom(),
      listType: t.text().notNull().$type<"favorite" | "watchlist">(),
      mediaId: t
        .uuid()
        .notNull()
        .references(() => Media.id, { onDelete: "cascade" }),
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
      uniqueIndex("media_list_user_id_media_id_list_type_idx").on(
        t.userId,
        t.mediaId,
        t.listType,
      ),
    ];
  },
);

export const MediaListInsertSchema = createInsertSchema(MediaList);
