interface RaceTrackProps {
  progress: number; // 0..1
}

/** Piste stylisée : la voiture avance à mesure que le formulaire se remplit. */
export default function RaceTrack({ progress }: RaceTrackProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  const carX = 20 + clamped * 940;

  return (
    <svg viewBox="0 0 1000 120" className="w-full" aria-hidden>
      <line x1="20" y1="70" x2="960" y2="70" stroke="var(--cockpit-border)" strokeWidth="10" strokeLinecap="round" />
      <line
        x1="20"
        y1="70"
        x2={carX}
        y2="70"
        stroke="var(--race-orange)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {[0, 0.33, 0.66, 1].map((mark) => (
        <line
          key={mark}
          x1={20 + mark * 940}
          y1="58"
          x2={20 + mark * 940}
          y2="82"
          stroke="var(--cockpit-muted)"
          strokeWidth="2"
          opacity="0.4"
        />
      ))}
      <g transform={`translate(${carX - 18}, 44)`}>
        <rect x="0" y="10" width="42" height="16" rx="6" fill="var(--race-orange)" />
        <rect x="10" y="2" width="20" height="12" rx="4" fill="var(--livree-anthracite)" />
        <circle cx="9" cy="28" r="6" fill="var(--livree-anthracite)" />
        <circle cx="33" cy="28" r="6" fill="var(--livree-anthracite)" />
      </g>
      <g transform="translate(958, 40)">
        <rect width="10" height="40" fill="url(#checkerboard)" stroke="var(--cockpit-muted)" />
      </g>
      <defs>
        <pattern id="checkerboard" width="5" height="5" patternUnits="userSpaceOnUse">
          <rect width="5" height="5" fill="white" />
          <rect width="2.5" height="2.5" fill="var(--livree-anthracite)" />
          <rect x="2.5" y="2.5" width="2.5" height="2.5" fill="var(--livree-anthracite)" />
        </pattern>
      </defs>
    </svg>
  );
}
