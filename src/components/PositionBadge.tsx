interface PositionBadgeProps {
  position: number;
  size?: "sm" | "md" | "lg";
  tone?: "orange" | "navy" | "gold";
}

const SIZES = {
  sm: "h-9 w-9 text-sm",
  md: "h-14 w-14 text-xl",
  lg: "h-20 w-20 text-3xl",
};

const TONES = {
  orange: "bg-race-orange text-white border-white/40",
  navy: "bg-ragas-navy text-white border-white/30",
  gold: "bg-ragas-gold text-anthracite border-anthracite/20",
};

/** Badge "dossard de course" — utilisé pour les positions grille et le classement copilotes. */
export default function PositionBadge({ position, size = "md", tone = "orange" }: PositionBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 -skew-x-6 items-center justify-center rounded-md border-2 font-livree font-bold ${SIZES[size]} ${TONES[tone]}`}
    >
      <span className="skew-x-6">P{position}</span>
    </span>
  );
}
