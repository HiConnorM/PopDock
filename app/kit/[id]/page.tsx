import { KitOverview } from "@/components/kit/kit-overview";

export default async function KitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <KitOverview kitId={id} />;
}
