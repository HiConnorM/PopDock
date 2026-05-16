"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChatText, Sparkle, Export } from "@phosphor-icons/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

const STEPS = [
  {
    step: "01",
    Icon: ChatText,
    title: "Describe your popup",
    description:
      "Tell us what you're selling, where, your budget, and how your booth should feel.",
    accent: false,
    preview: <IntakeFormMockup />,
  },
  {
    step: "02",
    Icon: Sparkle,
    title: "We generate your kit",
    description:
      "Our AI builds a complete, specific popup kit — tailored to your type, budget, and aesthetic.",
    accent: true,
    preview: <GeneratingMockup />,
  },
  {
    step: "03",
    Icon: Export,
    title: "Edit, export, launch",
    description:
      "Edit every piece, download print-ready PDFs, export to Notion, and go launch your popup.",
    accent: false,
    preview: <ExportMockup />,
  },
];

function IntakeFormMockup() {
  return (
    <div className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[12px] p-4 text-left shadow-[var(--shadow-sm)]">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9E9890] mb-2">Your popup</p>
      <div className="flex flex-col gap-2">
        {[
          { label: "Type", value: "Vintage Clothing" },
          { label: "Location", value: "Flea market" },
          { label: "Budget", value: "$400" },
          { label: "Aesthetic", value: "Warm, handmade" },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-2">
            <span className="text-[10px] text-[#9E9890] w-16 flex-shrink-0">{f.label}</span>
            <span className="text-[11px] font-semibold text-[#1A1916] bg-[#EDE9E4] px-2 py-0.5 rounded-md">
              {f.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeneratingMockup() {
  return (
    <div className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[12px] p-4 text-left shadow-[var(--shadow-sm)]">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9E9890] mb-3">Generating kit</p>
      <div className="flex flex-col gap-2.5">
        {[
          { label: "Booth layout", pct: 100 },
          { label: "Shopping list", pct: 100 },
          { label: "Signage pack", pct: 78 },
          { label: "Social assets", pct: 40 },
        ].map((it) => (
          <div key={it.label}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-[#4A4540] font-medium">{it.label}</span>
              <span className="text-[10px] font-bold text-[#C63D2F]">{it.pct}%</span>
            </div>
            <div className="h-1 bg-[#EDE9E4] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#C63D2F] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${it.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: it.pct === 100 ? 0 : 0.3, ease: EASE_OUT_EXPO }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Pulsing dot */}
      <div className="flex items-center gap-2 mt-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C63D2F] animate-pulse" />
        <span className="text-[10px] text-[#9E9890]">Building your kit…</span>
      </div>
    </div>
  );
}

function ExportMockup() {
  return (
    <div className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[12px] p-4 text-left shadow-[var(--shadow-sm)]">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9E9890] mb-3">Export as</p>
      <div className="flex flex-col gap-2">
        {[
          { label: "Print PDF",    badge: "PDF",    color: "#F0D5D2", textColor: "#9B2F24" },
          { label: "PNG Files",    badge: "PNG",    color: "#D2DCF0", textColor: "#3D5A8A" },
          { label: "Notion Page",  badge: "Notion", color: "#EDE9E4", textColor: "#4A4540" },
        ].map((ex) => (
          <div
            key={ex.label}
            className="flex items-center justify-between bg-[#F5F2EE] border border-[#EDE9E4] rounded-[8px] px-3 py-2"
          >
            <span className="text-xs font-semibold text-[#1A1916]">{ex.label}</span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: ex.color, color: ex.textColor }}
            >
              {ex.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IdeaToKit() {
  return (
    <section className="py-24 bg-[#FDFAF7] border-y border-[#EDE9E4]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#C63D2F] mb-3">
            How it works
          </p>
          <h2 className="text-[40px] md:text-[52px] font-black tracking-[-0.04em] leading-[1.05] text-[#1A1916]">
            From idea to launch kit in minutes.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-0 relative">

          {STEPS.map((s, i) => (
            <div key={s.step} className="flex flex-col lg:flex-row items-start flex-1 min-w-0">

              {/* Step card */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: EASE_OUT_EXPO }}
                className={`flex-1 min-w-0 rounded-[20px] p-7 flex flex-col gap-5 border ${
                  s.accent
                    ? "bg-[#C63D2F] border-[#9B2F24] text-white"
                    : "bg-[#FDFAF7] border-[#DDD8D2] text-[#1A1916]"
                } shadow-[var(--shadow-md)]`}
              >
                {/* Icon + step number */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${
                      s.accent ? "bg-white/15" : "bg-[#EDE9E4]"
                    }`}
                  >
                    <s.Icon
                      size={20}
                      color={s.accent ? "#ffffff" : "#C63D2F"}
                      weight={s.accent ? "fill" : "bold"}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${
                      s.accent ? "text-white/50" : "text-[#C5BEB6]"
                    }`}
                  >
                    {s.step}
                  </span>
                </div>

                <div>
                  <p className={`text-lg font-black tracking-[-0.02em] mb-2 ${s.accent ? "text-white" : "text-[#1A1916]"}`}>
                    {s.title}
                  </p>
                  <p className={`text-sm leading-relaxed ${s.accent ? "text-white/75" : "text-[#6B6560]"}`}>
                    {s.description}
                  </p>
                </div>

                {/* Mini mockup */}
                <div className="mt-1">
                  {s.preview}
                </div>
              </motion.div>

              {/* Dashed arrow connector between steps (desktop only) */}
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.3, duration: 0.4 }}
                  className="hidden lg:flex items-center justify-center w-12 flex-shrink-0 mt-[60px]"
                  aria-hidden
                >
                  <div className="flex items-center gap-0.5">
                    <div className="w-5 border-t-2 border-dashed border-[#DDD8D2]" />
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="#DDD8D2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="text-center mt-14"
        >
          <Link href="/onboarding">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#C63D2F] text-[#FDFAF7] font-semibold text-base px-8 py-3.5 rounded-[10px] border border-[#9B2F24] shadow-[0_2px_0_0_#9B2F24,0_4px_12px_rgba(198,61,47,0.20)] hover:bg-[#B5362A] hover:-translate-y-px transition-all press"
            >
              Build my popup kit
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
