import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getCopiloteStats } from "@/lib/leaderboard";
import { formatEuros } from "@/lib/per-calculator";
import PositionBadge from "@/components/PositionBadge";
import LogoutButton from "@/components/LogoutButton";

export const metadata = {
  title: "Espace Copilote — PER Grand Prix",
};

export default async function EspaceCopilotePage() {
  const session = await getSession();
  if (!session) redirect("/espace-copilote/connexion");

  const stats = getCopiloteStats(session.copiloteCode);
  const trackingUrl = `https://perdefensemondiale.fr/?ref=${session.copiloteCode}`;

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-livree text-sm uppercase tracking-[0.25em] text-race-orange">
            Cockpit copilote
          </p>
          <h1 className="mt-1 font-display text-4xl uppercase text-anthracite">
            Bonjour {session.nom.split(" ")[0]}
          </h1>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-cockpit-border bg-cockpit-surface p-5">
          <p className="text-xs uppercase tracking-wide text-cockpit-muted">Clics totaux</p>
          <p className="mt-1 font-display text-3xl text-anthracite">{stats.clicksTotal}</p>
        </div>
        <div className="rounded-lg border border-cockpit-border bg-cockpit-surface p-5">
          <p className="text-xs uppercase tracking-wide text-cockpit-muted">Leads générés</p>
          <p className="mt-1 font-display text-3xl text-anthracite">{stats.leadsTotal}</p>
        </div>
        <div className="rounded-lg border border-cockpit-border bg-cockpit-surface p-5">
          <p className="text-xs uppercase tracking-wide text-cockpit-muted">Leads ce mois-ci</p>
          <p className="mt-1 font-display text-3xl text-anthracite">{stats.leadsCeMois}</p>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-cockpit-border bg-anthracite p-5">
          <PositionBadge position={stats.rangMensuel ?? 0} tone="orange" />
          <div>
            <p className="text-xs uppercase tracking-wide text-white/60">Rang mensuel</p>
            <p className="font-display text-xl text-white">
              {stats.rangMensuel ? `${stats.rangMensuel}e` : "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-cockpit-border bg-cockpit-surface p-6">
        <p className="font-livree text-sm font-bold uppercase tracking-wide text-anthracite">
          Votre lien de tracking
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <code className="rounded bg-cockpit-bg px-3 py-2 text-sm text-anthracite">{trackingUrl}</code>
          <span className="text-xs text-cockpit-muted">Code : {session.copiloteCode}</span>
        </div>
        <p className="mt-3 text-sm text-cockpit-muted">
          Chaque visite via ce lien attribue automatiquement les leads générés à
          votre compte pendant 30 jours.
        </p>
        <a
          href="mailto:copilotes@perdefensemondiale.fr?subject=Demande%20de%20kit%20de%20stand%20Copilote"
          className="mt-4 inline-block -skew-x-3 bg-anthracite px-5 py-2.5 font-livree text-sm font-bold uppercase tracking-wide text-white hover:bg-anthracite-2"
        >
          <span className="inline-block skew-x-3">Recevoir mes supports de com</span>
        </a>
      </div>

      <div className="mt-8">
        <p className="font-livree text-sm font-bold uppercase tracking-wide text-anthracite">
          Historique des commissions
        </p>
        <p className="mt-1 text-sm text-cockpit-muted">
          Total cumulé : <span className="font-semibold text-anthracite">{formatEuros(stats.commissionTotale)}</span>
        </p>
        <div className="mt-3 overflow-hidden rounded-lg border border-cockpit-border">
          {stats.commissions.length === 0 ? (
            <p className="bg-cockpit-surface p-6 text-center text-sm text-cockpit-muted">
              Aucune commission enregistrée pour le moment. Partagez votre lien
              pour générer vos premiers leads.
            </p>
          ) : (
            <table className="w-full bg-cockpit-surface text-sm">
              <thead>
                <tr className="border-b border-cockpit-border text-left text-xs uppercase tracking-wide text-cockpit-muted">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Libellé</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 text-right">Montant</th>
                </tr>
              </thead>
              <tbody>
                {stats.commissions.map((c) => (
                  <tr key={c.id} className="border-b border-cockpit-border last:border-0">
                    <td className="px-4 py-3 text-cockpit-muted">
                      {new Date(c.date).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-3">{c.libelle}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-ragas-gold/20 px-2 py-0.5 text-xs font-medium text-ragas-navy">
                        {c.statut}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">{formatEuros(c.montant)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
