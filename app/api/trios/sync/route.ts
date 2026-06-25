import { NextResponse } from "next/server";
import { syncTriosPublicRecordsToDatabase } from "@/lib/trios-notion";

function isAuthorized(request: Request) {
  const secret = process.env.TRIOS_SYNC_SECRET;
  if (!secret) return false;

  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const result = await syncTriosPublicRecordsToDatabase();
  return NextResponse.json({ ok: true, ...result });
}
