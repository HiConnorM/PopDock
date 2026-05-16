"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  SquaresFour,
  Lightbulb,
  GridFour,
  PenNib,
  CheckSquare,
  CalendarBlank,
  ShoppingCart,
  CurrencyDollar,
  Package,
  Export,
  TShirt,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { icon: SquaresFour, label: "Overview", href: "" },
    ],
  },
  {
    label: "Build your kit",
    items: [
      { icon: Lightbulb, label: "Strategy", href: "/strategy" },
      { icon: GridFour, label: "Booth", href: "/booth" },
      { icon: PenNib, label: "Materials", href: "/materials" },
    ],
  },
  {
    label: "Operations",
    items: [
      { icon: CheckSquare, label: "Checklist", href: "/checklist" },
      { icon: CalendarBlank, label: "Timeline", href: "/timeline" },
      { icon: ShoppingCart, label: "Shopping List", href: "/shopping-list" },
    ],
  },
  {
    label: "Business",
    items: [
      { icon: CurrencyDollar, label: "Pricing", href: "/pricing" },
      { icon: Package, label: "Inventory", href: "/inventory" },
    ],
  },
];

interface KitWorkspaceSidebarProps {
  kitId: string;
  kitName: string;
}

export function KitWorkspaceSidebar({ kitId, kitName }: KitWorkspaceSidebarProps) {
  const pathname = usePathname();
  const base = `/app/projects/${kitId}`;

  const isActive = (href: string) => {
    if (href === "") return pathname === base;
    return pathname.startsWith(`${base}${href}`);
  };

  return (
    <aside className="w-[240px] flex-shrink-0 flex flex-col border-r border-[#EDE9E4] bg-[#FDFAF7] min-h-[100dvh] sticky top-0">
      {/* Back link */}
      <div className="px-4 pt-5 pb-3 border-b border-[#EDE9E4]">
        <Link
          href="/app"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#9E9890] hover:text-[#1A1916] transition-colors mb-4"
        >
          <ArrowLeft size={12} weight="bold" />
          All kits
        </Link>

        {/* Kit identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[9px] bg-[#D2DCF0] flex items-center justify-center flex-shrink-0">
            <TShirt size={16} weight="bold" color="#3D5A8A" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#1A1916] truncate leading-tight">{kitName}</p>
            <p className="text-[10px] text-[#9E9890]">June 14, 2026</p>
          </div>
        </div>
      </div>

      {/* Kit readiness bar */}
      <div className="px-4 py-3 border-b border-[#EDE9E4]">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#9E9890]">
            Kit progress
          </span>
          <span className="text-xs font-bold text-[#C63D2F]">78%</span>
        </div>
        <div className="h-1 bg-[#EDE9E4] rounded-full overflow-hidden">
          <div className="h-full w-[78%] bg-[#C63D2F] rounded-full" />
        </div>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-4 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#C5BEB6] px-3 mb-1">
              {section.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={`${base}${item.href}`}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-sm font-medium transition-all",
                      active
                        ? "bg-[#EDE9E4] text-[#1A1916] font-semibold"
                        : "text-[#6B6560] hover:text-[#1A1916] hover:bg-[#F5F2EE]"
                    )}
                  >
                    <item.icon
                      size={15}
                      weight={active ? "bold" : "regular"}
                      color={active ? "#C63D2F" : "currentColor"}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Export button */}
      <div className="px-4 py-4 border-t border-[#EDE9E4]">
        <Link
          href={`${base}/exports`}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-[8px] bg-[#FDF8F7] text-[#C63D2F] text-xs font-bold border border-[#F0D5D2] hover:bg-[#F0D5D2] transition-colors"
        >
          <Export size={13} weight="bold" />
          Export kit
        </Link>
      </div>
    </aside>
  );
}
