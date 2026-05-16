"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

const EXAMPLE_KITS = [
  {
    name: "The Vintage Table",
    creator: "Zara M. — Chicago Randolph St. Market",
    type: "Vintage Clothing Booth",
    img: "vintage/800/500",
    color: "#3D5A8A",
    colorLight: "#D2DCF0",
    stats: { items: "47 checklist items", budget: "$285 setup budget", timeline: "3-week prep plan" },
    includes: ["6ft folding table setup", "Gridwall panel system", "Garment rack layout", "Signage copy", "Pricing strategy", "Square POS setup"],
  },
  {
    name: "Artist Alley Setup",
    creator: "Kenji L. — AX Artist Alley, Los Angeles",
    type: "Artist Alley Convention Booth",
    img: "gallery/800/500",
    color: "#6B7C52",
    colorLight: "#DDE5D2",
    stats: { items: "62 checklist items", budget: "$190 setup budget", timeline: "6-week prep plan" },
    includes: ["Print display system", "Commission board", "Fan art compliance", "Pricing tiers", "Cash & digital setup", "Packing manifest"],
  },
  {
    name: "The Candle Cart",
    creator: "Priya S. — Austin Weekend Market",
    type: "Handmade Goods Booth",
    img: "candle/800/500",
    color: "#C97B5A",
    colorLight: "#F5E0D5",
    stats: { items: "39 checklist items", budget: "$175 setup budget", timeline: "2-week prep plan" },
    includes: ["Display pyramid layout", "Scent labeling guide", "Shipping/transport plan", "Safety checklist", "Instagram-ready setup", "Re-stock triggers"],
  },
];

export function Examples() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="examples" className="py-24 md:py-32 bg-[#FDFAF7]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-4">
            Example popup kits
          </p>
          <h2 className="text-[40px] md:text-[52px] font-black tracking-[-0.03em] leading-[1.05] text-[#1A1916]">
            Real kits.<br />Real setups.
          </h2>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {EXAMPLE_KITS.map((kit) => (
            <motion.div
              key={kit.name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
              }}
              className="group bg-[#FDFAF7] border border-[#DDD8D2] rounded-[20px] overflow-hidden hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image placeholder */}
              <div
                className="h-44 relative overflow-hidden"
                style={{ backgroundColor: kit.colorLight }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: kit.color }}>
                      {kit.type}
                    </p>
                    <div className="w-16 h-px mx-auto" style={{ backgroundColor: `${kit.color}40` }} />
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-16"
                  style={{ background: `linear-gradient(to top, ${kit.colorLight}, transparent)` }}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1A1916] mb-1">{kit.name}</h3>
                  <p className="text-xs text-[#9E9890]">{kit.creator}</p>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-2">
                  {Object.values(kit.stats).map((stat) => (
                    <span
                      key={stat}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
                      style={{
                        backgroundColor: kit.colorLight,
                        borderColor: `${kit.color}30`,
                        color: kit.color,
                      }}
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                {/* Includes */}
                <div className="flex flex-col gap-1.5">
                  {kit.includes.map((inc) => (
                    <div key={inc} className="flex items-center gap-2">
                      <Check size={12} weight="bold" color={kit.color} className="flex-shrink-0" />
                      <span className="text-xs text-[#6B6560]">{inc}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#EDE9E4]">
                  <Link
                    href="/onboarding"
                    className="flex items-center gap-1 text-sm font-semibold text-[#C63D2F] hover:gap-2 transition-all group-hover:underline"
                    style={{ color: kit.color }}
                  >
                    Build a kit like this
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
