"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  MagicWand,
  Megaphone,
  Sparkle,
} from "@phosphor-icons/react";

interface KitStrategyProps {
  kitId: string;
}

const VOICE_TAGS = ["Warm", "Curated", "Approachable", "Nostalgic", "Authentic"];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function KitStrategy({ kitId: _kitId }: KitStrategyProps) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9E9890] mb-1">Section</p>
        <h2 className="text-[28px] font-black tracking-[-0.03em] text-[#1A1916]">Strategy</h2>
        <p className="text-sm text-[#6B6560] mt-1">
          Your popup concept, positioning, and brand direction.
        </p>
      </div>

      <motion.div
        className="flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Card 1: Popup Concept */}
        <motion.div
          variants={itemVariants}
          className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[14px] p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-[9px] bg-[#F5E9C8] flex items-center justify-center">
              <Lightbulb size={17} weight="bold" color="#8B6A1A" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#9E9890]">Popup Concept</p>
            </div>
            <span className="ml-auto flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F0D5D2] text-[#C63D2F]">
              <Sparkle size={9} weight="bold" />
              AI Generated
            </span>
          </div>
          <h3 className="text-[17px] font-black text-[#1A1916] tracking-[-0.02em] mb-2">
            Vintage Flea Market Booth with a Curated Aesthetic
          </h3>
          <p className="text-sm text-[#6B6560] leading-relaxed">
            A tightly curated vintage clothing experience focusing on denim, outerwear, and band tees. The booth creates a thrift-store-meets-boutique feeling that attracts vintage lovers aged 18–35.
          </p>
        </motion.div>

        {/* Card 2: Target Audience */}
        <motion.div
          variants={itemVariants}
          className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[14px] p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-[9px] bg-[#D2DCF0] flex items-center justify-center">
              <Users size={17} weight="bold" color="#3D5A8A" />
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9E9890]">Target Audience</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Audience", value: "Indie market shoppers, vintage enthusiasts, sustainability-minded buyers" },
              { label: "Age range", value: "18–35" },
              { label: "Price sensitivity", value: "Medium" },
              { label: "Key motivator", value: "Finding unique one-of-a-kind pieces at fair prices" },
            ].map((row) => (
              <div key={row.label} className="bg-[#F5F2EE] rounded-[10px] p-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#9E9890] mb-1">{row.label}</p>
                <p className="text-sm font-semibold text-[#1A1916]">{row.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 3: Booth Hook */}
        <motion.div
          variants={itemVariants}
          className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[14px] p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-[9px] bg-[#DDE5D2] flex items-center justify-center">
              <MagicWand size={17} weight="bold" color="#6B7C52" />
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9E9890]">Booth Hook</p>
          </div>
          <p className="text-[16px] font-bold text-[#1A1916] mb-3">
            "The only vintage booth at Randolph Market with visible price tags and a fitting area."
          </p>
          <ul className="flex flex-col gap-2">
            {[
              "Clear pricing removes hesitation",
              "Photo moment draws Instagram traffic",
              "Organized by category = better browse",
            ].map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm text-[#6B6560]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C63D2F] flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Card 4: Brand Voice */}
        <motion.div
          variants={itemVariants}
          className="bg-[#FDFAF7] border border-[#DDD8D2] rounded-[14px] p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-[9px] bg-[#F5E0D5] flex items-center justify-center">
              <Megaphone size={17} weight="bold" color="#C97B5A" />
            </div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#9E9890]">Brand Voice</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {VOICE_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-[#EDE9E4] text-xs font-bold text-[#4A4540]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="bg-[#F5F2EE] rounded-[10px] p-3">
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#9E9890] mb-1">Tone</p>
            <p className="text-sm text-[#4A4540] leading-relaxed">
              "Friendly but knowledgeable — like a vintage-loving friend who knows their stuff"
            </p>
          </div>
        </motion.div>

        {/* Regenerate panel */}
        <motion.div
          variants={itemVariants}
          className="bg-[#FDF8F7] border border-[#F0D5D2] rounded-[14px] p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkle size={14} weight="bold" color="#C63D2F" />
            <p className="text-xs font-bold text-[#C63D2F] uppercase tracking-wider">
              Refine strategy
            </p>
          </div>
          <p className="text-xs text-[#9E9890] mb-3">
            Describe how you&apos;d like to change the direction and regenerate.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Make it feel more premium and editorial..."
              className="flex-1 px-3 py-2.5 rounded-[8px] bg-[#F5F2EE] border border-[#DDD8D2] text-sm text-[#1A1916] placeholder-[#C5BEB6] outline-none focus:border-[#C63D2F] transition-colors"
            />
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#C63D2F] text-white text-xs font-bold hover:bg-[#B5362A] transition-colors flex-shrink-0">
              <Sparkle size={13} weight="bold" />
              Regenerate strategy
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
