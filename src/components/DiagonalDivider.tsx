interface DiagonalDividerProps {
  from?: string;
  to?: string;
  flip?: boolean;
  className?: string;
}

/** Séparateur de section façon grille de départ — habillage "livrée", jamais utilisé pour des données. */
export default function DiagonalDivider({
  from = "var(--cockpit-bg)",
  to = "var(--livree-anthracite)",
  flip = false,
  className = "",
}: DiagonalDividerProps) {
  return (
    <div
      aria-hidden
      className={`diagonal-divider ${className}`}
      style={{ background: from }}
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        <polygon points="0,80 1200,0 1200,80" fill={to} />
        <polygon points="0,80 1150,0 1180,0 30,80" fill="var(--race-orange)" opacity="0.9" />
      </svg>
    </div>
  );
}
