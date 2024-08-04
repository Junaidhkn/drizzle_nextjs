import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { post } from '@/db/schema/post';
import { tag } from '@/db/schema/tag';
import { relations } from 'drizzle-orm';

export const postTags = pgTable(
	'post_to_tag',
	{
		postId: integer('post_id')
			.notNull()
			.references(() => post.id),
		tagId: integer('tag_id')
			.notNull()
			.references(() => tag.id),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.postId, table.tagId] }),
	}),
);

export const postTagRelations = relations(postTags, ({ one }) => ({
	tag: one(tag, { fields: [postTags.tagId], references: [tag.id] }),
	post: one(post, { fields: [postTags.postId], references: [post.id] }),
}));
