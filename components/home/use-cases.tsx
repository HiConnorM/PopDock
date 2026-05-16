"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  TShirt, PaintBrush, Coffee, Flower, Camera, Knife, Lightning,
  BookOpen, SmileySticker, Scissors, Basket, CookingPot,
} from "@phosphor-icons/react";

const USE_CASES = [
  {
    icon: TShirt,      label: "Vintage Clothing",  description: "Thrift flips, curated racks, estate finds.", color: "#D2DCF0", accent: "#3D5A8A", tag: "Most popular" },
  {
    icon: PaintBrush,  label: "Artist Alley",       description: "Prints, zines, commissions, fan art tables.", color: "#DDE5D2", accent: "#6B7C52" },
  {
    icon: Coffee,      label: "Coffee Cart",        description: "Pop-up espresso, specialty drinks, cold brew.", color: "#F5E9C8", accent: "#8B6A1A" },
  {
    icon: Flower,      label: "Candles & Scent",   description: "Handpoured candles, wax melts, incense.", color: "#F5E0D5", accent: "#C97B5A" },
  {
    icon: Camera,      label: "Photography",        description: "Prints, portraits, polaroids, gallery walls.", color: "#EDE9E4", accent: "#4A4540" },
  {
    icon: Knife,       label: "Handmade Crafts",   description: "Ceramics, jewelry, leather goods, woodwork.", color: "#F0D5D2", accent: "#9B2F24" },
  {
    icon: Lightning,   label: "Streetwear",         description: "Custom pieces, drops, local brand launches.", color: "#D2DCF0", accent: "#3D5A8A" },
  {
    icon: BookOpen,    label: "Zines & Books",      description: "Self-published zines, small press, comics.", color: "#DDE5D2", accent: "#6B7C52" },
  {
    icon: SmileySticker, label: "Stickers & Pins", description: "Illustrated stickers, enamel pins, patches.", color: "#F5E9C8", accent: "#8B6A1A" },
  {
    icon: Scissors,    label: "Upcycled Fashion",  description: "Reworked denim, altered clothing, thrift hacks.", color: "#F5E0D5", accent: "#C97B5A" },
  {
    icon: Basket,      label: "Farmers Market",    description: "Produce, preserved goods, fresh flowers.", color: "#DDE5D2", accent: "#6B7C52" },
  {
    icon: CookingPot,  label: "Food Popup",         description: "Meal kits, prepared food, snacks, homemade goods.", color: "#F0D5D2", accent: "#9B2F24" },
];

export function UseCases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="use-cases" className="py-24 md:py-32 bg-[#F5F2EE]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-4">
            Built for every creator
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <h2 className="text-[40px] md:text-[52px] font-black tracking-[-0.03em] leading-[1.05] text-[#1A1916]">
              What kind of<br />popup are you<br />running?
            </h2>
            <p className="text-base text-[#6B6560] leading-relaxed max-w-[340px] md:mb-2">
              Popdock builds a kit specific to your type — not a generic template.
            </p>
          </div>
        </div>

        {/* Asymmetric masonry-style grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {USE_CASES.map((uc, i) => (
            <motion.button
              key={uc.label}
              variants={{
                hidden: { opacity: 0, scale: 0.92 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
              }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className={`group relative flex flex-col gap-3 p-5 rounded-[16px] border border-[#DDD8D2]/60 bg-[#FDFAF7] text-left hover:border-[#C5BEB6] hover:shadow-[var(--shadow-md)] transition-all ${
                i === 0 ? "md:col-span-2 md:row-span-1" : ""
              }`}
            >
              {/* Tag */}
              {"tag" in uc && uc.tag && (
                <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest bg-[#F0D5D2] text-[#9B2F24] px-2 py-0.5 rounded-full">
                  {uc.tag}
                </span>
              )}

              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: uc.color }}
              >
                <uc.icon size={18} color={uc.accent} weight="bold" />
              </div>

              <div>
                <p className="text-sm font-bold text-[#1A1916] mb-1">{uc.label}</p>
                <p className="text-xs text-[#9E9890] leading-relaxed">{uc.description}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* CTA row */}
        <p className="text-center text-sm text-[#9E9890] mt-10">
          Don&apos;t see yours?{" "}
          <a href="/onboarding" className="text-[#C63D2F] font-semibold hover:underline">
            Describe your popup
          </a>{" "}
          and we&apos;ll figure it out.
        </p>
      </div>
    </section>
  );
}
