"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import {
  createEmptyState,
  getFlashcardProgress,
  getScenarioProgress,
  gradeFlashcard,
  gradeScenario,
} from "@/lib/review-engine";
import { topics } from "@/lib/curriculum";
import { AppState, FlashcardRating } from "@/lib/types";

const STORAGE_KEY = "avalanche-slayer-state";

type AppStateContextValue = {
  hydrated: boolean;
  state: AppState;
  rateFlashcard: (cardId: string, topicId: string, rating: FlashcardRating) => void;
  scoreScenario: (scenarioId: string, passed: boolean) => void;
  markTopicVisit: (topicId: string) => void;
  resetProgress: () => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    if (typeof window === "undefined") {
      return createEmptyState();
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return createEmptyState();
    }

    try {
      return JSON.parse(raw) as AppState;
    } catch {
      return createEmptyState();
    }
  });
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  function rateFlashcard(cardId: string, topicId: string, rating: FlashcardRating) {
    const topic = topics.find((entry) => entry.id === topicId);

    if (!topic) {
      return;
    }

    startTransition(() => {
      setState((current) => {
        const previous = getFlashcardProgress(current, cardId);
        const nextCardState = gradeFlashcard(
          previous,
          rating,
          topic.stakes,
        );

        return {
          ...current,
          updatedAt: new Date().toISOString(),
          flashcards: {
            ...current.flashcards,
            [cardId]: nextCardState,
          },
        };
      });
    });
  }

  function scoreScenario(scenarioId: string, passed: boolean) {
    startTransition(() => {
      setState((current) => ({
        ...current,
        updatedAt: new Date().toISOString(),
        scenarios: {
          ...current.scenarios,
          [scenarioId]: gradeScenario(getScenarioProgress(current, scenarioId), passed),
        },
      }));
    });
  }

  function markTopicVisit(topicId: string) {
    startTransition(() => {
      setState((current) => ({
        ...current,
        updatedAt: new Date().toISOString(),
        topicVisits: {
          ...current.topicVisits,
          [topicId]: new Date().toISOString(),
        },
      }));
    });
  }

  function resetProgress() {
    const next = createEmptyState();
    setState(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return (
    <AppStateContext.Provider
      value={{
        hydrated,
        state,
        rateFlashcard,
        scoreScenario,
        markTopicVisit,
        resetProgress,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within StateProvider");
  }

  return context;
}
