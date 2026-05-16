"use client";

import { motion } from "framer-motion";
import { Package, Sparkle } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const CATEGORIES = [
  { name: "Denim",        count: 18, target: 20, color: "#D2DCF0", accent: "#3D5A8A" },
  { name: "Tops",         count: 24, target: 25, color: "#DDE5D2", accent: "#6B7C52" },
  { name: "Outerwear",    count: 8,  target: 10, color: "#F5E9C8", accent: "#8B6A1A" },
  { name: "Accessories",  count: 22, target: 25, color: "#F5E0D5", accent: "#C97B5A" },
  { name: "Misc / Misc",  count: 8,  target: 10, color: "#EDE9E4", accent: "#4A4540" },
];

export function KitInventoryPanel({ kitId: _kitId }: { kitId: string }) {
  const total = CATEGORIES.reduce((s, c) => s + c.count, 0);
  const target = CATEGORIES.reduce((s, c) => s + c.target, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-1">Section</p>
        <h2 className="text-[28px] font-black tracking-[-0.03em] text-[#1A1916]">Inventory</h2>
        <p className="text-sm text-[#6B6560] mt-1">Plan your inventory by category, quantity, and display priority.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total items",   value: `${total}` },
          { label: "Target",        value: `${target}` },
          { label: "Categories",    value: `${CATEGORIES.length}` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[12px] p-4 text-center">
            <p className="text-2xl font-black text-[#C63D2F]">{value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9E9890] mt-1">{label}</p>
          </div>
        ))}
      </div>

      <motion.div className="flex flex-col gap-3" variants={{ show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="show">
        {CATEGORIES.map((cat) => (
          <motion.div
            key={cat.name}
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } }}
            className="flex items-center gap-4 p-4 rounded-[12px] border border-[#DDD8D2] bg-[#FDFAF7]"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cat.color }}>
              <Package size={16} color={cat.accent} weight="bold" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-[#1A1916]">{cat.name}</p>
                <span className="text-xs font-semibold text-[#9E9890]">{cat.count} / {cat.target}</span>
              </div>
              <div className="h-1.5 bg-[#EDE9E4] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: cat.accent }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(cat.count / cat.target) * 100}%` }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-[#FDF8F7] border border-[#F0D5D2] rounded-[14px] p-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkle size={14} color="#C63D2F" weight="fill" />
          <span className="text-xs font-bold text-[#C63D2F] uppercase tracking-widest">Inventory tip</span>
        </div>
        <p className="text-sm text-[#6B6560]">You&apos;re 2 items short on outerwear. Jackets are your highest-margin category — consider adding 2 more before the event.</p>
      </div>
    </div>
  );
}
