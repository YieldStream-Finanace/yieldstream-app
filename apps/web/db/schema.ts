import { pgTable, serial, text, timestamp, numeric } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  publicKey: text('public_key').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const streamsTable = pgTable('streams', {
  id: serial('id').primaryKey(),
  creatorPublicKey: text('creator_public_key').notNull(),
  recipient: text('recipient').notNull(),
  amount: numeric('amount').notNull(),
  alias: text('alias'),
  category: text('category').default('payroll'),
  txHash: text('tx_hash').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});