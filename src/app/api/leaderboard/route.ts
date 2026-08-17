import { NextResponse } from "next/server";
import { getMonthlyLeaderboard } from "@/lib/leaderboard";

export async function GET() {
  return NextResponse.json({ entries: getMonthlyLeaderboard(10) });
}
