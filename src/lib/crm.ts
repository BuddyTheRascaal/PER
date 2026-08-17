/**
 * Point d'intégration CRM / emailing — à préciser selon l'outil retenu
 * (HubSpot, Brevo, Salesforce, etc.). En l'absence de CRM_WEBHOOK_URL, le
 * lead reste stocké localement (voir src/lib/db.ts) et consultable via le
 * dashboard copilote / export. Dès qu'un outil est choisi, il suffit de
 * renseigner CRM_WEBHOOK_URL (endpoint acceptant un POST JSON) — aucun
 * autre fichier n'a besoin de changer.
 */

export interface LeadPayload {
  nom: string;
  email: string;
  telephone?: string;
  tmi?: number;
  revenuAnnuel?: number;
  age?: number;
  economieImpot?: number;
  capitalProjete?: number;
  source?: string;
  copiloteCode?: string | null;
}

export async function forwardLeadToCrm(lead: LeadPayload): Promise<void> {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, emittedAt: new Date().toISOString() }),
    });
  } catch (error) {
    console.error("[crm] échec de transmission du lead au CRM externe", error);
  }
}
