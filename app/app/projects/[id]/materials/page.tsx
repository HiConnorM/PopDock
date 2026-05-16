import { KitMaterials } from "@/components/app/kit-materials";

export default async function MaterialsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <KitMaterials kitId={id} />;
}
