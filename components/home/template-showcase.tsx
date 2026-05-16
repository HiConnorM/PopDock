"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TShirt,
  PaintBrush,
  Coffee,
  Flower,
  CookingPot,
  Basket,
  Diamond,
  Lightning,
  BookOpen,
  Scissors,
  PenNib,
  Sparkle,
} from "@phosphor-icons/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

const TEMPLATES = [
  { name: "Vintage Clothing", color: "#D2DCF0", accent: "#3D5A8A", Icon: TShirt },
  { name: "Artist Alley",     color: "#DDE5D2", accent: "#6B7C52", Icon: PaintBrush },
  { name: "Coffee Cart",      color: "#F5E9C8", accent: "#8B6A1A", Icon: Coffee },
  { name: "Candles & Scent",  color: "#F5E0D5", accent: "#C97B5A", Icon: Flower },
  { name: "Food Popup",       color: "#F0D5D2", accent: "#9B2F24", Icon: CookingPot },
  { name: "Farmers Market",   color: "#DDE5D2", accent: "#6B7C52", Icon: Basket },
  { name: "Jewelry Vendor",   color: "#D2DCF0", accent: "#3D5A8A", Icon: Diamond },
  { name: "Streetwear",       color: "#EDE9E4", accent: "#4A4540", Icon: Lightning },
  { name: "Zines & Books",    color: "#F5E9C8", accent: "#8B6A1A", Icon: BookOpen },
  { name: "Craft Fair",       color: "#F5E0D5", accent: "#C97B5A", Icon: Scissors },
  { name: "Tattoo Flash",     color: "#F0D5D2", accent: "#9B2F24", Icon: PenNib },
  { name: "Beauty Popup",     color: "#DDE5D2", accent: "#6B7C52", Icon: Sparkle },
];

export function TemplateShowcase() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#C63D2F] mb-3">
            Templates
          </p>
          <h2 className="text-[40px] md:text-[52px] font-black tracking-[-0.04em] leading-[1.05] text-[#1A1916]">
            A kit for every type of popup.
          </h2>
        </motion.div>

        {/* Scrollable card row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {TEMPLATES.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.45, ease: EASE_OUT_EXPO }}
              whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(26,25,22,0.12), 0 4px 8px rgba(26,25,22,0.08)" }}
              className="flex-shrink-0 w-[200px] rounded-[16px] overflow-hidden bg-white border border-[#EDE9E4] cursor-pointer transition-shadow"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              {/* Colored icon area */}
              <div
                className="h-[80px] flex items-center justify-center"
                style={{ backgroundColor: t.color }}
              >
                <t.Icon size={32} color={t.accent} weight="bold" />
              </div>

              {/* Text area */}
              <div className="px-4 py-3 bg-[#FDFAF7]">
                <p className="text-[13px] font-bold text-[#1A1916] leading-snug">{t.name}</p>
                <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-widest text-[#27A84A] bg-[#DDE5D2] px-2 py-0.5 rounded-full">
                  Kit included
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Browse all link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="text-center mt-10"
        >
          <Link
            href="/templates"
            className="text-sm font-semibold text-[#C63D2F] hover:underline underline-offset-4 transition-all"
          >
            Browse all templates →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
