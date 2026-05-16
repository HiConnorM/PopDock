import { KitChecklist } from "@/components/kit/kit-checklist";
export default async function ChecklistPage({ params }: { params: Promise<{ id: string }> }) {
  await params;
  return <KitChecklist />;
}
