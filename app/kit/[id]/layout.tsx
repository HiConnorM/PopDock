import { KitSidebar } from "@/components/kit/kit-sidebar";

const KIT_NAMES: Record<string, string> = {
  "vintage-chicago": "Vintage Table — Randolph Market",
  "artist-ax":       "Artist Alley — Anime Expo",
  "coffee-cart":     "Sunday Coffee Cart",
  "candle-holiday":  "Holiday Candle Pop-Up",
};

export default async function KitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kitName = KIT_NAMES[id] ?? "Popup Kit";

  return (
    <div className="flex min-h-[100dvh] bg-[#F5F2EE]">
      <KitSidebar kitId={id} kitName={kitName} />
      <main className="flex-1 min-w-0 px-6 md:px-10 py-10 overflow-auto">
        <div className="max-w-[900px]">
          {children}
        </div>
      </main>
    </div>
  );
}
