"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { useAppState } from "@/components/state-provider";
import { sourceLibrary, topics } from "@/lib/curriculum";
import { computeTopicMetrics, formatPercent } from "@/lib/review-engine";

export function TopicDetail({ slug }: { slug: string }) {
  const { state, markTopicVisit } = useAppState();
  const topic = topics.find((entry) => entry.slug === slug);

  if (!topic) {
    return null;
  }

  const metrics = computeTopicMetrics(topic, state);
  const sources = sourceLibrary.filter((source) => topic.sourceIds.includes(source.id));

  return (
    <AppShell
      eyebrow="Topic Review"
      title={topic.title}
      description={topic.summary}
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.8fr]">
        <section className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white/84 p-6 shadow-sm">
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
              <span>{topic.level}</span>
              <span>•</span>
              <span>{topic.stakes} stakes</span>
              <span>•</span>
              <span>{topic.objectives.length} objectives</span>
            </div>
            <p className="mt-4 text-sm leading-8 text-slate-700">{topic.whyItMatters}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Link
                href={`/review?topic=${topic.slug}`}
                onClick={() => markTopicVisit(topic.id)}
                className="rounded-[1.5rem] bg-slate-950 px-5 py-4 text-sm text-white"
              >
                Review this topic
              </Link>
              <Link
                href="/scenarios"
                className="rounded-[1.5rem] border border-slate-300 px-5 py-4 text-sm text-slate-900"
              >
                Do more scenario drills
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/84 p-6 shadow-sm">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-950">
              Learning objectives
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
              {topic.objectives.map((objective) => (
                <li key={objective.id} className="rounded-2xl bg-slate-50 p-4">
                  {objective.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/84 p-6 shadow-sm">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-950">
              Quick reference
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
              {topic.quickHits.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white/84 p-6 shadow-sm">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-950">
              Mastery snapshot
            </h2>
            <dl className="mt-5 grid gap-4 text-sm">
              <div className="rounded-2xl bg-slate-100 p-4">
                <dt className="uppercase tracking-[0.22em] text-slate-500">
                  Retrieval
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">
                  {formatPercent(metrics.accuracy)}
                </dd>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4">
                <dt className="uppercase tracking-[0.22em] text-slate-500">
                  Transfer
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">
                  {formatPercent(metrics.scenarioPassRate)}
                </dd>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4">
                <dt className="uppercase tracking-[0.22em] text-slate-500">
                  Mastery score
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">
                  {formatPercent(metrics.masteryScore)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/84 p-6 shadow-sm">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-950">
              Source trail
            </h2>
            <div className="mt-4 space-y-3">
              {sources.map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
                >
                  <div className="text-sm font-semibold text-slate-950">{source.title}</div>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{source.note}</p>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
