import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as appSchema from "./schema.js";
import * as authSchema from "./auth-schema.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing from server/.env");
}

export const databaseClient = postgres(connectionString, {
  prepare: false,
});

export const schema = {
  ...authSchema,
  ...appSchema,
};

export const db = drizzle(databaseClient, {
  schema,
});