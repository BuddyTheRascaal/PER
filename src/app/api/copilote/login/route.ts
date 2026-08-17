import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDb } from "@/lib/db";
import {
  createSessionToken,
  SESSION_COOKIE_MAX_AGE,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

interface CopiloteRow {
  code: string;
  nom: string;
  email: string;
  password_hash: string;
}

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const db = getDb();
  const row = db
    .prepare("SELECT code, nom, email, password_hash FROM copilotes WHERE email = ?")
    .get(email.toLowerCase()) as CopiloteRow | undefined;

  if (!row || !(await bcrypt.compare(password, row.password_hash))) {
    return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
  }

  const token = createSessionToken({ copiloteCode: row.code, email: row.email, nom: row.nom });
  const response = NextResponse.json({ ok: true, code: row.code });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: "/",
  });
  return response;
}
