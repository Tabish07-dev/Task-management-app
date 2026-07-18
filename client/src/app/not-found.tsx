import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_40%),linear-gradient(135deg,_#0f172a_0%,_#111827_100%)] px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-indigo-400 mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="rounded-lg bg-indigo-500 px-6 py-3 text-white hover:bg-indigo-600 font-medium"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-indigo-500/50 px-6 py-3 text-indigo-400 hover:bg-indigo-500/10 font-medium"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
