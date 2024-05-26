import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { projects } from '@/db/schema/project';

type BuildPlatform = 'ios' | 'android';

export const builds = sqliteTable('build', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  projectId: text('projectId')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  platform: text('platform').$type<BuildPlatform>().notNull(),
  version: text('version').notNull(),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});
