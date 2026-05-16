import { KitPricingPanel } from "@/components/app/kit-pricing-panel";
export default async function PricingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <KitPricingPanel kitId={id} />;
}
