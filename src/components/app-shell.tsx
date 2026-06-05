"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/components/state-provider";
import { overallProgress } from "@/lib/review-engine";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/pre-trip", label: "Pre-Trip Review" },
  { href: "/review", label: "General Review" },
  { href: "/topics", label: "Topics" },
  { href: "/scenarios", label: "Scenario Drills" },
  { href: "/rescue", label: "Rescue Refresh" },
  { href: "/sources", label: "Sources & Method" },
];

export function AppShell({
  title,
  eyebrow,
  description,
  children,
}: {
  title: string;
  eyebrow: string;
  description: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { hydrated, state } = useAppState();
  const progress = overallProgress(state);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(123,181,167,0.18),_transparent_38%),linear-gradient(180deg,_#f6f4ec,_#eef4f1_48%,_#e6efe9_100%)] text-slate-950">
      <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(120deg,_rgba(12,53,58,0.95),_rgba(20,90,82,0.8)_45%,_rgba(194,126,44,0.48))]" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-white/12 bg-slate-950/72 p-5 text-white shadow-[0_24px_80px_rgba(7,19,23,0.34)] backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.34em] text-amber-300/90">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold tracking-tight sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                {description}
              </p>
              <p className="mt-4 inline-flex rounded-full border border-amber-300/35 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-amber-100">
                Study here complements, but does not replace, formal field training, current forecasts, and rescue practice.
              </p>
            </div>
            <div className="grid min-w-[260px] grid-cols-2 gap-3 rounded-[1.5rem] bg-white/8 p-4 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-300">
                  Topic Mastery
                </div>
                <div className="mt-2 text-3xl font-semibold">
                  {hydrated ? `${progress.masteredCount}/${progress.totalTopics}` : "…"}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-300">
                  Due Now
                </div>
                <div className="mt-2 text-3xl font-semibold">
                  {hydrated ? progress.dueCards : "…"}
                </div>
              </div>
            </div>
          </div>
          <nav className="mt-6 flex flex-wrap gap-2">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-amber-300 text-slate-950"
                      : "border border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="mt-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
