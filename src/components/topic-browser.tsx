"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useAppState } from "@/components/state-provider";
import { topics } from "@/lib/curriculum";
import { computeTopicMetrics, formatPercent } from "@/lib/review-engine";

export function TopicBrowser() {
  const [query, setQuery] = useState("");
  const { state } = useAppState();
  const normalized = query.trim().toLowerCase();

  const filtered = !normalized
    ? topics
    : topics.filter((topic) => {
        return (
          topic.title.toLowerCase().includes(normalized) ||
          topic.strapline.toLowerCase().includes(normalized) ||
          topic.quickHits.some((hit) => hit.toLowerCase().includes(normalized))
        );
      });

  return (
    <AppShell
      eyebrow="Specific Information"
      title="Find the exact avalanche concept you need."
      description="Search by terrain, forecasting, rescue, or decision-making concepts, then jump directly into quick reference plus active review."
    >
      <section className="rounded-[2rem] border border-slate-200 bg-white/82 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Searchable curriculum
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-950">
              Topic library
            </h2>
          </div>
          <input
            className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-slate-950 lg:max-w-md"
            placeholder="Search terrain traps, danger ratings, rescue, human factors…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {filtered.map((topic) => {
            const metrics = computeTopicMetrics(topic, state);

            return (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-950">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-700">
                      {topic.strapline}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {topic.level}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                  <span>{formatPercent(metrics.accuracy)} retrieval</span>
                  <span>•</span>
                  <span>{metrics.dueCount} due</span>
                  <span>•</span>
                  <span>{topic.stakes} stakes</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
                  {topic.quickHits.slice(0, 2).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
