"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check,
  TShirt, PaintBrush, Coffee, Flower, Camera,
  Knife, Lightning, BookOpen, SmileySticker, CookingPot,
  Basket, Scissors,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────
const POPUP_TYPES = [
  { id: "vintage",   icon: TShirt,       label: "Vintage Clothing",  color: "#D2DCF0", accent: "#3D5A8A" },
  { id: "artist",    icon: PaintBrush,   label: "Artist Alley",      color: "#DDE5D2", accent: "#6B7C52" },
  { id: "coffee",    icon: Coffee,       label: "Coffee Cart",       color: "#F5E9C8", accent: "#8B6A1A" },
  { id: "candle",    icon: Flower,       label: "Candles & Scent",   color: "#F5E0D5", accent: "#C97B5A" },
  { id: "photo",     icon: Camera,       label: "Photography",       color: "#EDE9E4", accent: "#4A4540" },
  { id: "craft",     icon: Knife,        label: "Handmade Crafts",   color: "#F0D5D2", accent: "#9B2F24" },
  { id: "street",    icon: Lightning,    label: "Streetwear",        color: "#D2DCF0", accent: "#3D5A8A" },
  { id: "zine",      icon: BookOpen,     label: "Zines & Books",     color: "#DDE5D2", accent: "#6B7C52" },
  { id: "sticker",   icon: SmileySticker, label: "Stickers & Pins",  color: "#F5E9C8", accent: "#8B6A1A" },
  { id: "food",      icon: CookingPot,   label: "Food Popup",        color: "#F0D5D2", accent: "#9B2F24" },
  { id: "market",    icon: Basket,       label: "Farmers Market",    color: "#DDE5D2", accent: "#6B7C52" },
  { id: "upcycle",   icon: Scissors,     label: "Upcycled Fashion",  color: "#F5E0D5", accent: "#C97B5A" },
];

const EVENT_TYPES = [
  "Flea market", "Craft fair", "Art convention", "Farmers market",
  "Street market", "Pop-up shop", "College market", "Holiday market",
  "Night market", "Music festival", "Private event", "Other",
];

const EXPERIENCE_LEVELS = [
  { id: "first",    label: "First time",      description: "Never done a popup before" },
  { id: "some",     label: "Some experience", description: "Done 1–5 events" },
  { id: "regular",  label: "Regular vendor",  description: "6+ events under my belt" },
  { id: "pro",      label: "Full-time",       description: "This is my main income stream" },
];

const BUDGET_RANGES = [
  { id: "u100",   label: "Under $100",    description: "Bare bones, making it work" },
  { id: "100-300", label: "$100 – $300", description: "Solid starter setup" },
  { id: "300-600", label: "$300 – $600", description: "Proper setup with some extras" },
  { id: "600plus", label: "$600+",        description: "Full professional setup" },
];

const AESTHETICS = [
  { id: "minimal",  label: "Clean & minimal",   color: "#EDE9E4" },
  { id: "vintage",  label: "Vintage & warm",     color: "#F5E9C8" },
  { id: "editorial", label: "Editorial & bold",  color: "#D2DCF0" },
  { id: "earthy",   label: "Earthy & handmade",  color: "#DDE5D2" },
  { id: "bright",   label: "Bold & colorful",    color: "#F0D5D2" },
  { id: "dark",     label: "Dark & moody",       color: "#2D2A26" },
];

const STEPS = [
  { id: "type",       title: "What are you selling?",    subtitle: "Choose your popup type" },
  { id: "event",      title: "Where are you setting up?", subtitle: "Event & location details" },
  { id: "experience", title: "Your experience level",    subtitle: "We'll calibrate your kit to match" },
  { id: "budget",     title: "What's your budget?",      subtitle: "For setup & equipment" },
  { id: "aesthetic",  title: "Your visual vibe",         subtitle: "How should your booth feel?" },
  { id: "details",    title: "Final details",            subtitle: "A few more things to nail your kit" },
];

interface FormData {
  popupType: string;
  eventType: string;
  city: string;
  indoorOutdoor: "indoor" | "outdoor" | "";
  boothSize: string;
  experience: string;
  budget: string;
  aesthetic: string;
  inventoryAmount: string;
  goals: string;
}

const defaultForm: FormData = {
  popupType: "",
  eventType: "",
  city: "",
  indoorOutdoor: "",
  boothSize: "",
  experience: "",
  budget: "",
  aesthetic: "",
  inventoryAmount: "",
  goals: "",
};

// ─── Wizard ─────────────────────────────
export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [generating, setGenerating] = useState(false);
  const router = useRouter();

  const progress = ((step + 1) / STEPS.length) * 100;
  const canAdvance = () => {
    switch (step) {
      case 0: return !!form.popupType;
      case 1: return !!form.eventType && !!form.city;
      case 2: return !!form.experience;
      case 3: return !!form.budget;
      case 4: return !!form.aesthetic;
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setGenerating(true);
      await new Promise((r) => setTimeout(r, 2200));
      router.push("/dashboard");
    }
  };

  if (generating) return <GeneratingScreen formData={form} />;

  return (
    <div className="min-h-[100dvh] bg-[#F5F2EE] flex flex-col">
      {/* Top bar */}
      <div className="h-1 bg-[#EDE9E4] relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#C63D2F]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        />
      </div>

      <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-[#EDE9E4] bg-[#FDFAF7]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#C63D2F] flex items-center justify-center shadow-[0_2px_0_#9B2F24]">
            <span className="text-white font-black text-xs">P</span>
          </div>
          <span className="text-[#1A1916] font-bold text-base tracking-tight">popdock</span>
        </div>
        <span className="text-xs font-semibold text-[#9E9890]">
          Step {step + 1} of {STEPS.length}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[680px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex flex-col gap-8"
            >
              {/* Step header */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#9E9890] mb-2">
                  {STEPS[step].subtitle}
                </p>
                <h1 className="text-[32px] md:text-[42px] font-black tracking-[-0.03em] leading-tight text-[#1A1916]">
                  {STEPS[step].title}
                </h1>
              </div>

              {/* Step content */}
              {step === 0 && (
                <PopupTypeStep
                  value={form.popupType}
                  onChange={(v) => setForm((f) => ({ ...f, popupType: v }))}
                />
              )}
              {step === 1 && (
                <EventStep
                  form={form}
                  onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
                />
              )}
              {step === 2 && (
                <ExperienceStep
                  value={form.experience}
                  onChange={(v) => setForm((f) => ({ ...f, experience: v }))}
                />
              )}
              {step === 3 && (
                <BudgetStep
                  value={form.budget}
                  onChange={(v) => setForm((f) => ({ ...f, budget: v }))}
                />
              )}
              {step === 4 && (
                <AestheticStep
                  value={form.aesthetic}
                  onChange={(v) => setForm((f) => ({ ...f, aesthetic: v }))}
                />
              )}
              {step === 5 && (
                <DetailsStep
                  form={form}
                  onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
                />
              )}

              {/* Nav buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep((s) => Math.max(s - 1, 0))}
                  disabled={step === 0}
                  className="flex items-center gap-2 text-sm font-semibold text-[#6B6560] hover:text-[#1A1916] disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-2 rounded-lg hover:bg-[#EDE9E4]"
                >
                  <ArrowLeft size={16} weight="bold" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canAdvance()}
                  className={cn(
                    "flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-[10px] border transition-all press",
                    canAdvance()
                      ? "bg-[#C63D2F] text-white border-[#9B2F24] shadow-[0_2px_0_#9B2F24] hover:bg-[#B5362A]"
                      : "bg-[#EDE9E4] text-[#C5BEB6] border-[#DDD8D2] cursor-not-allowed"
                  )}
                >
                  {step === STEPS.length - 1 ? "Build my kit" : "Continue"}
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Step Components ─────────────────────

function PopupTypeStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {POPUP_TYPES.map((type) => (
        <button
          key={type.id}
          onClick={() => onChange(type.id)}
          className={cn(
            "flex flex-col items-start gap-3 p-4 rounded-[14px] border text-left transition-all",
            value === type.id
              ? "border-[#C63D2F] bg-[#FDF8F7] shadow-[0_0_0_2px_rgba(198,61,47,0.15)]"
              : "border-[#DDD8D2] bg-[#FDFAF7] hover:border-[#C5BEB6] hover:bg-[#F5F2EE]"
          )}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: type.color }}
          >
            <type.icon size={16} color={type.accent} weight="bold" />
          </div>
          <span className="text-sm font-semibold text-[#1A1916]">{type.label}</span>
          {value === type.id && (
            <div className="absolute top-3 right-3">
              <Check size={14} color="#C63D2F" weight="bold" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

function EventStep({
  form,
  onChange,
}: {
  form: FormData;
  onChange: (patch: Partial<FormData>) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Event type */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1916] mb-3">Event type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {EVENT_TYPES.map((evt) => (
            <button
              key={evt}
              onClick={() => onChange({ eventType: evt })}
              className={cn(
                "text-sm font-medium px-4 py-2.5 rounded-[10px] border text-left transition-all",
                form.eventType === evt
                  ? "border-[#C63D2F] bg-[#FDF8F7] text-[#C63D2F] font-semibold"
                  : "border-[#DDD8D2] bg-[#FDFAF7] text-[#4A4540] hover:border-[#C5BEB6]"
              )}
            >
              {evt}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1916] mb-2">
          City / Location
        </label>
        <input
          type="text"
          value={form.city}
          onChange={(e) => onChange({ city: e.target.value })}
          placeholder="e.g. Chicago, IL"
          className="w-full px-4 py-3 rounded-[10px] border border-[#DDD8D2] bg-[#FDFAF7] text-[#1A1916] placeholder-[#C5BEB6] text-sm font-medium focus:outline-none focus:border-[#C63D2F] focus:ring-2 focus:ring-[#C63D2F]/15 transition-all"
        />
      </div>

      {/* Indoor / Outdoor */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1916] mb-3">
          Indoor or outdoor?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["indoor", "outdoor"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => onChange({ indoorOutdoor: opt })}
              className={cn(
                "py-3 rounded-[10px] border text-sm font-semibold capitalize transition-all",
                form.indoorOutdoor === opt
                  ? "border-[#C63D2F] bg-[#FDF8F7] text-[#C63D2F]"
                  : "border-[#DDD8D2] bg-[#FDFAF7] text-[#4A4540] hover:border-[#C5BEB6]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {EXPERIENCE_LEVELS.map((level) => (
        <button
          key={level.id}
          onClick={() => onChange(level.id)}
          className={cn(
            "flex items-center justify-between px-5 py-4 rounded-[14px] border text-left transition-all",
            value === level.id
              ? "border-[#C63D2F] bg-[#FDF8F7]"
              : "border-[#DDD8D2] bg-[#FDFAF7] hover:border-[#C5BEB6]"
          )}
        >
          <div>
            <p className="text-sm font-bold text-[#1A1916]">{level.label}</p>
            <p className="text-xs text-[#9E9890] mt-0.5">{level.description}</p>
          </div>
          <div
            className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
              value === level.id
                ? "border-[#C63D2F] bg-[#C63D2F]"
                : "border-[#DDD8D2]"
            )}
          >
            {value === level.id && <Check size={10} color="white" weight="bold" />}
          </div>
        </button>
      ))}
    </div>
  );
}

function BudgetStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {BUDGET_RANGES.map((range) => (
        <button
          key={range.id}
          onClick={() => onChange(range.id)}
          className={cn(
            "flex flex-col gap-1 px-5 py-5 rounded-[14px] border text-left transition-all",
            value === range.id
              ? "border-[#C63D2F] bg-[#FDF8F7]"
              : "border-[#DDD8D2] bg-[#FDFAF7] hover:border-[#C5BEB6]"
          )}
        >
          <p className="text-lg font-black text-[#1A1916] tracking-tight">{range.label}</p>
          <p className="text-xs text-[#9E9890]">{range.description}</p>
        </button>
      ))}
    </div>
  );
}

function AestheticStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {AESTHETICS.map((aes) => (
        <button
          key={aes.id}
          onClick={() => onChange(aes.id)}
          className={cn(
            "relative h-24 rounded-[14px] border flex items-end p-4 transition-all overflow-hidden",
            value === aes.id
              ? "border-[#C63D2F] shadow-[0_0_0_2px_rgba(198,61,47,0.15)]"
              : "border-[#DDD8D2] hover:border-[#C5BEB6]"
          )}
          style={{ backgroundColor: aes.color }}
        >
          <span
            className="text-xs font-bold"
            style={{
              color: aes.id === "dark" ? "#FDFAF7" : "#1A1916",
            }}
          >
            {aes.label}
          </span>
          {value === aes.id && (
            <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#C63D2F] flex items-center justify-center">
              <Check size={10} color="white" weight="bold" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

function DetailsStep({
  form,
  onChange,
}: {
  form: FormData;
  onChange: (patch: Partial<FormData>) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="block text-sm font-semibold text-[#1A1916] mb-2">
          Booth size (approximate)
        </label>
        <input
          type="text"
          value={form.boothSize}
          onChange={(e) => onChange({ boothSize: e.target.value })}
          placeholder="e.g. 6ft table, 10x10 tent, half a table"
          className="w-full px-4 py-3 rounded-[10px] border border-[#DDD8D2] bg-[#FDFAF7] text-[#1A1916] placeholder-[#C5BEB6] text-sm font-medium focus:outline-none focus:border-[#C63D2F] focus:ring-2 focus:ring-[#C63D2F]/15 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A1916] mb-2">
          How much inventory are you bringing?
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["Under 30 items", "30 – 100 items", "100+ items"].map((opt) => (
            <button
              key={opt}
              onClick={() => onChange({ inventoryAmount: opt })}
              className={cn(
                "text-xs font-semibold px-3 py-2.5 rounded-[10px] border transition-all",
                form.inventoryAmount === opt
                  ? "border-[#C63D2F] bg-[#FDF8F7] text-[#C63D2F]"
                  : "border-[#DDD8D2] bg-[#FDFAF7] text-[#6B6560] hover:border-[#C5BEB6]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A1916] mb-2">
          What&apos;s your main goal for this popup? <span className="text-[#9E9890] font-normal">(optional)</span>
        </label>
        <textarea
          value={form.goals}
          onChange={(e) => onChange({ goals: e.target.value })}
          placeholder="e.g. Test a new product line, meet other vendors, make $500 in sales, have fun..."
          rows={3}
          className="w-full px-4 py-3 rounded-[10px] border border-[#DDD8D2] bg-[#FDFAF7] text-[#1A1916] placeholder-[#C5BEB6] text-sm font-medium focus:outline-none focus:border-[#C63D2F] focus:ring-2 focus:ring-[#C63D2F]/15 transition-all resize-none"
        />
      </div>
    </div>
  );
}

// ─── Generating Screen ───────────────────
function GeneratingScreen({ formData }: { formData: FormData }) {
  const BUILDING_STEPS = [
    "Analyzing your popup type",
    "Building your setup checklist",
    "Generating shopping list",
    "Designing booth layout",
    "Creating launch timeline",
    "Writing signage copy",
    "Finalizing your kit",
  ];

  return (
    <div className="min-h-[100dvh] bg-[#F5F2EE] flex flex-col items-center justify-center px-6">
      <div className="max-w-[420px] w-full text-center flex flex-col gap-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-xl bg-[#C63D2F] flex items-center justify-center shadow-[0_4px_0_#9B2F24]">
            <span className="text-white font-black text-xl">P</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-[#1A1916] tracking-tight mb-2">
            Building your popup kit
          </h2>
          <p className="text-sm text-[#9E9890]">
            This takes about 30 seconds. Sit tight.
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex flex-col gap-2 text-left bg-[#FDFAF7] border border-[#EDE9E4] rounded-[14px] p-5">
          {BUILDING_STEPS.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.28, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.28 + 0.15, type: "spring", stiffness: 200 }}
                className="w-5 h-5 rounded-full bg-[#C63D2F] flex items-center justify-center flex-shrink-0"
              >
                <Check size={10} color="white" weight="bold" />
              </motion.div>
              <span className="text-sm text-[#4A4540]">{s}</span>
            </motion.div>
          ))}
        </div>

        {/* Bar */}
        <div className="h-1.5 bg-[#EDE9E4] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#C63D2F] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.0, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
