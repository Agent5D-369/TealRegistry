import { NextResponse } from "next/server";
import { z } from "zod";
import { createMisuseReport, hasTriosNotionConfig } from "@/lib/trios-notion";

const reportSchema = z.object({
  badgeId: z.string().min(2).max(220),
  claimUrl: z.string().url().max(500),
  description: z.string().min(12).max(2000),
  evidence: z.string().max(2000).optional(),
  contact: z.string().email().max(200).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const payload = reportSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Please check the report fields." }, { status: 400 });
  }

  if (!hasTriosNotionConfig()) {
    return NextResponse.json({ error: "TRIOS reporting is not configured yet." }, { status: 503 });
  }

  const page = await createMisuseReport(payload.data);
  return NextResponse.json({ ok: true, id: page.id });
}
