"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import CertificateCanvas from "@/components/CertificateCanvas";
import { formatEuros } from "@/lib/per-calculator";

function num(value: string | null, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

const FALLBACK_URL = "https://perdefensemondiale.fr/certificat";

export default function CertificateView() {
  const params = useSearchParams();
  const [anonyme, setAnonyme] = useState(true);
  const [nom, setNom] = useState("");
  // Lu après montage uniquement : window.location diffère du rendu serveur
  // et casserait l'hydratation s'il était lu directement pendant le rendu.
  const [shareUrl, setShareUrl] = useState(FALLBACK_URL);

  useEffect(() => {
    // Intentional: this two-pass read (SSR fallback, then real URL after
    // mount) is required to keep hydration consistent — see comment above.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShareUrl(window.location.href);
  }, []);

  const economieImpot = num(params.get("eco"), 6150);
  const capitalProjete = num(params.get("capital"), 214000);
  const positionAvant = num(params.get("posAvant"), 20);
  const positionApres = num(params.get("posApres"), 4);
  const shareText = `Je passe de la ${positionAvant}e à la ${positionApres}e position sur la grille fiscale grâce à ma stratégie PER. ${formatEuros(
    economieImpot
  )} d'économie d'impôt cette année.`;

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(
    "Mon certificat de performance PER"
  )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <p className="font-livree text-sm uppercase tracking-[0.25em] text-race-orange">Podium</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-anthracite md:text-5xl">
        Certificat de performance
      </h1>
      <p className="mt-3 max-w-xl text-cockpit-muted">
        Un visuel sobre, pensé pour être partagé sans détonner sur un profil
        professionnel. Anonymisez vos chiffres si vous préférez rester discret.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4 rounded-lg border border-cockpit-border bg-cockpit-surface p-4">
        <label className="flex items-center gap-2 text-sm font-medium text-cockpit-ink">
          <input
            type="checkbox"
            checked={anonyme}
            onChange={(e) => setAnonyme(e.target.checked)}
          />
          Anonymiser mon nom
        </label>
        {!anonyme && (
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Votre nom tel qu'affiché"
            className="flex-1 rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
          />
        )}
      </div>

      <div className="mt-6">
        <CertificateCanvas
          economieImpot={economieImpot}
          capitalProjete={capitalProjete}
          positionAvant={positionAvant}
          positionApres={positionApres}
          anonyme={anonyme}
          nom={nom}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          className="-skew-x-3 bg-[#0a66c2] px-5 py-3 font-livree text-sm font-bold uppercase tracking-wide text-white hover:opacity-90"
        >
          <span className="inline-block skew-x-3">Partager sur LinkedIn</span>
        </a>
        <a
          href={mailHref}
          className="-skew-x-3 border-2 border-anthracite px-5 py-3 font-livree text-sm font-bold uppercase tracking-wide text-anthracite hover:border-race-orange hover:text-race-orange"
        >
          <span className="inline-block skew-x-3">Partager par email</span>
        </a>
      </div>

      <p className="mt-6 text-xs text-cockpit-muted">
        Certificat généré automatiquement à partir de votre simulation. Les
        montants affichés sont non contractuels.{" "}
        <Link href="/simulateur" className="underline">
          Refaire une simulation
        </Link>
        .
      </p>
    </div>
  );
}
