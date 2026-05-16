"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Check, Storefront, TShirt, PaintBrush, Coffee } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { EASE_OUT_EXPO } from "@/lib/motion";

const POPUP_TYPES = [
  { icon: TShirt,    label: "Vintage Booth",  color: "#D2DCF0", accent: "#3D5A8A" },
  { icon: PaintBrush, label: "Artist Alley",  color: "#DDE5D2", accent: "#6B7C52" },
  { icon: Coffee,    label: "Coffee Cart",    color: "#F5E9C8", accent: "#8B6A1A" },
  { icon: Storefront, label: "Craft Fair",   color: "#F5E0D5", accent: "#C97B5A" },
];

const CHECKLIST_ITEMS = [
  "Setup checklist",
  "Shopping list",
  "Booth layout",
  "Launch timeline",
  "Pricing guide",
  "Signage ideas",
];

const SOCIAL_PROOF = [
  { name: "Mira Okafor",     role: "Vintage reseller, Chicago",   img: "64/1" },
  { name: "Tomás Reyes",     role: "Artist alley, Portland",      img: "65/1" },
  { name: "Yuki Tanaka",     role: "Craft fair maker, Austin",    img: "66/1" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
};

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background dot grid — static, no scroll cost */}
      <div className="dot-grid absolute inset-0 opacity-60 pointer-events-none" />

      {/* Warm gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 65% 40%, rgba(198,61,47,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(61,90,138,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_540px] gap-12 xl:gap-20 items-center">

          {/* ─── LEFT: Copy ─── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 max-w-[640px]"
          >
            {/* Eyebrow badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#6B6560] bg-[#EDE9E4] border border-[#DDD8D2] px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C63D2F] animate-pulse" />
                Now in early access
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-[52px] md:text-[68px] xl:text-[80px] font-black leading-[0.95] tracking-[-0.04em] text-[#1A1916]"
            >
              Launch your<br />
              <span className="text-[#C63D2F]">popup</span><br />
              without the<br />
              chaos.
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={item}
              className="text-lg md:text-xl text-[#6B6560] leading-relaxed max-w-[480px]"
            >
              From vintage markets to artist alleys — Popdock builds your complete popup launch kit. Setup plans, shopping lists, booth layouts, and timelines. Everything you need to actually show up ready.
            </motion.p>

            {/* CTA row */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/onboarding">
                <Button size="lg">
                  Build my popup kit
                  <ArrowUpRight size={16} weight="bold" />
                </Button>
              </Link>
              <Link href="#examples">
                <Button size="lg" variant="secondary">
                  See examples
                </Button>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.div variants={item} className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {SOCIAL_PROOF.map((p) => (
                  <img
                    key={p.name}
                    src={`https://picsum.photos/seed/${p.img}/40/40`}
                    alt={p.name}
                    className="w-8 h-8 rounded-full border-2 border-[#F5F2EE] object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-[#6B6560]">
                <span className="font-semibold text-[#1A1916]">2,300+</span> creators launched with Popdock
              </p>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Interactive popup kit preview ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="relative"
          >
            <KitPreviewCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function KitPreviewCard() {
  return (
    <div className="relative">
      {/* Main card */}
      <div className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[20px] shadow-[var(--shadow-xl)] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#EDE9E4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F0D5D2]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F5E9C8]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#DDE5D2]" />
            </div>
            <span className="text-xs font-semibold text-[#9E9890] ml-2">Your Popup Kit</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C63D2F] bg-[#F0D5D2] px-2 py-0.5 rounded-full">
            Ready
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">
          {/* Popup type selector */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9E9890] mb-2">Popup type</p>
            <div className="grid grid-cols-2 gap-2">
              {POPUP_TYPES.map((type, i) => (
                <motion.div
                  key={type.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${i === 0 ? "border-[#C63D2F] bg-[#FDF8F7]" : "border-[#EDE9E4] bg-[#F5F2EE] hover:border-[#DDD8D2]"}`}
                >
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: type.color }}
                  >
                    <type.icon size={14} color={type.accent} weight="bold" />
                  </div>
                  <span className="text-xs font-semibold text-[#1A1916]">{type.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Checklist preview */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9E9890] mb-2">Setup checklist</p>
            <div className="flex flex-col gap-1.5">
              {CHECKLIST_ITEMS.map((it, i) => (
                <motion.div
                  key={it}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.07, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="flex items-center gap-2.5"
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${i < 4 ? "bg-[#C63D2F]" : "border border-[#DDD8D2] bg-[#F5F2EE]"}`}
                  >
                    {i < 4 && <Check size={9} color="white" weight="bold" />}
                  </div>
                  <span
                    className={`text-sm ${i < 4 ? "text-[#6B6560] line-through" : "text-[#1A1916] font-medium"}`}
                  >
                    {it}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9E9890]">Kit completion</p>
              <span className="text-xs font-bold text-[#C63D2F]">67%</span>
            </div>
            <div className="h-1.5 bg-[#EDE9E4] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#C63D2F] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "67%" }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent cards */}
      <motion.div
        initial={{ opacity: 0, y: 12, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute -bottom-5 -left-8 bg-[#F5E9C8] border border-[#D4A843]/30 rounded-xl px-4 py-3 shadow-[var(--shadow-md)] max-w-[180px]"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B6A1A] mb-0.5">Shopping list</p>
        <p className="text-xs font-semibold text-[#4A4540]">47 items · ~$312 est.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -12, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ delay: 0.85, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute -top-4 -right-6 bg-[#DDE5D2] border border-[#6B7C52]/30 rounded-xl px-4 py-3 shadow-[var(--shadow-md)] max-w-[180px]"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7C52] mb-0.5">Launch day</p>
        <p className="text-xs font-semibold text-[#4A4540]">June 14 · Riverside Market</p>
      </motion.div>
    </div>
  );
}
