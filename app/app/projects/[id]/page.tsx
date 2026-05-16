import { KitOverviewPanel } from "@/components/app/kit-overview-panel";

export default async function KitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <KitOverviewPanel kitId={id} />;
}
