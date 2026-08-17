import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { slugifyCode } from "@/lib/tracking";
import {
  createSessionToken,
  SESSION_COOKIE_MAX_AGE,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

const schema = z.object({
  nom: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  organisation: z.string().trim().max(180).optional(),
  password: z.string().min(8).max(200),
});

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }

  const { nom, email, organisation, password } = parsed.data;
  const db = getDb();

  const existing = db
    .prepare("SELECT 1 FROM copilotes WHERE email = ?")
    .get(email.toLowerCase());
  if (existing) {
    return NextResponse.json(
      { error: "Un compte existe déjà avec cet email." },
      { status: 409 }
    );
  }

  let code = slugifyCode(nom);
  while (db.prepare("SELECT 1 FROM copilotes WHERE code = ?").get(code)) {
    code = slugifyCode(nom);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  db.prepare(
    `INSERT INTO copilotes (code, nom, email, password_hash, organisation)
     VALUES (?, ?, ?, ?, ?)`
  ).run(code, nom, email.toLowerCase(), passwordHash, organisation ?? null);

  const token = createSessionToken({ copiloteCode: code, email: email.toLowerCase(), nom });
  const response = NextResponse.json({ ok: true, code });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: "/",
  });
  return response;
}
