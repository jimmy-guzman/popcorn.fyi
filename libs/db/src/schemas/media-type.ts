import { pgEnum } from "drizzle-orm/pg-core";

export const MediaTypeEnum = pgEnum("media_type", ["movie", "tv", "person"]);
