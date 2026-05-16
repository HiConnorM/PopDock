"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Pencil, MagicWand, Package, Rocket } from "@phosphor-icons/react";

const STEPS = [
  {
    number: "01",
    icon: Pencil,
    title: "Tell us about your popup",
    description:
      "Answer a handful of questions about what you're selling, your budget, the type of event, and your experience level. No fluff — just what we need to build something real.",
    accent: "#C63D2F",
    accentLight: "#F0D5D2",
  },
  {
    number: "02",
    icon: MagicWand,
    title: "Get your popup kit generated",
    description:
      "We build a full popup kit tailored to your setup: checklists, shopping lists, booth layouts, pricing guides, signage ideas, and a launch timeline.",
    accent: "#3D5A8A",
    accentLight: "#D2DCF0",
  },
  {
    number: "03",
    icon: Package,
    title: "Edit and customize everything",
    description:
      "Your kit is fully editable. Adjust quantities, prices, layouts, and plans. Add notes, swap sections, and build the exact plan you need.",
    accent: "#6B7C52",
    accentLight: "#DDE5D2",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Export and launch",
    description:
      "Export your kit as a PDF, send it to Notion, or print it out. Then go show up and run your popup with total confidence.",
    accent: "#D4A843",
    accentLight: "#F5E9C8",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#FDFAF7]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header — left-aligned asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 mb-16 md:mb-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-4">
              How it works
            </p>
            <h2 className="text-[40px] md:text-[52px] font-black tracking-[-0.03em] leading-[1.05] text-[#1A1916]">
              From idea to<br />launch-ready<br />in minutes.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-lg text-[#6B6560] leading-relaxed max-w-[400px]">
              Popdock is not a document generator. It&apos;s a creator operations platform. Everything it builds is meant to actually get you to your booth — not just look good on screen.
            </p>
          </div>
        </div>

        {/* Steps — zig-zag asymmetric grid */}
        <motion.div
          ref={ref}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EDE9E4] border border-[#EDE9E4] rounded-[20px] overflow-hidden"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className={`bg-[#FDFAF7] p-8 md:p-10 flex flex-col gap-5 relative ${
                i === 1 || i === 2 ? "md:mt-0" : ""
              }`}
            >
              {/* Step number */}
              <div className="flex items-start justify-between">
                <span
                  className="text-[64px] font-black leading-none tracking-[-0.04em]"
                  style={{ color: `${step.accent}18` }}
                >
                  {step.number}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ backgroundColor: step.accentLight }}
                >
                  <step.icon size={20} color={step.accent} weight="bold" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold tracking-tight text-[#1A1916]">{step.title}</h3>
                <p className="text-base text-[#6B6560] leading-relaxed max-w-none">{step.description}</p>
              </div>

              {/* Connector dot for non-last steps */}
              {i < STEPS.length - 1 && (
                <div
                  className="absolute bottom-0 right-10 w-2 h-2 rounded-full translate-y-1/2 z-10"
                  style={{ backgroundColor: step.accent }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
