import Link from "next/link";
import AnimatedCounter from "@/components/AnimatedCounter";
import DiagonalDivider from "@/components/DiagonalDivider";
import { formatEuros, PASS_REFERENCE } from "@/lib/per-calculator";

const CHIFFRES_CLES = [
  {
    value: 37680,
    format: "euros" as const,
    label: "Plafond de déduction maximal",
    detail: "Jusqu'à 10 % de vos revenus professionnels, dans la limite de 8 PASS.",
  },
  {
    value: 45,
    format: "number" as const,
    suffix: " %",
    label: "TMI la plus élevée",
    detail: "Chaque euro versé sur un PER réduit votre revenu imposable au taux de votre TMI.",
  },
  {
    value: 6150,
    format: "euros" as const,
    label: "Économie d'impôt type",
    detail: "Pour un cadre dirigeant à 41 % de TMI versant 15 000 € sur l'année.",
  },
];

export default function AccueilPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-anthracite text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,90,31,0.18) 0px, rgba(255,90,31,0.18) 2px, transparent 2px, transparent 60px)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
          <p className="font-livree text-sm uppercase tracking-[0.3em] text-race-orange">
            Grille de départ — Saison fiscale
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl uppercase leading-[0.95] md:text-7xl">
            Votre retraite mérite une stratégie de course, pas une ligne droite.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Le PER n&apos;est pas une case à cocher en fin d&apos;année. C&apos;est une
            trajectoire, versement après versement, position après position sur
            la grille fiscale. La Défense Mondiale vous met en piste.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/simulateur"
              className="-skew-x-3 bg-race-orange px-7 py-4 text-center font-livree font-bold uppercase tracking-wide text-white transition-colors hover:bg-race-orange-dark"
            >
              <span className="inline-block skew-x-3">Lancer ma simulation</span>
            </Link>
            <Link
              href="/copilotes"
              className="-skew-x-3 border-2 border-white/30 px-7 py-4 text-center font-livree font-bold uppercase tracking-wide text-white transition-colors hover:border-race-orange hover:text-race-orange"
            >
              <span className="inline-block skew-x-3">Devenir Copilote</span>
            </Link>
          </div>
        </div>
      </section>

      <DiagonalDivider from="var(--livree-anthracite)" to="var(--cockpit-bg)" />

      {/* Cockpit: chiffres clés, sobre et lisible */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-livree text-sm uppercase tracking-[0.25em] text-cockpit-muted">
          Tableau de bord — chiffres clés 2026
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {CHIFFRES_CLES.map((chiffre) => (
            <div
              key={chiffre.label}
              className="rounded-lg border border-cockpit-border bg-cockpit-surface p-6"
            >
              <p className="font-display text-4xl text-anthracite">
                <AnimatedCounter
                  value={chiffre.value}
                  suffix={chiffre.suffix}
                  format={chiffre.format}
                />
              </p>
              <p className="mt-2 font-livree text-sm font-semibold uppercase tracking-wide text-race-orange">
                {chiffre.label}
              </p>
              <p className="mt-2 text-sm text-cockpit-muted">{chiffre.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-cockpit-muted">
          Chiffres donnés à titre indicatif sur la base du barème et du PASS de
          référence ({formatEuros(PASS_REFERENCE)}), en attente de l&apos;actualisation
          officielle 2026. Simulation non contractuelle.
        </p>
      </section>

      {/* Aperçu simulateur */}
      <section className="bg-anthracite-2 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-livree text-sm uppercase tracking-[0.25em] text-race-orange">
              La Course
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase md:text-4xl">
              3 informations. Une position sur la grille. Une trajectoire chiffrée.
            </h2>
            <p className="mt-4 text-white/75">
              TMI, revenus, âge : c&apos;est tout ce qu&apos;il faut pour visualiser votre
              économie d&apos;impôt et votre capital projeté à l&apos;échéance. Aucune
              donnée superflue, aucun jargon.
            </p>
            <Link
              href="/simulateur"
              className="mt-6 inline-block -skew-x-3 bg-race-orange px-6 py-3 font-livree font-bold uppercase tracking-wide text-white hover:bg-race-orange-dark"
            >
              <span className="inline-block skew-x-3">Prendre le départ</span>
            </Link>
          </div>
          <div className="rounded-lg border border-white/10 bg-anthracite p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-livree text-xs uppercase tracking-wide text-white/50">
                Position avant PER
              </span>
              <span className="font-display text-2xl text-white/50">P20</span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="font-livree text-xs uppercase tracking-wide text-race-orange">
                Position après stratégie PER
              </span>
              <span className="font-display text-3xl text-race-orange">P4</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-4/5 bg-race-orange" />
            </div>
            <p className="mt-4 text-xs text-white/50">
              Exemple illustratif — votre résultat dépend de votre situation
              personnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi La Défense Mondiale */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-livree text-sm uppercase tracking-[0.25em] text-cockpit-muted">
          Pourquoi La Défense Mondiale
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Expertise courtage",
              text: "Adossés à Ragas Assurances et Europa Assurances, nous structurons des stratégies patrimoniales pour dirigeants et professions libérales depuis plus d'une décennie.",
            },
            {
              title: "Ancrage international",
              text: "Basés en France avec un point d'ancrage à Monaco, nous accompagnons une clientèle à mobilité internationale et aux patrimoines complexes.",
            },
            {
              title: "Une méthode, pas un produit",
              text: "Le PER n'est qu'une pièce de la stratégie. Chaque copilote construit un plan sur mesure, aligné sur votre horizon et votre fiscalité.",
            },
          ].map((item) => (
            <div key={item.title} className="border-l-4 border-race-orange pl-5">
              <p className="font-livree text-lg font-bold uppercase tracking-wide text-anthracite">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-cockpit-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
