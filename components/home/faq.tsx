"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";

const FAQS = [
  {
    q: "Is this just an AI document generator?",
    a: "No. The AI is used to personalize the content, but the product is the system — structured checklists, shopping lists, booth layouts, timelines, and pricing guides that are actually organized around getting you to your popup. You can edit every section and export it however you need.",
  },
  {
    q: "What types of popups does Popdock support?",
    a: "Vintage clothing, artist alley, craft fairs, candles, food popups, coffee carts, streetwear, jewelry, zines, tattoo flash, farmers markets, handmade goods, and more. If your type isn't listed, describe it in the intake and we'll handle it.",
  },
  {
    q: "How long does it take to generate a kit?",
    a: "About 30 seconds after you finish the intake form. The system builds every section in parallel — checklist, shopping list, booth layout, timeline, signage, and pricing guide.",
  },
  {
    q: "Can I edit the generated content?",
    a: "Yes, everything is editable. Every checklist item, shopping list quantity, booth layout dimension, timeline date, and pricing suggestion can be adjusted. You can also regenerate specific sections if the first draft isn't quite right.",
  },
  {
    q: "What formats can I export in?",
    a: "PDF (full kit, individual sections, or checklists), and Notion (as a full workspace with linked databases). Canva export is coming soon.",
  },
  {
    q: "Do I need experience running popups?",
    a: "No. The intake form asks about your experience level, and the kit is calibrated to it. First-time sellers get more detailed guides, equipment breakdowns, and lower-risk recommendations. Experienced vendors get faster, more streamlined outputs.",
  },
  {
    q: "What happens to my data?",
    a: "Your popup kits are stored in your account and are private to you. We don&apos;t use your data to train models. You can export and delete your projects at any time.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#EDE9E4] last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-base font-semibold text-[#1A1916] group-hover:text-[#C63D2F] transition-colors">
          {q}
        </span>
        <div className="w-7 h-7 rounded-full border border-[#DDD8D2] flex items-center justify-center flex-shrink-0 group-hover:border-[#C63D2F] group-hover:bg-[#F0D5D2] transition-all">
          {open ? (
            <Minus size={13} weight="bold" color="#C63D2F" />
          ) : (
            <Plus size={13} weight="bold" color="#9E9890" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 text-[#6B6560] leading-relaxed text-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: a }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-24 md:py-32 bg-[#F5F2EE]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">
          {/* Left sticky header */}
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-4">
              FAQ
            </p>
            <h2 className="text-[36px] md:text-[44px] font-black tracking-[-0.03em] leading-[1.05] text-[#1A1916] mb-6">
              Questions?<br />We&apos;ve got<br />answers.
            </h2>
            <p className="text-sm text-[#6B6560] leading-relaxed">
              Still have something on your mind?{" "}
              <a href="mailto:hello@popdock.io" className="text-[#C63D2F] font-semibold hover:underline">
                Email us
              </a>
              .
            </p>
          </div>

          {/* FAQ items */}
          <div className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[20px] px-8 py-2">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
