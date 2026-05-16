import { KitTimeline } from "@/components/kit/kit-timeline";
export default async function TimelinePage({ params }: { params: Promise<{ id: string }> }) {
  await params;
  return <KitTimeline />;
}
