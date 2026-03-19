import { CIRCUITS_DATA } from "../constants/venues.js";

export default function VenueArt({ type, color, h = 160, fill }) {
  const circuit = CIRCUITS_DATA.find((c) => c.id === type);

  // Fallback por si la ID no coincide
  if (!circuit) {
    return <div style={{ width: "100%", height: h, background: "#111" }} />;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: fill ? "100%" : h,
        background: circuit.bg,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox={circuit.viewBox}
        style={{
          width: "100%",
          height: "100%",
          padding: "12px",
          display: "block",
          overflow: "visible"
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id={`glow-${circuit.id}`}>
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient
            id={`grad-${circuit.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.7" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Capas del circuito */}
        <path
          d={circuit.path}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={circuit.path}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={circuit.path}
          fill="none"
          stroke="white"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2,28"
          opacity="0.06"
        />
        <path
          d={circuit.path}
          fill="none"
          stroke={`url(#grad-${circuit.id})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#glow-${circuit.id})`}
        />
        <path
          d={circuit.path}
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.15"
        />

        {/* Línea de meta */}
        {circuit.sfLine && (
          <line
            x1={circuit.sfLine.x1}
            y1={circuit.sfLine.y1}
            x2={circuit.sfLine.x2}
            y2={circuit.sfLine.y2}
            stroke="white"
            strokeWidth="3"
            strokeDasharray="3,3"
          />
        )}
      </svg>
    </div>
  );
}
