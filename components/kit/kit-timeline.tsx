"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Clock, CalendarBlank, Circle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const TIMELINE_WEEKS = [
  {
    week: "Week 1 — May 25 to June 1",
    label: "Foundation",
    status: "complete",
    tasks: [
      { text: "Confirm event registration and booth number", done: true, date: "May 25" },
      { text: "Order gridwall panels, hangers, extension cord", done: true, date: "May 26" },
      { text: "Inventory all clothing — count, photograph, tag", done: true, date: "May 27–28" },
      { text: "Set initial price points for each category", done: true, date: "May 29" },
      { text: "Confirm Square card reader works", done: true, date: "May 31" },
    ],
  },
  {
    week: "Week 2 — June 1 to June 8",
    label: "Build",
    status: "in-progress",
    tasks: [
      { text: "Order garment rack (allow 3–5 day shipping)", done: true,  date: "June 1" },
      { text: "Print price tags and sign",                   done: true,  date: "June 3" },
      { text: "Design booth layout — do a dry run at home",  done: false, date: "June 5" },
      { text: "Buy tote bags + tissue paper",                done: false, date: "June 6" },
      { text: "Create Venmo / CashApp QR code print",        done: false, date: "June 7" },
    ],
  },
  {
    week: "Week 3 — June 8 to June 14",
    label: "Launch",
    status: "upcoming",
    tasks: [
      { text: "Buy extension cord (16ft) + power strip",     done: false, date: "June 9" },
      { text: "Install LED clip lights, test brightness",    done: false, date: "June 10" },
      { text: "Final inventory review — pull any damaged items", done: false, date: "June 11" },
      { text: "Pack everything — car load the night before", done: false, date: "June 13" },
      { text: "Arrive 45 min early. Set up before doors open.", done: false, date: "June 14" },
    ],
  },
];

const STATUS_CONFIG = {
  complete:    { color: "#6B7C52", bg: "#DDE5D2", label: "Complete",    Icon: Check   },
  "in-progress": { color: "#8B6A1A", bg: "#F5E9C8", label: "In progress", Icon: Clock   },
  upcoming:    { color: "#9E9890", bg: "#EDE9E4", label: "Upcoming",    Icon: CalendarBlank },
};

export function KitTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-1">Section</p>
        <h2 className="text-[28px] font-black tracking-[-0.03em] text-[#1A1916]">Launch Timeline</h2>
        <p className="text-sm text-[#6B6560] mt-1">3-week prep plan · Event: June 14, 2026</p>
      </div>

      <div ref={ref} className="relative">
        {/* Vertical line */}
        <div className="absolute left-[23px] top-8 bottom-8 w-px bg-[#DDD8D2]" />

        <div className="flex flex-col gap-6">
          {TIMELINE_WEEKS.map((week, wi) => {
            const cfg = STATUS_CONFIG[week.status as keyof typeof STATUS_CONFIG];
            const doneCount = week.tasks.filter((t) => t.done).length;

            return (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: wi * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="flex gap-6"
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#F5F2EE] z-10"
                    style={{ backgroundColor: cfg.bg }}
                  >
                    <cfg.Icon size={18} color={cfg.color} weight="bold" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <p className="text-xs font-bold text-[#9E9890] mb-0.5">{week.week}</p>
                      <h3 className="text-base font-black text-[#1A1916] tracking-tight">{week.label}</h3>
                    </div>
                    <span
                      className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ml-auto"
                      style={{ backgroundColor: cfg.bg, color: cfg.color }}
                    >
                      {doneCount}/{week.tasks.length} done
                    </span>
                  </div>

                  <div className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[12px] divide-y divide-[#F5F2EE] overflow-hidden">
                    {week.tasks.map((task, ti) => (
                      <div
                        key={ti}
                        className="flex items-center gap-3 px-4 py-3"
                      >
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                            task.done ? "bg-[#C63D2F]" : "border border-[#DDD8D2]"
                          )}
                        >
                          {task.done && <Check size={8} color="white" weight="bold" />}
                        </div>
                        <span className={cn("text-sm flex-1", task.done ? "line-through text-[#9E9890]" : "text-[#4A4540]")}>
                          {task.text}
                        </span>
                        <span className={cn("text-[10px] font-semibold flex-shrink-0", task.done ? "text-[#C5BEB6]" : "text-[#9E9890]")}>
                          {task.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
