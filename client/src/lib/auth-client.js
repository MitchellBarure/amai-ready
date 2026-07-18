import { createAuthClient } from "better-auth/react";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("VITE_API_URL is missing from client/.env");
}

export const authClient = createAuthClient({
  baseURL: apiUrl,

  fetchOptions: {
    credentials: "include",
  },
});