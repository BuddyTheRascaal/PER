"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/copilote/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Connexion impossible.");
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
      <h1 className="mt-2 font-display text-3xl uppercase text-anthracite">Connexion</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-lg border border-cockpit-border bg-cockpit-surface p-6">
        <label className="flex flex-col gap-1 text-sm font-medium text-cockpit-ink">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-cockpit-ink">
          Mot de passe
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border border-cockpit-border bg-white px-3 py-2 text-sm focus:border-race-orange focus:outline-none"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full -skew-x-3 bg-race-orange px-5 py-3 font-livree text-sm font-bold uppercase tracking-wide text-white hover:bg-race-orange-dark disabled:opacity-60"
        >
          <span className="inline-block skew-x-3">{loading ? "Connexion..." : "Se connecter"}</span>
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-cockpit-muted">
        Pas encore copilote ?{" "}
        <Link href="/espace-copilote/inscription" className="font-medium text-race-orange underline">
          Rejoindre le programme
        </Link>
      </p>
    </div>
  );
}
