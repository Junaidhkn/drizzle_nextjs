import { relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';

import { category, user } from '@/db/schema';
import { postTags } from './postTags';
import { comment } from './comments';

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

export const postRelations = relations(post, ({ one, many }) => ({
	user: one(user, {
		fields: [post.userId],
		references: [user.id],
	}),
	tags: many(postTags),
	comments: many(comment),
	category: one(category, {
		fields: [post.categoryId],
		references: [category.id],
	}),
}));
