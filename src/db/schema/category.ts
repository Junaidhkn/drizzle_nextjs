import { relations } from 'drizzle-orm';
import { pgTable, serial, uuid, varchar } from 'drizzle-orm/pg-core';
import { post } from '@/db/schema/post';

export const category = pgTable('category', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	ass: uuid('ass').notNull(),
});

export const categoryRelations = relations(category, ({ many }) => ({
	posts: many(post),
}));
