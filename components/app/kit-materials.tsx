"use client";

import { motion } from "framer-motion";
import {
  Download, PenNib, Copy, Sparkle, Plus,
  FilePdf, Check,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const MATERIALS = [
  { id: "booth-sign",    title: "Main Booth Sign",        format: "Print PDF",    dimensions: "24×18 in",    status: "ready" },
  { id: "price-cards",  title: "Price Cards (4-tier)",    format: "Print PDF",    dimensions: "4×6 in",      status: "ready" },
  { id: "qr-sign",      title: "QR Code Sign",            format: "Print PDF",    dimensions: "8×10 in",     status: "ready" },
  { id: "checklist",    title: "Setup Checklist",         format: "Printable PDF",dimensions: "Letter",      status: "ready" },
  { id: "ig-post",      title: "Instagram Launch Post",   format: "JPG / PNG",    dimensions: "1080×1080",   status: "ready" },
  { id: "ig-story",     title: "Instagram Story",         format: "JPG / PNG",    dimensions: "1080×1920",   status: "ready" },
  { id: "thank-you",    title: "Thank-You Card",          format: "Print PDF",    dimensions: "4×4 in",      status: "not-generated" },
  { id: "flyer",        title: "Launch Flyer",            format: "Print PDF",    dimensions: "8.5×11 in",   status: "not-generated" },
];

const PREVIEW_COLORS: Record<string, string> = {
  "booth-sign":   "#FDFAF7",
  "price-cards":  "#F5E9C8",
  "qr-sign":      "#1A2B4A",
  "checklist":    "#FFFFFF",
  "ig-post":      "#F5E0D5",
  "ig-story":     "#D2DCF0",
  "thank-you":    "#FDFAF7",
  "flyer":        "#EDE9E4",
};

function MaterialPreview({ id }: { id: string }) {
  const bg = PREVIEW_COLORS[id] ?? "#EDE9E4";
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: bg }}>
      {id === "booth-sign" && (
        <div className="text-center">
          <p className="text-[9px] font-black tracking-[0.15em] text-[#1A1916] uppercase">Vintage<br/>Finds</p>
          <div className="w-5 h-[1.5px] bg-[#C63D2F] mx-auto mt-0.5" />
        </div>
      )}
      {id === "price-cards" && (
        <div className="space-y-0.5">
          {[["$8","Acc."],["$18","Tops"],["$28","Denim"],["$45","Jackets"]].map(([p,l])=>(
            <div key={l} className="flex gap-2 items-baseline">
              <span className="text-[8px] font-black text-[#1A1916]">{p}</span>
              <span className="text-[7px] text-[#8B6A1A]">{l}</span>
            </div>
          ))}
        </div>
      )}
      {id === "qr-sign" && (
        <div className="text-center">
          <div className="w-8 h-8 bg-white rounded mx-auto mb-1 grid grid-cols-3 p-1 gap-px">
            {Array.from({length:9}).map((_,i)=>(
              <div key={i} className={cn("rounded-[1px]",[0,2,6,8,4].includes(i)?"bg-[#1A2B4A]":"bg-white")} />
            ))}
          </div>
          <p className="text-[6px] font-bold text-white tracking-widest uppercase">Follow + Pay</p>
        </div>
      )}
      {id === "checklist" && (
        <div className="space-y-1">
          {["Ext. cord","Table","Cash box"].map((item,i)=>(
            <div key={item} className="flex items-center gap-1">
              <div className={cn("w-2.5 h-2.5 rounded-[2px] flex items-center justify-center",i<2?"bg-[#C63D2F]":"border border-[#DDD8D2]")}>
                {i<2&&<Check size={6} color="white" weight="bold"/>}
              </div>
              <span className={cn("text-[7px]",i<2?"line-through text-[#9E9890]":"text-[#1A1916]")}>{item}</span>
            </div>
          ))}
        </div>
      )}
      {(id === "ig-post" || id === "ig-story") && (
        <div className="text-center">
          <p className="text-[8px] font-black text-[#1A1916] uppercase tracking-wide leading-tight">
            {id === "ig-post" ? "Launching\nThis Weekend" : "Popup\nAlert"}
          </p>
          <p className="text-[6px] text-[#6B6560] mt-0.5">@ your_brand</p>
        </div>
      )}
      {(id === "thank-you" || id === "flyer") && (
        <p className="text-[8px] text-[#9E9890] text-center font-semibold">{id === "thank-you" ? "Thank you ♥" : "Event Flyer"}</p>
      )}
    </div>
  );
}

export function KitMaterials({ kitId: _kitId }: { kitId: string }) {
  const generated = MATERIALS.filter((m) => m.status === "ready");
  const pending   = MATERIALS.filter((m) => m.status === "not-generated");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9E9890] mb-1">Section</p>
          <h2 className="text-[28px] font-black tracking-[-0.03em] text-[#1A1916]">Materials</h2>
          <p className="text-sm text-[#6B6560] mt-1">Build, edit, and export your popup materials.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#C63D2F] text-white text-xs font-bold border border-[#9B2F24] shadow-[0_2px_0_#9B2F24] hover:bg-[#B5362A] transition-colors">
          <Plus size={13} weight="bold" />
          Add material
        </button>
      </div>

      {/* Progress */}
      <div className="bg-[#FDFAF7] border border-[#EDE9E4] rounded-[12px] px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-[#1A1916]">{generated.length} of {MATERIALS.length} materials generated</span>
          <span className="text-xs font-bold text-[#C63D2F]">{Math.round((generated.length / MATERIALS.length) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-[#EDE9E4] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#C63D2F] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(generated.length / MATERIALS.length) * 100}%` }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>
      </div>

      {/* Generated grid */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#9E9890] mb-3">Generated</h3>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-3"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          animate="show"
        >
          {generated.map((mat) => (
            <motion.div
              key={mat.id}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } }}
              className="flex gap-4 p-4 rounded-[14px] border border-[#DDD8D2] bg-[#FDFAF7] hover:border-[#C5BEB6] hover:shadow-[0_2px_8px_rgba(26,25,22,0.06)] transition-all"
            >
              <div className="w-[80px] h-[60px] rounded-[8px] border border-[#EDE9E4] overflow-hidden flex-shrink-0">
                <MaterialPreview id={mat.id} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-[#1A1916] truncate">{mat.title}</p>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#DDE5D2] text-[#6B7C52] flex-shrink-0">Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-[#9E9890]"><FilePdf size={10} className="inline mr-0.5" />{mat.format}</span>
                  <span className="text-[10px] text-[#C5BEB6]">·</span>
                  <span className="text-[10px] text-[#9E9890]">{mat.dimensions}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <button className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#C63D2F] text-white text-[10px] font-bold border border-[#9B2F24] hover:bg-[#B5362A] transition-colors">
                    <Download size={10} weight="bold" /> Download
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#F5F2EE] text-[#4A4540] text-[10px] font-bold border border-[#DDD8D2] hover:bg-[#EDE9E4] transition-colors">
                    <PenNib size={10} weight="bold" /> Edit
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#F5F2EE] text-[#4A4540] text-[10px] font-bold border border-[#DDD8D2] hover:bg-[#EDE9E4] transition-colors">
                    <Copy size={10} weight="bold" /> Dup.
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pending */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#9E9890] mb-3">Not Yet Generated</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {pending.map((mat) => (
            <div key={mat.id} className="flex gap-4 p-4 rounded-[14px] border border-dashed border-[#DDD8D2] bg-[#F5F2EE]">
              <div className="w-[80px] h-[60px] rounded-[8px] border border-[#DDD8D2] overflow-hidden flex-shrink-0 opacity-40">
                <MaterialPreview id={mat.id} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                <p className="text-sm font-bold text-[#6B6560]">{mat.title}</p>
                <p className="text-[10px] text-[#9E9890]">{mat.format} · {mat.dimensions}</p>
                <button className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#EDE9E4] text-[#4A4540] text-[10px] font-bold border border-[#DDD8D2] hover:bg-[#C63D2F] hover:text-white hover:border-[#9B2F24] transition-all">
                  <Sparkle size={10} weight="fill" /> Generate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regenerate panel */}
      <div className="bg-[#FDF8F7] border border-[#F0D5D2] rounded-[14px] p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkle size={14} color="#C63D2F" weight="fill" />
          <span className="text-xs font-bold text-[#C63D2F] uppercase tracking-widest">Regenerate with new direction</span>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Make the signage feel more premium and editorial..."
            className="flex-1 text-sm px-4 py-2.5 rounded-[8px] border border-[#DDD8D2] bg-white text-[#1A1916] placeholder:text-[#C5BEB6] focus:outline-none focus:border-[#C63D2F] focus:ring-2 focus:ring-[#C63D2F]/10"
          />
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#C63D2F] text-white text-xs font-bold border border-[#9B2F24] hover:bg-[#B5362A] transition-colors whitespace-nowrap">
            <Sparkle size={12} weight="fill" /> Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}
