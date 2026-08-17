import PositionBadge from "@/components/PositionBadge";
import type { LeaderboardEntry } from "@/lib/leaderboard";

const PODIUM_TONE = ["gold", "navy", "orange"] as const;

export default function Leaderboard({ entries }: { entries: LeaderboardEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-cockpit-border bg-cockpit-surface p-8 text-center text-sm text-cockpit-muted">
        La grille de départ du mois s&apos;ouvre bientôt — soyez le premier copilote inscrit.
      </div>
    );
  }

  const podium = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {podium.map((entry, i) => (
          <div
            key={entry.code}
            className={`flex flex-col items-center gap-3 rounded-lg border p-6 text-center ${
              i === 0
                ? "border-ragas-gold bg-anthracite text-white sm:order-2 sm:-translate-y-3"
                : "border-cockpit-border bg-cockpit-surface sm:order-none"
            }`}
          >
            <PositionBadge position={entry.rang} tone={PODIUM_TONE[i]} size="lg" />
            <p className="font-livree text-lg font-bold uppercase tracking-wide">{entry.label}</p>
            <p className={`text-sm ${i === 0 ? "text-white/70" : "text-cockpit-muted"}`}>
              {entry.leads} lead{entry.leads > 1 ? "s" : ""} qualifié{entry.leads > 1 ? "s" : ""} ce mois-ci
            </p>
          </div>
        ))}
      </div>

      {rest.length > 0 && (
        <ol className="mt-6 divide-y divide-cockpit-border rounded-lg border border-cockpit-border bg-cockpit-surface">
          {rest.map((entry) => (
            <li key={entry.code} className="flex items-center gap-4 px-5 py-3">
              <PositionBadge position={entry.rang} size="sm" tone="navy" />
              <span className="font-livree text-sm font-semibold uppercase tracking-wide text-anthracite">
                {entry.label}
              </span>
              <span className="ml-auto text-sm text-cockpit-muted">{entry.leads} leads</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
