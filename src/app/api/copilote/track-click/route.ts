import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "code manquant" }, { status: 400 });
  }

  const db = getDb();
  const exists = db.prepare("SELECT 1 FROM copilotes WHERE code = ?").get(code);
  if (!exists) {
    return NextResponse.json({ error: "code inconnu" }, { status: 404 });
  }

  db.prepare("INSERT INTO clicks (copilote_code) VALUES (?)").run(code);
  return NextResponse.json({ ok: true });
}
