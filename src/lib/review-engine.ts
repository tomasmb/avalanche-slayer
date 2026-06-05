import { coreTopicIds, topics } from "@/lib/curriculum";
import {
  AppState,
  Flashcard,
  FlashcardProgress,
  FlashcardRating,
  Scenario,
  ScenarioProgress,
  SessionItem,
  Topic,
  TopicMetrics,
} from "@/lib/types";

const HOUR = 1000 * 60 * 60;

const stakesWeight = {
  critical: 1.45,
  high: 1.2,
  medium: 1,
} as const;

export function createEmptyState(): AppState {
  const now = new Date().toISOString();

  return {
    version: 1,
    createdAt: now,
    updatedAt: now,
    flashcards: {},
    scenarios: {},
    topicVisits: {},
  };
}

export function getTopicBySlug(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function getTopicById(id: string) {
  return topics.find((topic) => topic.id === id);
}

export function getFlashcardProgress(
  state: AppState,
  cardId: string,
): FlashcardProgress {
  return (
    state.flashcards[cardId] ?? {
      attempts: 0,
      correctAttempts: 0,
      correctStreak: 0,
      dueAt: new Date(0).toISOString(),
      lastReviewedAt: null,
      intervalHours: 0,
      lastRating: null,
    }
  );
}

export function getScenarioProgress(
  state: AppState,
  scenarioId: string,
): ScenarioProgress {
  return (
    state.scenarios[scenarioId] ?? {
      attempts: 0,
      passes: 0,
      lastAttemptAt: null,
      lastPassedAt: null,
    }
  );
}

export function gradeFlashcard(
  progress: FlashcardProgress,
  rating: FlashcardRating,
  stakes: Topic["stakes"],
) {
  const now = new Date();
  const weight = stakesWeight[stakes];
  const baseInterval =
    rating === "missed"
      ? 6
      : rating === "hard"
        ? Math.max(16, progress.intervalHours * 1.6 || 16)
        : rating === "good"
          ? Math.max(36, progress.intervalHours * 2.1 || 36)
          : Math.max(72, progress.intervalHours * 3 || 72);
  const adjustedInterval = Math.round(baseInterval / weight);

  return {
    attempts: progress.attempts + 1,
    correctAttempts:
      progress.correctAttempts + (rating === "missed" ? 0 : 1),
    correctStreak: rating === "missed" ? 0 : progress.correctStreak + 1,
    dueAt: new Date(now.getTime() + adjustedInterval * HOUR).toISOString(),
    lastReviewedAt: now.toISOString(),
    intervalHours: adjustedInterval,
    lastRating: rating,
  } satisfies FlashcardProgress;
}

export function gradeScenario(progress: ScenarioProgress, passed: boolean) {
  const now = new Date().toISOString();

  return {
    attempts: progress.attempts + 1,
    passes: progress.passes + (passed ? 1 : 0),
    lastAttemptAt: now,
    lastPassedAt: passed ? now : progress.lastPassedAt,
  } satisfies ScenarioProgress;
}

function cardPriority(topic: Topic, card: Flashcard, state: AppState) {
  const progress = getFlashcardProgress(state, card.id);
  const dueMs = new Date(progress.dueAt).getTime();
  const overdueHours = Math.max(0, Date.now() - dueMs) / HOUR;
  const unseenBonus = progress.attempts === 0 ? 22 : 0;
  const weakness =
    progress.attempts === 0
      ? 10
      : 12 * (1 - progress.correctAttempts / progress.attempts);

  return overdueHours * stakesWeight[topic.stakes] + weakness + unseenBonus;
}

function scenarioPriority(topic: Topic, scenario: Scenario, state: AppState) {
  const progress = getScenarioProgress(state, scenario.id);
  const attemptsBonus = progress.attempts === 0 ? 18 : 0;
  const passPenalty =
    progress.attempts === 0 ? 0 : 15 * (1 - progress.passes / progress.attempts);
  const staleness =
    progress.lastPassedAt == null
      ? 8
      : Math.max(0, Date.now() - new Date(progress.lastPassedAt).getTime()) /
        HOUR /
        8;

  return attemptsBonus + passPenalty + staleness * stakesWeight[topic.stakes];
}

export function buildSessionItems(args: {
  topicIds?: string[];
  scenarioOnly?: boolean;
  flashcardOnly?: boolean;
  budgetMinutes?: number;
  focus?: "terrain" | "forecast" | "rescue" | "decision" | "all";
  state: AppState;
}) {
  const selectedTopics = topics.filter((topic) => {
    if (args?.topicIds && !args.topicIds.includes(topic.id)) {
      return false;
    }

    if (!args?.focus || args.focus === "all") {
      return true;
    }

    if (args.focus === "rescue") {
      return topic.id === "companion-rescue-topic";
    }

    if (args.focus === "terrain") {
      return ["terrain-and-ates", "trip-planning", "signs-and-slope-eval"].includes(
        topic.id,
      );
    }

    if (args.focus === "forecast") {
      return ["danger-and-forecast", "avalanche-problems-topic"].includes(
        topic.id,
      );
    }

    return [
      "trip-planning",
      "daily-process-and-travel",
      "human-factors-topic",
    ].includes(topic.id);
  });

  const items: SessionItem[] = [];

  for (const topic of selectedTopics) {
    if (!args?.scenarioOnly) {
      for (const card of topic.flashcards) {
        items.push({
          kind: "flashcard",
          topicId: topic.id,
          card,
          priority: cardPriority(topic, card, args.state),
        });
      }
    }

    if (!args?.flashcardOnly) {
      for (const scenario of topic.scenarios) {
        items.push({
          kind: "scenario",
          topicId: topic.id,
          scenario,
          priority: scenarioPriority(topic, scenario, args.state),
        });
      }
    }
  }

  items.sort((left, right) => right.priority - left.priority);

  const budgetMinutes = args.budgetMinutes ?? 15;
  const targetCount = Math.max(4, Math.round(budgetMinutes / 2.5));

  return items.slice(0, targetCount);
}

export function computeTopicMetrics(topic: Topic, state: AppState): TopicMetrics {
  const cardProgress = topic.flashcards.map((card) =>
    getFlashcardProgress(state, card.id),
  );
  const scenarioProgress = topic.scenarios.map((scenario) =>
    getScenarioProgress(state, scenario.id),
  );
  const totalAttempts = cardProgress.reduce((sum, item) => sum + item.attempts, 0);
  const totalCorrect = cardProgress.reduce(
    (sum, item) => sum + item.correctAttempts,
    0,
  );
  const dueCount = cardProgress.filter(
    (item) => new Date(item.dueAt).getTime() <= Date.now(),
  ).length;
  const scenarioAttempts = scenarioProgress.reduce(
    (sum, item) => sum + item.attempts,
    0,
  );
  const scenarioPasses = scenarioProgress.reduce((sum, item) => sum + item.passes, 0);

  const accuracy = totalAttempts === 0 ? 0 : totalCorrect / totalAttempts;
  const scenarioPassRate =
    scenarioAttempts === 0 ? 0 : scenarioPasses / scenarioAttempts;
  const retrievalComponent = Math.min(1, accuracy / 0.85);
  const transferComponent = topic.scenarios.length === 0 ? 1 : Math.min(1, scenarioPassRate);
  const masteryScore =
    totalAttempts === 0 && scenarioAttempts === 0
      ? 0
      : 0.7 * retrievalComponent + 0.3 * transferComponent;
  const mastered = accuracy >= 0.85 && (topic.scenarios.length === 0 || scenarioPassRate >= 1);

  return {
    accuracy,
    dueCount,
    scenarioPassRate,
    masteryScore,
    mastered,
  };
}

export function overallProgress(state: AppState) {
  const topicMetrics = topics.map((topic) => ({
    topic,
    metrics: computeTopicMetrics(topic, state),
  }));
  const masteredCount = topicMetrics.filter((item) => item.metrics.mastered).length;
  const dueCards = topicMetrics.reduce((sum, item) => sum + item.metrics.dueCount, 0);

  return {
    masteredCount,
    totalTopics: coreTopicIds.length,
    dueCards,
    topicMetrics,
  };
}

export function recommendedTopics(state: AppState) {
  return topics
    .map((topic) => ({
      topic,
      metrics: computeTopicMetrics(topic, state),
    }))
    .sort((left, right) => {
      const leftScore =
        left.metrics.dueCount * 5 +
        (1 - left.metrics.masteryScore) * 10 +
        stakesWeight[left.topic.stakes] * 4;
      const rightScore =
        right.metrics.dueCount * 5 +
        (1 - right.metrics.masteryScore) * 10 +
        stakesWeight[right.topic.stakes] * 4;

      return rightScore - leftScore;
    });
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function formatRelativeDue(dueAt: string) {
  const deltaHours = Math.round((new Date(dueAt).getTime() - Date.now()) / HOUR);

  if (deltaHours <= 0) {
    return "Due now";
  }

  if (deltaHours < 24) {
    return `Due in ${deltaHours}h`;
  }

  return `Due in ${Math.round(deltaHours / 24)}d`;
}
