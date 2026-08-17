import { NextRequest, NextResponse, type NextFetchEvent } from "next/server";
import { REF_COOKIE_MAX_AGE, REF_COOKIE_NAME } from "@/lib/tracking";
import { SESSION_COOKIE_NAME } from "@/lib/session-constants";

const PROTECTED_PREFIX = "/espace-copilote";
const AUTH_PAGES = ["/espace-copilote/connexion", "/espace-copilote/inscription"];

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname, searchParams } = request.nextUrl;
  const response = NextResponse.next();

  // Attribution copilote : ?ref=CODE posé sur n'importe quelle page publique.
  const ref = searchParams.get("ref");
  const alreadyTracked = request.cookies.get(REF_COOKIE_NAME)?.value === ref;
  if (ref) {
    response.cookies.set(REF_COOKIE_NAME, ref, {
      maxAge: REF_COOKIE_MAX_AGE,
      httpOnly: false,
      sameSite: "lax",
      path: "/",
    });
    if (!alreadyTracked) {
      const clickUrl = new URL("/api/copilote/track-click", request.url);
      clickUrl.searchParams.set("code", ref);
      event.waitUntil(fetch(clickUrl, { method: "POST" }).catch(() => {}));
    }
  }

  // Protection de l'espace copilote (hors pages de connexion/inscription).
  if (pathname.startsWith(PROTECTED_PREFIX) && !AUTH_PAGES.includes(pathname)) {
    const session = request.cookies.get(SESSION_COOKIE_NAME);
    if (!session) {
      const loginUrl = new URL("/espace-copilote/connexion", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
