import { relations } from "drizzle-orm";

import { Media } from "./media";
import { MediaList } from "./media-list";

export const mediaRelations = relations(Media, ({ many }) => {
  return {
    mediaListEntries: many(MediaList),
  };
});

export const mediaListRelations = relations(MediaList, ({ one }) => {
  return {
    media: one(Media, {
      fields: [MediaList.mediaId],
      references: [Media.id],
    }),
  };
});
