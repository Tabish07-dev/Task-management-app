"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold">Forgot password</h1>
        <p className="mt-2 text-sm text-slate-400">This is a placeholder UI for the recovery experience.</p>
        <div className="mt-6 rounded-2xl border border-dashed border-slate-700 p-4 text-sm text-slate-300">
          Password reset flow will be added in the next iteration.
        </div>
        <Link href="/login" className="mt-6 inline-flex text-sm text-indigo-400 hover:text-indigo-300">
          Back to login
        </Link>
      </div>
    </div>
  );
}
