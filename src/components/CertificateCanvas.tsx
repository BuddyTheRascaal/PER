"use client";

import { useEffect, useRef, useState } from "react";
import { formatEuros } from "@/lib/per-calculator";

interface CertificateCanvasProps {
  economieImpot: number;
  capitalProjete: number;
  positionAvant: number;
  positionApres: number;
  anonyme: boolean;
  nom?: string;
}

const WIDTH = 1200;
const HEIGHT = 630;

export default function CertificateCanvas({
  economieImpot,
  capitalProjete,
  positionAvant,
  positionApres,
  anonyme,
  nom,
}: CertificateCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Fond navy sobre, corporate.
    ctx.fillStyle = "#0c1b33";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Diagonale signature, discrète.
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(WIDTH, 0);
    ctx.lineTo(WIDTH, HEIGHT * 0.55);
    ctx.lineTo(WIDTH * 0.62, 0);
    ctx.closePath();
    ctx.fillStyle = "#ff5a1f";
    ctx.globalAlpha = 0.9;
    ctx.fill();
    ctx.restore();

    // Marque : boucle de circuit ouverte + chevron road book (même dessin que src/components/Logo.tsx).
    ctx.save();
    ctx.translate(64, 44);
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0.35 * Math.PI, 2.3 * Math.PI);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(6, -14);
    ctx.lineTo(17, -9);
    ctx.lineTo(6, -4);
    ctx.lineTo(9, -9);
    ctx.closePath();
    ctx.fillStyle = "#ff5a1f";
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 22px Inter, Arial, sans-serif";
    ctx.fillText("LA DÉFENSE MONDIALE", 94, 51);

    ctx.fillStyle = "#c9a227";
    ctx.font = "500 18px Inter, Arial, sans-serif";
    ctx.fillText("CERTIFICAT DE PERFORMANCE — CIRCUIT PATRIMONIAL", 64, 106);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 52px Inter, Arial, sans-serif";
    const titleName = anonyme || !nom ? "Stratège PER" : nom;
    ctx.fillText(titleName, 64, 190);

    // Bloc positions.
    ctx.font = "500 20px Inter, Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText("POSITION GRILLE FISCALE", 64, 250);

    ctx.font = "700 90px Inter, Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillText(`P${positionAvant}`, 64, 340);

    ctx.font = "700 40px Inter, Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText("→", 210, 330);

    ctx.font = "700 100px Inter, Arial, sans-serif";
    ctx.fillStyle = "#ff5a1f";
    ctx.fillText(`P${positionApres}`, 290, 340);

    // Chiffres clés.
    const statY = 470;
    ctx.font = "500 18px Inter, Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText("ÉCONOMIE D'IMPÔT ANNUELLE", 64, statY);
    ctx.fillText("CAPITAL PROJETÉ À L'ÉCHÉANCE", 620, statY);

    ctx.font = "700 44px Inter, Arial, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(formatEuros(economieImpot), 64, statY + 48);
    ctx.fillText(formatEuros(capitalProjete), 620, statY + 48);

    ctx.font = "400 15px Inter, Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillText(
      "Simulation non contractuelle — circuitpatrimonial.fr",
      64,
      HEIGHT - 36
    );

    setPngUrl(canvas.toDataURL("image/png"));
  }, [economieImpot, capitalProjete, positionAvant, positionApres, anonyme, nom]);

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg border border-cockpit-border shadow-sm"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      />
      {pngUrl && (
        <a
          href={pngUrl}
          download="certificat-circuit-patrimonial.png"
          className="inline-block -skew-x-3 bg-anthracite px-5 py-3 font-livree text-sm font-bold uppercase tracking-wide text-white hover:bg-anthracite-2"
        >
          <span className="inline-block skew-x-3">Télécharger le certificat</span>
        </a>
      )}
    </div>
  );
}
