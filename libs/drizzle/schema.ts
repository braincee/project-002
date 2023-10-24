import { relations, sql } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().notNull(),
  address: text('address').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).default(sql`now()`),
  updatedAt: timestamp('updated_at', { mode: 'date' }).default(sql`now()`),
})

export const contents = pgTable('contents', {
  id: uuid('id').primaryKey().notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  url: text('url').notNull(),
  fileType: text('fileType').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).default(sql`now()`),
  updatedAt: timestamp('updated_at', { mode: 'date' }).default(sql`now()`),
})

export const contentAddresses = pgTable('content_addresses', {
  contentId: uuid('content_id')
    .notNull()
    .references(() => contents.id),
  addressId: uuid('address_id')
    .notNull()
    .references(() => addresses.id),
  createdAt: timestamp('created_at', { mode: 'date' }).default(sql`now()`),
  updatedAt: timestamp('updated_at', { mode: 'date' }).default(sql`now()`),
})

export const logs = pgTable('logs', {
  id: uuid('id').primaryKey().notNull(),
  log: text('log').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).default(sql`now()`),
  updatedAt: timestamp('updated_at', { mode: 'date' }).default(sql`now()`),
})

export const users = pgTable('users', {
  id: uuid('id').primaryKey().notNull(),
  email: text('email').notNull(),
  password: text('password'),
  invited: boolean('invited'),
  createdAt: timestamp('created_at', { mode: 'date' }).default(sql`now()`),
  updatedAt: timestamp('updated_at', { mode: 'date' }).default(sql`now()`),
})

export const addressesRelations = relations(addresses, ({ many }) => ({
  ContentAddresses: many(contentAddresses),
}))

export const contentsRelations = relations(contents, ({ many }) => ({
  ContentAddresses: many(contentAddresses),
}))

export const ContentAddressesRelations = relations(
  contentAddresses,
  ({ one }) => ({
    address: one(addresses, {
      fields: [contentAddresses.addressId],
      references: [addresses.id],
    }),
    content: one(contents, {
      fields: [contentAddresses.contentId],
      references: [contents.id],
    }),
  })
)
