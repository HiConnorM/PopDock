import { KitShopping } from "@/components/kit/kit-shopping";
export default async function ShoppingListPage({ params }: { params: Promise<{ id: string }> }) {
  await params;
  return <KitShopping />;
}
