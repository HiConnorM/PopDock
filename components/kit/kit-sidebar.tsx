"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SquaresFour, CheckSquare, ShoppingCart, GridFour,
  CurrencyDollar, Package, PenNib, CalendarBlank,
  Export, ArrowLeft, Storefront,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: SquaresFour,    label: "Overview",      href: "" },
  { icon: CheckSquare,    label: "Checklist",     href: "/checklist" },
  { icon: CalendarBlank,  label: "Timeline",      href: "/timeline" },
  { icon: ShoppingCart,   label: "Shopping List", href: "/shopping" },
  { icon: GridFour,       label: "Booth Layout",  href: "/layout" },
  { icon: CurrencyDollar, label: "Pricing",       href: "/pricing" },
  { icon: Package,        label: "Inventory",     href: "/inventory" },
  { icon: PenNib,         label: "Signage",       href: "/signage" },
  { icon: Export,         label: "Exports",       href: "/exports" },
];

interface KitSidebarProps {
  kitId: string;
  kitName: string;
}

export function KitSidebar({ kitId, kitName }: KitSidebarProps) {
  const pathname = usePathname();
  const base = `/kit/${kitId}`;

  return (
    <aside className="w-[220px] flex-shrink-0 flex flex-col border-r border-[#EDE9E4] bg-[#FDFAF7] min-h-[100dvh] sticky top-0">
      {/* Back to dashboard */}
      <div className="px-4 pt-5 pb-3 border-b border-[#EDE9E4]">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xs font-semibold text-[#9E9890] hover:text-[#1A1916] transition-colors group mb-3"
        >
          <ArrowLeft size={12} weight="bold" />
          All kits
        </Link>

        {/* Kit identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#D2DCF0] flex items-center justify-center flex-shrink-0">
            <Storefront size={16} color="#3D5A8A" weight="bold" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#1A1916] truncate leading-tight">{kitName}</p>
            <p className="text-[10px] text-[#9E9890]">June 14, 2026</p>
          </div>
        </div>
      </div>

      {/* Completion indicator */}
      <div className="px-4 py-3 border-b border-[#EDE9E4]">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9E9890]">Kit progress</span>
          <span className="text-xs font-bold text-[#C63D2F]">78%</span>
        </div>
        <div className="h-1 bg-[#EDE9E4] rounded-full overflow-hidden">
          <div className="h-full w-[78%] bg-[#C63D2F] rounded-full" />
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const href = `${base}${item.href}`;
          const active =
            item.href === ""
              ? pathname === base
              : pathname.startsWith(href);

          return (
            <Link
              key={item.label}
              href={href}
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
              {active && (
                <span className="ml-auto w-1 h-1 rounded-full bg-[#C63D2F]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom action */}
      <div className="px-4 py-4 border-t border-[#EDE9E4]">
        <Link
          href={`/kit/${kitId}/exports`}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-[8px] bg-[#FDF8F7] text-[#C63D2F] text-xs font-bold border border-[#F0D5D2] hover:bg-[#F0D5D2] transition-colors"
        >
          <Export size={13} weight="bold" />
          Export kit
        </Link>
      </div>
    </aside>
  );
}
