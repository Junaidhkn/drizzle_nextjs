import { InferSelectModel, relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { category, user } from '@/db/schema';

export const post = pgTable('post', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	title: varchar('title', { length: 255 }).notNull(),
	shortDescription: text('short_description'),
	content: text('content').notNull(),
	categoryId: integer('category_id')
		.references(() => category.id)
		.notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

// export const postRelations = relations(post, ({ one }) => {});
