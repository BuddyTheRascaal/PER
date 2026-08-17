import { Suspense } from "react";
import CertificateView from "@/components/CertificateView";

export const metadata = {
  title: "Certificat de performance — Circuit Patrimonial",
};

export default function CertificatPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-5 py-14 text-cockpit-muted">Chargement du certificat…</div>}>
      <CertificateView />
    </Suspense>
  );
}
