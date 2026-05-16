"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SquaresFour,
  GridFour,
  PaintBrush,
  Gear,
  Lightning,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const WORKSPACE_NAV = [
  { icon: SquaresFour, label: "Projects", href: "/app" },
  { icon: GridFour, label: "Templates", href: "/app/templates" },
  { icon: PaintBrush, label: "Brand Kits", href: "/app/brands" },
];

const ACCOUNT_NAV = [
  { icon: Gear, label: "Settings", href: "/app/settings", badge: null },
  { icon: Lightning, label: "Upgrade", href: "/app/upgrade", badge: "Creator" },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/app") return pathname === "/app";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-[240px] flex-shrink-0 flex flex-col border-r border-[#EDE9E4] bg-[#FDFAF7] min-h-[100dvh] sticky top-0">
      {/* Top header */}
      <div className="px-4 pt-5 pb-4 border-b border-[#EDE9E4] flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/app" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-[7px] bg-[#C63D2F] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-black tracking-tight">P</span>
          </div>
          <span className="text-sm font-bold text-[#1A1916] tracking-[-0.01em]">popdock</span>
        </Link>

        {/* New kit button */}
        <Link
          href="/app/new"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-[7px] bg-[#C63D2F] text-white text-[11px] font-bold hover:bg-[#B5362A] transition-colors flex-shrink-0"
        >
          New kit
          <span className="text-[13px] leading-none">+</span>
        </Link>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-5 overflow-y-auto">
        {/* Workspace section */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#C5BEB6] px-3 mb-1.5">
            Workspace
          </p>
          <div className="flex flex-col gap-0.5">
            {WORKSPACE_NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-sm font-medium transition-all",
                    active
                      ? "bg-[#EDE9E4] text-[#1A1916] font-semibold"
                      : "text-[#6B6560] hover:text-[#1A1916] hover:bg-[#F5F2EE]"
                  )}
                >
                  <item.icon
                    size={16}
                    weight={active ? "bold" : "regular"}
                    color={active ? "#C63D2F" : "currentColor"}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Account section */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#C5BEB6] px-3 mb-1.5">
            Account
          </p>
          <div className="flex flex-col gap-0.5">
            {ACCOUNT_NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-sm font-medium transition-all",
                    active
                      ? "bg-[#EDE9E4] text-[#1A1916] font-semibold"
                      : "text-[#6B6560] hover:text-[#1A1916] hover:bg-[#F5F2EE]"
                  )}
                >
                  <item.icon
                    size={16}
                    weight={active ? "bold" : "regular"}
                    color={active ? "#C63D2F" : "currentColor"}
                  />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F5E9C8] text-[#8B6A1A]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User area */}
      <div className="px-4 py-4 border-t border-[#EDE9E4]">
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#D2DCF0] flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-[#3D5A8A]">C</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium text-[#1A1916] truncate">theconnorm@gmail.com</p>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#EDE9E4] text-[#6B6560]">
              Free
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
