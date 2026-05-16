import type { ReactNode } from "react";
import { AppSidebar } from "@/components/app/app-sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] bg-[#F5F2EE]">
      <AppSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
