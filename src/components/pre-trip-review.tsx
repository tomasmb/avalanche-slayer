"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ReviewSession } from "@/components/review-session";

export function PreTripReview() {
  const [minutes, setMinutes] = useState(15);
  const [focus, setFocus] = useState<"terrain" | "forecast" | "rescue" | "decision" | "all">("all");
  const [ready, setReady] = useState(false);

  return (
    <AppShell
      eyebrow="Pre-Trip Mode"
      title="Build the right review for today’s objective."
      description="Tell the app how much time you have and what kind of day you’re preparing for. The queue will bias toward overdue, weak, and high-consequence knowledge."
    >
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white/84 p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Planner
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-950">
                Tune the review
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                A short session should usually cover only the highest-stakes misses. Longer sessions can mix terrain, forecast, rescue, and decision drills.
              </p>
            </div>
            <div className="grid gap-5">
              <label className="grid gap-2 text-sm text-slate-700">
                Available time
                <select
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950"
                  value={minutes}
                  onChange={(event) => setMinutes(Number(event.target.value))}
                >
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={25}>25 minutes</option>
                  <option value={40}>40 minutes</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm text-slate-700">
                Review focus
                <select
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950"
                  value={focus}
                  onChange={(event) =>
                    setFocus(event.target.value as typeof focus)
                  }
                >
                  <option value="all">Full-spectrum day</option>
                  <option value="terrain">Terrain and route filtering</option>
                  <option value="forecast">Forecast and avalanche problems</option>
                  <option value="decision">Group decisions and process</option>
                  <option value="rescue">Rescue-only refresh</option>
                </select>
              </label>
              <button
                className="rounded-full bg-slate-950 px-5 py-3 text-sm text-white"
                onClick={() => setReady(true)}
              >
                Build session
              </button>
            </div>
          </div>
        </section>
        {ready ? (
          <ReviewSession
            title="Pre-Trip Queue"
            description="This queue is tuned for today’s time budget and objective."
            focus={focus}
            budgetMinutes={minutes}
          />
        ) : null}
      </div>
    </AppShell>
  );
}
