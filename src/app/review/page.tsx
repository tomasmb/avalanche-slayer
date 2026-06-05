import { AppShell } from "@/components/app-shell";
import { ReviewSession } from "@/components/review-session";
import { getTopicBySlug } from "@/lib/review-engine";

function getSearchValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string | string[] }>;
}) {
  const params = await searchParams;
  const slug = getSearchValue(params.topic);
  const topic = slug ? getTopicBySlug(slug) : undefined;

  return (
    <AppShell
      eyebrow={topic ? "Topic Review Queue" : "General Review"}
      title={
        topic
          ? `Review ${topic.title} with an adaptive queue.`
          : "Review what matters most right now."
      }
      description={
        topic
          ? "This queue stays inside one topic and reorders cards and drills around overdue retrieval, shaky recall, and transfer gaps."
          : "This mode reorders the whole curriculum around overdue cards, shaky retrieval, first-time exposure, and high-consequence skills."
      }
    >
      <ReviewSession
        title={topic ? `${topic.title} Queue` : "General Queue"}
        description={
          topic
            ? `Focused review for ${topic.title.toLowerCase()}.`
            : "A mixed queue spanning terrain, forecast, decisions, and rescue."
        }
        topicIds={topic ? [topic.id] : undefined}
      />
    </AppShell>
  );
}
