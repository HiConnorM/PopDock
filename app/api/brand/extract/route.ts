// POST /api/brand/extract
// Extracts brand DNA from URL, description, or uploaded assets
import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai, BRAND_MODEL, POPDOCK_SYSTEM_PROMPT } from "@/lib/ai";
import { BrandDNASchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    const { websiteUrl, instagramHandle, description, vibeWords, colors } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 503 });
    }

    const { object } = await generateObject({
      model: openai(BRAND_MODEL),
      schema: BrandDNASchema,
      system: POPDOCK_SYSTEM_PROMPT,
      prompt: `
Extract brand DNA for a popup vendor. Create a complete brand profile from:

Website URL: ${websiteUrl ?? "not provided"}
Instagram: ${instagramHandle ?? "not provided"}
Description: ${description ?? "not provided"}
Vibe words: ${vibeWords?.join(", ") ?? "not provided"}
Color preferences: ${colors?.join(", ") ?? "not specified"}

Generate a complete, specific brand DNA profile that can power consistent material generation.
Extract or infer: personality, tone, visual style, color palette, typography direction,
positioning, target customer, and price perception.
`.trim(),
    });

    return NextResponse.json({ success: true, brandDNA: object });
  } catch (err) {
    console.error("[brand/extract] error:", err);
    return NextResponse.json({ success: false, error: "Brand extraction failed" }, { status: 500 });
  }
}
