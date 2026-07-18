import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import { auth } from "./lib/auth.js";

const port = Number(process.env.PORT ?? 3000);
const clientUrl = process.env.CLIENT_URL ?? "http://localhost:5173";

const app = new Elysia()
  .use(
    cors({
      origin: clientUrl,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )
  .mount(auth.handler)


  .get("/api/health", () => ({
    status: "success",
    message: "AmaiReady API is healthy",
  }))

  .listen(port);

console.log(`AmaiReady API running on http://localhost:${app.server.port}`);