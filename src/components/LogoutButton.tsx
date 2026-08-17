"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/copilote/logout", { method: "POST" });
    router.push("/espace-copilote/connexion");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="-skew-x-3 border-2 border-anthracite px-4 py-2 font-livree text-xs font-bold uppercase tracking-wide text-anthracite hover:border-race-orange hover:text-race-orange"
    >
      <span className="inline-block skew-x-3">Déconnexion</span>
    </button>
  );
}
