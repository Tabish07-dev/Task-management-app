import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.2),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] px-6 py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <section className="max-w-2xl space-y-6">
          <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm backdrop-blur">
            Modern Task Management
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
            Organize work, focus better, and finish faster.
          </h1>
          <p className="text-lg text-slate-300">
            A polished task dashboard with authentication, search, filters, and a beautiful dark mode experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/register" className="rounded-full bg-indigo-500 px-6 py-3 font-semibold transition hover:bg-indigo-400">
              Get Started
            </Link>
            <Link href="/login" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold transition hover:bg-white/20">
              Sign In
            </Link>
          </div>
        </section>

        <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur">
          <h2 className="text-2xl font-semibold">What you get</h2>
          <ul className="mt-5 space-y-3 text-slate-300">
            <li>• Auth pages for login and registration</li>
            <li>• Professional dashboard with stats</li>
            <li>• Search and filter controls</li>
            <li>• Dark mode and modern UI</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
