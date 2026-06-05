import { AppShell } from "@/components/app-shell";
import { ReviewSession } from "@/components/review-session";

export default function RescuePage() {
  return (
    <AppShell
      eyebrow="Rescue Refresh"
      title="Keep rescue fast, clean, and recent."
      description="Rescue knowledge decays if you leave it parked in the background. This queue keeps scene safety, search flow, and excavation sequence within quick reach."
    >
      <ReviewSession
        title="Rescue Queue"
        description="A short, high-stakes refresh focused on companion rescue."
        topicIds={["companion-rescue-topic"]}
        budgetMinutes={12}
      />
    </AppShell>
  );
}
