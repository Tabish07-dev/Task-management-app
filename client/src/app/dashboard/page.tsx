"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "react-hot-toast";
import { ProtectedRoute } from "@/components/providers/ProtectedRoute";
import { useAuth } from "@/components/providers/AuthProvider";

type Task = {
  id: number;
  title: string;
  done: boolean;
  priority: "High" | "Medium" | "Low";
  due: string;
  category: "Work" | "Personal" | "Study" | "Planning";
  description?: string;
};

type Stat = {
  label: string;
  value: number;
  accent: string;
};

const initialTasks: Task[] = [
  { id: 1, title: "Design onboarding mockups", done: false, priority: "High", due: "2026-07-18", category: "Work", description: "Create polished visuals for first-time users." },
  { id: 2, title: "Prepare sprint notes", done: true, priority: "Medium", due: "2026-07-17", category: "Planning", description: "Summarize progress and blockers." },
  { id: 3, title: "Review analytics report", done: false, priority: "Low", due: "2026-07-19", category: "Study", description: "Look over weekly metrics." },
];

function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / 700, 1);
      setDisplayValue(Math.round(progress * value));

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return <span>{displayValue}</span>;
}

function DashboardContent() {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [pendingActionId, setPendingActionId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "Medium" as Task["priority"], due: "", category: "Work" as Task["category"], done: false });

  useEffect(() => {
    const timer = window.setTimeout(() => setPageLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase()) || task.description?.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = filter === "All" || (filter === "Completed" && task.done) || (filter === "Pending" && !task.done) || task.priority === filter;
      return matchesQuery && matchesStatus;
    });
  }, [tasks, query, filter]);

  const openCreateForm = () => {
    setEditingId(null);
    setForm({ title: "", description: "", priority: "Medium", due: "", category: "Work", done: false });
    setShowForm(true);
  };

  const openEditForm = (task: Task) => {
    setEditingId(task.id);
    setForm({ title: task.title, description: task.description || "", priority: task.priority, due: task.due, category: task.category, done: task.done });
    setShowForm(true);
  };

  const saveTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setIsSaving(true);
    await new Promise((resolve) => window.setTimeout(resolve, 700));

    if (editingId) {
      setTasks((prev) => prev.map((task) => (task.id === editingId ? { ...task, ...form, title: form.title.trim() } : task)));
      toast.success("Task updated");
    } else {
      setTasks((prev) => [{ id: Date.now(), ...form, title: form.title.trim() }, ...prev]);
      toast.success("Task created");
    }

    setShowForm(false);
    setEditingId(null);
    setForm({ title: "", description: "", priority: "Medium", due: "", category: "Work", done: false });
    setIsSaving(false);
  };

  const toggleTask = async (id: number) => {
    setPendingActionId(id);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
    setPendingActionId(null);
    toast.success("Task updated");
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    setPendingActionId(deleteTargetId);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    setTasks((prev) => prev.filter((task) => task.id !== deleteTargetId));
    setDeleteTargetId(null);
    setPendingActionId(null);
    toast.error("Task deleted");
  };

  const stats: Stat[] = [
    { label: "Tasks", value: tasks.length, accent: "from-indigo-500 to-violet-500" },
    { label: "Completed", value: tasks.filter((t) => t.done).length, accent: "from-emerald-500 to-teal-500" },
    { label: "Pending", value: tasks.filter((t) => !t.done).length, accent: "from-amber-500 to-orange-500" },
  ];

  const containerClass = darkMode ? "min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_32%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-slate-100" : "min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900";
  const cardClass = darkMode ? "border-slate-800/80 bg-slate-900/70 shadow-[0_20px_60px_rgba(2,6,23,0.32)]" : "border-slate-200/90 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)]";
  const mutedText = darkMode ? "text-slate-400" : "text-slate-600";
  const controlClass = darkMode ? "border-slate-700 bg-slate-800/90 text-slate-100" : "border-slate-200 bg-white text-slate-900";

  return (
    <div className={containerClass}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className={`rounded-[28px] border p-5 sm:p-6 ${cardClass}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-400">Welcome back</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Hello, Tabish 👋</h1>
              <p className={`mt-2 max-w-2xl text-sm sm:text-base ${mutedText}`}>Your workspace is feeling calm, focused, and ready for the next big thing.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setDarkMode((prev) => !prev)} className={`rounded-full px-4 py-2 font-medium transition ${darkMode ? "bg-slate-800 text-slate-100 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
              <div className="relative">
                <button onClick={() => setProfileOpen((prev) => !prev)} className={`flex items-center gap-3 rounded-full border px-3 py-2 ${darkMode ? "border-slate-700 bg-slate-800/90" : "border-slate-200 bg-slate-50"}`}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 font-semibold text-white">TA</div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">Tabish Ali</p>
                    <p className={`text-xs ${mutedText}`}>Product Designer</p>
                  </div>
                  <span className="text-sm text-slate-400">▾</span>
                </button>
                <AnimatePresence>
                  {profileOpen ? (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className={`absolute right-0 z-20 mt-3 w-48 rounded-2xl border p-2 ${darkMode ? "border-slate-700 bg-slate-900/95" : "border-slate-200 bg-white"}`}>
                      <button className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition ${darkMode ? "hover:bg-slate-800" : "hover:bg-slate-50"}`}>
                        👤 Profile
                      </button>
                      <button className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition ${darkMode ? "hover:bg-slate-800" : "hover:bg-slate-50"}`}>
                        ⚙️ Settings
                      </button>
                      <button onClick={() => router.push("/login")} className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm text-rose-400 transition ${darkMode ? "hover:bg-slate-800" : "hover:bg-slate-50"}`}>
                        ↩️ Logout
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.header>

        <section className="grid gap-4 md:grid-cols-3">
          {pageLoading
            ? [1, 2, 3].map((item) => (
                <div key={item} className={`animate-pulse rounded-[24px] border p-5 ${cardClass}`}>
                  <div className={`h-3 w-20 rounded ${darkMode ? "bg-slate-800" : "bg-slate-200"}`} />
                  <div className={`mt-3 h-8 w-16 rounded ${darkMode ? "bg-slate-700" : "bg-slate-200"}`} />
                </div>
              ))
            : stats.map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className={`rounded-[24px] border p-5 transition hover:-translate-y-1 ${cardClass}`}>
                  <div className={`inline-flex rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${stat.accent}`}>
                    {stat.label}
                  </div>
                  <div className="mt-4 text-3xl font-semibold">
                    <AnimatedCounter value={stat.value} />
                  </div>
                </motion.div>
              ))}
        </section>

        <section className={`rounded-[28px] border p-4 sm:p-6 ${cardClass}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Your Tasks</h2>
              <p className={`mt-1 text-sm ${mutedText}`}>Search, filter, and keep momentum moving.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={openCreateForm} className="rounded-2xl bg-indigo-500 px-4 py-2 font-medium text-white transition hover:bg-indigo-400">
                + Add Task
              </button>
              <div className="relative">
                <input
                  value={query}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tasks..."
                  className={`w-full rounded-2xl border px-4 py-2.5 outline-none transition sm:w-56 ${controlClass} ${searchFocused ? "border-indigo-400 shadow-[0_0_0_4px_rgba(99,102,241,0.18)]" : ""}`}
                />
              </div>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className={`rounded-2xl border px-4 py-2.5 outline-none ${controlClass}`}>
                <option>All</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          {showForm && (
            <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={saveTask} className={`mt-6 rounded-[24px] border p-4 ${darkMode ? "border-slate-800 bg-slate-950/70" : "border-slate-100 bg-slate-50"}`}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm">Task Title</label>
                  <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} className={`w-full rounded-2xl border px-3 py-2.5 outline-none ${controlClass}`} placeholder="Enter task title" />
                </div>
                <div>
                  <label className="mb-2 block text-sm">Priority</label>
                  <select value={form.priority} onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value as Task["priority"] }))} className={`w-full rounded-2xl border px-3 py-2.5 outline-none ${controlClass}`}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm">Due Date</label>
                  <input type="date" value={form.due} onChange={(e) => setForm((prev) => ({ ...prev, due: e.target.value }))} className={`w-full rounded-2xl border px-3 py-2.5 outline-none ${controlClass}`} />
                </div>
                <div>
                  <label className="mb-2 block text-sm">Category</label>
                  <select value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as Task["category"] }))} className={`w-full rounded-2xl border px-3 py-2.5 outline-none ${controlClass}`}>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Study">Study</option>
                    <option value="Planning">Planning</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} className={`w-full rounded-2xl border px-3 py-2.5 outline-none ${controlClass}`} rows={3} placeholder="Add a short note" />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button type="submit" className="rounded-2xl bg-indigo-500 px-4 py-2 font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSaving}>
                  {isSaving ? "Saving..." : editingId ? "Save Changes" : "Create Task"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className={`rounded-2xl px-4 py-2 font-medium ${darkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-white hover:bg-slate-100"}`}>
                  Cancel
                </button>
              </div>
            </motion.form>
          )}

          <div className="mt-6">
            {pageLoading ? (
              <div className="space-y-3">
                {[1, 2].map((item) => (
                  <div key={item} className={`animate-pulse rounded-[22px] border p-4 ${darkMode ? "border-slate-800 bg-slate-950/50" : "border-slate-200 bg-slate-50"}`}>
                    <div className={`h-4 w-32 rounded ${darkMode ? "bg-slate-800" : "bg-slate-200"}`} />
                    <div className={`mt-3 h-3 w-48 rounded ${darkMode ? "bg-slate-800" : "bg-slate-200"}`} />
                  </div>
                ))}
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className={`rounded-[24px] border border-dashed p-10 text-center ${darkMode ? "border-slate-700 bg-slate-950/40" : "border-slate-300 bg-slate-50"}`}>
                <div className="text-4xl">📋</div>
                <h3 className="mt-4 text-xl font-semibold">No tasks yet</h3>
                <p className={`mx-auto mt-2 max-w-md text-sm ${mutedText}`}>Create your first task and turn your ideas into momentum.</p>
                <button onClick={openCreateForm} className="mt-5 rounded-2xl bg-indigo-500 px-4 py-2 font-medium text-white transition hover:bg-indigo-400">
                  + Add Task
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredTasks.map((task) => (
                    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key={task.id} className={`rounded-[22px] border p-4 transition hover:-translate-y-0.5 ${darkMode ? "border-slate-800 bg-slate-950/70" : "border-slate-200 bg-slate-50"}`}>
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleTask(task.id)} disabled={pendingActionId === task.id} className="mt-1 h-5 w-5 rounded-full border-2 border-indigo-400/70 transition hover:border-indigo-300">
                            {task.done ? <span className="block h-3 w-3 translate-x-[1px] translate-y-[1px] rounded-full bg-indigo-400" /> : null}
                          </button>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className={`font-medium ${task.done ? "text-slate-400 line-through" : ""}`}>{task.title}</p>
                              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${task.priority === "High" ? "bg-rose-500/15 text-rose-400" : task.priority === "Medium" ? "bg-amber-500/15 text-amber-400" : "bg-emerald-500/15 text-emerald-400"}`}>
                                {task.priority}
                              </span>
                              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${darkMode ? "bg-slate-800 text-slate-300" : "bg-slate-200 text-slate-700"}`}>
                                {task.category}
                              </span>
                            </div>
                            {task.description ? <p className={`mt-1 text-sm ${mutedText}`}>{task.description}</p> : null}
                            <div className={`mt-2 flex flex-wrap items-center gap-4 text-sm ${mutedText}`}>
                              <span>Due: {task.due || "No due date"}</span>
                              <span className={task.done ? "text-emerald-400" : "text-amber-400"}>{task.done ? "Completed" : "In progress"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button onClick={() => openEditForm(task)} className={`rounded-full px-3 py-1.5 text-sm ${darkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-white hover:bg-slate-100"}`}>
                            Edit
                          </button>
                          <button onClick={() => setDeleteTargetId(task.id)} className="rounded-full bg-rose-500/15 px-3 py-1.5 text-sm text-rose-400 hover:bg-rose-500/25">
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {deleteTargetId ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
            <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 12, opacity: 0 }} className={`w-full max-w-md rounded-[24px] border p-6 ${darkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}>
              <h3 className="text-xl font-semibold">Delete Task?</h3>
              <p className={`mt-2 text-sm ${mutedText}`}>This action cannot be undone. The task will be permanently removed from your board.</p>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setDeleteTargetId(null)} className={`rounded-2xl px-4 py-2 font-medium ${darkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-100 hover:bg-slate-200"}`}>
                  Cancel
                </button>
                <button onClick={confirmDelete} className="rounded-2xl bg-rose-500 px-4 py-2 font-medium text-white hover:bg-rose-400">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
