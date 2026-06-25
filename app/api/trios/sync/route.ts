import { NextResponse } from "next/server";
import {
  syncTriosListingBuildJobsToDatabase,
  syncTriosPublicRecordsToDatabase,
} from "@/lib/trios-notion";

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

  const verificationRecords = await syncTriosPublicRecordsToDatabase();
  const listingBuildJobs = await syncTriosListingBuildJobsToDatabase();

  return NextResponse.json({ ok: true, verificationRecords, listingBuildJobs });
}
