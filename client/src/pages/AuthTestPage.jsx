import { authClient } from "@/lib/auth-client";

function AuthTestPage() {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  if (isPending) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <p>Checking authentication connection...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Authentication connection test
        </h1>

        {error ? (
          <div className="mt-4 rounded-md bg-red-50 p-4 text-red-700">
            <p className="font-semibold">
              The frontend could not reach Better Auth.
            </p>

            <p className="mt-1 text-sm">
              {error.message}
            </p>
          </div>
        ) : session ? (
          <div className="mt-4 rounded-md bg-green-50 p-4 text-green-700">
            <p className="font-semibold">
              A user is currently logged in.
            </p>

            <p className="mt-1">{session.user.name}</p>
            <p>{session.user.email}</p>
          </div>
        ) : (
          <div className="mt-4 rounded-md bg-blue-50 p-4 text-blue-700">
            <p className="font-semibold">
              Better Auth is connected successfully.
            </p>

            <p className="mt-1">
              No user is currently logged in. This is expected.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-6 rounded-md bg-slate-900 px-4 py-2 text-white"
        >
          Check again
        </button>
      </div>
    </main>
  );
}

export default AuthTestPage;