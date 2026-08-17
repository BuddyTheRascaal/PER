export const REF_COOKIE_NAME = "per_gp_ref";
export const REF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 jours d'attribution

const COMBINING_DIACRITICS = /[̀-ͯ]/g;

/** Génère un code copilote court et lisible à partir du nom. */
export function slugifyCode(nom: string): string {
  const base = nom
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "")
    .slice(0, 8);
  const suffix = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `${base || "COPILOTE"}-${suffix}`;
}
