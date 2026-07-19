import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(100, "Your name must be 100 characters or fewer."),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address.")
      .max(254, "Your email address is too long."),

    password: z
      .string()
      .min(8, "Your password must contain at least 8 characters.")
      .max(128, "Your password must contain no more than 128 characters."),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password."),
  })
  .refine(
    (values) => values.password === values.confirmPassword,
    {
      message: "The passwords do not match.",
      path: ["confirmPassword"],
    },
  );