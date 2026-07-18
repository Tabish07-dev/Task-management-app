"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_40%),linear-gradient(135deg,_#0f172a_0%,_#111827_100%)] px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-rose-400 mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-white mb-2">Something Went Wrong</h1>
        <p className="text-slate-400 mb-2">{error.message || "An unexpected error occurred"}</p>
        <p className="text-slate-500 text-sm mb-8">
          {process.env.NODE_ENV === "development" && error.digest && (
            <>
              Error ID: {error.digest}
            </>
          )}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={reset}
            className="rounded-lg bg-indigo-500 px-6 py-3 text-white hover:bg-indigo-600 font-medium"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-indigo-500/50 px-6 py-3 text-indigo-400 hover:bg-indigo-500/10 font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
