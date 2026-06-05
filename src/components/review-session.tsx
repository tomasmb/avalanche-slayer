"use client";

import { useState } from "react";
import { useAppState } from "@/components/state-provider";
import { topics } from "@/lib/curriculum";
import {
  buildSessionItems,
  computeTopicMetrics,
  formatPercent,
  overallProgress,
} from "@/lib/review-engine";

type ReviewSessionProps = {
  title: string;
  description: string;
  topicIds?: string[];
  scenarioOnly?: boolean;
  flashcardOnly?: boolean;
  focus?: "terrain" | "forecast" | "rescue" | "decision" | "all";
  budgetMinutes?: number;
};

export function ReviewSession({
  title,
  description,
  topicIds,
  scenarioOnly,
  flashcardOnly,
  focus = "all",
  budgetMinutes = 15,
}: ReviewSessionProps) {
  const { hydrated, state, rateFlashcard, scoreScenario } = useAppState();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [submittedChoice, setSubmittedChoice] = useState<number | null>(null);

  const items = buildSessionItems({
    topicIds,
    scenarioOnly,
    flashcardOnly,
    focus,
    budgetMinutes,
    state,
  });

  const item = items[index];

  function nextItem() {
    setRevealed(false);
    setSelectedChoice(null);
    setSubmittedChoice(null);
    setIndex((current) => current + 1);
  }

  if (!hydrated) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-sm">
        <p className="text-sm text-slate-600">Loading your review state…</p>
      </div>
    );
  }

  if (!item) {
    const progress = overallProgress(state);

    return (
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-[2rem] border border-emerald-200 bg-white/80 p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-700">
            Session Complete
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-semibold text-slate-950">
            You cleared this review queue.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">
            When you come back, the next queue will adapt to what you missed, what felt shaky, and how long it has been since your last successful retrieval.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="rounded-full bg-slate-950 px-4 py-2 text-sm text-white"
              onClick={() => {
                setIndex(0);
                setRevealed(false);
              }}
            >
              Rebuild Session
            </button>
          </div>
        </section>
        <aside className="rounded-[2rem] border border-slate-200 bg-white/75 p-6 shadow-sm">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-950">
            Readiness Snapshot
          </h3>
          <dl className="mt-5 grid gap-4 text-sm">
            <div className="rounded-2xl bg-slate-100 p-4">
              <dt className="uppercase tracking-[0.22em] text-slate-500">
                Mastered Topics
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-950">
                {progress.masteredCount}/{progress.totalTopics}
              </dd>
            </div>
            <div className="rounded-2xl bg-slate-100 p-4">
              <dt className="uppercase tracking-[0.22em] text-slate-500">
                Remaining Due Cards
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-950">
                {progress.dueCards}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    );
  }

  const topic = topics.find((entry) => entry.id === item.topicId);
  const topicMetrics = topic ? computeTopicMetrics(topic, state) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.8fr]">
      <section className="rounded-[2rem] border border-slate-200 bg-white/88 p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              {title}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-semibold text-slate-950">
              {item.kind === "flashcard" ? "Retrieval Card" : "Decision Drill"}
            </h2>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
            {index + 1} / {items.length}
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          {description}
        </p>
        <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(237,245,241,0.92))] p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
            <span>{topic?.title}</span>
            <span>•</span>
            <span>{topic?.level}</span>
            <span>•</span>
            <span>{topic?.stakes} stakes</span>
          </div>

          {item.kind === "flashcard" ? (
            <>
              <p className="mt-6 text-xl font-semibold leading-9 text-slate-950 sm:text-2xl">
                {item.card.prompt}
              </p>
              {!revealed ? (
                <button
                  className="mt-8 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
                  onClick={() => setRevealed(true)}
                >
                  Reveal Answer
                </button>
              ) : (
                <div className="mt-8 space-y-6">
                  <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-slate-800">
                    {item.card.answer}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      How well did you retrieve it?
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <button
                        className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-left text-sm text-rose-900"
                        onClick={() => {
                          rateFlashcard(item.card.id, item.topicId, "missed");
                          nextItem();
                        }}
                      >
                        Missed it
                      </button>
                      <button
                        className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-left text-sm text-amber-950"
                        onClick={() => {
                          rateFlashcard(item.card.id, item.topicId, "hard");
                          nextItem();
                        }}
                      >
                        Got it, but shaky
                      </button>
                      <button
                        className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4 text-left text-sm text-sky-950"
                        onClick={() => {
                          rateFlashcard(item.card.id, item.topicId, "good");
                          nextItem();
                        }}
                      >
                        Solid recall
                      </button>
                      <button
                        className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-left text-sm text-emerald-950"
                        onClick={() => {
                          rateFlashcard(item.card.id, item.topicId, "easy");
                          nextItem();
                        }}
                      >
                        Automatic
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <h3 className="mt-6 text-xl font-semibold text-slate-950">
                {item.scenario.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-800">
                {item.scenario.prompt}
              </p>
              <div className="mt-6 grid gap-3">
                {item.scenario.options.map((option, optionIndex) => {
                  const selected = selectedChoice === optionIndex;
                  const submitted = submittedChoice !== null;
                  const isCorrect = optionIndex === item.scenario.correctIndex;

                  return (
                    <button
                      key={option}
                      className={`rounded-2xl border px-4 py-4 text-left text-sm leading-7 transition ${
                        submitted
                          ? isCorrect
                            ? "border-emerald-300 bg-emerald-50 text-emerald-950"
                            : selected
                              ? "border-rose-300 bg-rose-50 text-rose-950"
                              : "border-slate-200 bg-white text-slate-500"
                          : selected
                            ? "border-slate-950 bg-slate-950 text-white"
                            : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
                      }`}
                      disabled={submitted}
                      onClick={() => setSelectedChoice(optionIndex)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {submittedChoice === null ? (
                <button
                  className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white disabled:opacity-40"
                  disabled={selectedChoice === null}
                  onClick={() => {
                    if (selectedChoice === null) {
                      return;
                    }

                    const passed = selectedChoice === item.scenario.correctIndex;
                    scoreScenario(item.scenario.id, passed);
                    setSubmittedChoice(selectedChoice);
                  }}
                >
                  Submit Decision
                </button>
              ) : (
                <div className="mt-6 space-y-4">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-100 p-5 text-sm leading-7 text-slate-800">
                    {item.scenario.explanation}
                  </div>
                  <button
                    className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
                    onClick={nextItem}
                  >
                    Continue
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <aside className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-950">
            Topic Signal
          </h3>
          {topic && topicMetrics ? (
            <dl className="mt-5 grid gap-4 text-sm">
              <div className="rounded-2xl bg-slate-100 p-4">
                <dt className="uppercase tracking-[0.22em] text-slate-500">
                  Retrieval Accuracy
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">
                  {formatPercent(topicMetrics.accuracy)}
                </dd>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4">
                <dt className="uppercase tracking-[0.22em] text-slate-500">
                  Scenario Pass Rate
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">
                  {formatPercent(topicMetrics.scenarioPassRate)}
                </dd>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4">
                <dt className="uppercase tracking-[0.22em] text-slate-500">
                  Due Cards
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">
                  {topicMetrics.dueCount}
                </dd>
              </div>
            </dl>
          ) : null}
        </section>
        <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-950">
            Why This Queue Exists
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Items are ranked by overdue status, weak retrieval history, first-time exposure, and hazard stakes. Rescue, terrain, forecast interpretation, and decision-making traps are intentionally harder to fully clear.
          </p>
        </section>
      </aside>
    </div>
  );
}
