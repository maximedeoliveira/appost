import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { users } from '@/db/schema/user';

export const projects = sqliteTable('project', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  uploadKey: text('uploadKey')
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
});
