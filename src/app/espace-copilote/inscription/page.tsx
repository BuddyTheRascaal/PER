"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InscriptionPage() {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/copilote/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, email, organisation, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Inscription impossible.");
      return;
    }
    router.push("/espace-copilote");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <p className="font-livree text-sm uppercase tracking-[0.25em] text-race-orange">
        Rallye Copilotes
      </p>
      <h1 className="mt-2 font-display text-3xl uppercase text-anthracite">Rejoindre le Rallye</h1>
      <p className="mt-2 text-sm text-cockpit-muted">
        Créez votre compte pour obtenir votre lien de tracking unique et
        accéder à votre dashboard.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-lg border border-cockpit-border bg-cockpit-surface p-6">
        <label className="flex flex-col gap-1 text-sm font-medium text-cockpit-ink">
          Nom complet
          <input
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-cockpit-ink">
          Email professionnel
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-cockpit-ink">
          Organisation / activité (optionnel)
          <input
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            placeholder="Cabinet, agence, family office..."
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-cockpit-ink">
          Mot de passe
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
          />
          <span className="text-xs text-cockpit-muted">8 caractères minimum</span>
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full -skew-x-3 bg-race-orange px-5 py-3 font-livree text-sm font-bold uppercase tracking-wide text-white hover:bg-race-orange-dark disabled:opacity-60"
        >
          <span className="inline-block skew-x-3">{loading ? "Création..." : "Créer mon compte"}</span>
        </button>

        <p className="text-xs text-cockpit-muted">
          En créant un compte, vous acceptez d&apos;être contacté par La Défense
          Mondiale dans le cadre du programme Copilotes. Voir nos{" "}
          <Link href="/mentions-legales#rgpd" className="underline">
            conditions de confidentialité
          </Link>
          .
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-cockpit-muted">
        Déjà copilote ?{" "}
        <Link href="/espace-copilote/connexion" className="font-medium text-race-orange underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
