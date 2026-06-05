"use client";

import { AppShell } from "@/components/app-shell";
import { decisionLog, sourceLibrary } from "@/lib/curriculum";

export function SourceMethod() {
  return (
    <AppShell
      eyebrow="Evidence Trail"
      title="Why the app is designed this way."
      description="Every major product choice in Avalanche Slayer is mapped to avalanche-education or learning-science references so the app can be audited like a field tool, not just admired like a landing page."
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white/84 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Product decisions
          </p>
          <div className="mt-5 space-y-4">
            {decisionLog.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
              >
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-950">
                  {item.decision}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {item.implementation}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.sourceIds.map((sourceId) => {
                    const source = sourceLibrary.find((entry) => entry.id === sourceId);

                    if (!source) {
                      return null;
                    }

                    return (
                      <a
                        key={source.id}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-700"
                      >
                        {source.publisher}
                      </a>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white/84 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Source library
          </p>
          <div className="mt-5 space-y-4">
            {sourceLibrary.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold text-slate-950">{source.title}</h2>
                  <span className="rounded-full bg-white px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {source.category}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{source.publisher}</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{source.note}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
