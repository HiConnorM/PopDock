"use client";

import { motion } from "framer-motion";
import { GridFour, Lightning, ArrowsOut, Sparkle } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const LAYOUT_OPTIONS = [
  { id: "a", label: "Layout A — L-shape", desc: "Grid wall left + table center + rack right. Best for high-volume clothing.", recommended: true },
  { id: "b", label: "Layout B — Linear", desc: "Table front, rack behind, signage overhead. Works for smaller booths." },
  { id: "c", label: "Layout C — Island", desc: "Double-sided rack center, wrapping customer flow. Great for open booths." },
];

const DISPLAY_TIPS = [
  { tip: "Place hero pieces at eye level on grid wall (left side).", category: "Grid Wall" },
  { tip: "Stack folded denim on center table in categories.", category: "Table" },
  { tip: "$12 impulse bin near checkout — accessories and small items.", category: "Checkout" },
  { tip: "Mirror near fitting area drives try-ons and conversions.", category: "Flow" },
  { tip: "QR code sign at eye level near payment zone.", category: "Signage" },
  { tip: "Use vertical space — hang 3 tiers on grid wall.", category: "Grid Wall" },
];

export function KitBooth({ kitId: _kitId }: { kitId: string }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-1">Section</p>
        <h2 className="text-[28px] font-black tracking-[-0.03em] text-[#1A1916]">Booth Layout</h2>
        <p className="text-sm text-[#6B6560] mt-1">Your booth concept, display strategy, and customer flow plan.</p>
      </div>

      {/* Booth specs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: ArrowsOut, label: "Booth Size", value: "6ft Table" },
          { icon: GridFour,  label: "Location",  value: "Indoor" },
          { icon: Lightning, label: "Power",      value: "Available" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[12px] p-4 text-center">
            <Icon size={18} color="#C63D2F" weight="bold" className="mx-auto mb-2" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9E9890] mb-0.5">{label}</p>
            <p className="text-sm font-bold text-[#1A1916]">{value}</p>
          </div>
        ))}
      </div>

      {/* Layout options */}
      <div>
        <h3 className="text-sm font-bold text-[#1A1916] mb-3">Recommended Layouts</h3>
        <motion.div className="flex flex-col gap-3" variants={{ show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="show">
          {LAYOUT_OPTIONS.map((opt) => (
            <motion.div
              key={opt.id}
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } }}
              className={`p-5 rounded-[14px] border cursor-pointer transition-all ${opt.recommended ? "border-[#C63D2F] bg-[#FDF8F7]" : "border-[#DDD8D2] bg-[#FDFAF7] hover:border-[#C5BEB6]"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold text-[#1A1916]">{opt.label}</p>
                {opt.recommended && <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-[#C63D2F] text-white">Recommended</span>}
              </div>
              <p className="text-xs text-[#6B6560]">{opt.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Display tips */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkle size={14} color="#C63D2F" weight="fill" />
          <h3 className="text-sm font-bold text-[#1A1916]">AI Display Tips</h3>
        </div>
        <div className="flex flex-col gap-2">
          {DISPLAY_TIPS.map((t) => (
            <div key={t.tip} className="flex items-start gap-3 p-3 rounded-[10px] bg-[#FDFAF7] border border-[#EDE9E4]">
              <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#EDE9E4] text-[#9E9890] flex-shrink-0 mt-0.5">{t.category}</span>
              <p className="text-sm text-[#4A4540]">{t.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
