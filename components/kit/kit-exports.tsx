"use client";

import { motion } from "framer-motion";
import {
  FilePdf, FileDoc, BookOpen, CheckSquare,
  ShoppingCart, CalendarBlank, GridFour, Download,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const EXPORT_OPTIONS = [
  {
    id: "full-kit",
    title: "Full Popup Kit PDF",
    description: "Complete kit — checklist, shopping list, layout, timeline, signage, and pricing in one document.",
    icon: FilePdf,
    format: "PDF",
    size: "~14 pages",
    color: "#C63D2F",
    bg: "#F0D5D2",
    cta: "Export full kit",
    featured: true,
  },
  {
    id: "checklist",
    title: "Setup Checklist",
    description: "Printable checklist with all tasks organized by category. Great for your launch day bag.",
    icon: CheckSquare,
    format: "PDF",
    size: "2 pages",
    color: "#6B7C52",
    bg: "#DDE5D2",
    cta: "Export checklist",
  },
  {
    id: "shopping",
    title: "Shopping List",
    description: "Itemized shopping list with quantities, estimated costs, and category groupings.",
    icon: ShoppingCart,
    format: "PDF",
    size: "3 pages",
    color: "#3D5A8A",
    bg: "#D2DCF0",
    cta: "Export shopping list",
  },
  {
    id: "timeline",
    title: "Launch Timeline",
    description: "Week-by-week prep plan with tasks, dates, and milestones.",
    icon: CalendarBlank,
    format: "PDF",
    size: "2 pages",
    color: "#8B6A1A",
    bg: "#F5E9C8",
    cta: "Export timeline",
  },
  {
    id: "layout",
    title: "Booth Layout",
    description: "Your booth layout diagram with dimensions and equipment placement.",
    icon: GridFour,
    format: "PDF",
    size: "1 page",
    color: "#C97B5A",
    bg: "#F5E0D5",
    cta: "Export layout",
  },
  {
    id: "notion",
    title: "Export to Notion",
    description: "Send your full popup kit to Notion as a workspace with linked databases for checklist, shopping list, and timeline.",
    icon: FileDoc,
    format: "Notion",
    size: "Full workspace",
    color: "#1A1916",
    bg: "#EDE9E4",
    cta: "Connect Notion",
    external: true,
  },
];

export function KitExports() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-1">Section</p>
        <h2 className="text-[28px] font-black tracking-[-0.03em] text-[#1A1916]">Exports</h2>
        <p className="text-sm text-[#6B6560] mt-1">Download or send your popup kit in any format.</p>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-3"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        initial="hidden"
        animate="show"
      >
        {EXPORT_OPTIONS.map((opt) => (
          <motion.div
            key={opt.id}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
            }}
            className={cn(
              "flex items-center gap-5 p-5 rounded-[14px] border transition-all hover:shadow-[var(--shadow-sm)]",
              opt.featured
                ? "bg-[#FDF8F7] border-[#C63D2F] shadow-[0_0_0_1px_rgba(198,61,47,0.08)]"
                : "bg-[#FDFAF7] border-[#EDE9E4] hover:border-[#DDD8D2]"
            )}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-[12px] flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: opt.bg }}
            >
              <opt.icon size={22} color={opt.color} weight="bold" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-bold text-[#1A1916]">
                  {opt.title}
                </p>
                <span
                  className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: `${opt.color}18`,
                    color: opt.color,
                  }}
                >
                  {opt.format}
                </span>
              </div>
              <p className="text-xs leading-relaxed max-w-none text-[#6B6560]">
                {opt.description}
              </p>
              <p className="text-[10px] mt-1 font-semibold text-[#C5BEB6]">
                {opt.size}
              </p>
            </div>

            {/* CTA */}
            <button
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-[8px] text-xs font-bold border flex-shrink-0 transition-all press whitespace-nowrap",
                opt.featured
                  ? "bg-[#C63D2F] text-white border-[#9B2F24] shadow-[0_2px_0_#9B2F24] hover:bg-[#B5362A]"
                  : "bg-[#F5F2EE] text-[#4A4540] border-[#DDD8D2] hover:bg-[#EDE9E4]"
              )}
            >
              {opt.external ? (
                <ArrowSquareOut size={13} weight="bold" />
              ) : (
                <Download size={13} weight="bold" />
              )}
              {opt.cta}
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Survival guide callout */}
      <div className="bg-[#F5E9C8] border border-[#D4A843]/30 rounded-[14px] p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#D4A843]/20 flex items-center justify-center flex-shrink-0">
          <BookOpen size={20} color="#8B6A1A" weight="bold" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-[#4A4540]">First Popup Survival Guide</p>
          <p className="text-xs text-[#8B6A1A] mt-0.5">
            A plain-English guide to running your first popup — what goes wrong, what doesn&apos;t matter, and what you&apos;ll wish you knew.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[8px] text-xs font-bold bg-[#8B6A1A] text-white border border-[#6B5015] flex-shrink-0 hover:bg-[#7A5D16] transition-colors press">
          <Download size={12} weight="bold" />
          Get guide
        </button>
      </div>
    </div>
  );
}
