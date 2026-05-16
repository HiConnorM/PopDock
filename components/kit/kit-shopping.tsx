"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus, DownloadSimple, ArrowSquareOut } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SHOPPING_SECTIONS = [
  {
    category: "Display & Equipment",
    color: "#3D5A8A",
    bg: "#D2DCF0",
    items: [
      { id: "d1", name: "Garment rack — freestanding, black",      qty: 1, price: 48,  link: true,  bought: false },
      { id: "d2", name: "Velvet hangers (pack of 50)",              qty: 1, price: 14,  link: true,  bought: true },
      { id: "d3", name: "Gridwall panels 2x4ft",                   qty: 2, price: 38,  link: true,  bought: true },
      { id: "d4", name: "Gridwall feet/stands",                    qty: 1, price: 18,  link: true,  bought: true },
      { id: "d5", name: "LED clip lights, warm white",              qty: 2, price: 22,  link: true,  bought: false },
      { id: "d6", name: "16ft extension cord (3-prong)",            qty: 1, price: 12,  link: true,  bought: false },
      { id: "d7", name: "Power strip (4-outlet, surge protected)",  qty: 1, price: 16,  link: true,  bought: true },
    ],
  },
  {
    category: "Signage & Labels",
    color: "#6B7C52",
    bg: "#DDE5D2",
    items: [
      { id: "s1", name: "Price tags 2x3in (white, 100ct)",          qty: 1, price: 8,   link: false, bought: false },
      { id: "s2", name: "String tags (manila, 100ct)",              qty: 1, price: 6,   link: false, bought: false },
      { id: "s3", name: "Black fine-tip Sharpies",                  qty: 1, price: 5,   link: false, bought: false },
      { id: "s4", name: "A4 sign prints (local print shop)",        qty: 3, price: 9,   link: false, bought: false },
      { id: "s5", name: "Acrylic sign holders (small, 2ct)",        qty: 2, price: 14,  link: true,  bought: false },
    ],
  },
  {
    category: "Payment & Cash Handling",
    color: "#8B6A1A",
    bg: "#F5E9C8",
    items: [
      { id: "p1", name: "Cash box with lock",                       qty: 1, price: 22,  link: true,  bought: false },
      { id: "p2", name: "Change: $80 in small bills",               qty: 1, price: 80,  link: false, bought: false },
      { id: "p3", name: "Square card reader (if not owned)",        qty: 1, price: 0,   link: true,  bought: true },
      { id: "p4", name: "QR code stands (printed, laminated)",      qty: 2, price: 4,   link: false, bought: false },
    ],
  },
  {
    category: "Packaging & Customer Supplies",
    color: "#C97B5A",
    bg: "#F5E0D5",
    items: [
      { id: "pk1", name: "Tote bags / shopping bags (50ct)",        qty: 1, price: 18,  link: true,  bought: true },
      { id: "pk2", name: "Tissue paper sheets",                     qty: 1, price: 7,   link: false, bought: false },
      { id: "pk3", name: "Rubber bands for garment bundles",        qty: 1, price: 3,   link: false, bought: false },
    ],
  },
];

export function KitShopping() {
  const [items, setItems] = useState(SHOPPING_SECTIONS);

  const toggleBought = (catIdx: number, itemId: string) => {
    setItems((prev) =>
      prev.map((cat, ci) =>
        ci === catIdx
          ? { ...cat, items: cat.items.map((i) => i.id === itemId ? { ...i, bought: !i.bought } : i) }
          : cat
      )
    );
  };

  const allItems  = items.flatMap((s) => s.items);
  const totalCost = allItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const bought    = allItems.filter((i) => i.bought).reduce((sum, i) => sum + i.price * i.qty, 0);
  const remaining = totalCost - bought;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-1">Section</p>
          <h2 className="text-[28px] font-black tracking-[-0.03em] text-[#1A1916]">Shopping List</h2>
        </div>
        <button className="flex items-center gap-2 text-xs font-semibold text-[#6B6560] hover:text-[#1A1916] px-3 py-2 rounded-lg border border-[#DDD8D2] bg-[#FDFAF7] hover:bg-[#EDE9E4] transition-all self-start sm:self-auto">
          <DownloadSimple size={13} />
          Export PDF
        </button>
      </div>

      {/* Budget summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total est. cost", value: `$${totalCost}`, sub: `${allItems.length} items` },
          { label: "Purchased",       value: `$${bought}`,    sub: `${allItems.filter(i => i.bought).length} items` },
          { label: "Still needed",    value: `$${remaining}`, sub: "to spend", accent: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[12px] px-4 py-4"
          >
            <p className={cn("text-[24px] font-black tracking-tight leading-none mb-1", stat.accent ? "text-[#C63D2F]" : "text-[#1A1916]")}>
              {stat.value}
            </p>
            <p className="text-xs font-semibold text-[#1A1916]">{stat.label}</p>
            <p className="text-[10px] text-[#9E9890]">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Category sections */}
      {items.map((cat, catIdx) => (
        <div key={cat.category} className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[14px] overflow-hidden">
          {/* Category header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F5F2EE]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              <h3 className="text-sm font-bold text-[#1A1916]">{cat.category}</h3>
            </div>
            <span className="text-xs text-[#9E9890]">
              ${cat.items.reduce((s, i) => s + i.price * i.qty, 0)}
            </span>
          </div>

          {/* Items */}
          <div className="divide-y divide-[#F5F2EE]">
            {cat.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3 group">
                <button
                  onClick={() => toggleBought(catIdx, item.id)}
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    item.bought ? "bg-[#6B7C52] border-[#6B7C52]" : "border-[#DDD8D2] hover:border-[#C5BEB6]"
                  )}
                >
                  {item.bought && <Check size={10} color="white" weight="bold" />}
                </button>

                <span className={cn("text-sm flex-1 min-w-0 truncate", item.bought ? "line-through text-[#9E9890]" : "text-[#1A1916]")}>
                  {item.name}
                </span>

                <span className="text-xs text-[#9E9890] flex-shrink-0">
                  x{item.qty}
                </span>

                <span className={cn("text-sm font-bold flex-shrink-0 w-12 text-right", item.bought ? "text-[#9E9890]" : "text-[#1A1916]")}>
                  {item.price === 0 ? "Free" : `$${item.price * item.qty}`}
                </span>

                {item.link && (
                  <button className="opacity-0 group-hover:opacity-100 text-[#9E9890] hover:text-[#C63D2F] transition-all flex-shrink-0">
                    <ArrowSquareOut size={13} weight="bold" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#9E9890] hover:text-[#C63D2F] hover:bg-[#FDF8F7] transition-all w-full border-t border-[#F5F2EE]">
            <Plus size={12} weight="bold" />
            Add item
          </button>
        </div>
      ))}
    </div>
  );
}
