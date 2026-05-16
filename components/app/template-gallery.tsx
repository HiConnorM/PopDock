"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const CATEGORIES = ["All", "Booth Signs", "Price Cards", "Checklists", "Social Media", "Shopping Lists", "Flyers"];
const STYLES     = ["All styles", "Minimal", "Vintage", "Bold", "Earthy", "Premium", "Playful"];

const TEMPLATES = [
  { id: 1, name: "Kraft Market Booth Sign",   cat: "Booth Signs",    style: "Vintage",  bg: "#F5E9C8", text: "#8B6A1A", dims: "24×18 in PDF", popular: true,  body: "VINTAGE\nFINDS" },
  { id: 2, name: "Minimal White Price Card",   cat: "Price Cards",    style: "Minimal",  bg: "#FDFAF7", text: "#1A1916", dims: "4×6 in PDF",    popular: false, body: "$8 / $18\n$28 / $45" },
  { id: 3, name: "Bold Type Booth Sign",       cat: "Booth Signs",    style: "Bold",     bg: "#1A1916", text: "#FDFAF7", dims: "24×18 in PDF",  popular: false, body: "OPEN\nNOW" },
  { id: 4, name: "Earthy Market Checklist",    cat: "Checklists",     style: "Earthy",   bg: "#DDE5D2", text: "#6B7C52", dims: "Letter PDF",     popular: true,  body: "✓ Table\n✓ Signs\n✓ Cash" },
  { id: 5, name: "Instagram Launch Post",      cat: "Social Media",   style: "Minimal",  bg: "#D2DCF0", text: "#3D5A8A", dims: "1080×1080",     popular: true,  body: "LAUNCHING\nTHIS WKND" },
  { id: 6, name: "Coffee Cart Menu",           cat: "Price Cards",    style: "Vintage",  bg: "#F5E9C8", text: "#8B6A1A", dims: "4×6 in PDF",    popular: false, body: "Drip $4\nLatte $5" },
  { id: 7, name: "Artist Alley Price List",    cat: "Price Cards",    style: "Playful",  bg: "#F5E0D5", text: "#C97B5A", dims: "5×7 in PDF",    popular: false, body: "Prints $15\nOriginals $45" },
  { id: 8, name: "QR Code Payment Sign",       cat: "Booth Signs",    style: "Minimal",  bg: "#EDE9E4", text: "#4A4540", dims: "8×10 in PDF",   popular: true,  body: "Scan\nto Pay" },
  { id: 9, name: "Shopping List (Budget)",     cat: "Shopping Lists", style: "Minimal",  bg: "#FDFAF7", text: "#1A1916", dims: "Letter PDF",     popular: false, body: "Table $45\nCord $12\n..." },
  { id: 10, name: "Launch Flyer A",            cat: "Flyers",         style: "Bold",     bg: "#D2DCF0", text: "#3D5A8A", dims: "8.5×11 in PDF", popular: false, body: "POP UP\nSATURDAY" },
  { id: 11, name: "Thank-You Postcard",        cat: "Flyers",         style: "Premium",  bg: "#F5E9C8", text: "#8B6A1A", dims: "4×6 in PDF",    popular: false, body: "Thank you\nfor shopping ♥" },
  { id: 12, name: "Setup Checklist Pro",       cat: "Checklists",     style: "Minimal",  bg: "#FDFAF7", text: "#1A1916", dims: "Letter PDF",     popular: true,  body: "Night Before\nMorning Of\nSetup" },
];

export function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStyle,    setActiveStyle   ] = useState("All styles");

  const filtered = TEMPLATES.filter((t) => {
    const catOk   = activeCategory === "All"       || t.cat   === activeCategory;
    const styleOk = activeStyle    === "All styles" || t.style === activeStyle;
    return catOk && styleOk;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-1">Library</p>
        <h1 className="text-[28px] font-black tracking-[-0.03em] text-[#1A1916]">Templates</h1>
        <p className="text-sm text-[#6B6560] mt-1">Start with a proven template. Customize to match your brand.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeCategory === c ? "bg-[#1A1916] text-white border-[#1A1916]" : "bg-[#FDFAF7] text-[#6B6560] border-[#DDD8D2] hover:border-[#C5BEB6]"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setActiveStyle(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeStyle === s ? "bg-[#C63D2F] text-white border-[#9B2F24]" : "bg-[#FDFAF7] text-[#6B6560] border-[#DDD8D2] hover:border-[#C5BEB6]"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#9E9890]">{filtered.length} templates</p>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        initial="hidden"
        animate="show"
      >
        {filtered.map((tpl) => (
          <motion.div
            key={tpl.id}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } }}
            className="group rounded-[16px] border border-[#DDD8D2] overflow-hidden bg-[#FDFAF7] hover:border-[#C5BEB6] hover:shadow-[0_4px_16px_rgba(26,25,22,0.08)] transition-all"
          >
            {/* Preview */}
            <div className="h-[160px] flex items-center justify-center relative" style={{ backgroundColor: tpl.bg }}>
              {tpl.popular && (
                <span className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#F5E9C8] text-[#8B6A1A]">
                  <Star size={8} weight="fill" /> Popular
                </span>
              )}
              <p className="text-sm font-black text-center leading-tight whitespace-pre-line" style={{ color: tpl.text }}>
                {tpl.body}
              </p>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-sm font-bold text-[#1A1916] mb-1">{tpl.name}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#EDE9E4] text-[#9E9890]">{tpl.cat}</span>
                <span className="text-[9px] text-[#C5BEB6]">{tpl.dims}</span>
              </div>
              <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-[8px] bg-[#F5F2EE] text-[#4A4540] text-xs font-bold border border-[#DDD8D2] group-hover:bg-[#C63D2F] group-hover:text-white group-hover:border-[#9B2F24] transition-all">
                Use template
                <ArrowRight size={12} weight="bold" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
