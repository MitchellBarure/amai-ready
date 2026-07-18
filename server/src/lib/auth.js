import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";

import { db, schema } from "../db/index.js";

const clientUrl = process.env.CLIENT_URL ?? "http://localhost:5173";
const authUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is missing from server/.env");
}

export const auth = betterAuth({
  baseURL: authUrl,
  basePath: "/api/auth",
  secret: process.env.BETTER_AUTH_SECRET,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  trustedOrigins: [clientUrl],

  user: {
    additionalFields: {
      role: {
        type: ["mother", "admin"],
        required: false,
        defaultValue: "mother",
        input: false,
      },
    },
  },
});