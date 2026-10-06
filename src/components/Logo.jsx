export default function Logo({ size = 28 }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <text
        x="16"
        y="23.5"
        textAnchor="middle"
        fontFamily="Instrument Serif, Georgia, serif"
        fontSize="24"
        fill="#10120f"
      >
        Q
      </text>
    </svg>
  );
}
