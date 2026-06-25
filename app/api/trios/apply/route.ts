import { NextResponse } from "next/server";
import { z } from "zod";
import { createApplyIntake, hasTriosNotionConfig } from "@/lib/trios-notion";

const applySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  organization: z.string().max(160).optional(),
  pathway: z.string().min(2).max(80),
  targetSlug: z.string().max(120).optional(),
  message: z.string().max(2000).optional(),
});

export async function POST(request: Request) {
  const payload = applySchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
  }

  if (!hasTriosNotionConfig()) {
    return NextResponse.json({ error: "TRIOS intake is not configured yet." }, { status: 503 });
  }

  const page = await createApplyIntake(payload.data);
  return NextResponse.json({ ok: true, id: page.id });
}
