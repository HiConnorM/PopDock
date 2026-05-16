"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TShirt,
  Coffee,
  PaintBrush,
  Scissors,
  Plus,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    id: "vintage-table",
    name: "Vintage Table @ Randolph Market",
    type: "Vintage Clothing",
    status: "Ready to launch",
    statusColor: "green",
    date: "June 14, 2026",
    completion: 78,
    color: "#D2DCF0",
    iconColor: "#3D5A8A",
    icon: TShirt,
  },
  {
    id: "sunday-coffee-cart",
    name: "Sunday Coffee Cart",
    type: "Coffee Cart",
    status: "In progress",
    statusColor: "yellow",
    date: "July 5, 2026",
    completion: 45,
    color: "#F5E9C8",
    iconColor: "#8B6A1A",
    icon: Coffee,
  },
  {
    id: "art-fair-booth",
    name: "Art Fair Booth",
    type: "Artist Alley",
    status: "Planning",
    statusColor: "gray",
    date: "Aug 20, 2026",
    completion: 20,
    color: "#DDE5D2",
    iconColor: "#6B7C52",
    icon: PaintBrush,
  },
  {
    id: "holiday-market",
    name: "Holiday Market Setup",
    type: "Craft Fair",
    status: "Planning",
    statusColor: "gray",
    date: "Dec 5, 2026",
    completion: 5,
    color: "#F5E0D5",
    iconColor: "#C97B5A",
    icon: Scissors,
  },
];

const STATUS_STYLES: Record<string, string> = {
  green: "bg-[#DDE5D2] text-[#4A6535]",
  yellow: "bg-[#F5E9C8] text-[#8B6A1A]",
  gray: "bg-[#EDE9E4] text-[#6B6560]",
};

export function ProjectsShell() {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-black tracking-[-0.03em] text-[#1A1916]">
            Your Popup Kits
          </h1>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EDE9E4] text-[#6B6560]">
            4 projects
          </span>
        </div>
        <Link
          href="/app/new"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-[9px] bg-[#C63D2F] text-white text-sm font-bold hover:bg-[#B5362A] transition-colors"
        >
          <Plus size={14} weight="bold" />
          New popup kit
        </Link>
      </div>

      {/* Projects grid */}
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        initial="hidden"
        animate="show"
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
              },
            }}
          >
            <Link href={`/app/projects/${project.id}`}>
              <div
                className={cn(
                  "bg-[#FDFAF7] border border-[#DDD8D2] rounded-[16px] p-5 hover:border-[#C5BEB6] hover:shadow-sm transition-all cursor-pointer"
                )}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    >
                      <project.icon size={18} weight="bold" color={project.iconColor} />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${project.iconColor}18`,
                        color: project.iconColor,
                      }}
                    >
                      {project.type}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full",
                      STATUS_STYLES[project.statusColor]
                    )}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-bold text-[#1A1916] truncate mb-1">
                  {project.name}
                </h3>

                {/* Date */}
                <p className="text-xs text-[#9E9890] mb-4">{project.date}</p>

                {/* Completion bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-[#9E9890] uppercase tracking-wider">
                      Kit progress
                    </span>
                    <span className="text-[11px] font-bold text-[#C63D2F]">
                      {project.completion}%
                    </span>
                  </div>
                  <div className="h-1 bg-[#EDE9E4] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C63D2F] rounded-full transition-all"
                      style={{ width: `${project.completion}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Start new kit dashed button */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="mt-4"
      >
        <Link
          href="/app/new"
          className="flex items-center justify-center gap-2 w-full py-5 rounded-[16px] border-2 border-dashed border-[#DDD8D2] text-sm font-semibold text-[#9E9890] hover:border-[#C63D2F] hover:text-[#C63D2F] transition-all bg-transparent hover:bg-[#FDF8F7]"
        >
          <Plus size={16} weight="bold" />
          Start a new kit
        </Link>
      </motion.div>
    </div>
  );
}
