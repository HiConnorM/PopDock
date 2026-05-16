// ─────────────────────────────────────────────
// Popdock — Zod Schemas for AI Output Validation
// Every AI response is validated against these schemas before saving.
// ─────────────────────────────────────────────

import { z } from "zod";

// ── Color Palette ─────────────────────────────
export const ColorPaletteSchema = z.object({
  primary:    z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondary:  z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  accent:     z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  background: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  text:       z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  muted:      z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

// ── Brand Profile (AI extraction output) ─────
export const BrandDNASchema = z.object({
  brandPersonality: z.string().max(500),
  toneOfVoice:      z.string().max(500),
  visualStyle:      z.string().max(500),
  brandSummary:     z.string().max(800),
  materialStyle:    z.string().max(500),
  vibeWords:        z.array(z.string()).max(10),
  colorPalette: ColorPaletteSchema,
  typography: z.object({
    heading: z.string(),
    body:    z.string(),
    accent:  z.string(),
    weightStyle: z.string(),
  }),
  positioning:     z.string().max(400),
  targetCustomer:  z.string().max(400),
  pricePerception: z.enum(["budget", "mid-range", "premium", "luxury"]),
});

// ── Popup Strategy ───────────────────────────
export const PopupStrategySchema = z.object({
  concept:           z.string().min(20).max(600),
  audience:          z.string().min(10).max(400),
  boothHook:         z.string().min(10).max(300),
  customerExperience: z.string().min(10).max(400),
  productFocus:      z.string().min(10).max(300),
  salesAngle:        z.string().min(10).max(300),
  brandVoice:        z.array(z.string()).min(3).max(8),
  toneDescription:   z.string().min(10).max(300),
  positioning:       z.string().min(10).max(400),
});

// ── Booth Layout ─────────────────────────────
export const BoothLayoutSchema = z.object({
  layoutType:     z.enum(["l-shape", "linear", "island", "corner", "custom"]),
  rationale:      z.string().max(400),
  focalPoints:    z.array(z.string()).max(5),
  checkoutPlacement: z.string().max(200),
  displayZones: z.array(z.object({
    zone:     z.string(),
    purpose:  z.string(),
    items:    z.array(z.string()),
    priority: z.enum(["hero", "secondary", "impulse"]),
  })).max(6),
  customerFlowNotes: z.string().max(400),
  lightingNotes:     z.string().max(300),
  photoMomentDescription: z.string().max(300).optional(),
  displayTips: z.array(z.object({
    tip:      z.string(),
    category: z.string(),
    why:      z.string(),
  })).max(8),
});

// ── Checklist ────────────────────────────────
export const ChecklistSchema = z.object({
  items: z.array(z.object({
    category: z.enum(["night-before", "morning-of", "setup", "during-event", "post-event"]),
    task:      z.string().min(3).max(200),
    notes:     z.string().max(300).optional(),
    urgent:    z.boolean(),
    dueOffset: z.string().optional(),
  })).min(10).max(80),
});

// ── Shopping List ─────────────────────────────
export const ShoppingListSchema = z.object({
  items: z.array(z.object({
    category:      z.string(),
    name:          z.string(),
    quantity:      z.number().positive(),
    unit:          z.string().optional(),
    estimatedCost: z.number().nonnegative(),
    priority:      z.enum(["essential", "recommended", "optional"]),
    notes:         z.string().max(200).optional(),
    whereToGet:    z.string().optional(),
  })).min(5).max(80),
  totalEstimate: z.number().nonnegative(),
  budgetNote:    z.string().max(300),
});

// ── Timeline ─────────────────────────────────
export const TimelineSchema = z.object({
  phases: z.array(z.object({
    label:    z.string(),
    week:     z.string(),
    tasks: z.array(z.object({
      task:     z.string(),
      category: z.string(),
      notes:    z.string().optional(),
    })).min(2).max(12),
  })).min(4).max(8),
});

// ── Pricing Strategy ─────────────────────────
export const PricingSchema = z.object({
  tiers: z.array(z.object({
    tier:       z.enum(["impulse", "core", "premium", "hero"]),
    label:      z.string(),
    priceMin:   z.number().nonnegative(),
    priceMax:   z.number().positive(),
    examples:   z.array(z.string()).max(5),
    targetPct:  z.number().min(0).max(100),
    displayNote: z.string().max(200),
  })),
  bundleIdeas:             z.array(z.string()).max(5),
  averageTransactionGoal:  z.number().positive(),
  impulseItemPlacement:    z.string().max(300),
  insight:                 z.string().max(400),
});

// ── Material Content ─────────────────────────
export const MaterialContentSchema = z.object({
  headline:     z.string().max(80).optional(),
  subheadline:  z.string().max(120).optional(),
  bodyText:     z.string().max(400).optional(),
  items: z.array(z.object({
    label: z.string(),
    value: z.string(),
    note:  z.string().optional(),
  })).max(20).optional(),
  callToAction:  z.string().max(60).optional(),
  qrTarget:      z.string().url().optional(),
  socialHandle:  z.string().max(60).optional(),
  customFields:  z.record(z.string(), z.string()).optional(),
});

// ── Full Kit (generation output) ─────────────
export const FullKitSchema = z.object({
  strategy:     PopupStrategySchema,
  boothLayout:  BoothLayoutSchema,
  checklist:    ChecklistSchema,
  shoppingList: ShoppingListSchema,
  timeline:     TimelineSchema,
  pricing:      PricingSchema,
  materials: z.array(z.object({
    materialType: z.string(),
    title:        z.string(),
    content:      MaterialContentSchema,
  })),
  brandDNA:     BrandDNASchema.partial(),
});

// ── Type exports (inferred from schemas) ──────
export type BrandDNAOutput      = z.infer<typeof BrandDNASchema>;
export type PopupStrategyOutput = z.infer<typeof PopupStrategySchema>;
export type BoothLayoutOutput   = z.infer<typeof BoothLayoutSchema>;
export type ChecklistOutput     = z.infer<typeof ChecklistSchema>;
export type ShoppingListOutput  = z.infer<typeof ShoppingListSchema>;
export type TimelineOutput      = z.infer<typeof TimelineSchema>;
export type PricingOutput       = z.infer<typeof PricingSchema>;
export type FullKitOutput       = z.infer<typeof FullKitSchema>;
