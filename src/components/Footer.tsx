import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-anthracite text-white/70">
      <div className="grid-stripes h-1.5 w-full" />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-4">
        <div>
          <p className="font-livree text-lg font-bold uppercase tracking-wide text-white">PER Grand Prix</p>
          <p className="mt-3 text-sm leading-relaxed">
            Une initiative La Défense Mondiale, en partenariat avec Ragas Assurances
            et Europa Assurances (Monaco).
          </p>
        </div>

        <div>
          <p className="font-livree text-sm font-bold uppercase tracking-wide text-white">Le PER</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/simulateur" className="hover:text-race-orange">Simulateur</Link></li>
            <li><Link href="/certificat" className="hover:text-race-orange">Certificat de performance</Link></li>
            <li><Link href="/a-propos" className="hover:text-race-orange">À propos</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-livree text-sm font-bold uppercase tracking-wide text-white">Copilotes</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/copilotes" className="hover:text-race-orange">Le programme</Link></li>
            <li><Link href="/espace-copilote" className="hover:text-race-orange">Espace copilote</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-livree text-sm font-bold uppercase tracking-wide text-white">Conformité</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/mentions-legales" className="hover:text-race-orange">Mentions légales</Link></li>
            <li><Link href="/mentions-legales#rgpd" className="hover:text-race-orange">Confidentialité (RGPD)</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5">
        <p className="mx-auto max-w-6xl text-xs leading-relaxed text-white/50">
          Les simulations présentées sur ce site sont non contractuelles et fournies à
          titre indicatif ; elles doivent être affinées lors d&apos;un rendez-vous avec
          un conseiller. Le Plan d&apos;Épargne Retraite (PER) est un produit d&apos;épargne
          de long terme dont les avantages fiscaux dépendent de votre situation
          personnelle et sont susceptibles d&apos;évoluer. © {new Date().getFullYear()} La
          Défense Mondiale. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
