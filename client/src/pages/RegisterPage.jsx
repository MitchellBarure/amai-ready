import {useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { registerSchema } from "@/lib/validation/register-schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  HeartIcon,
} from "@heroicons/react/24/outline";

const initialFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function handleChange(event) {
  const { name, value } = event.target;

  setFormData((currentData) => ({
    ...currentData,
    [name]: value,
  }));

  if (errors[name]) {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const result = registerSchema.safeParse(formData);

  if (!result.success) {
    const validationErrors = {};

    for (const issue of result.error.issues) {
      const fieldName = issue.path[0];

      if (fieldName && !validationErrors[fieldName]) {
        validationErrors[fieldName] = issue.message;
      }
    }

    setErrors(validationErrors);
    return;
  }

  setErrors({});

  console.log("Valid registration data:", result.data);
}

function RegisterPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  return (
    <main className="min-h-dvh overflow-x-clip bg-background xl:grid xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      {/* Side panel fro desktop only */}
        <aside className="relative hidden min-h-dvh overflow-hidden bg-linear-to-br from-primary via-[#d53c48] to-brand-orange text-white xl:flex">         

        {/*  content */}
        <div className="relative z-10 flex w-full flex-col px-12 py-10 xl:px-18 xl:py-14">
          {/* Logo */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-white"
              aria-label="Go to AmaiReady home page"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-white/20 text-2xl shadow-sm backdrop-blur-sm">
                 <HeartIcon
                    className="size-7 text-white"
                    aria-hidden="true"
                />
              </span>

              <span className="font-heading text-3xl font-bold">
                AmaiReady
              </span>
            </Link>

            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
              Maternal delivery support
            </p>
          </div>

          {/* Main text */}
          <div className="my-auto max-w-xl">
            <h1 className="font-heading text-5xl leading-tight font-bold xl:text-6xl">
              Preparing every mother for a{" "}
              <span className="text-brand-gold">
                safe delivery.
              </span>
            </h1>
          </div>

          <p className="text-sm text-white/65">
            Preparation support only. AmaiReady does not replace
            professional medical advice.
          </p>
        </div>
      </aside>

      {/* Form section */}
        <section className="flex min-h-dvh min-w-0 items-start justify-center px-4 py-6 sm:px-6 sm:py-10 xl:items-center xl:px-12 2xl:px-20">       
             <div className="w-full min-w-0 max-w-xl">
          {/* Mobile styling */}
          <div className="mb-6 xl:hidden">
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-primary"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-primary text-xl text-white">
                  <HeartIcon
                    className="size-6"
                    aria-hidden="true"
                />
              </span>

              <span className="font-heading text-3xl font-bold">
                AmaiReady
              </span>
            </Link>

            <p className="mt-3 text-sm text-muted-foreground">
              Maternal delivery preparation and support.
            </p>
          </div>

          {/* Registration card */}
            <Card className="w-full min-w-0 gap-0 overflow-hidden border-border bg-card py-0 shadow-none sm:shadow-sm">            
                <CardHeader className="space-y-2 px-5 pt-6 sm:space-y-3 sm:px-8 sm:pt-8">

              <CardTitle className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl xl:text-5xl">
                Create an account
              </CardTitle>

              <CardDescription className="text-base leading-7 text-muted-foreground">
                Start preparing for your delivery with clearer
                guidance and support.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
              {/* Actual Form */}
<form
  className="w-full min-w-0 space-y-4 sm:space-y-5"
  onSubmit={handleSubmit}
  noValidate
>  {/* Full name */}
  <div className="space-y-2">
    <Label htmlFor="full-name">
      Full name
    </Label>

    <Input
      id="full-name"
      name="fullName"
      type="text"
      placeholder="Enter your full name"
      autoComplete="name"
      value={formData.fullName}
        onChange={handleChange}
        aria-invalid={Boolean(errors.fullName)}
        aria-describedby={errors.fullName ? "full-name-error" : undefined}
      className="h-11 w-full min-w-0 bg-background sm:h-12"
    />

    {errors.fullName && (
  <p
    id="full-name-error"
    className="text-sm font-medium text-destructive"
    role="alert"
  >
    {errors.fullName}
  </p>
)}
  </div>

  {/* Email */}
  <div className="space-y-2">
  <Label htmlFor="email">Email address</Label>

  <Input
    id="email"
    name="email"
    type="email"
    placeholder="you@example.com"
    autoComplete="email"
    value={formData.email}
    onChange={handleChange}
    aria-invalid={Boolean(errors.email)}
    aria-describedby={errors.email ? "email-error" : undefined}
    className="h-11 w-full min-w-0 bg-background sm:h-12"
  />

  {errors.email && (
    <p
      id="email-error"
      className="text-sm font-medium text-destructive"
      role="alert"
    >
      {errors.email}
    </p>
  )}
</div>

  {/* Password */}
<div className="space-y-2">
  <Label htmlFor="password">Password</Label>

  <Input
    id="password"
    name="password"
    type="password"
    placeholder="Create a password"
    autoComplete="new-password"
    value={formData.password}
    onChange={handleChange}
    aria-invalid={Boolean(errors.password)}
    aria-describedby={
      errors.password ? "password-error" : "password-help"
    }
    className="h-11 w-full min-w-0 bg-background sm:h-12"
  />

  {errors.password ? (
    <p
      id="password-error"
      className="text-sm font-medium text-destructive"
      role="alert"
    >
      {errors.password}
    </p>
  ) : (
    <p
      id="password-help"
      className="text-sm text-muted-foreground"
    >
      Use at least 8 characters.
    </p>
  )}
</div>

  {/* Confirm password */}
  <div className="space-y-2">
  <Label htmlFor="password">Password</Label>

  <Input
    id="password"
    name="password"
    type="password"
    placeholder="Create a password"
    autoComplete="new-password"
    value={formData.password}
    onChange={handleChange}
    aria-invalid={Boolean(errors.password)}
    aria-describedby={
      errors.password ? "password-error" : "password-help"
    }
    className="h-11 w-full min-w-0 bg-background sm:h-12"
  />

  {errors.password ? (
    <p
      id="password-error"
      className="text-sm font-medium text-destructive"
      role="alert"
    >
      {errors.password}
    </p>
  ) : (
    <p
      id="password-help"
      className="text-sm text-muted-foreground"
    >
      Use at least 8 characters.
    </p>
  )}
</div>

  {/* Submit button */}
  <Button
    type="submit"
    className="h-12 w-full text-base font-bold sm:h-12"
  >
    Create Account
  </Button>
</form>

              <p className="mt-7 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-primary underline-offset-4 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;


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