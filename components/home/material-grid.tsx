"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface MaterialCardProps {
  tag: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

function MaterialCard({ tag, children, className = "", style = {}, delay = 0 }: MaterialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.55, ease: EASE_OUT_EXPO }}
      className={`relative rounded-[16px] overflow-hidden border border-[#EDE9E4] shadow-[var(--shadow-sm)] ${className}`}
      style={style}
    >
      {children}
      {/* Tag pill */}
      <div className="absolute bottom-3 right-3">
        <span className="text-[10px] font-bold uppercase tracking-widest bg-white/80 backdrop-blur-sm border border-[#DDD8D2] text-[#6B6560] px-2.5 py-1 rounded-full">
          {tag}
        </span>
      </div>
    </motion.div>
  );
}

export function MaterialGrid() {
  return (
    <section className="py-24 bg-[#F5F2EE]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="mb-4"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#C63D2F] mb-3">
            Generated Materials
          </p>
          <h2 className="text-[40px] md:text-[52px] font-black tracking-[-0.04em] leading-[1.05] text-[#1A1916] max-w-[640px]">
            Everything you need, generated and print-ready.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE_OUT_EXPO }}
          className="text-lg text-[#6B6560] max-w-[520px] mb-14"
        >
          Popdock doesn&rsquo;t give you advice. It gives you actual materials — ready to print, share, or export.
        </motion.p>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">

          {/* 1 — Booth Sign (16:9 wide) */}
          <MaterialCard tag="Print-ready PDF" delay={0} className="aspect-video bg-[#FDFAF7] flex flex-col items-center justify-center text-center px-6">
            <div className="w-full border-t-4 border-[#C63D2F] pt-4">
              <p className="text-[22px] font-black tracking-[-0.03em] text-[#1A1916] uppercase leading-none">VINTAGE FINDS</p>
              <p className="text-xs text-[#9E9890] mt-1 tracking-widest uppercase font-medium">Est. Market Stall</p>
              <div className="w-12 h-0.5 bg-[#C63D2F] mx-auto mt-3" />
            </div>
          </MaterialCard>

          {/* 2 — Price Card (tall) */}
          <MaterialCard tag="4×6 card" delay={0.05} className="bg-[#F5E9C8] py-8 px-6 flex flex-col justify-center min-h-[220px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B6A1A] mb-4">Prices</p>
            <div className="flex flex-col gap-3">
              {[
                { price: "$8",  label: "Accessories" },
                { price: "$18", label: "Tops" },
                { price: "$28", label: "Denim" },
                { price: "$45", label: "Jackets" },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between border-b border-[#D4A843]/30 pb-2">
                  <span className="text-xl font-black text-[#4A4540]">{row.price}</span>
                  <span className="text-sm text-[#8B6A1A] font-medium">{row.label}</span>
                </div>
              ))}
            </div>
          </MaterialCard>

          {/* 3 — Instagram Post (square) */}
          <MaterialCard
            tag="1080×1080"
            delay={0.10}
            className="aspect-square flex flex-col items-center justify-center text-center p-6"
            style={{ background: "linear-gradient(135deg, #F5E9C8 0%, #F0D5D2 100%)" }}
          >
            <div className="w-28 h-28 rounded-full border-[3px] border-[#C63D2F]/30 flex flex-col items-center justify-center bg-white/40">
              <p className="text-[11px] font-black uppercase tracking-tight text-[#1A1916] leading-tight">LAUNCHING<br />THIS<br />WEEKEND</p>
            </div>
            <p className="text-xs text-[#6B6560] font-semibold mt-4">@ your_brand</p>
          </MaterialCard>

          {/* 4 — Checklist (tall) */}
          <MaterialCard tag="Printable PDF" delay={0.12} className="bg-white py-6 px-6 min-h-[240px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9E9890] mb-4">Setup Checklist</p>
            <div className="flex flex-col gap-3">
              {[
                { text: "Extension cord", done: true },
                { text: "Folding table (6 ft)", done: true },
                { text: "Cash box + float", done: true },
                { text: "Square reader", done: false },
                { text: "Price tag holders", done: false },
                { text: "Garment rack", done: false },
              ].map((it) => (
                <div key={it.text} className="flex items-center gap-3 border-b border-[#F5F2EE] pb-2">
                  <div
                    className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                      it.done ? "bg-[#C63D2F] border-[#C63D2F]" : "border-[#DDD8D2]"
                    }`}
                  >
                    {it.done && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${it.done ? "text-[#9E9890] line-through" : "text-[#1A1916] font-medium"}`}>
                    {it.text}
                  </span>
                </div>
              ))}
            </div>
          </MaterialCard>

          {/* 5 — QR Code Sign */}
          <MaterialCard tag="Print-ready" delay={0.16} className="aspect-square bg-[#1A2B4A] flex flex-col items-center justify-center gap-4 p-6">
            <div className="w-24 h-24 bg-white rounded-[8px] flex items-center justify-center">
              {/* Placeholder QR pattern */}
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect x="4" y="4" width="22" height="22" rx="3" fill="#1A2B4A" />
                <rect x="9" y="9" width="12" height="12" rx="1" fill="white" />
                <rect x="38" y="4" width="22" height="22" rx="3" fill="#1A2B4A" />
                <rect x="43" y="9" width="12" height="12" rx="1" fill="white" />
                <rect x="4" y="38" width="22" height="22" rx="3" fill="#1A2B4A" />
                <rect x="9" y="43" width="12" height="12" rx="1" fill="white" />
                <rect x="38" y="38" width="6" height="6" fill="#1A2B4A" />
                <rect x="48" y="38" width="6" height="6" fill="#1A2B4A" />
                <rect x="38" y="48" width="6" height="6" fill="#1A2B4A" />
                <rect x="48" y="48" width="6" height="6" fill="#1A2B4A" />
              </svg>
            </div>
            <p className="text-white font-bold text-sm tracking-wide">Follow + Pay</p>
          </MaterialCard>

          {/* 6 — Shopping List (receipt style) */}
          <MaterialCard tag="CSV + PDF" delay={0.20} className="bg-white py-6 px-6 min-h-[200px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9E9890] mb-4">Shopping List</p>
            <div className="font-mono flex flex-col gap-0">
              {[
                { item: "Extension cord", cost: "$12" },
                { item: "Folding table", cost: "$28" },
                { item: "Price tags", cost: "$6" },
                { item: "Garment rack", cost: "$45" },
                { item: "Zip ties (50pk)", cost: "$4" },
              ].map((row, i) => (
                <div key={row.item}>
                  <div className="flex justify-between items-baseline py-2">
                    <span className="text-xs text-[#4A4540]">{row.item}</span>
                    <span className="text-xs font-bold text-[#1A1916]">{row.cost}</span>
                  </div>
                  {i < 4 && <div className="border-b border-dashed border-[#EDE9E4]" />}
                </div>
              ))}
              <div className="border-t border-[#DDD8D2] mt-1 pt-2 flex justify-between">
                <span className="text-[11px] font-bold text-[#9E9890] uppercase tracking-wide">Total est.</span>
                <span className="text-[11px] font-black text-[#C63D2F]">$95</span>
              </div>
            </div>
          </MaterialCard>

          {/* 7 — Instagram Story (9:16 narrow tall) */}
          <MaterialCard
            tag="1080×1920"
            delay={0.24}
            className="col-span-1 flex flex-col items-center justify-center text-center p-6 min-h-[320px]"
            style={{ background: "linear-gradient(180deg, #DDE5D2 0%, #F5E9C8 100%)" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7C52] mb-6">This Weekend</p>
            <p className="text-[28px] font-black text-[#1A1916] tracking-[-0.03em] leading-none">POP-<br />UP!</p>
            <p className="text-sm text-[#6B6560] mt-4 font-medium">Vintage Flea · June 14</p>
            <p className="text-xs text-[#8B6A1A] mt-1">@ Riverside Market</p>
            <div className="mt-6 px-5 py-2 rounded-full bg-[#C63D2F] text-white text-xs font-bold">
              Tap to learn more
            </div>
          </MaterialCard>

          {/* 8 — Thank-You Card */}
          <MaterialCard tag="4×4 card" delay={0.28} className="aspect-square bg-[#FDFAF7] flex flex-col items-center justify-center text-center p-8">
            <div className="w-8 h-0.5 bg-[#C63D2F] mb-4" />
            <p className="text-sm font-semibold text-[#4A4540] leading-relaxed italic">
              &ldquo;Thank you for<br />shopping small&rdquo;
            </p>
            <p className="text-[#C63D2F] text-lg mt-2">♥</p>
            <div className="w-8 h-0.5 bg-[#DDD8D2] mt-4" />
          </MaterialCard>

        </div>
      </div>
    </section>
  );
}
