"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, ArrowsDownUp, DownloadSimple } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const CHECKLIST_SECTIONS = [
  {
    id: "equipment",
    title: "Equipment & Display",
    items: [
      { id: "e1", text: "6ft folding table (rent or bring)", done: true },
      { id: "e2", text: "Tablecloth (cream linen — 72x30)", done: true },
      { id: "e3", text: "Gridwall panel (2x4ft, 2 panels)", done: true },
      { id: "e4", text: "Gridwall feet / stands", done: true },
      { id: "e5", text: "Garment rack (freestanding, black)", done: false },
      { id: "e6", text: "Velvet hangers (24ct)", done: false },
      { id: "e7", text: "LED clip lights x2 (warm white)", done: false },
      { id: "e8", text: "Extension cord (16ft, 3-prong)", done: false },
      { id: "e9", text: "Power strip (4-outlet)", done: true },
      { id: "e10", text: "Zip ties + S-hooks for gridwall", done: true },
    ],
  },
  {
    id: "payment",
    title: "Payment & Cash",
    items: [
      { id: "p1", text: "Square card reader (charged)", done: true },
      { id: "p2", text: "Square stand or phone holder", done: false },
      { id: "p3", text: "Cash float: $80 in small bills", done: false },
      { id: "p4", text: "Cash box or fanny pack", done: false },
      { id: "p5", text: "Venmo / CashApp QR code printed", done: true },
      { id: "p6", text: "Test card reader day before", done: false },
    ],
  },
  {
    id: "signage",
    title: "Signage & Branding",
    items: [
      { id: "s1", text: "Table name sign (printed, A4)", done: false },
      { id: "s2", text: "Price tags printed (2x3, white)", done: false },
      { id: "s3", text: "Size label system (S/M/L tabs)", done: false },
      { id: "s4", text: "\"All items priced\" sign", done: false },
    ],
  },
  {
    id: "packing",
    title: "Packing & Transport",
    items: [
      { id: "pk1", text: "Tote bags for customers (50ct)", done: true },
      { id: "pk2", text: "Garment bags for transport", done: true },
      { id: "pk3", text: "Inventory counted + photographed", done: true },
      { id: "pk4", text: "Load car night before (not morning)", done: false },
      { id: "pk5", text: "Arrive 45 min early for setup", done: false },
    ],
  },
];

export function KitChecklist() {
  const [sections, setSections] = useState(CHECKLIST_SECTIONS);

  const toggleItem = (sectionId: string, itemId: string) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              items: sec.items.map((item) =>
                item.id === itemId ? { ...item, done: !item.done } : item
              ),
            }
          : sec
      )
    );
  };

  const totalItems = sections.flatMap((s) => s.items).length;
  const doneItems  = sections.flatMap((s) => s.items).filter((i) => i.done).length;
  const pct        = Math.round((doneItems / totalItems) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-1">Section</p>
          <h2 className="text-[28px] font-black tracking-[-0.03em] text-[#1A1916]">Setup Checklist</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-xs font-semibold text-[#6B6560] hover:text-[#1A1916] px-3 py-2 rounded-lg border border-[#DDD8D2] bg-[#FDFAF7] hover:bg-[#EDE9E4] transition-all">
            <ArrowsDownUp size={13} />
            Sort
          </button>
          <button className="flex items-center gap-2 text-xs font-semibold text-[#6B6560] hover:text-[#1A1916] px-3 py-2 rounded-lg border border-[#DDD8D2] bg-[#FDFAF7] hover:bg-[#EDE9E4] transition-all">
            <DownloadSimple size={13} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[14px] p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-[#1A1916]">
            {doneItems} of {totalItems} items complete
          </span>
          <span className="text-sm font-black text-[#C63D2F]">{pct}%</span>
        </div>
        <div className="h-2 bg-[#EDE9E4] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#C63D2F] rounded-full"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-4">
        {sections.map((section) => {
          const secDone = section.items.filter((i) => i.done).length;
          return (
            <div key={section.id} className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[14px] overflow-hidden">
              {/* Section header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F5F2EE]">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold text-[#1A1916]">{section.title}</h3>
                  <span className="text-xs text-[#9E9890]">
                    {secDone}/{section.items.length}
                  </span>
                </div>
                {secDone === section.items.length && (
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-[#DDE5D2] text-[#6B7C52] px-2 py-0.5 rounded-full">
                    Complete
                  </span>
                )}
              </div>

              {/* Items */}
              <div className="divide-y divide-[#F5F2EE]">
                <AnimatePresence initial={false}>
                  {section.items.map((item) => (
                    <motion.button
                      key={item.id}
                      layout
                      onClick={() => toggleItem(section.id, item.id)}
                      className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-[#F5F2EE] transition-colors group"
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                          item.done
                            ? "bg-[#C63D2F] border-[#C63D2F]"
                            : "border-[#DDD8D2] group-hover:border-[#C5BEB6]"
                        )}
                      >
                        {item.done && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Check size={10} color="white" weight="bold" />
                          </motion.div>
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-sm transition-colors flex-1",
                          item.done
                            ? "text-[#9E9890] line-through"
                            : "text-[#1A1916]"
                        )}
                      >
                        {item.text}
                      </span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>

              {/* Add item */}
              <button className="flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#9E9890] hover:text-[#C63D2F] hover:bg-[#FDF8F7] transition-all w-full border-t border-[#F5F2EE]">
                <Plus size={12} weight="bold" />
                Add item
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
