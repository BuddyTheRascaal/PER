"use client";

import { useState } from "react";

interface LeadFormProps {
  source: string;
  simulation?: {
    tmi?: number;
    revenuAnnuel?: number;
    age?: number;
    economieImpot?: number;
    capitalProjete?: number;
  };
  ctaLabel?: string;
}

export default function LeadForm({ source, simulation, ctaLabel = "Prendre rendez-vous avec mon copilote" }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, telephone, source, ...simulation }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-lg border border-cockpit-border bg-cockpit-surface p-6 text-center">
        <p className="font-livree text-lg font-bold uppercase tracking-wide text-race-orange">
          Message envoyé au poste de commandement
        </p>
        <p className="mt-2 text-sm text-cockpit-muted">
          Un copilote La Défense Mondiale revient vers vous sous 48h ouvrées pour affiner votre stratégie.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-cockpit-border bg-cockpit-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-cockpit-ink">
          Nom complet
          <input
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
            placeholder="Jean Dupont"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-cockpit-ink">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
            placeholder="jean.dupont@email.com"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-cockpit-ink sm:col-span-2">
          Téléphone (optionnel)
          <input
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
            placeholder="+33 6 12 34 56 78"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 w-full -skew-x-3 bg-race-orange px-5 py-3 text-center font-livree text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-race-orange-dark disabled:opacity-60"
      >
        <span className="inline-block skew-x-3">
          {status === "loading" ? "Envoi en cours..." : ctaLabel}
        </span>
      </button>

      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">
          Une erreur est survenue. Merci de réessayer.
        </p>
      )}

      <p className="mt-3 text-xs text-cockpit-muted">
        En soumettant ce formulaire, vous acceptez d&apos;être recontacté par un
        conseiller La Défense Mondiale. Voir nos{" "}
        <a href="/mentions-legales#rgpd" className="underline">
          conditions de confidentialité
        </a>
        .
      </p>
    </form>
  );
}
