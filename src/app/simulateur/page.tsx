"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import RaceTrack from "@/components/RaceTrack";
import PositionBadge from "@/components/PositionBadge";
import LeadForm from "@/components/LeadForm";
import { simuler, formatEuros, TRANCHES_TMI, type TrancheTMI } from "@/lib/per-calculator";

export default function SimulateurPage() {
  const [tmi, setTmi] = useState<TrancheTMI | "">("");
  const [revenu, setRevenu] = useState("");
  const [age, setAge] = useState("");

  const revenuNumber = Number(revenu);
  const ageNumber = Number(age);

  const fieldsComplete = tmi !== "" && revenuNumber > 0 && ageNumber >= 18 && ageNumber < 64;
  const filledCount = [tmi !== "", revenuNumber > 0, ageNumber >= 18 && ageNumber < 64].filter(Boolean).length;

  const result = useMemo(() => {
    if (!fieldsComplete) return null;
    return simuler({ tmi, revenuAnnuel: revenuNumber, age: ageNumber });
  }, [fieldsComplete, tmi, revenuNumber, ageNumber]);

  const certificateHref = result
    ? `/certificat?${new URLSearchParams({
        eco: String(result.economieImpotAnnuelle),
        capital: String(result.capitalProjete),
        posAvant: String(result.positionAvant),
        posApres: String(result.positionApres),
        annees: String(result.anneesRestantes),
      }).toString()}`
    : "/certificat";

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <p className="font-livree text-sm uppercase tracking-[0.25em] text-race-orange">La Course</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-anthracite md:text-5xl">
        Simulateur PER
      </h1>
      <p className="mt-3 max-w-xl text-cockpit-muted">
        Trois informations suffisent pour prendre position sur la grille fiscale.
        Aucune donnée n&apos;est requise pour voir le principe en action.
      </p>

      <div className="mt-8 rounded-lg border border-cockpit-border bg-cockpit-surface p-6">
        <RaceTrack progress={filledCount / 3} />
      </div>

      <form className="mt-8 grid gap-6 rounded-lg border border-cockpit-border bg-cockpit-surface p-6 sm:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm font-semibold text-cockpit-ink">
          Tranche marginale d&apos;imposition
          <select
            value={tmi}
            onChange={(e) => setTmi(e.target.value === "" ? "" : (Number(e.target.value) as TrancheTMI))}
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
          >
            <option value="">Sélectionner</option>
            {TRANCHES_TMI.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-cockpit-ink">
          Revenu net imposable annuel
          <input
            type="number"
            min={0}
            inputMode="numeric"
            value={revenu}
            onChange={(e) => setRevenu(e.target.value)}
            placeholder="80 000"
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-cockpit-ink">
          Âge actuel
          <input
            type="number"
            min={18}
            max={63}
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="42"
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
          />
        </label>
      </form>

      {result && (
        <div className="mt-10 animate-count">
          <div className="grid gap-6 rounded-lg border border-anthracite bg-anthracite p-8 text-white md:grid-cols-2">
            <div>
              <p className="font-livree text-xs uppercase tracking-wide text-white/50">
                Classement fiscal symbolique
              </p>
              <div className="mt-3 flex items-center gap-4">
                <div className="text-center">
                  <PositionBadge position={result.positionAvant} size="lg" tone="navy" />
                  <p className="mt-1 text-xs text-white/50">Avant PER</p>
                </div>
                <span className="font-display text-2xl text-race-orange">→</span>
                <div className="text-center">
                  <PositionBadge position={result.positionApres} size="lg" tone="orange" />
                  <p className="mt-1 text-xs text-white/50">Avec stratégie PER</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70">
                Vous passez de la {result.positionAvant}<sup>e</sup> à la{" "}
                {result.positionApres}<sup>e</sup> position — un indicateur symbolique
                de gain d&apos;efficacité fiscale, pas un classement réel.
              </p>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <div>
                <p className="font-livree text-xs uppercase tracking-wide text-white/50">
                  Versement annuel suggéré (plafond)
                </p>
                <p className="font-display text-2xl text-white">{formatEuros(result.versementSuggere)}</p>
              </div>
              <div>
                <p className="font-livree text-xs uppercase tracking-wide text-white/50">
                  Économie d&apos;impôt la 1<sup>re</sup> année
                </p>
                <p className="font-display text-2xl text-race-orange">
                  {formatEuros(result.economieImpotAnnuelle)}
                </p>
              </div>
              <div>
                <p className="font-livree text-xs uppercase tracking-wide text-white/50">
                  Capital projeté à {result.input.ageRetraite} ans ({result.anneesRestantes} ans)
                </p>
                <p className="font-display text-2xl text-white">{formatEuros(result.capitalProjete)}</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-cockpit-muted">
            Simulation non contractuelle, réalisée sur la base d&apos;hypothèses
            simplifiées (plafond de déduction standard, rendement net supposé de{" "}
            {"3,5 %"} par an, sans tenir compte des plafonds non utilisés des
            années précédentes). À affiner en rendez-vous avec un copilote La
            Défense Mondiale.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={certificateHref}
              className="-skew-x-3 border-2 border-anthracite px-6 py-3 text-center font-livree text-sm font-bold uppercase tracking-wide text-anthracite hover:border-race-orange hover:text-race-orange"
            >
              <span className="inline-block skew-x-3">Voir mon certificat</span>
            </Link>
          </div>

          <div className="mt-6">
            <LeadForm
              source="simulateur"
              simulation={{
                tmi: result.input.tmi,
                revenuAnnuel: result.input.revenuAnnuel,
                age: result.input.age,
                economieImpot: result.economieImpotAnnuelle,
                capitalProjete: result.capitalProjete,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
