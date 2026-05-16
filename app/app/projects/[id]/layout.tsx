import type { ReactNode } from "react";
import { KitWorkspaceSidebar } from "@/components/app/kit-workspace-sidebar";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex min-h-[100dvh]">
      <KitWorkspaceSidebar kitId={id} kitName="Vintage Table — Randolph Market" />
      <div className="flex-1 min-w-0 px-8 py-8 overflow-auto">
        {children}
      </div>
    </div>
  );
}
