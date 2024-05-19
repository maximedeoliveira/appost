import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/index.ts",
  driver: "turso",
  out: "migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!
  },
} satisfies Config;
