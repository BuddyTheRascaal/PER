import DiagonalDivider from "@/components/DiagonalDivider";

export const metadata = {
  title: "À propos — PER Grand Prix",
};

export default function AProposPage() {
  return (
    <>
      <section className="bg-anthracite text-white">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="font-livree text-sm uppercase tracking-[0.3em] text-race-orange">
            À propos
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl uppercase leading-[0.95] md:text-6xl">
            Une expertise de courtage, un ancrage international.
          </h1>
        </div>
      </section>

      <DiagonalDivider from="var(--livree-anthracite)" to="var(--cockpit-bg)" />

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="space-y-6 text-cockpit-ink">
          <p className="text-lg leading-relaxed">
            <strong>La Défense Mondiale</strong> est une initiative portée par
            Buddy Baugé, adossée à <strong>Ragas Assurances</strong> et{" "}
            <strong>Europa Assurances</strong>, deux structures de courtage
            reconnues pour leur accompagnement patrimonial haut de gamme.
          </p>
          <p className="leading-relaxed text-cockpit-muted">
            Notre activité s&apos;articule autour du conseil en épargne retraite
            et de la structuration patrimoniale pour une clientèle de cadres
            dirigeants, professions libérales et particuliers à mobilité
            internationale. Notre point d&apos;ancrage à{" "}
            <strong className="text-cockpit-ink">Monaco</strong>, en
            complément de notre activité en France, nous permet
            d&apos;accompagner des situations patrimoniales complexes,
            transfrontalières, avec la rigueur réglementaire que ces dossiers
            exigent.
          </p>

          <div className="rounded-lg border-l-4 border-race-orange bg-cockpit-surface p-6">
            <p className="font-livree text-sm font-bold uppercase tracking-wide text-anthracite">
              Le motorsport, une méthode plus qu&apos;une image
            </p>
            <p className="mt-2 text-sm leading-relaxed text-cockpit-muted">
              Notre parcours dans le sport automobile n&apos;est pas un argument
              marketing : c&apos;est une manière de travailler. Précision des
              chiffres, préparation de chaque paramètre, capacité à ajuster une
              stratégie en course — ce sont les mêmes réflexes qui structurent
              nos préconisations patrimoniales. PER Grand Prix reprend cette
              métaphore là où elle a du sens : pour rendre lisible une
              trajectoire d&apos;épargne longue, jamais pour habiller les
              chiffres réglementaires.
            </p>
          </div>

          <p className="leading-relaxed text-cockpit-muted">
            Chaque copilote La Défense Mondiale intervient dans le respect
            strict du statut de courtier en assurance et des obligations
            d&apos;information et de conseil applicables aux produits
            d&apos;épargne retraite. Voir nos{" "}
            <a href="/mentions-legales" className="underline">
              mentions légales
            </a>{" "}
            pour le détail réglementaire.
          </p>
        </div>
      </section>
    </>
  );
}
