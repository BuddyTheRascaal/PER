import Link from "next/link";
import DiagonalDivider from "@/components/DiagonalDivider";
import Leaderboard from "@/components/Leaderboard";
import { getMonthlyLeaderboard } from "@/lib/leaderboard";

export const metadata = {
  title: "Programme Copilotes — PER Grand Prix",
};

const MECANIQUE = [
  {
    title: "Vous partagez votre lien",
    text: "Un lien de tracking unique, généré à l'inscription. Diffusez-le sur vos supports, en clientèle, sur un stand.",
  },
  {
    title: "Vos contacts simulent",
    text: "Vos prospects utilisent le simulateur PER Grand Prix. Chaque lead qualifié vous est automatiquement attribué.",
  },
  {
    title: "Vous suivez, vous êtes rémunéré",
    text: "Dashboard en temps réel : clics, leads, classement mensuel, historique de commissions.",
  },
];

const CIBLES = [
  "Experts-comptables",
  "Agents immobiliers de prestige",
  "Courtiers en crédit",
  "Family offices",
  "Conciergerie & relocation",
];

export default function CopilotesPage() {
  const leaderboard = getMonthlyLeaderboard(10);

  return (
    <>
      <section className="bg-anthracite text-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="font-livree text-sm uppercase tracking-[0.3em] text-race-orange">
            Programme Copilotes
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl uppercase leading-[0.95] md:text-6xl">
            Devenez copilote de la stratégie retraite de votre réseau.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Experts-comptables, agents immobiliers, courtiers, family offices :
            si votre réseau vous fait confiance sur le patrimoine, le programme
            Copilotes transforme cette confiance en revenu récurrent, sans
            sortir de votre métier.
          </p>
          <Link
            href="/espace-copilote/inscription"
            className="mt-8 inline-block -skew-x-3 bg-race-orange px-7 py-4 font-livree font-bold uppercase tracking-wide text-white hover:bg-race-orange-dark"
          >
            <span className="inline-block skew-x-3">Rejoindre le programme</span>
          </Link>
        </div>
      </section>

      <DiagonalDivider from="var(--livree-anthracite)" to="var(--cockpit-bg)" />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-livree text-sm uppercase tracking-[0.25em] text-cockpit-muted">
          La mécanique
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {MECANIQUE.map((step, i) => (
            <div key={step.title} className="rounded-lg border border-cockpit-border bg-cockpit-surface p-6">
              <span className="font-display text-3xl text-race-orange">0{i + 1}</span>
              <p className="mt-3 font-livree text-lg font-bold uppercase tracking-wide text-anthracite">
                {step.title}
              </p>
              <p className="mt-2 text-sm text-cockpit-muted">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-cockpit-border bg-cockpit-surface p-6">
          <p className="font-livree text-lg font-bold uppercase tracking-wide text-anthracite">
            Un réseau taillé pour la prescription patrimoniale
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {CIBLES.map((cible) => (
              <span
                key={cible}
                className="-skew-x-3 rounded border border-ragas-navy/20 bg-ragas-navy/5 px-3 py-1.5 text-sm font-medium text-ragas-navy"
              >
                <span className="inline-block skew-x-3">{cible}</span>
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-cockpit-muted">
            La rémunération est versée par commission sur lead qualifié puis sur
            conversion, dans le respect des règles de courtage en vigueur. Le
            détail contractuel est communiqué à l&apos;inscription.
          </p>
        </div>
      </section>

      <section className="bg-cockpit-surface py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-livree text-sm uppercase tracking-[0.25em] text-cockpit-muted">
            Classement copilotes — ce mois-ci
          </h2>
          <p className="mt-2 max-w-xl text-sm text-cockpit-muted">
            Classement anonymisé, mis à jour en continu à partir des leads
            qualifiés générés via les liens de tracking.
          </p>
          <div className="mt-6">
            <Leaderboard entries={leaderboard} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-livree text-sm uppercase tracking-[0.25em] text-cockpit-muted">
          Kit de stand
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-center">
          <div className="rounded-lg border border-cockpit-border bg-cockpit-surface p-6">
            <p className="font-livree text-lg font-bold uppercase tracking-wide text-anthracite">
              Visuels prêts à diffuser
            </p>
            <ul className="mt-3 space-y-2 text-sm text-cockpit-muted">
              <li>— Kakémono et roll-up format salon / stand</li>
              <li>— Cartes de visite avec QR code de votre lien de tracking</li>
              <li>— Bannières email et post réseaux sociaux</li>
              <li>— Argumentaire de présentation courte (2 min)</li>
            </ul>
            <a
              href="mailto:copilotes@perdefensemondiale.fr?subject=Demande%20de%20kit%20de%20stand%20Copilote"
              className="mt-5 inline-block -skew-x-3 bg-anthracite px-5 py-3 font-livree text-sm font-bold uppercase tracking-wide text-white hover:bg-anthracite-2"
            >
              <span className="inline-block skew-x-3">Demander mon kit</span>
            </a>
            <p className="mt-3 text-xs text-cockpit-muted">
              Le kit personnalisé à votre code de tracking est remis après
              validation de votre inscription copilote.
            </p>
          </div>
          <div className="rounded-lg border border-cockpit-border bg-anthracite p-6 text-white">
            <p className="font-livree text-sm uppercase tracking-wide text-race-orange">
              Cannes · 8-13 sept. 2026
            </p>
            <p className="mt-1 font-livree text-sm uppercase tracking-wide text-white/60">
              Monaco Yacht Show · 23-26 sept. 2026
            </p>
            <p className="mt-4 text-sm text-white/75">
              Le programme Copilotes est activé en priorité sur ces deux
              rendez-vous. Inscrivez-vous dès maintenant pour recevoir votre
              lien et votre kit avant le déplacement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
