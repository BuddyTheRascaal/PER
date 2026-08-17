import { getDb } from "@/lib/db";

export interface LeaderboardEntry {
  rang: number;
  code: string;
  label: string;
  leads: number;
}

function anonymize(nom: string): string {
  const parts = nom.trim().split(/\s+/);
  if (parts.length === 1) return `${parts[0].slice(0, 1).toUpperCase()}.`;
  const [prenom, ...reste] = parts;
  const nomFamille = reste[reste.length - 1];
  return `${prenom} ${nomFamille.slice(0, 1).toUpperCase()}.`;
}

interface Row {
  code: string;
  nom: string;
  leads: number;
}

export function getMonthlyLeaderboard(limit = 10): LeaderboardEntry[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT c.code as code, c.nom as nom, COUNT(l.id) as leads
       FROM copilotes c
       LEFT JOIN leads l
         ON l.copilote_code = c.code
         AND strftime('%Y-%m', l.created_at) = strftime('%Y-%m', 'now')
       GROUP BY c.code
       ORDER BY leads DESC, c.created_at ASC
       LIMIT ?`
    )
    .all(limit) as Row[];

  return rows.map((row, index) => ({
    rang: index + 1,
    code: row.code,
    label: anonymize(row.nom),
    leads: row.leads,
  }));
}

export interface CopiloteStats {
  clicksTotal: number;
  leadsTotal: number;
  leadsCeMois: number;
  rangMensuel: number | null;
  commissions: { id: number; libelle: string; montant: number; statut: string; date: string }[];
  commissionTotale: number;
}

export function getCopiloteStats(code: string): CopiloteStats {
  const db = getDb();

  const clicksTotal = (
    db.prepare("SELECT COUNT(*) as n FROM clicks WHERE copilote_code = ?").get(code) as { n: number }
  ).n;

  const leadsTotal = (
    db.prepare("SELECT COUNT(*) as n FROM leads WHERE copilote_code = ?").get(code) as { n: number }
  ).n;

  const leadsCeMois = (
    db
      .prepare(
        `SELECT COUNT(*) as n FROM leads
         WHERE copilote_code = ? AND strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')`
      )
      .get(code) as { n: number }
  ).n;

  const commissions = db
    .prepare(
      `SELECT id, libelle, montant, statut, created_at as date
       FROM commissions WHERE copilote_code = ? ORDER BY created_at DESC LIMIT 50`
    )
    .all(code) as CopiloteStats["commissions"];

  const commissionTotale = commissions.reduce((sum, c) => sum + c.montant, 0);

  return {
    clicksTotal,
    leadsTotal,
    leadsCeMois,
    rangMensuel: getCopiloteRank(code),
    commissions,
    commissionTotale,
  };
}

export function getCopiloteRank(code: string): number | null {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT c.code as code, COUNT(l.id) as leads
       FROM copilotes c
       LEFT JOIN leads l
         ON l.copilote_code = c.code
         AND strftime('%Y-%m', l.created_at) = strftime('%Y-%m', 'now')
       GROUP BY c.code
       ORDER BY leads DESC, c.created_at ASC`
    )
    .all() as { code: string; leads: number }[];

  const index = rows.findIndex((row) => row.code === code);
  return index === -1 ? null : index + 1;
}
