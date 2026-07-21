import { useState } from "react";
import { useNavigate } from "react-router";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { authClient } from "@/lib/auth-client";

function DashboardPage() {
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();

  const [isSigningOut, setIsSigningOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    setLogoutError("");
    setIsSigningOut(true);

    try {
      await authClient.signOut();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);

      setLogoutError(
        "You could not be logged out. Please try again.",
      );
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <main className="min-h-dvh bg-background px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              AmaiReady
            </p>

            <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
              Welcome, {session?.user?.name || "Mother"}
            </h1>

            <p className="mt-2 text-muted-foreground">
              Your preparation dashboard is ready.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={isSigningOut}
            onClick={handleLogout}
            className="w-full sm:w-auto"
          >
            <ArrowRightStartOnRectangleIcon
              className="size-5"
              aria-hidden="true"
            />

            {isSigningOut ? "Logging out..." : "Log out"}
          </Button>
        </header>

        {logoutError && (
          <div
            className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
            role="alert"
          >
            {logoutError}
          </div>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Account connected successfully
            </CardTitle>

            <CardDescription>
              This temporary dashboard confirms that authentication
              and route protection are working.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {session?.user?.name}
            </p>

            <p>
              <span className="font-semibold">Email:</span>{" "}
              {session?.user?.email}
            </p>

            <p>
              <span className="font-semibold">Role:</span>{" "}
              {session?.user?.role || "mother"}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default DashboardPage;