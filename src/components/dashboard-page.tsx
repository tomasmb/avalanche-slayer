"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { useAppState } from "@/components/state-provider";
import { topics } from "@/lib/curriculum";
import { formatPercent, overallProgress, recommendedTopics } from "@/lib/review-engine";

const modeCards = [
  {
    href: "/pre-trip",
    title: "Pre-Trip Review",
    blurb:
      "Build a just-in-time session around your available minutes and today’s objective.",
  },
  {
    href: "/review",
    title: "General Review",
    blurb:
      "Let the scheduler pick the highest-value cards and drills across the whole curriculum.",
  },
  {
    href: "/topics",
    title: "Topic Review",
    blurb:
      "Jump straight to terrain, forecasts, rescue, human factors, or any other concept you need to refresh.",
  },
  {
    href: "/scenarios",
    title: "Scenario Drills",
    blurb:
      "Practice route and judgment calls instead of only memorizing definitions.",
  },
  {
    href: "/rescue",
    title: "Rescue Refresh",
    blurb:
      "Keep the high-stakes sequence current: scene safety, search, probe, and excavation.",
  },
  {
    href: "/sources",
    title: "Sources & Method",
    blurb:
      "Inspect the avalanche and learning-science references that shape the app.",
  },
];

export function DashboardPage() {
  const { hydrated, state, resetProgress } = useAppState();
  const progress = overallProgress(state);
  const recommendations = recommendedTopics(state).slice(0, 4);

  return (
    <AppShell
      eyebrow="Avalanche Slayer"
      title="Train for the next trip, not just the next tab."
      description="A field-oriented avalanche learning system built around retrieval, spaced review, route filtering, and rescue refresh. Come back cold and the app will tell you what matters most before your next day in the mountains."
    >
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {modeCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-[2rem] border border-slate-200 bg-white/82 p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-950">
                    {card.title}
                  </h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                    Open
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {card.blurb}
                </p>
              </Link>
            ))}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/82 p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Curriculum Map
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-950">
                  Essential avalanche learning, organized by travel decisions
                </h2>
              </div>
              <Link
                href="/topics"
                className="rounded-full bg-slate-950 px-4 py-2 text-sm text-white"
              >
                Browse all topics
              </Link>
            </div>
            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              {topics.map((topic) => {
                const metrics = progress.topicMetrics.find(
                  (entry) => entry.topic.id === topic.id,
                )?.metrics;

                return (
                  <Link
                    key={topic.id}
                    href={`/topics/${topic.slug}`}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-slate-950">{topic.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-700">
                          {topic.strapline}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                        {topic.level}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                      <span>{topic.stakes} stakes</span>
                      <span>•</span>
                      <span>
                        {metrics ? formatPercent(metrics.masteryScore) : "0%"} mastery
                      </span>
                      <span>•</span>
                      <span>{metrics?.dueCount ?? 0} due</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white/82 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Recommended Next
            </p>
            <div className="mt-5 space-y-3">
              {hydrated ? (
                recommendations.map(({ topic, metrics }) => (
                  <Link
                    key={topic.id}
                    href={`/topics/${topic.slug}`}
                    className="block rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-slate-950">{topic.title}</h3>
                      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        {metrics.dueCount} due
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-700">
                      {topic.summary}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-slate-600">Loading recommendations…</p>
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white/82 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Progress Controls
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Progress is stored in your browser so you can return to exactly the right review set for your next trip.
            </p>
            <button
              className="mt-5 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-800"
              onClick={resetProgress}
            >
              Reset local progress
            </button>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
