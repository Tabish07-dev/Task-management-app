import { ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import Link from "next/link";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-flex h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-500" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Access Denied</h1>
          <p className="mt-2 text-slate-600">
            Please log in to access this page.
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link
              href="/login"
              className="rounded-lg bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-600"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-6 py-2 hover:bg-slate-50"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
