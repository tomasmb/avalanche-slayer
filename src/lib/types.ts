export type SourceCategory =
  | "avalanche-curriculum"
  | "forecasting"
  | "terrain"
  | "rescue"
  | "decision-making"
  | "learning-science";

export type SourceRecord = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  category: SourceCategory;
  note: string;
};

export type DecisionRecord = {
  id: string;
  decision: string;
  implementation: string;
  sourceIds: string[];
};

export type LearningObjective = {
  id: string;
  text: string;
};

export type Flashcard = {
  id: string;
  objectiveId: string;
  prompt: string;
  answer: string;
};

export type Scenario = {
  id: string;
  title: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Topic = {
  id: string;
  slug: string;
  title: string;
  strapline: string;
  level: "foundations" | "intermediate" | "advanced";
  stakes: "critical" | "high" | "medium";
  summary: string;
  whyItMatters: string;
  quickHits: string[];
  objectives: LearningObjective[];
  flashcards: Flashcard[];
  scenarios: Scenario[];
  sourceIds: string[];
  relatedTopicIds: string[];
};

export type FlashcardProgress = {
  attempts: number;
  correctAttempts: number;
  correctStreak: number;
  dueAt: string;
  lastReviewedAt: string | null;
  intervalHours: number;
  lastRating: FlashcardRating | null;
};

export type ScenarioProgress = {
  attempts: number;
  passes: number;
  lastAttemptAt: string | null;
  lastPassedAt: string | null;
};

export type AppState = {
  version: number;
  createdAt: string;
  updatedAt: string;
  flashcards: Record<string, FlashcardProgress>;
  scenarios: Record<string, ScenarioProgress>;
  topicVisits: Record<string, string>;
};

export type FlashcardRating = "missed" | "hard" | "good" | "easy";

export type SessionItem =
  | {
      kind: "flashcard";
      topicId: string;
      card: Flashcard;
      priority: number;
    }
  | {
      kind: "scenario";
      topicId: string;
      scenario: Scenario;
      priority: number;
    };

export type TopicMetrics = {
  accuracy: number;
  dueCount: number;
  scenarioPassRate: number;
  masteryScore: number;
  mastered: boolean;
};
