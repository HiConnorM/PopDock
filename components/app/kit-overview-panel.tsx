"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Lightbulb,
  GridFour,
  PaintBrush,
  PenNib,
  CheckSquare,
  CalendarBlank,
  ShoppingCart,
  CurrencyDollar,
  Package,
  Sparkle,
  ShoppingBag,
  Files,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface KitOverviewPanelProps {
  kitId: string;
}

const KIT_SECTIONS = [
  {
    label: "Strategy",
    icon: Lightbulb,
    status: "Complete",
    detail: "Brand direction set",
    href: "/strategy",
    color: "#F5E9C8",
    iconColor: "#8B6A1A",
  },
  {
    label: "Booth Layout",
    icon: GridFour,
    status: "Complete",
    detail: "6ft table, grid wall",
    href: "/booth",
    color: "#D2DCF0",
    iconColor: "#3D5A8A",
  },
  {
    label: "Visual Identity",
    icon: PaintBrush,
    status: "Complete",
    detail: "Warm vintage palette",
    href: "/materials",
    color: "#F5E0D5",
    iconColor: "#C97B5A",
  },
  {
    label: "Materials",
    icon: PenNib,
    status: "In progress",
    detail: "4 of 6 pieces done",
    href: "/materials",
    color: "#DDE5D2",
    iconColor: "#6B7C52",
  },
  {
    label: "Setup Checklist",
    icon: CheckSquare,
    status: "Complete",
    detail: "47 items · 36 done",
    href: "/checklist",
    color: "#EDE9E4",
    iconColor: "#6B6560",
  },
  {
    label: "Launch Timeline",
    icon: CalendarBlank,
    status: "In progress",
    detail: "Week 1 done",
    href: "/timeline",
    color: "#F5E9C8",
    iconColor: "#8B6A1A",
  },
  {
    label: "Shopping List",
    icon: ShoppingCart,
    status: "Complete",
    detail: "28 items · $285 est.",
    href: "/shopping-list",
    color: "#D2DCF0",
    iconColor: "#3D5A8A",
  },
  {
    label: "Pricing",
    icon: CurrencyDollar,
    status: "Complete",
    detail: "4-tier price ladder",
    href: "/pricing",
    color: "#DDE5D2",
    iconColor: "#6B7C52",
  },
  {
    label: "Inventory",
    icon: Package,
    status: "In progress",
    detail: "80 items planned",
    href: "/inventory",
    color: "#F5E0D5",
    iconColor: "#C97B5A",
  },
];

const STATUS_BADGE: Record<string, string> = {
  Complete: "bg-[#DDE5D2] text-[#4A6535]",
  "In progress": "bg-[#F5E9C8] text-[#8B6A1A]",
  Todo: "bg-[#EDE9E4] text-[#6B6560]",
};

const UP_NEXT = [
  { task: "Order garment racks (2)", due: "Jun 1", urgent: true },
  { task: "Print price cards — 4-tier set", due: "Jun 7", urgent: true },
  { task: "Finish Instagram launch post", due: "Jun 10", urgent: false },
  { task: "Confirm table dimensions with organizer", due: "Jun 3", urgent: true },
  { task: "Create QR payment sign", due: "Jun 9", urgent: false },
];

export function KitOverviewPanel({ kitId }: KitOverviewPanelProps) {
  const base = `/app/projects/${kitId}`;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#C63D2F] mb-2">
          Popup Kit
        </p>
        <h1 className="text-[36px] font-black tracking-[-0.03em] text-[#1A1916] leading-tight mb-3">
          Vintage Table — Randolph Market
        </h1>
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#DDE5D2] text-[#4A6535]">
            Ready to launch
          </span>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#EDE9E4] text-[#6B6560]">
            June 14, 2026 · Chicago, IL
          </span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F0D5D2] text-[#C63D2F]">
            31 days
          </span>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Files, label: "Kit sections", value: "9 / 11 complete", color: "#3D5A8A", bg: "#D2DCF0" },
          { icon: ShoppingBag, label: "Shopping list", value: "47 items · $312 est.", color: "#8B6A1A", bg: "#F5E9C8" },
          { icon: PenNib, label: "Materials generated", value: "6 pieces", color: "#6B7C52", bg: "#DDE5D2" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[14px] p-4 flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: stat.bg }}
            >
              <stat.icon size={17} weight="bold" color={stat.color} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1A1916] leading-tight">{stat.value}</p>
              <p className="text-[10px] text-[#9E9890]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Kit section cards */}
      <div>
        <h2 className="text-sm font-bold text-[#1A1916] mb-3">Kit sections</h2>
        <motion.div
          className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          animate="show"
        >
          {KIT_SECTIONS.map((section) => (
            <motion.div
              key={section.label}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                },
              }}
            >
              <Link href={`${base}${section.href}`}>
                <div className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[14px] p-5 hover:border-[#C5BEB6] hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-9 h-9 rounded-[9px] flex items-center justify-center"
                      style={{ backgroundColor: section.color }}
                    >
                      <section.icon size={16} weight="bold" color={section.iconColor} />
                    </div>
                    <span
                      className={cn(
                        "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                        STATUS_BADGE[section.status]
                      )}
                    >
                      {section.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[#1A1916] mb-1 group-hover:text-[#C63D2F] transition-colors">
                    {section.label}
                  </p>
                  <p className="text-xs text-[#9E9890]">{section.detail}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Up next */}
        <div className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[14px] p-5">
          <h3 className="text-sm font-bold text-[#1A1916] mb-4">Up next</h3>
          <div className="flex flex-col gap-3">
            {UP_NEXT.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    item.urgent ? "bg-[#C63D2F]" : "bg-[#C5BEB6]"
                  )}
                />
                <p className="text-sm text-[#1A1916] flex-1">{item.task}</p>
                <span className="text-[10px] font-semibold text-[#9E9890] flex-shrink-0">
                  {item.due}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-[#FDF8F7] border border-[#F0D5D2] rounded-[14px] p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-[7px] bg-[#F0D5D2] flex items-center justify-center">
              <Sparkle size={14} weight="bold" color="#C63D2F" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#C63D2F]">AI Insight</p>
          </div>
          <p className="text-sm text-[#4A4540] leading-relaxed mb-4">
            Based on your 80+ items, consider a second garment rack. Most vintage vendors with this inventory use two racks for better browse flow.
          </p>
          <div className="flex items-center gap-2">
            <button className="flex-1 py-2 rounded-[8px] bg-[#C63D2F] text-white text-xs font-bold hover:bg-[#B5362A] transition-colors">
              Add to shopping list
            </button>
            <button className="px-4 py-2 rounded-[8px] bg-[#F5F2EE] text-[#9E9890] text-xs font-semibold hover:text-[#6B6560] transition-colors">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
