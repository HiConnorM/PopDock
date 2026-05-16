// POST /api/generate
// Generates a full popup kit or specific section using AI structured output
import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai, GENERATION_MODEL, POPDOCK_SYSTEM_PROMPT } from "@/lib/ai";
import {
  FullKitSchema, PopupStrategySchema,
  ChecklistSchema, ShoppingListSchema
} from "@/lib/schemas";
import type { GenerationRequest } from "@/lib/types";
import { z } from "zod";

// Each schema typed as ZodType for flexible map
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SECTION_SCHEMAS: Record<string, z.ZodType<any>> = {
  "full-kit":  FullKitSchema,
  "strategy":  PopupStrategySchema,
  "checklist": ChecklistSchema,
  "shopping":  ShoppingListSchema,
};

export async function POST(req: NextRequest) {
  try {
    const body: GenerationRequest = await req.json();
    const { sectionType = "full-kit", brandProfile, context, prompt } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 503 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schema: z.ZodType<any> = SECTION_SCHEMAS[sectionType] ?? PopupStrategySchema;
    const systemPrompt = POPDOCK_SYSTEM_PROMPT + (prompt ? `\n\nAdditional direction: ${prompt}` : "");
    const userPrompt   = buildUserPrompt(sectionType, brandProfile, context);

    const { object } = await generateObject({ model: openai(GENERATION_MODEL), schema, system: systemPrompt, prompt: userPrompt });

    return NextResponse.json({ success: true, sectionType, data: object });
  } catch (err) {
    console.error("[generate] error:", err);
    return NextResponse.json({ success: false, error: "Generation failed" }, { status: 500 });
  }
}

function buildUserPrompt(
  sectionType: string,
  brand: Partial<GenerationRequest["brandProfile"]>,
  context: Partial<GenerationRequest["context"]>
): string {
  return `
Generate a ${sectionType} for a popup vendor with these details:

POPUP TYPE: ${context.popupTypes?.join(", ") ?? "general"}
BUSINESS: ${brand.businessName ?? "unnamed"}
PRODUCTS: ${brand.productDescription ?? "various"}
TARGET CUSTOMER: ${brand.targetCustomer ?? "general public"}
BRAND VIBE: ${brand.vibeWords?.join(", ") ?? "authentic, handmade"}
AESTHETICS: ${context.aesthetics?.join(", ") ?? "clean, minimal"}

EVENT DETAILS:
- City: ${context.city ?? "local area"}
- Event types: ${context.eventTypes?.join(", ") ?? "market"}
- Booth size: ${context.boothSize ?? "6ft table"}
- Indoor/outdoor: ${context.indoorOutdoor ?? "outdoor"}
- Budget: ${context.budget ?? "100-300"}
- Experience: ${context.experience ?? "first-time"}
- Inventory count: ~${context.inventoryCount ?? 50} items
- Amenities: ${context.amenities?.join(", ") ?? "none confirmed"}

Generate specific, practical, brand-appropriate content. Be detailed and actionable.
`.trim();
}
