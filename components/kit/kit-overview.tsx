"use client";

import { motion } from "framer-motion";
import {
  CheckCircle, Clock, ShoppingCart, GridFour,
  ArrowUpRight, Sparkle, Warning, TShirt,
} from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const OVERVIEW_SECTIONS = [
  {
    id: "checklist",
    title: "Setup Checklist",
    icon: CheckCircle,
    status: "complete",
    count: "47 items",
    completed: "36 done",
    color: "#6B7C52",
    bg: "#DDE5D2",
    href: "./checklist",
  },
  {
    id: "shopping",
    title: "Shopping List",
    icon: ShoppingCart,
    status: "complete",
    count: "28 items",
    completed: "~$285 est.",
    color: "#3D5A8A",
    bg: "#D2DCF0",
    href: "./shopping",
  },
  {
    id: "layout",
    title: "Booth Layout",
    icon: GridFour,
    status: "complete",
    count: "6ft table",
    completed: "Grid wall + rack",
    color: "#8B6A1A",
    bg: "#F5E9C8",
    href: "./layout",
  },
  {
    id: "timeline",
    title: "Launch Timeline",
    icon: Clock,
    status: "in-progress",
    count: "3-week plan",
    completed: "Week 1 done",
    color: "#C97B5A",
    bg: "#F5E0D5",
    href: "./timeline",
  },
  {
    id: "signage",
    title: "Signage",
    icon: TShirt,
    status: "todo",
    count: "Not started",
    completed: "3 sign concepts",
    color: "#9E9890",
    bg: "#EDE9E4",
    href: "./signage",
  },
];

const UPCOMING_TASKS = [
  { task: "Buy extension cord (16 ft)",       due: "Jun 10", urgent: true },
  { task: "Print price tags (2x3, white)",     due: "Jun 11", urgent: false },
  { task: "Test Square card reader",           due: "Jun 12", urgent: false },
  { task: "Pack garment rack crossbar",        due: "Jun 13", urgent: true },
  { task: "Charge battery pack",              due: "Jun 13", urgent: false },
];

export function KitOverview({ kitId }: { kitId: string }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Kit header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-1">Popup Kit</p>
          <h1 className="text-[28px] md:text-[36px] font-black tracking-[-0.03em] text-[#1A1916] leading-tight">
            Vintage Table<br className="md:hidden" /> — Randolph Market
          </h1>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="text-xs font-semibold text-[#6B7C52] bg-[#DDE5D2] px-2.5 py-1 rounded-full">
              Ready to launch
            </span>
            <span className="text-xs text-[#9E9890]">June 14, 2026 · Chicago, IL</span>
          </div>
        </div>

        {/* Launch countdown */}
        <div className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[16px] px-6 py-4 text-center min-w-[140px] shadow-[var(--shadow-sm)]">
          <p className="text-[32px] font-black text-[#C63D2F] leading-none tracking-tight">31</p>
          <p className="text-xs font-semibold text-[#9E9890] mt-1">days to launch</p>
        </div>
      </div>

      {/* Section overview grid — asymmetric */}
      <div>
        <h2 className="text-sm font-bold text-[#1A1916] uppercase tracking-widest mb-4">Kit sections</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          animate="show"
        >
          {OVERVIEW_SECTIONS.map((sec) => (
            <motion.div
              key={sec.id}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16,1,0.3,1] } },
              }}
            >
              <Link
                href={sec.href}
                className="flex flex-col gap-3 p-5 rounded-[14px] border border-[#DDD8D2] bg-[#FDFAF7] hover:border-[#C5BEB6] hover:shadow-[var(--shadow-sm)] transition-all group block"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: sec.bg }}
                  >
                    <sec.icon size={18} color={sec.color} weight="bold" />
                  </div>
                  <span
                    className={cn(
                      "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                      sec.status === "complete"     && "bg-[#DDE5D2] text-[#6B7C52]",
                      sec.status === "in-progress"  && "bg-[#F5E9C8] text-[#8B6A1A]",
                      sec.status === "todo"         && "bg-[#EDE9E4] text-[#9E9890]"
                    )}
                  >
                    {sec.status === "complete" ? "Complete" : sec.status === "in-progress" ? "In progress" : "To do"}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#1A1916] mb-0.5">{sec.title}</p>
                  <p className="text-xs text-[#9E9890]">{sec.count}</p>
                  <p className="text-xs text-[#6B6560] mt-0.5">{sec.completed}</p>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#C63D2F] opacity-0 group-hover:opacity-100 transition-opacity">
                  Open section
                  <ArrowUpRight size={12} weight="bold" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom row: urgent tasks + AI suggestion */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
        {/* Urgent tasks */}
        <div className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[16px] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#1A1916]">Up next</h3>
            <Link href="./checklist" className="text-xs font-semibold text-[#C63D2F] hover:underline">
              View all
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {UPCOMING_TASKS.map((task) => (
              <div key={task.task} className="flex items-center gap-3 py-2 border-b border-[#F5F2EE] last:border-0">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    task.urgent ? "bg-[#C63D2F]" : "bg-[#DDD8D2]"
                  )}
                />
                <span className="text-sm text-[#4A4540] flex-1">{task.task}</span>
                <span className={cn(
                  "text-xs font-semibold flex-shrink-0",
                  task.urgent ? "text-[#C63D2F]" : "text-[#9E9890]"
                )}>
                  {task.due}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI insight card */}
        <div className="bg-[#FDF8F7] border border-[#F0D5D2] rounded-[16px] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Sparkle size={16} color="#C63D2F" weight="fill" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C63D2F]">Kit insight</span>
          </div>
          <p className="text-sm text-[#6B6560] leading-relaxed">
            Based on your booth size and inventory count, you may want to add a second garment rack. Most vendors with 80+ items use two racks for better browse flow.
          </p>
          <div className="flex flex-col gap-2 pt-2 border-t border-[#EDE9E4]">
            <button className="w-full text-xs font-bold py-2 rounded-[8px] bg-[#C63D2F] text-white border border-[#9B2F24] hover:bg-[#B5362A] transition-colors">
              Add to shopping list
            </button>
            <button className="w-full text-xs font-semibold py-2 rounded-[8px] text-[#9E9890] hover:text-[#1A1916] transition-colors">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
