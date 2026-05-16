"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus, Storefront, ArrowUpRight, DotsThree,
  TShirt, PaintBrush, Coffee, Flower,
  CheckCircle, Clock, Warning,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const MOCK_PROJECTS = [
  {
    id: "vintage-chicago",
    name: "Vintage Table — Randolph Market",
    type: "Vintage Clothing",
    icon: TShirt,
    event: "Randolph St. Market",
    date: "June 14, 2026",
    city: "Chicago, IL",
    completion: 78,
    status: "ready" as const,
    color: "#3D5A8A",
    colorLight: "#D2DCF0",
    sections: { checklist: true, shopping: true, layout: true, timeline: false, signage: false },
  },
  {
    id: "artist-ax",
    name: "Artist Alley — Anime Expo",
    type: "Artist Alley",
    icon: PaintBrush,
    event: "Anime Expo — LA Convention Center",
    date: "July 3, 2026",
    city: "Los Angeles, CA",
    completion: 42,
    status: "in-progress" as const,
    color: "#6B7C52",
    colorLight: "#DDE5D2",
    sections: { checklist: true, shopping: false, layout: false, timeline: false, signage: false },
  },
  {
    id: "coffee-cart",
    name: "Sunday Coffee Cart",
    type: "Coffee Cart",
    icon: Coffee,
    event: "Riverside Park Market",
    date: "June 22, 2026",
    city: "Austin, TX",
    completion: 15,
    status: "drafting" as const,
    color: "#8B6A1A",
    colorLight: "#F5E9C8",
    sections: { checklist: false, shopping: false, layout: false, timeline: false, signage: false },
  },
  {
    id: "candle-holiday",
    name: "Holiday Candle Pop-Up",
    type: "Candles & Scent",
    icon: Flower,
    event: "Winter Maker Market",
    date: "Dec 7, 2026",
    city: "Portland, OR",
    completion: 0,
    status: "drafting" as const,
    color: "#C97B5A",
    colorLight: "#F5E0D5",
    sections: { checklist: false, shopping: false, layout: false, timeline: false, signage: false },
  },
];

const STATUS_CONFIG = {
  ready:       { label: "Ready to launch", icon: CheckCircle, color: "#6B7C52",  bg: "#DDE5D2" },
  "in-progress": { label: "In progress",  icon: Clock,        color: "#8B6A1A",  bg: "#F5E9C8" },
  drafting:    { label: "Drafting",        icon: Warning,      color: "#9E9890",  bg: "#EDE9E4" },
};

export function DashboardShell() {
  return (
    <div className="min-h-[100dvh] bg-[#F5F2EE]">
      {/* Top nav */}
      <header className="sticky top-0 z-50 bg-[#FDFAF7]/90 backdrop-blur-md border-b border-[#EDE9E4]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#C63D2F] flex items-center justify-center shadow-[0_2px_0_#9B2F24]">
              <span className="text-white font-black text-xs">P</span>
            </div>
            <span className="text-[#1A1916] font-bold text-base tracking-tight">popdock</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#9E9890] hidden sm:block">
              Welcome back, Zara
            </span>
            <img
              src="https://picsum.photos/seed/user1/32/32"
              alt="Avatar"
              className="w-8 h-8 rounded-full border-2 border-[#EDE9E4] object-cover"
            />
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-1">
              My popup kits
            </p>
            <h1 className="text-[32px] font-black tracking-[-0.03em] text-[#1A1916]">
              Your Popup Kits
            </h1>
          </div>
          <Link href="/onboarding">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-[#C63D2F] text-white text-sm font-bold px-5 py-2.5 rounded-[10px] border border-[#9B2F24] shadow-[0_2px_0_#9B2F24] hover:bg-[#B5362A] transition-colors"
            >
              <Plus size={16} weight="bold" />
              New popup kit
            </motion.button>
          </Link>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { label: "Total kits",       value: "4",   sub: "created" },
            { label: "Ready to launch",  value: "1",   sub: "kit complete" },
            { label: "In progress",      value: "2",   sub: "active builds" },
            { label: "Upcoming events",  value: "3",   sub: "next 90 days" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[14px] px-5 py-4"
            >
              <p className="text-[28px] font-black text-[#1A1916] tracking-tight leading-none mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-semibold text-[#1A1916]">{stat.label}</p>
              <p className="text-[10px] text-[#9E9890] mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Project cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate="show"
        >
          {MOCK_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {/* Add new */}
          <Link href="/onboarding">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16,1,0.3,1] } } }}
              whileHover={{ y: -2 }}
              className="border-2 border-dashed border-[#DDD8D2] rounded-[20px] p-8 flex flex-col items-center justify-center gap-3 min-h-[160px] hover:border-[#C63D2F] hover:bg-[#FDF8F7] transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-[#EDE9E4] flex items-center justify-center group-hover:bg-[#F0D5D2] transition-colors">
                <Plus size={20} color="#9E9890" className="group-hover:text-[#C63D2F]" />
              </div>
              <p className="text-sm font-semibold text-[#9E9890] group-hover:text-[#C63D2F] transition-colors">
                Create a new popup kit
              </p>
            </motion.div>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof MOCK_PROJECTS[0] }) {
  const status = STATUS_CONFIG[project.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } },
      }}
      className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[20px] overflow-hidden hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all group"
    >
      {/* Card header stripe */}
      <div className="h-1.5 w-full" style={{ backgroundColor: project.color }} />

      <div className="p-6 flex flex-col gap-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: project.colorLight }}
            >
              <project.icon size={20} color={project.color} weight="bold" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1A1916] leading-tight">{project.name}</h3>
              <p className="text-xs text-[#9E9890] mt-0.5">{project.type}</p>
            </div>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-[#EDE9E4] text-[#9E9890] hover:text-[#1A1916] transition-colors">
            <DotsThree size={18} weight="bold" />
          </button>
        </div>

        {/* Event info */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-[#6B6560]">
            <Storefront size={12} color="#9E9890" />
            <span>{project.event}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B6560]">
            <Clock size={12} color="#9E9890" />
            <span>{project.date} · {project.city}</span>
          </div>
        </div>

        {/* Section chips */}
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(project.sections).map(([key, done]) => (
            <span
              key={key}
              className={cn(
                "text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize",
                done
                  ? "bg-[#DDE5D2] text-[#6B7C52]"
                  : "bg-[#EDE9E4] text-[#C5BEB6]"
              )}
            >
              {key}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5">
              <StatusIcon size={12} color={status.color} weight="fill" />
              <span className="text-xs font-semibold" style={{ color: status.color }}>
                {status.label}
              </span>
            </div>
            <span className="text-xs font-bold text-[#1A1916]">{project.completion}%</span>
          </div>
          <div className="h-1.5 bg-[#EDE9E4] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${project.completion}%`,
                backgroundColor: project.color,
              }}
            />
          </div>
        </div>

        {/* Action */}
        <Link
          href={`/kit/${project.id}`}
          className="flex items-center justify-between pt-3 border-t border-[#EDE9E4] text-sm font-semibold text-[#6B6560] hover:text-[#C63D2F] transition-colors group"
        >
          Open popup kit
          <ArrowUpRight size={15} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
