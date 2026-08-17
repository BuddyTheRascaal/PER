import crypto from "node:crypto";
import { SESSION_COOKIE_NAME, SESSION_COOKIE_MAX_AGE } from "@/lib/session-constants";

/**
 * Auth minimaliste pour l'Espace Copilote : session signée en cookie
 * httpOnly (HMAC-SHA256), sans dépendance externe. Suffisant pour le MVP —
 * à remplacer par le fournisseur d'auth de l'infra cible si besoin (SSO,
 * NextAuth, etc.), le contrat (createSession/verifySession) reste stable.
 *
 * Node-only (uses node:crypto) — never import this from Edge middleware,
 * import the cookie name/lifetime from @/lib/session-constants instead.
 */

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    // Ne doit jamais arriver en production — voir .env.example.
    return "dev-only-insecure-secret-change-me";
  }
  return secret;
}

export interface SessionPayload {
  copiloteCode: string;
  email: string;
  nom: string;
}

function sign(data: string): string {
  return crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
}

export function createSessionToken(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(body);
  return `${body}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = sign(body);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE_NAME, SESSION_COOKIE_MAX_AGE };
