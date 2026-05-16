import { KitBooth } from "@/components/app/kit-booth";
export default async function BoothPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <KitBooth kitId={id} />;
}
