import { KitExports } from "@/components/kit/kit-exports";
export default async function ExportsPage({ params }: { params: Promise<{ id: string }> }) {
  await params;
  return <KitExports />;
}
