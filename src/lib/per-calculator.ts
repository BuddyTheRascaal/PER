/**
 * Moteur de simulation PER — "La Course".
 *
 * Hypothèses de calcul (barème et plafonds fiscaux non encore publiés pour
 * l'exercice 2026 au moment de l'écriture — la loi de finances 2026 fixe
 * l'actualisation en fin d'année). On applique donc le dernier barème et le
 * dernier PASS connus, révisés d'une hypothèse d'indexation standard, et on
 * l'affiche clairement comme non contractuel sur toutes les pages qui
 * consomment ce module.
 */

export type TrancheTMI = 0 | 11 | 30 | 41 | 45;

export interface SimulationInput {
  /** Tranche marginale d'imposition du foyer, en % */
  tmi: TrancheTMI;
  /** Revenu net imposable annuel, en euros */
  revenuAnnuel: number;
  /** Âge actuel */
  age: number;
  /** Âge de départ à la retraite visé (optionnel, défaut 64) */
  ageRetraite?: number;
}

export interface SimulationResult {
  input: Required<SimulationInput>;
  plafondDeduction: number;
  versementSuggere: number;
  economieImpotAnnuelle: number;
  anneesRestantes: number;
  capitalProjete: number;
  totalVerse: number;
  gainEstime: number;
  positionAvant: number;
  positionApres: number;
  tailleGrille: number;
}

/** Plafond Annuel de la Sécurité Sociale — référence 2025, en attente de publication 2026. */
export const PASS_REFERENCE = 47_100;

/** Rendement net moyen annuel supposé pour la projection (hypothèse pédagogique). */
export const RENDEMENT_NET_SUPPOSE = 0.035;

export const AGE_RETRAITE_DEFAUT = 64;

export const TAILLE_GRILLE = 20;

export const TRANCHES_TMI: { value: TrancheTMI; label: string }[] = [
  { value: 0, label: "0 % — non imposable" },
  { value: 11, label: "11 %" },
  { value: 30, label: "30 %" },
  { value: 41, label: "41 %" },
  { value: 45, label: "45 %" },
];

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Plafond de déduction PER (assimilé salarié), formule simplifiée :
 * max(10 % du PASS, min(10 % du revenu, 10 % de 8×PASS)).
 * Ne tient pas compte des plafonds non utilisés des 3 années précédentes
 * ni de la mutualisation avec le conjoint — précisé dans le disclaimer.
 */
export function calculerPlafondDeduction(revenuAnnuel: number): number {
  const planchier = 0.1 * PASS_REFERENCE;
  const plafondHaut = 0.1 * 8 * PASS_REFERENCE;
  return Math.round(clamp(0.1 * revenuAnnuel, planchier, plafondHaut));
}

/** Valeur future d'une suite de versements annuels constants (annuité ordinaire). */
function valeurFutureAnnuite(versementAnnuel: number, annees: number, taux: number): number {
  if (annees <= 0) return 0;
  if (taux === 0) return versementAnnuel * annees;
  return versementAnnuel * ((Math.pow(1 + taux, annees) - 1) / taux);
}

function calculerPosition(scoreApres: number): number {
  const position = TAILLE_GRILLE - Math.round(scoreApres * 100 * 4);
  return clamp(position, 1, TAILLE_GRILLE - 1);
}

export function simuler(input: SimulationInput): SimulationResult {
  const ageRetraite = input.ageRetraite ?? AGE_RETRAITE_DEFAUT;
  const anneesRestantes = clamp(ageRetraite - input.age, 1, 45);

  const plafondDeduction = calculerPlafondDeduction(input.revenuAnnuel);
  const versementSuggere = plafondDeduction;
  const economieImpotAnnuelle = Math.round(versementSuggere * (input.tmi / 100));

  const totalVerse = versementSuggere * anneesRestantes;
  const capitalProjete = Math.round(
    valeurFutureAnnuite(versementSuggere, anneesRestantes, RENDEMENT_NET_SUPPOSE)
  );
  const gainEstime = capitalProjete - totalVerse;

  const scoreApres = input.revenuAnnuel > 0 ? economieImpotAnnuelle / input.revenuAnnuel : 0;
  const positionAvant = TAILLE_GRILLE;
  const positionApres = Math.min(calculerPosition(scoreApres), positionAvant - 1);

  return {
    input: { ...input, ageRetraite },
    plafondDeduction,
    versementSuggere,
    economieImpotAnnuelle,
    anneesRestantes,
    capitalProjete,
    totalVerse,
    gainEstime,
    positionAvant,
    positionApres,
    tailleGrille: TAILLE_GRILLE,
  };
}

export function formatEuros(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}
