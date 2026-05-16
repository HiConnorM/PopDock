"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For your first popup. Everything you need to test the waters.",
    cta: "Start free",
    ctaHref: "/onboarding",
    featured: false,
    features: [
      "1 popup kit",
      "Core checklist generator",
      "Shopping list",
      "Basic booth layout",
      "PDF export",
    ],
  },
  {
    name: "Creator",
    price: "$12",
    period: "/mo",
    description: "For creators who run popups regularly and want the full system.",
    cta: "Start 14-day trial",
    ctaHref: "/onboarding",
    featured: true,
    badge: "Most popular",
    features: [
      "Unlimited popup kits",
      "Full checklist & timeline",
      "Shopping list with pricing",
      "Advanced booth layouts",
      "Signage copy generator",
      "Inventory planning",
      "Notion export",
      "Priority support",
    ],
  },
  {
    name: "Studio",
    price: "$29",
    period: "/mo",
    description: "For vendors, markets, and teams managing multiple popups.",
    cta: "Contact us",
    ctaHref: "mailto:hello@popdock.io",
    featured: false,
    features: [
      "Everything in Creator",
      "5 team seats",
      "Multi-event planning",
      "White-label exports",
      "API access",
      "Dedicated onboarding",
      "Custom templates",
    ],
  },
];

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#F5F2EE]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-4">
            Pricing
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <h2 className="text-[40px] md:text-[52px] font-black tracking-[-0.03em] leading-[1.05] text-[#1A1916]">
              Start free.<br />Scale when<br />you&apos;re ready.
            </h2>
            <p className="text-base text-[#6B6560] leading-relaxed max-w-[300px] md:mb-2">
              No lock-ins. No surprise fees. Cancel anytime — your kits are always yours.
            </p>
          </div>
        </div>

        {/* Pricing cards — zig-zag, not 3-equal */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr_1fr] gap-4"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
              }}
              className={cn(
                "relative rounded-[20px] p-7 flex flex-col gap-6 border",
                plan.featured
                  ? "bg-[#FDFAF7] border-[#C63D2F] shadow-[var(--shadow-xl),0_0_0_2px_rgba(198,61,47,0.12)] md:-my-4 md:py-11"
                  : "bg-[#FDFAF7] border-[#DDD8D2]"
              )}
            >
              {plan.badge && (
                <span className="absolute top-5 right-5 text-[9px] font-bold uppercase tracking-widest bg-[#C63D2F] text-white px-2.5 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}

              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3 text-[#9E9890]">
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-[44px] font-black tracking-[-0.04em] leading-none text-[#1A1916]">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm font-medium mb-1 text-[#9E9890]">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed max-w-none text-[#6B6560]">
                  {plan.description}
                </p>
              </div>

              <Link href={plan.ctaHref}>
                <button
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[10px] text-sm font-bold transition-all press",
                    plan.featured
                      ? "bg-[#C63D2F] text-white border border-[#9B2F24] shadow-[0_2px_0_#9B2F24] hover:bg-[#B5362A]"
                      : "bg-[#EDE9E4] text-[#1A1916] border border-[#DDD8D2] hover:bg-[#DDD8D2]"
                  )}
                >
                  {plan.cta}
                  <ArrowUpRight size={14} weight="bold" />
                </button>
              </Link>

              <div className="flex flex-col gap-2.5 pt-2 border-t border-[#EDE9E4]">
                {plan.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5">
                    <div className={cn("w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0", plan.featured ? "bg-[#C63D2F]" : "bg-[#EDE9E4]")}>
                      <Check size={9} weight="bold" color={plan.featured ? "white" : "#6B6560"} />
                    </div>
                    <span className="text-sm text-[#6B6560]">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
