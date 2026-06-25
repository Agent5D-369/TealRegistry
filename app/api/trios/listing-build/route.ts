import { NextResponse } from "next/server";
import { z } from "zod";
import { createListingBuildJob, hasTriosNotionConfig } from "@/lib/trios-notion";

const listingBuildSchema = z.object({
  targetName: z.string().min(2).max(160),
  targetWebsite: z.string().url().max(500).optional().or(z.literal("")),
  targetCategory: z.string().min(2).max(120),
  sourceUrls: z.array(z.string().url().max(500)).max(12),
  extractedFacts: z.string().min(20).max(4000),
  generatedDraft: z.string().min(20).max(8000),
  mediaLicenseStatus: z.string().min(2).max(120),
  notes: z.string().max(2000).optional(),
});

export async function POST(request: Request) {
  const payload = listingBuildSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Please check the listing builder fields." }, { status: 400 });
  }

  if (!hasTriosNotionConfig()) {
    return NextResponse.json({ error: "TRIOS listing builder is not configured yet." }, { status: 503 });
  }

  const page = await createListingBuildJob(payload.data);
  return NextResponse.json({ ok: true, id: page.id });
}
