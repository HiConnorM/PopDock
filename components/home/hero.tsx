"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

const STYLE_CHIPS = [
  "Vintage Market",
  "Artist Alley",
  "Coffee Cart",
  "Craft Fair",
  "Food Popup",
];

const PLACEHOLDER =
  "I'm selling vintage denim at a weekend flea market with a $400 budget and a warm, handmade aesthetic.";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
};

export function Hero() {
  const [idea, setIdea] = useState("");

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Dot grid */}
      <div className="dot-grid absolute inset-0 opacity-60 pointer-events-none" />

      {/* Warm gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 65% 40%, rgba(198,61,47,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(61,90,138,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_560px] gap-12 xl:gap-20 items-center">

          {/* ─── LEFT ─── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 max-w-[640px]"
          >
            {/* Eyebrow */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6B6560] bg-[#EDE9E4] border border-[#DDD8D2] px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C63D2F] animate-pulse" />
                The creation studio for real-world popups
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-[52px] md:text-[68px] xl:text-[76px] font-black leading-[0.95] tracking-[-0.04em] text-[#1A1916]"
            >
              Turn your idea into<br />
              a real-world popup kit.
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={item}
              className="text-lg md:text-xl text-[#6B6560] leading-relaxed max-w-[520px]"
            >
              Enter your popup idea. Get a complete launch kit — booth design, signage, checklist, shopping list, and print materials. All specific to your type, budget, and aesthetic.
            </motion.p>

            {/* Generator input card */}
            <motion.div
              variants={item}
              className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[18px] p-4 shadow-[var(--shadow-md)] flex flex-col gap-3"
            >
              <label className="text-xs font-semibold text-[#9E9890] uppercase tracking-widest">
                Describe your popup idea:
              </label>
              <textarea
                rows={3}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder={PLACEHOLDER}
                className="w-full bg-transparent text-[15px] text-[#1A1916] placeholder:text-[#C5BEB6] resize-none outline-none leading-relaxed"
              />

              {/* Quick-pick chips */}
              <div className="flex flex-wrap gap-2">
                {STYLE_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setIdea(chip)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[#DDD8D2] bg-[#F5F2EE] text-[#6B6560] hover:border-[#C63D2F] hover:text-[#C63D2F] hover:bg-[#FDF1F0] transition-all press"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <Link href="/onboarding" className="w-full">
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C63D2F] text-[#FDFAF7] font-semibold text-base px-6 py-3 rounded-[10px] border border-[#9B2F24] shadow-[0_2px_0_0_#9B2F24,0_4px_12px_rgba(198,61,47,0.20)] hover:bg-[#B5362A] hover:-translate-y-px transition-all press"
                >
                  Generate my kit
                  <ArrowRight size={18} weight="bold" />
                </button>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p variants={item} className="text-sm text-[#9E9890]">
              2,300+ creators launched with Popdock • Free to start
            </motion.p>
          </motion.div>

          {/* ─── RIGHT: Animated kit preview cards ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT_EXPO }}
            className="relative h-[460px] hidden lg:block"
          >
            <KitPreviewCards />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function KitPreviewCards() {
  return (
    <div className="relative w-full h-full">

      {/* Card 1 — Main "Your Popup Kit" app window */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.65, ease: EASE_OUT_EXPO }}
        className="absolute top-8 left-0 right-0 bg-[#FDFAF7] border border-[#DDD8D2] rounded-[20px] shadow-[var(--shadow-xl)] overflow-hidden"
      >
        {/* Traffic-light header */}
        <div className="px-5 py-3.5 border-b border-[#EDE9E4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-xs font-semibold text-[#9E9890] ml-2">Your Popup Kit</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#27A84A] bg-[#DDE5D2] px-2.5 py-0.5 rounded-full">
            Ready
          </span>
        </div>

        {/* Kit content */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <p className="text-base font-bold text-[#1A1916]">Vintage Flea Market</p>
            <p className="text-xs text-[#9E9890] mt-0.5">Generated kit · June 14</p>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { label: "Booth layout generated", icon: true },
              { label: "34-item shopping list", icon: true },
              { label: "6 signage pieces", icon: true },
            ].map((it) => (
              <div key={it.label} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#C63D2F] flex items-center justify-center flex-shrink-0">
                  <Check size={9} color="white" weight="bold" />
                </div>
                <span className="text-sm font-medium text-[#4A4540]">{it.label}</span>
              </div>
            ))}
          </div>

          {/* Progress bar at 78% */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9E9890]">Kit completion</p>
              <span className="text-xs font-bold text-[#C63D2F]">78%</span>
            </div>
            <div className="h-1.5 bg-[#EDE9E4] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#C63D2F] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ delay: 1.0, duration: 0.9, ease: EASE_OUT_EXPO }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 2 — Price card (bottom-left, rotated) */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ delay: 0.65, duration: 0.6, ease: EASE_OUT_EXPO }}
        className="absolute -bottom-4 -left-6 bg-[#F5E9C8] border border-[#D4A843]/30 rounded-[16px] px-4 py-3.5 shadow-[var(--shadow-lg)] w-[190px]"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B6A1A] mb-2">Price Card</p>
        <div className="flex flex-col gap-1">
          {[
            { price: "$18", label: "Vintage Levi's" },
            { price: "$12", label: "Band Tees" },
            { price: "$24", label: "Denim Jackets" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#4A4540]">{row.price}</span>
              <span className="text-[11px] text-[#8B6A1A]">{row.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Card 3 — Checklist (top-right, rotated) */}
      <motion.div
        initial={{ opacity: 0, y: -16, rotate: 1 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ delay: 0.8, duration: 0.6, ease: EASE_OUT_EXPO }}
        className="absolute -top-5 -right-4 bg-[#DDE5D2] border border-[#6B7C52]/25 rounded-[16px] px-4 py-3.5 shadow-[var(--shadow-lg)] w-[185px]"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7C52] mb-2">Checklist</p>
        <div className="flex flex-col gap-1.5">
          {["Folding table", "Extension cord", "Square reader"].map((it) => (
            <div key={it} className="flex items-center gap-2">
              <Check size={11} color="#6B7C52" weight="bold" />
              <span className="text-xs font-semibold text-[#4A4540]">{it}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
