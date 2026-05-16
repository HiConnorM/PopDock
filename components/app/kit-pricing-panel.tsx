"use client";

import { motion } from "framer-motion";
import { CurrencyDollar, TrendUp, Sparkle } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const PRICE_TIERS = [
  { tier: "Impulse", range: "$5–$12",  examples: "Accessories, pins, small items", color: "#DDE5D2", accent: "#6B7C52" },
  { tier: "Core",    range: "$15–$25", examples: "Tops, tees, light layers",       color: "#D2DCF0", accent: "#3D5A8A" },
  { tier: "Premium", range: "$28–$45", examples: "Denim, dresses, statement pieces", color: "#F5E9C8", accent: "#8B6A1A" },
  { tier: "Hero",    range: "$50–$80", examples: "Vintage jackets, coats, rare finds", color: "#F0D5D2", accent: "#9B2F24" },
];

const BUNDLE_IDEAS = [
  "2 tops for $28 (saves $2 — feels like a deal)",
  "Top + accessories bundle for $22",
  "3-piece mystery bag for $30 (great for end of day)",
];

export function KitPricingPanel({ kitId: _kitId }: { kitId: string }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-1">Section</p>
        <h2 className="text-[28px] font-black tracking-[-0.03em] text-[#1A1916]">Pricing</h2>
        <p className="text-sm text-[#6B6560] mt-1">Your pricing strategy, tier ladder, and bundle ideas.</p>
      </div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3" variants={{ show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="show">
        {PRICE_TIERS.map((tier) => (
          <motion.div
            key={tier.tier}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } }}
            className="p-5 rounded-[14px] border border-[#DDD8D2] bg-[#FDFAF7]"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: tier.color }}>
                <CurrencyDollar size={14} color={tier.accent} weight="bold" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#9E9890]">{tier.tier}</p>
                <p className="text-base font-black text-[#1A1916]">{tier.range}</p>
              </div>
            </div>
            <p className="text-xs text-[#6B6560]">{tier.examples}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[14px] p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendUp size={16} color="#C63D2F" weight="bold" />
          <h3 className="text-sm font-bold text-[#1A1916]">Bundle Ideas</h3>
        </div>
        <div className="flex flex-col gap-2">
          {BUNDLE_IDEAS.map((idea) => (
            <div key={idea} className="flex items-start gap-3 text-sm text-[#4A4540]">
              <span className="text-[#C63D2F] font-bold flex-shrink-0">→</span>
              {idea}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#FDF8F7] border border-[#F0D5D2] rounded-[14px] p-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkle size={14} color="#C63D2F" weight="fill" />
          <span className="text-xs font-bold text-[#C63D2F] uppercase tracking-widest">Pricing insight</span>
        </div>
        <p className="text-sm text-[#6B6560] leading-relaxed">
          With 80+ items, aim for 60% priced under $25 to drive volume. Your $12 impulse bin is your best weapon — place it at the checkout table.
        </p>
      </div>
    </div>
  );
}
