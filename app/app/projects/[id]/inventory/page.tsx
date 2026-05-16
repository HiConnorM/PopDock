import { KitInventoryPanel } from "@/components/app/kit-inventory-panel";
export default async function InventoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <KitInventoryPanel kitId={id} />;
}
