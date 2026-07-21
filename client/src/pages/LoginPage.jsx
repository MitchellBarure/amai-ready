import { useState } from "react";
import { Link } from "react-router";
import { getHomeRoute } from "@/lib/auth-routes";


import {
  EyeIcon,
  EyeSlashIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/validation/login-schema";

const initialFormData = {
  email: "",
  password: "",
};

function LoginPage() {

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (authError) {
      setAuthError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setAuthError("");

    const result = loginSchema.safeParse(formData);

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
    setIsSubmitting(true);

    try {
        const { data, error } = await authClient.signIn.email({
          email: result.data.email,
          password: result.data.password,
        });

        if (error) {
          setAuthError(
            error.message || "The email or password is incorrect.",
          );
          return;
        }

        const {
    data: session,
    error: sessionError,
  } = await authClient.getSession({
    query: {
      disableCookieCache: true,
    },
  });

  if (sessionError || !session) {
    setAuthError(
      "Your login succeeded, but the session could not be confirmed. Please try again.",
    );
    return;
  }

  setFormData(initialFormData);

  const destination = getHomeRoute(session.user?.role);

  window.location.replace(destination);

    } catch (error) {
      console.error("Login request failed:", error);

      setAuthError(
        "The server could not be reached. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

return (
  <main className="min-h-dvh overflow-x-clip bg-background xl:grid xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
    {/* Desktop screen */}
    <aside className="relative hidden min-h-dvh overflow-hidden bg-linear-to-br from-primary via-[#d53c48] to-brand-orange text-white xl:flex">
      <div className="relative z-10 flex w-full flex-col px-12 py-10 xl:px-18 xl:py-14">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-white"
            aria-label="Go to AmaiReady home page"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-white/20 shadow-sm backdrop-blur-sm">
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

        <div className="my-auto max-w-xl">
          <h1 className="font-heading text-5xl font-bold leading-tight xl:text-6xl">
            Welcome back to your{" "}
            <span className="text-brand-gold">
              preparation journey.
            </span>
          </h1>
        </div>

        <p className="text-sm text-white/65">
          Preparation support only. AmaiReady does not replace
          professional medical advice.
        </p>
      </div>
    </aside>

    {/* Login form section */}
    <section className="flex min-h-dvh min-w-0 items-center justify-center px-4 py-6 sm:px-6 sm:py-10 xl:items-center xl:px-12 2xl:px-20">
      <div className="w-full min-w-0 max-w-xl">
        {/* Mobile Screen */}
        <div className="mb-6 xl:hidden">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-primary"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-white">
              <HeartIcon className="size-6" aria-hidden="true" />
            </span>

            <span className="font-heading text-3xl font-bold">
              AmaiReady
            </span>
          </Link>

          <p className="mt-3 text-sm text-muted-foreground">
            Maternal delivery preparation and support.
          </p>
        </div>

        <Card className="w-full min-w-0 gap-0 overflow-hidden border-border bg-card py-0 shadow-none sm:shadow-sm">
          <CardHeader className="space-y-2 px-5 pt-6 sm:space-y-3 sm:px-8 sm:pt-8">
            <CardTitle className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl xl:text-5xl">
              Welcome back
            </CardTitle>

            <CardDescription className="text-base leading-7 text-muted-foreground">
              Log in to continue preparing for your delivery.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
            <form
              className="w-full min-w-0 space-y-5"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="login-email">
                  Email address
                </Label>

                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "login-email-error" : undefined
                  }
                  className="h-11 w-full min-w-0 bg-background sm:h-12"
                />

                {errors.email && (
                  <p
                    id="login-email-error"
                    className="text-sm font-medium text-destructive"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="login-password">
                  Password
                </Label>

                <div className="relative">
                  <Input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "login-password-error" : undefined
                    }
                    className="h-11 w-full min-w-0 bg-background pr-12 sm:h-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((currentValue) => !currentValue)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-muted-foreground transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="size-5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="size-5" aria-hidden="true" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p
                    id="login-password-error"
                    className="text-sm font-medium text-destructive"
                    role="alert"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {authError && (
                <div
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
                  role="alert"
                >
                  {authError}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full text-base font-bold sm:h-12"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Do not have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold text-primary underline-offset-4 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  </main>
);

}

export default LoginPage;