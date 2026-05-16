"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  TShirt,
  PaintBrush,
  Coffee,
  Flower,
  CookingPot,
  Basket,
  Diamond,
  Lightning,
  BookOpen,
  Scissors,
  PenNib,
  Sparkle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ─── Constants ───────────────────────────────────────────────────────────────

const POPUP_TYPES = [
  { id: "vintage",  icon: TShirt,      label: "Vintage Clothing", color: "#D2DCF0", accent: "#3D5A8A" },
  { id: "artist",   icon: PaintBrush,  label: "Artist Alley",     color: "#DDE5D2", accent: "#6B7C52" },
  { id: "coffee",   icon: Coffee,      label: "Coffee Cart",      color: "#F5E9C8", accent: "#8B6A1A" },
  { id: "candle",   icon: Flower,      label: "Candles & Scent",  color: "#F5E0D5", accent: "#C97B5A" },
  { id: "food",     icon: CookingPot,  label: "Food Popup",       color: "#F0D5D2", accent: "#9B2F24" },
  { id: "market",   icon: Basket,      label: "Farmers Market",   color: "#DDE5D2", accent: "#6B7C52" },
  { id: "jewelry",  icon: Diamond,     label: "Jewelry",          color: "#D2DCF0", accent: "#3D5A8A" },
  { id: "street",   icon: Lightning,   label: "Streetwear",       color: "#EDE9E4", accent: "#4A4540" },
  { id: "zines",    icon: BookOpen,    label: "Zines & Books",    color: "#F5E9C8", accent: "#8B6A1A" },
  { id: "craft",    icon: Scissors,    label: "Craft Fair",       color: "#F5E0D5", accent: "#C97B5A" },
  { id: "tattoo",   icon: PenNib,      label: "Tattoo Flash",     color: "#F0D5D2", accent: "#9B2F24" },
  { id: "beauty",   icon: Sparkle,     label: "Beauty Popup",     color: "#DDE5D2", accent: "#6B7C52" },
];

const BRAND_VIBES = [
  "Warm & handmade",
  "Clean & minimal",
  "Bold & loud",
  "Earthy & organic",
  "Premium & editorial",
  "Playful & fun",
  "Dark & moody",
  "Nostalgic & vintage",
];

const EVENT_TYPES = [
  "Flea market",
  "Craft fair",
  "Art convention",
  "Farmers market",
  "Street market",
  "Pop-up shop",
  "College market",
  "Holiday market",
  "Night market",
  "Music festival",
];

const INDOOR_OUTDOOR_OPTIONS = [
  { id: "indoor",  label: "Indoor" },
  { id: "outdoor", label: "Outdoor" },
  { id: "both",    label: "Both" },
];

const BOOTH_SIZES = [
  { id: "6ft",       label: "6ft table" },
  { id: "8ft",       label: "8ft table" },
  { id: "10x10",     label: "10×10 tent" },
  { id: "10x20",     label: "10×20 space" },
  { id: "flexible",  label: "Flexible / unknown" },
];

const AMENITIES = [
  "Power access",
  "Table included",
  "Tent included",
  "WiFi available",
  "Loading dock access",
];

const BUDGET_OPTIONS = [
  { id: "u100",    label: "Under $100",    description: "Bare bones, making it work" },
  { id: "100-300", label: "$100 – $300",   description: "Solid starter setup" },
  { id: "300-600", label: "$300 – $600",   description: "Proper setup with extras" },
  { id: "600plus", label: "$600+",         description: "Full professional setup" },
];

const EXPERIENCE_LEVELS = [
  { id: "first",    label: "First time",       description: "Never done a popup before" },
  { id: "some",     label: "Some experience",  description: "Done 1–5 events" },
  { id: "regular",  label: "Regular vendor",   description: "6+ events" },
  { id: "fulltime", label: "Full-time",        description: "This is my main income" },
];

const AESTHETICS = [
  { id: "minimal",   label: "Clean & Minimal",     bg: "#EDE9E4",  dots: ["#C5BEB6", "#9E9890", "#6B6560"] },
  { id: "vintage",   label: "Vintage Market",       bg: "#F5E9C8",  dots: ["#8B6A1A", "#C4A34B", "#E8C97A"] },
  { id: "editorial", label: "Bold & Editorial",     bg: "#D2DCF0",  dots: ["#3D5A8A", "#6B85B8", "#A8BBD8"] },
  { id: "earthy",    label: "Earthy & Handmade",    bg: "#DDE5D2",  dots: ["#6B7C52", "#8FA070", "#B5C4A0"] },
  { id: "premium",   label: "Premium Boutique",     bg: "#E8E0D8",  dots: ["#8B7355", "#B8A080", "#D4C0A8"] },
  { id: "street",    label: "Streetwear",           bg: "#2D2A26",  dots: ["#F5F2EE", "#C63D2F", "#4A4540"] },
  { id: "cozy",      label: "Cozy & Warm",          bg: "#F5E0D5",  dots: ["#C97B5A", "#E0A882", "#F2C9B0"] },
  { id: "playful",   label: "Bright & Playful",     bg: "#F0D5D2",  dots: ["#9B2F24", "#C63D2F", "#E87B70"] },
];

const KIT_SECTIONS_ALL = [
  "Booth layout & display plan",
  "Setup & packing checklist",
  "Shopping list with budget breakdown",
  "Launch timeline",
  "Pricing strategy & guide",
  "Signage & print materials",
  "Instagram launch posts",
  "Instagram Stories",
  "QR code sign template",
  "Inventory planning",
  "Customer flow strategy",
  "Booth concept & positioning",
  "Thank-you card template",
  "First-popup survival guide",
  "PDF export pack",
  "Notion export",
];

const GENERATING_STEPS = [
  "Analyzing your popup type...",
  "Building booth concept...",
  "Generating signage...",
  "Building shopping list...",
  "Creating checklist...",
  "Preparing timeline...",
  "Finalizing your kit...",
];

const STEP_META = [
  {
    title: "What type of popup are you launching?",
    subtitle: "Select all that apply — you can run multiple types.",
  },
  {
    title: "What's your popup called?",
    subtitle: "Give us your brand details — the more you share, the better your kit.",
  },
  {
    title: "Where are you setting up?",
    subtitle: "Tell us about the event.",
  },
  {
    title: "What's your budget for setup?",
    subtitle: "We'll tailor your shopping list and recommendations.",
  },
  {
    title: "How should your booth feel?",
    subtitle: "Select all aesthetics that match your brand.",
  },
  {
    title: "What should we build for you?",
    subtitle: "Select everything you want in your popup kit.",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  popupTypes: string[];
  brandName: string;
  productDescription: string;
  targetCustomer: string;
  brandVibes: string[];
  instagram: string;
  website: string;
  city: string;
  eventTypes: string[];
  indoorOutdoor: string;
  boothSize: string;
  eventDate: string;
  amenities: string[];
  budget: string;
  inventoryCount: string;
  experience: string;
  aesthetics: string[];
  kitSections: string[];
}

const defaultForm: FormData = {
  popupTypes: [],
  brandName: "",
  productDescription: "",
  targetCustomer: "",
  brandVibes: [],
  instagram: "",
  website: "",
  city: "",
  eventTypes: [],
  indoorOutdoor: "",
  boothSize: "",
  eventDate: "",
  amenities: [],
  budget: "",
  inventoryCount: "",
  experience: "",
  aesthetics: [],
  kitSections: [...KIT_SECTIONS_ALL],
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Shared sub-components ────────────────────────────────────────────────────

function StyledInput({
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-[10px] border border-[#DDD8D2] bg-[#FDFAF7] text-[#1A1916] placeholder-[#C5BEB6] text-sm font-medium focus:outline-none focus:border-[#C63D2F] focus:ring-2 focus:ring-[rgba(198,61,47,0.15)] transition-all"
    />
  );
}

function StyledTextarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 rounded-[10px] border border-[#DDD8D2] bg-[#FDFAF7] text-[#1A1916] placeholder-[#C5BEB6] text-sm font-medium focus:outline-none focus:border-[#C63D2F] focus:ring-2 focus:ring-[rgba(198,61,47,0.15)] transition-all resize-none"
    />
  );
}

function Label({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-[#1A1916] mb-2">
      {children}
      {optional && <span className="text-[#9E9890] font-normal ml-1">(optional)</span>}
    </label>
  );
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm font-medium px-4 py-2 rounded-full border transition-all",
        selected
          ? "border-[#C63D2F] bg-[#FDF8F7] text-[#C63D2F] font-semibold"
          : "border-[#DDD8D2] bg-[#FDFAF7] text-[#4A4540] hover:border-[#C5BEB6] hover:bg-[#F5F2EE]"
      )}
    >
      {label}
    </button>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

function Step1PopupType({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {POPUP_TYPES.map((type) => {
        const selected = value.includes(type.id);
        return (
          <button
            key={type.id}
            onClick={() => toggle(type.id)}
            className={cn(
              "relative flex flex-col items-start gap-3 p-4 rounded-[14px] border text-left transition-all",
              selected
                ? "border-[#C63D2F] bg-[#FDF8F7] shadow-[0_0_0_2px_rgba(198,61,47,0.12)]"
                : "border-[#DDD8D2] bg-[#FDFAF7] hover:border-[#C5BEB6] hover:bg-[#F5F2EE]"
            )}
          >
            {selected && (
              <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#C63D2F] flex items-center justify-center">
                <Check size={10} color="white" weight="bold" />
              </div>
            )}
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: type.color }}
            >
              <type.icon size={18} color={type.accent} weight="bold" />
            </div>
            <span className="text-sm font-semibold text-[#1A1916] leading-snug">{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function Step2Brand({
  form,
  onChange,
}: {
  form: FormData;
  onChange: (patch: Partial<FormData>) => void;
}) {
  const toggleVibe = (vibe: string) => {
    const current = form.brandVibes;
    onChange({
      brandVibes: current.includes(vibe)
        ? current.filter((v) => v !== vibe)
        : [...current, vibe],
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Business name</Label>
        <StyledInput
          value={form.brandName}
          onChange={(v) => onChange({ brandName: v })}
          placeholder="e.g. Sun Fade Studio"
          required
        />
      </div>

      <div>
        <Label>What you sell</Label>
        <StyledTextarea
          value={form.productDescription}
          onChange={(v) => onChange({ productDescription: v })}
          placeholder="Hand-dyed vintage denim, accessories, and upcycled outerwear..."
          rows={3}
        />
      </div>

      <div>
        <Label>Target customer</Label>
        <StyledInput
          value={form.targetCustomer}
          onChange={(v) => onChange({ targetCustomer: v })}
          placeholder="Vintage lovers aged 18–35 who shop at indie markets"
        />
      </div>

      <div>
        <Label>Brand vibe</Label>
        <p className="text-xs text-[#9E9890] mb-3 -mt-1">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {BRAND_VIBES.map((vibe) => (
            <Chip
              key={vibe}
              label={vibe}
              selected={form.brandVibes.includes(vibe)}
              onClick={() => toggleVibe(vibe)}
            />
          ))}
        </div>
      </div>

      <div>
        <Label optional>Instagram handle</Label>
        <StyledInput
          value={form.instagram}
          onChange={(v) => onChange({ instagram: v })}
          placeholder="@yourbrand"
        />
      </div>

      <div>
        <Label optional>Website URL</Label>
        <StyledInput
          value={form.website}
          onChange={(v) => onChange({ website: v })}
          placeholder="https://yourbrand.com"
          type="url"
        />
      </div>
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

function Step3Event({
  form,
  onChange,
}: {
  form: FormData;
  onChange: (patch: Partial<FormData>) => void;
}) {
  const toggleEventType = (type: string) => {
    const current = form.eventTypes;
    onChange({
      eventTypes: current.includes(type)
        ? current.filter((v) => v !== type)
        : [...current, type],
    });
  };

  const toggleAmenity = (amenity: string) => {
    const current = form.amenities;
    onChange({
      amenities: current.includes(amenity)
        ? current.filter((v) => v !== amenity)
        : [...current, amenity],
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Label>City</Label>
        <StyledInput
          value={form.city}
          onChange={(v) => onChange({ city: v })}
          placeholder="e.g. Chicago, IL"
        />
      </div>

      <div>
        <Label>Event type</Label>
        <p className="text-xs text-[#9E9890] mb-3 -mt-1">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((type) => (
            <Chip
              key={type}
              label={type}
              selected={form.eventTypes.includes(type)}
              onClick={() => toggleEventType(type)}
            />
          ))}
        </div>
      </div>

      <div>
        <Label>Indoor or outdoor?</Label>
        <div className="grid grid-cols-3 gap-3">
          {INDOOR_OUTDOOR_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onChange({ indoorOutdoor: opt.id })}
              className={cn(
                "py-3 rounded-[10px] border text-sm font-semibold transition-all",
                form.indoorOutdoor === opt.id
                  ? "border-[#C63D2F] bg-[#FDF8F7] text-[#C63D2F]"
                  : "border-[#DDD8D2] bg-[#FDFAF7] text-[#4A4540] hover:border-[#C5BEB6] hover:bg-[#F5F2EE]"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Booth size</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BOOTH_SIZES.map((size) => (
            <button
              key={size.id}
              onClick={() => onChange({ boothSize: size.id })}
              className={cn(
                "py-2.5 px-4 rounded-[10px] border text-sm font-medium text-left transition-all",
                form.boothSize === size.id
                  ? "border-[#C63D2F] bg-[#FDF8F7] text-[#C63D2F] font-semibold"
                  : "border-[#DDD8D2] bg-[#FDFAF7] text-[#4A4540] hover:border-[#C5BEB6] hover:bg-[#F5F2EE]"
              )}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label optional>Event date</Label>
        <StyledInput
          value={form.eventDate}
          onChange={(v) => onChange({ eventDate: v })}
          type="date"
        />
      </div>

      <div>
        <Label>Do you have access to:</Label>
        <div className="flex flex-col gap-2 mt-1">
          {AMENITIES.map((amenity) => {
            const checked = form.amenities.includes(amenity);
            return (
              <button
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-[10px] border text-left transition-all",
                  checked
                    ? "border-[#C63D2F] bg-[#FDF8F7]"
                    : "border-[#DDD8D2] bg-[#FDFAF7] hover:border-[#C5BEB6] hover:bg-[#F5F2EE]"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    checked ? "border-[#C63D2F] bg-[#C63D2F]" : "border-[#DDD8D2] bg-white"
                  )}
                >
                  {checked && <Check size={10} color="white" weight="bold" />}
                </div>
                <span className="text-sm font-medium text-[#1A1916]">{amenity}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Step 4 ───────────────────────────────────────────────────────────────────

function Step4Budget({
  form,
  onChange,
}: {
  form: FormData;
  onChange: (patch: Partial<FormData>) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Label>Setup budget</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BUDGET_OPTIONS.map((opt) => {
            const selected = form.budget === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onChange({ budget: opt.id })}
                className={cn(
                  "relative flex flex-col gap-1 px-5 py-5 rounded-[14px] border text-left transition-all",
                  selected
                    ? "border-[#C63D2F] bg-[#FDF8F7] shadow-[0_0_0_2px_rgba(198,61,47,0.12)]"
                    : "border-[#DDD8D2] bg-[#FDFAF7] hover:border-[#C5BEB6] hover:bg-[#F5F2EE]"
                )}
              >
                {selected && (
                  <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-[#C63D2F] flex items-center justify-center">
                    <Check size={10} color="white" weight="bold" />
                  </div>
                )}
                <p className="text-xl font-black text-[#1A1916] tracking-tight">{opt.label}</p>
                <p className="text-xs text-[#9E9890]">{opt.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label optional>How many items are you bringing?</Label>
        <StyledInput
          value={form.inventoryCount}
          onChange={(v) => onChange({ inventoryCount: v })}
          placeholder="e.g. 80"
          type="number"
        />
      </div>

      <div>
        <Label>Experience level</Label>
        <div className="flex flex-col gap-2">
          {EXPERIENCE_LEVELS.map((level) => {
            const selected = form.experience === level.id;
            return (
              <button
                key={level.id}
                onClick={() => onChange({ experience: level.id })}
                className={cn(
                  "flex items-center justify-between px-5 py-4 rounded-[14px] border text-left transition-all",
                  selected
                    ? "border-[#C63D2F] bg-[#FDF8F7]"
                    : "border-[#DDD8D2] bg-[#FDFAF7] hover:border-[#C5BEB6] hover:bg-[#F5F2EE]"
                )}
              >
                <div>
                  <p className="text-sm font-bold text-[#1A1916]">{level.label}</p>
                  <p className="text-xs text-[#9E9890] mt-0.5">{level.description}</p>
                </div>
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    selected ? "border-[#C63D2F] bg-[#C63D2F]" : "border-[#DDD8D2]"
                  )}
                >
                  {selected && <Check size={10} color="white" weight="bold" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Step 5 ───────────────────────────────────────────────────────────────────

function Step5Aesthetics({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {AESTHETICS.map((aes) => {
        const selected = value.includes(aes.id);
        const isDark = aes.id === "street";
        return (
          <button
            key={aes.id}
            onClick={() => toggle(aes.id)}
            className={cn(
              "relative flex flex-col rounded-[14px] border overflow-hidden text-left transition-all",
              selected
                ? "border-[#C63D2F] shadow-[0_0_0_2px_rgba(198,61,47,0.18)]"
                : "border-[#DDD8D2] hover:border-[#C5BEB6]"
            )}
            style={{ minWidth: 0 }}
          >
            {/* Color swatch area */}
            <div
              className="h-[96px] w-full flex items-center justify-center gap-2 flex-shrink-0"
              style={{ backgroundColor: aes.bg }}
            >
              {aes.dots.map((dot, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: dot }}
                />
              ))}
            </div>
            {/* Label */}
            <div className="px-3 py-2.5 bg-[#FDFAF7] flex items-center justify-between gap-1">
              <span className="text-xs font-semibold text-[#1A1916] leading-snug">{aes.label}</span>
              {selected && (
                <div className="w-4 h-4 rounded-full bg-[#C63D2F] flex items-center justify-center flex-shrink-0">
                  <Check size={8} color="white" weight="bold" />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Step 6 ───────────────────────────────────────────────────────────────────

function Step6KitSections({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (section: string) => {
    onChange(
      value.includes(section) ? value.filter((v) => v !== section) : [...value, section]
    );
  };

  const half = Math.ceil(KIT_SECTIONS_ALL.length / 2);
  const col1 = KIT_SECTIONS_ALL.slice(0, half);
  const col2 = KIT_SECTIONS_ALL.slice(half);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
      {[col1, col2].map((col, ci) => (
        <div key={ci} className="flex flex-col gap-1">
          {col.map((section) => {
            const checked = value.includes(section);
            return (
              <button
                key={section}
                onClick={() => toggle(section)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-left transition-all hover:bg-[#F5F2EE] group"
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    checked ? "border-[#C63D2F] bg-[#C63D2F]" : "border-[#DDD8D2] bg-white group-hover:border-[#C5BEB6]"
                  )}
                >
                  {checked && <Check size={10} color="white" weight="bold" />}
                </div>
                <span className={cn(
                  "text-sm transition-colors",
                  checked ? "text-[#1A1916] font-medium" : "text-[#6B6560]"
                )}>
                  {section}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Generating Screen ────────────────────────────────────────────────────────

function GeneratingScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/app/projects/demo");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-[100dvh] bg-[#F5F2EE] flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-[#EDE9E4] relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#C63D2F]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.8, ease: "linear" }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-[420px] w-full text-center flex flex-col items-center gap-10">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-14 h-14 rounded-2xl bg-[#C63D2F] flex items-center justify-center shadow-[0_4px_0_#9B2F24]"
          >
            <span className="text-white font-black text-2xl tracking-tight">P</span>
          </motion.div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="text-3xl font-black text-[#1A1916] tracking-[-0.03em] mb-3"
            >
              Building your popup kit...
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-[#9E9890]"
            >
              This only takes a moment.
            </motion.p>
          </div>

          {/* Steps */}
          <div className="w-full bg-[#FDFAF7] border border-[#EDE9E4] rounded-[16px] p-5 flex flex-col gap-3 text-left">
            {GENERATING_STEPS.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3 + i * 0.3,
                  duration: 0.4,
                  ease: EASE,
                }}
                className="flex items-center gap-3"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.45 + i * 0.3,
                    type: "spring",
                    stiffness: 240,
                    damping: 16,
                  }}
                  className="w-5 h-5 rounded-full bg-[#C63D2F] flex items-center justify-center flex-shrink-0"
                >
                  <Check size={10} color="white" weight="bold" />
                </motion.div>
                <span className="text-sm text-[#4A4540]">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [form, setForm] = useState<FormData>(defaultForm);
  const [generating, setGenerating] = useState(false);
  const router = useRouter();

  const TOTAL_STEPS = STEP_META.length;
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const canAdvance = (): boolean => {
    switch (step) {
      case 0: return form.popupTypes.length > 0;
      case 1: return form.brandName.trim().length > 0;
      case 2: return true; // all optional
      case 3: return true; // all optional
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  const goNext = async () => {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      setGenerating(true);
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const patch = (p: Partial<FormData>) => setForm((f) => ({ ...f, ...p }));

  if (generating) return <GeneratingScreen />;

  return (
    <div className="min-h-[100dvh] bg-[#F5F2EE] flex flex-col">
      {/* Progress bar */}
      <div className="h-[3px] bg-[#EDE9E4] relative overflow-hidden flex-shrink-0">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#C63D2F]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: EASE }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-[#EDE9E4] bg-[#FDFAF7] flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#C63D2F] flex items-center justify-center shadow-[0_2px_0_#9B2F24]">
            <span className="text-white font-black text-xs tracking-tight">P</span>
          </div>
          <span className="text-[#1A1916] font-bold text-base tracking-tight">popdock</span>
        </div>
        <span className="text-xs font-semibold text-[#9E9890]">
          Step {step + 1} of {TOTAL_STEPS}
        </span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center px-4 py-10 md:py-16 min-h-full">
          <div className="w-full max-w-[680px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col gap-8"
              >
                {/* Step header */}
                <div>
                  <h1 className="text-[28px] md:text-[38px] font-black tracking-[-0.03em] leading-tight text-[#1A1916] mb-2">
                    {STEP_META[step].title}
                  </h1>
                  <p className="text-sm text-[#9E9890] font-medium">
                    {STEP_META[step].subtitle}
                  </p>
                </div>

                {/* Step content */}
                {step === 0 && (
                  <Step1PopupType
                    value={form.popupTypes}
                    onChange={(v) => patch({ popupTypes: v })}
                  />
                )}
                {step === 1 && (
                  <Step2Brand form={form} onChange={patch} />
                )}
                {step === 2 && (
                  <Step3Event form={form} onChange={patch} />
                )}
                {step === 3 && (
                  <Step4Budget form={form} onChange={patch} />
                )}
                {step === 4 && (
                  <Step5Aesthetics
                    value={form.aesthetics}
                    onChange={(v) => patch({ aesthetics: v })}
                  />
                )}
                {step === 5 && (
                  <Step6KitSections
                    value={form.kitSections}
                    onChange={(v) => patch({ kitSections: v })}
                  />
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-2 pb-4">
                  {step > 0 ? (
                    <button
                      onClick={goBack}
                      className="flex items-center gap-2 text-sm font-semibold text-[#6B6560] hover:text-[#1A1916] transition-colors px-4 py-2 rounded-[10px] hover:bg-[#EDE9E4]"
                    >
                      <ArrowLeft size={16} weight="bold" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    onClick={goNext}
                    disabled={!canAdvance()}
                    className={cn(
                      "flex items-center gap-2 font-bold px-6 py-3 rounded-[10px] border transition-all",
                      step === TOTAL_STEPS - 1 ? "text-base px-8 py-3.5" : "text-sm",
                      canAdvance()
                        ? "bg-[#C63D2F] text-white border-[#9B2F24] shadow-[0_2px_0_#9B2F24] hover:bg-[#B5362A] active:shadow-none active:translate-y-[2px]"
                        : "bg-[#EDE9E4] text-[#C5BEB6] border-[#DDD8D2] cursor-not-allowed"
                    )}
                  >
                    {step === TOTAL_STEPS - 1 ? "Generate my kit" : "Continue"}
                    <ArrowRight size={16} weight="bold" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
