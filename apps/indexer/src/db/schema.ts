import { pgTable, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

// Users Table (Linked to Stellar Public Key)
export const users = pgTable('users', {
  id: varchar('id', { length: 64 }).primaryKey(), // Stellar Public Key (G...)
  email: varchar('email', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

// Stream Metadata & Custom Preferences for YieldStream
export const streamPreferences = pgTable('stream_preferences', {
  streamId: varchar('stream_id', { length: 64 }).primaryKey(), // On-chain Soroban stream ID
  ownerAddress: varchar('owner_address', { length: 64 }).references(() => users.id),
  alias: varchar('alias', { length: 100 }), // Custom user label (e.g., "Monthly Dev Payroll")
  category: varchar('category', { length: 32 }).default('general'), // payroll, subscription, grant
  notifyOnClaim: boolean('notify_on_claim').default(true),
  autoYieldCompound: boolean('auto_yield_compound').default(false),
});