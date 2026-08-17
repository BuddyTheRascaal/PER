interface LogoProps {
  className?: string;
  /** "light" = trait clair sur fond sombre (nav, footer) ; "dark" = trait sombre sur fond clair. */
  tone?: "light" | "dark";
}

/**
 * Marque abstraite : une boucle de circuit ouverte (piste), rompue par un
 * chevron de road book — la flèche que lit un copilote de rallye. Une seule
 * forme porte les deux disciplines du site : le circuit (course en solo,
 * simulateur) et le rallye (équipage, copilotes). Pas de photo de voiture,
 * conforme au design system.
 */
export default function Logo({ className = "", tone = "light" }: LogoProps) {
  const trackColor = tone === "light" ? "#ffffff" : "var(--livree-anthracite)";

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="none"
        stroke={trackColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="86 113"
        strokeDashoffset="-8"
        transform="rotate(-38 24 24)"
      />
      <path
        d="M31 11 L41 17 L31 23 L34.2 17 Z"
        fill="var(--race-orange)"
        transform="rotate(-6 35 17)"
      />
    </svg>
  );
}
