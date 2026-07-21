import { Navigate, useLocation } from "react-router";

import { authClient } from "@/lib/auth-client";
import { getHomeRoute } from "@/lib/auth-routes";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation();

  const {
    data: session,
    isPending,
    error,
  } = authClient.useSession();

  if (isPending) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background px-4">
        <p className="text-muted-foreground">
          Checking your session...
        </p>
      </main>
    );
  }

  if (error || !session) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  const userRole = session.user?.role;

  const roleIsAllowed =
    allowedRoles.length === 0 ||
    allowedRoles.includes(userRole);

  if (!roleIsAllowed) {
    return (
      <Navigate
        to={getHomeRoute(userRole)}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;