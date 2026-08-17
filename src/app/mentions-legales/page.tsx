export const metadata = {
  title: "Mentions légales — Circuit Patrimonial",
};

function Champ({ label }: { label: string }) {
  return <span className="rounded bg-race-orange/10 px-1.5 py-0.5 text-race-orange">[{label}]</span>;
}

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="font-livree text-sm uppercase tracking-[0.25em] text-race-orange">Conformité</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-anthracite">Mentions légales</h1>

      <div className="mt-4 rounded-lg border border-race-orange/40 bg-race-orange/5 p-4 text-sm text-anthracite">
        Page modèle : les champs encadrés en orange (raison sociale, numéro
        ORIAS, RCS, adresse, DPO...) doivent être complétés avec les
        informations réelles de la structure de courtage avant mise en ligne
        publique. Aucune donnée d&apos;immatriculation n&apos;a été inventée.
      </div>

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-cockpit-muted">
        <h2 className="font-livree text-lg font-bold uppercase tracking-wide text-anthracite">Éditeur du site</h2>
        <p>
          Le site Circuit Patrimonial est édité par <Champ label="raison sociale" />,{" "}
          <Champ label="forme juridique" /> au capital de <Champ label="montant" />,
          immatriculée au RCS de <Champ label="ville" /> sous le numéro{" "}
          <Champ label="SIREN" />, dont le siège social est situé{" "}
          <Champ label="adresse complète" />.
        </p>
        <p>
          Directeur de la publication : <Champ label="nom" />. Contact :{" "}
          <Champ label="email de contact" />.
        </p>
      </section>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-cockpit-muted">
        <h2 className="font-livree text-lg font-bold uppercase tracking-wide text-anthracite">
          Statut réglementaire — courtage en assurance
        </h2>
        <p>
          <Champ label="raison sociale" /> exerce une activité de courtage en
          assurance, en partenariat avec Ragas Assurances et Europa Assurances,
          sous le statut d&apos;intermédiaire en assurance immatriculé à l&apos;ORIAS
          sous le numéro <Champ label="numéro ORIAS" /> (
          <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="underline">
            www.orias.fr
          </a>
          ), soumis au contrôle de l&apos;Autorité de Contrôle Prudentiel et de
          Résolution (ACPR), 4 place de Budapest, CS 92459, 75436 Paris Cedex 09.
        </p>
        <p>
          Conformément aux articles L.520-1 et suivants du Code des assurances,
          l&apos;intermédiaire agit au titre du courtage d&apos;assurance et perçoit,
          le cas échéant, une rémunération sous forme de commissions incluses
          dans les primes versées par le client, ainsi que, dans le cadre du
          programme Copilotes, des commissions d&apos;apport versées aux
          apporteurs d&apos;affaires dûment déclarés.
        </p>
      </section>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-cockpit-muted">
        <h2 className="font-livree text-lg font-bold uppercase tracking-wide text-anthracite">
          Nature non contractuelle des simulations
        </h2>
        <p>
          Les simulations réalisées via le simulateur Circuit Patrimonial (économie
          d&apos;impôt, capital projeté, position sur la grille fiscale) sont
          fournies à titre purement indicatif et pédagogique. Elles reposent
          sur des hypothèses simplifiées (barème de référence, plafond de
          déduction standard, rendement net supposé) qui ne préjugent en rien
          des conditions réelles applicables à votre situation. Aucun chiffre
          affiché ne constitue un engagement contractuel, une promesse de
          rendement ou un conseil personnalisé. Toute souscription est
          précédée d&apos;un entretien avec un conseiller et de la remise des
          documents d&apos;information réglementaires (DIC, notice
          d&apos;information).
        </p>
      </section>

      <section id="rgpd" className="mt-8 space-y-3 text-sm leading-relaxed text-cockpit-muted">
        <h2 className="font-livree text-lg font-bold uppercase tracking-wide text-anthracite">
          Protection des données personnelles (RGPD)
        </h2>
        <p>
          Les données collectées via les formulaires de simulation,
          d&apos;inscription copilote et de prise de contact sont traitées par{" "}
          <Champ label="raison sociale" /> en qualité de responsable de
          traitement, aux fins de gestion de la relation commerciale, de
          réponse à vos demandes et, avec votre consentement, de prospection
          commerciale.
        </p>
        <p>
          Base légale : exécution de mesures précontractuelles et intérêt
          légitime. Durée de conservation : 3 ans à compter du dernier contact
          en l&apos;absence de relation contractuelle. Destinataires : les
          équipes commerciales de La Défense Mondiale et, le cas échéant, le
          copilote à l&apos;origine de la mise en relation.
        </p>
        <p>
          Conformément au Règlement Général sur la Protection des Données et à
          la loi Informatique et Libertés, vous disposez d&apos;un droit
          d&apos;accès, de rectification, d&apos;effacement, de limitation, de
          portabilité et d&apos;opposition, exerçable auprès de{" "}
          <Champ label="email DPO / contact RGPD" />. Vous disposez également
          du droit d&apos;introduire une réclamation auprès de la CNIL
          (www.cnil.fr).
        </p>
      </section>

      <section className="mt-8 space-y-3 text-sm leading-relaxed text-cockpit-muted">
        <h2 className="font-livree text-lg font-bold uppercase tracking-wide text-anthracite">
          Hébergement
        </h2>
        <p>
          Ce site est hébergé par <Champ label="hébergeur" />,{" "}
          <Champ label="adresse hébergeur" />.
        </p>
      </section>
    </div>
  );
}
