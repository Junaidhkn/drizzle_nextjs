import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { postTags } from '@/db/schema/postTags';
import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';

export const tag = pgTable('tag', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
});

export const tagRelations = relations(tag, ({ many }) => ({
	postToTag: many(postTags),
}));

export const tagSchema = createInsertSchema(tag);
export type TagSchema = z.infer<typeof tagSchema>;
