/**
 * Cookie name/lifetime constants shared between Edge middleware and Node
 * server code. Kept dependency-free (no crypto import) so it can be bundled
 * for the Edge runtime without pulling in Node-only modules.
 */
export const SESSION_COOKIE_NAME = "per_gp_session";
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 jours
