import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').notNull().primaryKey(),
	fullName: varchar('full_name', { length: 255 }).notNull(),
	age: integer('age').notNull(),
	password: varchar('password', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
});
