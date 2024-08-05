import {
	AnyPgColumn,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

import { post } from '@/db/schema/post';
import { user } from '@/db/schema';
import { relations } from 'drizzle-orm';

export const comment = pgTable('comment', {
	id: serial('id').primaryKey(),
	parentId: integer('parent_id').references((): AnyPgColumn => comment.id),
	userId: integer('user_id')
		.references(() => user.id)
		.notNull(),
	content: text('content').notNull(),
	postId: integer('post_id').notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});

export const commentRelations = relations(comment, ({ one }) => ({
	user: one(user, {
		fields: [comment.userId],
		references: [user.id],
	}),
	post: one(post, {
		fields: [comment.postId],
		references: [post.id],
	}),
}));
