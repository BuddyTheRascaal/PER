import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { forwardLeadToCrm } from "@/lib/crm";
import { REF_COOKIE_NAME } from "@/lib/tracking";

const schema = z.object({
  nom: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  telephone: z.string().trim().max(40).optional(),
  tmi: z.number().int().optional(),
  revenuAnnuel: z.number().int().optional(),
  age: z.number().int().optional(),
  economieImpot: z.number().int().optional(),
  capitalProjete: z.number().int().optional(),
  source: z.string().trim().max(60).optional(),
});

const COMMISSION_PAR_LEAD = Number(process.env.COMMISSION_PAR_LEAD ?? 50);

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }

  const lead = parsed.data;
  const refCode = request.cookies.get(REF_COOKIE_NAME)?.value ?? null;
  const db = getDb();

  const copilote = refCode
    ? (db.prepare("SELECT code FROM copilotes WHERE code = ?").get(refCode) as
        | { code: string }
        | undefined)
    : undefined;
  const copiloteCode = copilote?.code ?? null;

  const result = db
    .prepare(
      `INSERT INTO leads
       (copilote_code, nom, email, telephone, tmi, revenu_annuel, age, economie_impot, capital_projete, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      copiloteCode,
      lead.nom,
      lead.email,
      lead.telephone ?? null,
      lead.tmi ?? null,
      lead.revenuAnnuel ?? null,
      lead.age ?? null,
      lead.economieImpot ?? null,
      lead.capitalProjete ?? null,
      lead.source ?? "simulateur"
    );

  if (copiloteCode) {
    db.prepare(
      `INSERT INTO commissions (copilote_code, lead_id, libelle, montant, statut)
       VALUES (?, ?, ?, ?, 'en attente')`
    ).run(
      copiloteCode,
      result.lastInsertRowid,
      `Prime lead qualifié — ${lead.nom}`,
      COMMISSION_PAR_LEAD
    );
  }

  await forwardLeadToCrm({ ...lead, copiloteCode });

  return NextResponse.json({ ok: true });
}
