import { drizzle } from "drizzle-orm/vercel-postgres";
import { createPool } from "@vercel/postgres";
import * as schema from "./schema";

// Lazy initialization so the build succeeds in environments without a database.
// Supports DATABASE_URL (canonical, provider-agnostic) with a fallback to
// POSTGRES_URL (Vercel's auto-set name when you add a database to your project).
function createDb() {
  const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL or POSTGRES_URL must be set. See docs/for-tech-volunteers/setup-devotional-emails.md"
    );
  }
  return drizzle(createPool({ connectionString }), { schema });
}

let _db: ReturnType<typeof createDb> | null = null;

export function getDb(): ReturnType<typeof createDb> {
  if (!_db) _db = createDb();
  return _db;
}

// Convenience alias used by most callers — evaluated lazily on first use.
export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_, prop) {
    return Reflect.get(getDb(), prop);
  },
});
