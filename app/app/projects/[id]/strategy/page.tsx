import { KitStrategy } from "@/components/app/kit-strategy";

export default async function StrategyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <KitStrategy kitId={id} />;
}
