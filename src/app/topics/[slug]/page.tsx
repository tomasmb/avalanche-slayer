import { notFound } from "next/navigation";
import { TopicDetail } from "@/components/topic-detail";
import { getTopicBySlug } from "@/lib/review-engine";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  return <TopicDetail slug={slug} />;
}
