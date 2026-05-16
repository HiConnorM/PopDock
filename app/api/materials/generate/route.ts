// POST /api/materials/generate
// Generates copy + design spec for a specific material type
import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai, GENERATION_MODEL, POPDOCK_SYSTEM_PROMPT } from "@/lib/ai";
import { MaterialContentSchema } from "@/lib/schemas";
import { z } from "zod";

const MaterialGenerationSchema = z.object({
  content: MaterialContentSchema,
  designRecommendation: z.object({
    style:   z.string(),
    palette: z.string(),
    layout:  z.string(),
    texture: z.string().optional(),
    notes:   z.string(),
  }),
  variants: z.array(MaterialContentSchema).max(3),
});

export async function POST(req: NextRequest) {
  try {
    const { materialType, brandProfile, projectContext, prompt } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 503 });
    }

    const { object } = await generateObject({
      model: openai(GENERATION_MODEL),
      schema: MaterialGenerationSchema,
      system: POPDOCK_SYSTEM_PROMPT,
      prompt: `
Generate content for a ${materialType} for a popup vendor.

Brand: ${brandProfile?.businessName ?? "unnamed"} 
Style: ${brandProfile?.aesthetics?.join(", ") ?? "clean minimal"}
Vibe: ${brandProfile?.vibeWords?.join(", ") ?? "authentic"}
Products: ${brandProfile?.productDescription ?? "various"}
${prompt ? `\nAdditional direction: ${prompt}` : ""}

Generate the content and 2-3 variants with slightly different approaches.
Make it specific, print-ready, and on-brand.
`.trim(),
    });

    return NextResponse.json({ success: true, materialType, ...object });
  } catch (err) {
    console.error("[materials/generate] error:", err);
    return NextResponse.json({ success: false, error: "Material generation failed" }, { status: 500 });
  }
}
