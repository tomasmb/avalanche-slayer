import { AppShell } from "@/components/app-shell";
import { ReviewSession } from "@/components/review-session";

export default function ScenariosPage() {
  return (
    <AppShell
      eyebrow="Scenario Drills"
      title="Practice decisions under avalanche pressure."
      description="This mode strips away most definition review and leans into transfer: route filtering, danger interpretation, and group calls."
    >
      <ReviewSession
        title="Scenario Queue"
        description="Decision practice across the curriculum."
        scenarioOnly
        budgetMinutes={20}
      />
    </AppShell>
  );
}
