import { useState, useEffect } from "react";

const CIRCUITS_DATA = [
  {
    id: "jerez",
    name: "Circuito de Jerez",
    subtitle: "Ángel Nieto · 4.428 km · 13 turns",
    color: "#C0392B",
    bg: "#0f0805",
    path: `M 80,95 L 290,90 C 305,90 315,95 318,108 C 321,122 315,132 305,135 L 285,138 C 275,140 268,148 268,160 C 268,172 275,182 288,185 L 318,188 C 332,190 345,200 350,216 C 356,234 350,252 338,262 C 326,272 310,274 298,268 L 275,255 C 262,248 248,248 236,255 L 188,278 C 174,285 158,282 148,272 C 136,260 136,244 148,234 L 165,220 C 174,212 176,200 170,190 C 164,180 152,175 140,178 L 108,185 C 94,188 80,182 72,170 C 62,156 62,140 72,128 L 80,95 Z`,
    sfLine: { x1: 140, y1: 88, x2: 140, y2: 102 },
    turns: [
      { x: 305, y: 112, label: "1-2\nSenna" },
      { x: 340, y: 240, label: "6\nDry Sac" },
      { x: 148, y: 256, label: "11" },
      { x: 72, y: 148, label: "13" },
    ],
    viewBox: "50 70 320 230",
  },
  {
    id: "navarra",
    name: "Circuito de Navarra",
    subtitle: "Los Arcos · 4.313 km · 15 turns (2024 layout)",
    color: "#D35400",
    bg: "#0a0805",
    path: `M 70,100 L 310,95 C 326,95 338,105 342,120 C 346,136 340,150 328,158 L 305,165 C 292,170 283,180 280,195 C 278,206 282,218 290,225 L 308,232 C 320,238 328,250 326,264 C 324,278 312,288 298,288 L 278,285 C 264,282 252,288 246,300 C 240,312 242,326 252,334 L 268,342 C 280,350 285,364 280,378 C 275,392 262,400 248,400 L 185,398 C 168,397 154,388 148,374 C 142,360 146,344 158,336 L 172,328 C 184,320 188,306 182,292 C 176,278 162,270 148,272 L 118,275 C 102,276 88,268 82,254 C 74,238 78,220 92,212 L 108,205 C 120,198 125,185 120,172 C 115,158 102,150 88,152 L 72,155 C 60,156 50,148 50,136 C 50,122 60,110 72,107 L 70,100 Z`,
    sfLine: { x1: 155, y1: 88, x2: 155, y2: 102 },
    turns: [
      { x: 334, y: 128, label: "T1" },
      { x: 300, y: 232, label: "T7" },
      { x: 248, y: 334, label: "T10" },
      { x: 148, y: 398, label: "T13\n2024" },
      { x: 82, y: 232, label: "T15" },
    ],
    viewBox: "35 80 330 340",
  },
  {
    id: "karting",
    name: "Karting Lloret",
    subtitle: "Lloret de Mar · 1.2 km · Indoor/Outdoor",
    color: "#2471A3",
    bg: "#050a14",
    path: `M 80,90 L 260,88 C 276,88 288,98 290,114 C 292,128 284,140 272,144 L 248,148 C 234,150 224,160 222,174 C 220,188 228,200 242,204 L 262,208 C 276,212 285,224 284,238 C 282,252 270,260 256,258 L 188,252 C 172,250 158,256 150,268 C 142,280 144,295 155,303 L 170,310 C 180,316 184,328 178,340 C 172,352 158,356 146,350 L 115,335 C 100,328 86,330 76,340 C 64,352 64,368 76,378 L 88,385 C 100,392 105,406 99,418 C 93,430 79,436 66,432 L 52,425 C 38,418 34,402 40,388 L 50,370 C 56,356 52,340 42,330 C 32,320 30,305 36,291 L 46,275 C 54,261 52,245 44,233 C 36,221 36,205 46,195 L 60,183 C 70,172 72,157 65,144 C 58,131 46,125 34,128 L 22,132 C 10,134 0,126 0,114 C 0,100 10,90 22,90 L 80,90 Z`,
    sfLine: { x1: 140, y1: 82, x2: 140, y2: 96 },
    turns: [
      { x: 278, y: 114, label: "T1" },
      { x: 255, y: 240, label: "T5" },
      { x: 75, y: 380, label: "T9" },
      { x: 30, y: 200, label: "T12" },
    ],
    viewBox: "-10 70 310 390",
  },
  {
    id: "airfield",
    name: "Airfield Rota",
    subtitle: "Rota, Cádiz · 2.1 km straight · No noise limit",
    color: "#1A6B3C",
    bg: "#080f08",
    path: `M 40,130 L 340,118 C 356,118 368,128 370,144 C 372,158 364,170 350,174 L 325,178 C 310,180 298,192 296,208 C 294,224 304,238 320,240 L 346,242 C 360,244 370,256 368,272 C 366,286 354,294 340,292 L 40,280 C 24,278 12,266 12,250 L 12,160 C 12,144 24,132 40,130 Z`,
    sfLine: { x1: 160, y1: 112, x2: 160, y2: 126 },
    turns: [
      { x: 358, y: 144, label: "T1" },
      { x: 310, y: 240, label: "T2" },
      { x: 20, y: 200, label: "Start" },
    ],
    viewBox: "0 100 390 210",
  },
  {
    id: "lot",
    name: "Industrial Lot BCN",
    subtitle: "Zona Franca, Barcelona · Custom autocross",
    color: "#6C3483",
    bg: "#0a0814",
    path: `M 60,80 L 280,78 C 294,78 305,88 306,102 L 308,130 C 309,144 300,156 286,158 L 245,162 C 230,163 218,174 216,189 L 212,215 C 210,230 220,244 235,246 L 262,248 C 276,250 285,262 284,277 L 280,305 C 278,320 265,330 250,328 L 165,320 C 150,318 138,328 136,343 L 132,368 C 130,383 118,392 103,390 L 72,386 C 56,384 46,370 48,354 L 52,320 C 54,304 44,290 30,286 L 15,282 C 2,278 -5,265 -2,251 L 6,190 C 8,174 2,159 -8,148 L -18,138 C -28,126 -26,110 -14,100 L 10,85 C 20,78 40,76 60,80 Z`,
    sfLine: { x1: 145, y1: 72, x2: 145, y2: 86 },
    turns: [
      { x: 296, y: 115, label: "T1" },
      { x: 248, y: 262, label: "T4" },
      { x: 100, y: 390, label: "T7" },
      { x: 0, y: 235, label: "T9" },
    ],
    viewBox: "-30 60 360 360",
  },
];

const VENUES = [
  {
    id: 1,
    name: "Circuito de Jerez",
    location: "Jerez de la Frontera, ES",
    type: "Circuit",
    price: 320,
    rating: 4.9,
    reviews: 214,
    length: "4.4 km",
    noise: "≤98 dB",
    tags: ["GT", "Supercars", "Instructor available"],
    available: true,
    hot: true,
    img: "jerez",
    color: "#C0392B",
    sessions: ["09:00", "13:00", "17:00"],
  },
  {
    id: 2,
    name: "Airfield Rota",
    location: "Rota, Cádiz, ES",
    type: "Airfield",
    price: 140,
    rating: 4.7,
    reviews: 88,
    length: "2.1 km straight",
    noise: "No limit",
    tags: ["EV friendly", "Drag", "Open days"],
    available: true,
    hot: false,
    img: "airfield",
    color: "#1A6B3C",
    sessions: ["08:00", "11:00", "15:00"],
  },
  {
    id: 3,
    name: "Karting Lloret",
    location: "Lloret de Mar, ES",
    type: "Karting",
    price: 65,
    rating: 4.6,
    reviews: 412,
    length: "1.2 km",
    noise: "≤90 dB",
    tags: ["Karting", "Beginner OK", "Kids"],
    available: true,
    hot: false,
    img: "karting",
    color: "#2471A3",
    sessions: ["10:00", "12:00", "14:00", "16:00"],
  },
  {
    id: 4,
    name: "Industrial Lot BCN",
    location: "Zona Franca, Barcelona, ES",
    type: "Lot",
    price: 90,
    rating: 4.4,
    reviews: 57,
    length: "Custom layout",
    noise: "≤95 dB",
    tags: ["Autocross", "Drift", "Unique venue"],
    available: false,
    hot: false,
    img: "lot",
    color: "#6C3483",
    sessions: ["09:00", "14:00"],
  },
  {
    id: 5,
    name: "Circuito Navarra",
    location: "Los Arcos, Navarra, ES",
    type: "Circuit",
    price: 275,
    rating: 4.8,
    reviews: 163,
    length: "3.9 km",
    noise: "≤95 dB",
    tags: ["GT", "Motorcycles", "Pro track"],
    available: true,
    hot: true,
    img: "navarra",
    color: "#D35400",
    sessions: ["08:00", "11:00", "15:00"],
  },
];

const FILTERS = ["All", "Circuit", "Karting", "Bring Car", "Car Provided"];

const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    search: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    heart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    hearth_filled: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    star: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    home: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    ticket: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
      </svg>
    ),
    user: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    chevron_left: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),
    chevron_right: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    shield: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    volume: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    ),
    ruler: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4z" />
        <path d="m7.5 10.5 2 2" />
        <path d="m10.5 7.5 2 2" />
        <path d="m13.5 4.5 2 2" />
        <path d="m4.5 13.5 2 2" />
      </svg>
    ),
    clock: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    check: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    fire: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        stroke="none"
      >
        <path d="M12 2C12 2 8 6 8 10C8 10 6 8 6 8C6 8 4 13 7 16C7 16 6 17 6 18C6 20.21 8.69 22 12 22C15.31 22 18 20.21 18 18C18 17 17 16 17 16C20 13 18 8 18 8C18 8 16 10 16 10C16 6 12 2 12 2Z" />
      </svg>
    ),
    location: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    zap: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        stroke="none"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    map_pin: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    car: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2" />
        <circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
        <path d="M3 9h18" />
      </svg>
    ),
    id_card: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="12" r="2.5" />
        <path d="M14 10h4" /><path d="M14 14h4" />
      </svg>
    ),
    globe: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    chevron_down: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
    edit: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    trash: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" /><path d="M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    ),
  };
  return icons[name] || null;
};

const VenueArt = ({ type, color, h = 160, fill }) => {
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
};

const SplashScreen = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes ring1{0%{transform:scale(0.6);opacity:0.6}100%{transform:scale(2.8);opacity:0}}
        @keyframes ring2{0%{transform:scale(0.6);opacity:0.4}100%{transform:scale(2.2);opacity:0}}
        @keyframes logoIn{0%{opacity:0;transform:scale(0.6)}60%{opacity:1;transform:scale(1.06)}100%{opacity:1;transform:scale(1)}}
        @keyframes tagIn{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes dotPulse{0%,100%{opacity:0.3}50%{opacity:1}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important;}}
      `}</style>
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "2px solid #FF4500",
          animation: "ring1 2s ease-out 0.3s infinite",
          opacity: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 140,
          height: 140,
          borderRadius: "50%",
          border: "1px solid #FF4500",
          animation: "ring2 2s ease-out 0.6s infinite",
          opacity: 0,
        }}
      />
      <div
        style={{
          animation: "logoIn 0.9s cubic-bezier(.34,1.56,.64,1) forwards",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 44,
            fontWeight: 900,
            letterSpacing: "-2px",
            color: "white",
            lineHeight: 1,
          }}
        >
          Track<span style={{ color: "#FF4500" }}>Swap</span>
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#888",
            letterSpacing: 4,
            marginTop: 8,
            animation: "tagIn 0.5s 0.9s ease-out both",
          }}
        >
          THE TRACK DAY MARKETPLACE
        </div>
      </div>
      <div
        style={{ position: "absolute", bottom: 50, display: "flex", gap: 8 }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#FF4500",
              animation: `dotPulse 1.2s ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const MapScreen = ({ onVenue }) => {
  const [selected, setSelected] = useState(null);
  const [locating, setLocating] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLocating(false), 1600);
    return () => clearTimeout(t);
  }, []);

  const UX = 182, UY = 310;

  const PINS = [
    { id: 1, x: 110, y: 415, dist: "3.2 km", color: "#C0392B" },
    { id: 2, x: 72,  y: 455, dist: "12.5 km", color: "#1A6B3C" },
    { id: 3, x: 280, y: 188, dist: "28.1 km", color: "#2471A3" },
    { id: 4, x: 252, y: 148, dist: "31.7 km", color: "#6C3483" },
    { id: 5, x: 308, y: 102, dist: "45.3 km", color: "#D35400" },
  ];

  const selVenue = selected ? VENUES.find((v) => v.id === selected) : null;

  return (
    <div style={{ width: "100%", height: "100%", background: "#080c12", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <style>{`
        @keyframes userRing{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:0;transform:scale(2.2)}}
        @keyframes gpsBlink{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        .map-pin-btn{cursor:pointer;transition:opacity 0.15s;}
        .map-pin-btn:active{opacity:0.7;}
      `}</style>

      {/* Map canvas — fills everything */}
      <div style={{ position: "absolute", inset: 0 }}>
        <svg viewBox="0 0 370 760" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="xMidYMid slice">
          {/* Base */}
          <rect width="370" height="760" fill="#0a0e18" />

          {/* Grid */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="370" y2={i * 40} stroke="#0f1520" strokeWidth="1" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 34} y1="0" x2={i * 34} y2="760" stroke="#0f1520" strokeWidth="1" />
          ))}

          {/* Parks */}
          <rect x="30" y="90" width="55" height="40" rx="5" fill="#0d1f10" />
          <rect x="295" y="340" width="48" height="38" rx="5" fill="#0d1f10" />
          <rect x="140" y="490" width="65" height="50" rx="5" fill="#0d1f10" />

          {/* Water */}
          <path d="M 0,620 Q 80,610 160,625 Q 240,640 370,615 L 370,760 L 0,760 Z" fill="#0b1422" />

          {/* Main roads */}
          <path d="M 0,310 Q 90,305 182,310 Q 270,315 370,308" fill="none" stroke="#14213a" strokeWidth="14" />
          <path d="M 0,310 Q 90,305 182,310 Q 270,315 370,308" fill="none" stroke="#1c2e50" strokeWidth="8" />
          <path d="M 182,0 Q 180,120 182,310 Q 184,430 182,760" fill="none" stroke="#14213a" strokeWidth="10" />
          <path d="M 182,0 Q 180,120 182,310 Q 184,430 182,760" fill="none" stroke="#1c2e50" strokeWidth="5" />

          {/* Secondary roads */}
          <path d="M 0,455 Q 60,448 115,455 Q 165,462 220,450" fill="none" stroke="#111b2e" strokeWidth="7" />
          <path d="M 250,0 Q 248,80 252,148 Q 255,220 252,310" fill="none" stroke="#111b2e" strokeWidth="6" />
          <path d="M 110,0 Q 108,90 112,188 Q 115,260 110,310" fill="none" stroke="#111b2e" strokeWidth="6" />
          <path d="M 0,188 Q 100,183 185,188 Q 265,193 370,182" fill="none" stroke="#111b2e" strokeWidth="5" />
          <path d="M 0,148 Q 120,143 185,148 Q 248,153 370,142" fill="none" stroke="#0f1828" strokeWidth="4" />

          {/* Roundabout at user */}
          <circle cx={UX} cy={UY} r="22" fill="none" stroke="#14213a" strokeWidth="12" />
          <circle cx={UX} cy={UY} r="22" fill="none" stroke="#1c2e50" strokeWidth="6" />

          {/* Distance rings from user */}
          <circle cx={UX} cy={UY} r="60"  fill="none" stroke="#FF4500" strokeWidth="0.6" strokeDasharray="4,8" opacity="0.12" />
          <circle cx={UX} cy={UY} r="130" fill="none" stroke="#FF4500" strokeWidth="0.6" strokeDasharray="4,8" opacity="0.08" />
          <circle cx={UX} cy={UY} r="210" fill="none" stroke="#FF4500" strokeWidth="0.6" strokeDasharray="4,8" opacity="0.05" />

          {/* User location ring (animated via filter trick) */}
          <circle cx={UX} cy={UY} r="26" fill="rgba(33,150,243,0.08)" />
          <circle cx={UX} cy={UY} r="15" fill="rgba(33,150,243,0.16)" />
          <circle cx={UX} cy={UY} r="8"  fill="#2196F3" />
          <circle cx={UX} cy={UY} r="4"  fill="white" />
          <circle cx={UX} cy={UY} r="2"  fill="#2196F3" />

          {/* Circuit pins */}
          {PINS.map((pin) => {
            const isSel = selected === pin.id;
            const pinVenue = VENUES.find(v => v.id === pin.id);
            return (
              <g key={pin.id} className="map-pin-btn"
                role="button" tabIndex={0} aria-label={pinVenue ? `${pinVenue.name} — ${pin.dist} away` : `Circuit ${pin.id}`}
                aria-pressed={isSel}
                onClick={() => setSelected(isSel ? null : pin.id)}
                onKeyDown={e => e.key === "Enter" && setSelected(isSel ? null : pin.id)}>
                <circle cx={pin.x} cy={pin.y + 3} r={isSel ? 18 : 14} fill="rgba(0,0,0,0.35)" />
                <circle cx={pin.x} cy={pin.y} r={isSel ? 18 : 14} fill={pin.color} />
                <circle cx={pin.x} cy={pin.y} r={isSel ? 18 : 14} fill="none" stroke="white" strokeWidth={isSel ? 2.5 : 1.5} opacity="0.5" />
                {/* track icon */}
                <path d="M -5,-2 L 3,-3 C 5,-3 6,-1 5,1 C 4,3 2,3 0,3 L -4,3 C -5,3 -6,5 -5,6 L 3,6"
                  fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"
                  transform={`translate(${pin.x},${pin.y})`} opacity="0.9"
                />
                {isSel && (
                  <circle cx={pin.x} cy={pin.y} r="28" fill="none" stroke={pin.color} strokeWidth="1.5" opacity="0.35" strokeDasharray="3,4" />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Header overlay */}
      <div style={{ position: "relative", zIndex: 10, padding: "52px 20px 14px", background: "linear-gradient(180deg,rgba(8,12,18,0.98) 65%,transparent 100%)", flexShrink: 0 }}>
        <h2 style={{ fontFamily: "monospace", fontSize: 11, color: "#FF4500", letterSpacing: 3, marginBottom: 5, margin: "0 0 5px", fontWeight: 700 }}>
          NEAR YOU
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 24, fontWeight: 700, color: "white", lineHeight: 1.2 }}>
            Nearby<br />Circuits
          </div>
          <div style={{
            fontFamily: "monospace", fontSize: 10, letterSpacing: 1,
            padding: "6px 12px", borderRadius: 20,
            color: locating ? "#FF4500" : "#4CAF50",
            background: locating ? "rgba(255,69,0,0.1)" : "rgba(76,175,80,0.1)",
            border: `1.5px solid ${locating ? "#FF4500" : "#4CAF50"}`,
            animation: locating ? "gpsBlink 1s infinite" : "none",
          }}>
            {locating ? "● LOCATING..." : "● GPS ACTIVE"}
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{ position: "absolute", bottom: 73, left: 0, right: 0, zIndex: 10 }}>
        {selVenue ? (
          <div key={selVenue.id} style={{ margin: "0 12px", borderRadius: 20, background: "rgba(14,14,14,0.97)", border: "1px solid #222", overflow: "hidden", animation: "slideUp 0.25s ease" }}>
            <VenueArt type={selVenue.img} color={selVenue.color} h={100} />
            <div style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 700, color: "white", marginBottom: 2 }}>{selVenue.name}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", letterSpacing: 1 }}>{selVenue.location}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 700, color: "#FF4500" }}>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(selVenue.price)}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#777" }}>/SESSION</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {selVenue.tags.slice(0, 2).map((t) => (
                  <span key={t} style={{ fontFamily: "monospace", fontSize: 8, color: "#666", background: "#151515", padding: "3px 8px", borderRadius: 20, border: "1px solid #222", letterSpacing: 1 }}>{t.toUpperCase()}</span>
                ))}
                <span style={{ fontFamily: "monospace", fontSize: 8, color: "#666", letterSpacing: 1 }}>
                  {PINS.find(p => p.id === selected)?.dist}
                </span>
              </div>
              <button onClick={() => onVenue(selVenue)} style={{ width: "100%", background: "#FF4500", border: "none", borderRadius: 12, padding: "12px", fontFamily: "monospace", fontSize: 11, letterSpacing: 2, color: "white", cursor: "pointer" }}>
                VIEW CIRCUIT →
              </button>
            </div>
          </div>
        ) : (
          <div style={{ margin: "0 12px", borderRadius: 20, background: "rgba(12,12,14,0.96)", border: "1px solid #1a1a1a", padding: "16px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#777", letterSpacing: 2, marginBottom: 12 }}>
              NEAREST
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {PINS.slice(0, 3).map((pin) => {
                const v = VENUES.find((x) => x.id === pin.id);
                if (!v) return null;
                return (
                  <button key={pin.id} onClick={() => setSelected(pin.id)} 
                    onKeyDown={e => (e.key === "Enter" || e.key === " ") && setSelected(pin.id)}
                    type="button"
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1.5px solid #141414", cursor: "pointer", background: "none", border: "none", width: "100%", textAlign: "left" }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: pin.color, flexShrink: 0, boxShadow: `0 0 8px ${pin.color}` }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 700, color: "white" }}>{v.name}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: 1 }}>{pin.dist} · {v.type.toUpperCase()}</div>
                    </div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 700, color: "#FF4500" }}>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(v.price)}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HomeScreen = ({ onVenue, favorites, toggleFav }) => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  
  const filtered = VENUES.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                         v.location.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filter === "All") return true;
    if (filter === "Bring Car") return v.type !== "Karting";
    if (filter === "Car Provided") return v.type === "Karting";
    return v.type === filter;
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .ts-card{transition:transform 0.15s,box-shadow 0.15s;cursor:pointer;}
        .ts-card:active{transform:scale(0.97);}
        .ts-filter{border:none;cursor:pointer;transition:background 0.2s,color 0.2s,border-color 0.2s;white-space:nowrap;flex-shrink:0;}
        ::-webkit-scrollbar{display:none;}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important;}}
      `}</style>

      {/* Header */}
      <div
        style={{
          padding: "52px 20px 16px",
          background: "linear-gradient(180deg,#0f0f0f 0%,#080808 100%)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 18,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#FF4500",
                letterSpacing: 3,
                marginBottom: 5,
                fontWeight: 700,
              }}
            >
              GOOD MORNING, ALEX
            </div>
            <div
              style={{
                fontFamily: "Georgia,serif",
                fontSize: 28,
                fontWeight: 700,
                color: "white",
                lineHeight: 1.15,
              }}
            >
              Find your
              <br />
              next track day.
            </div>
          </div>
        </div>
        <style>{`
          .search-form:focus-within { border-color: #FF4500 !important; box-shadow: 0 0 0 1px #FF4500; }
          .search-input::placeholder { color: #666; }
        `}</style>
        <form onSubmit={e => e.preventDefault()}
          className="search-form"
          style={{
            background: "#151515",
            borderRadius: 14,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "2px solid #222",
            transition: "all 0.2s ease"
          }}
        >
          <Icon name="search" size={15} color="#888" aria-hidden="true" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            placeholder="Circuit, city, venue type..."
            aria-label="Search circuits, cities or venue types"
            autoComplete="off"
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: 14,
              fontFamily: "Georgia,serif",
              flex: 1,
              width: "100%",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#FF4500",
              borderRadius: 8,
              padding: "8px 14px",
              minHeight: 36,
              fontFamily: "monospace",
              fontSize: 11,
              color: "white",
              letterSpacing: 1,
              flexShrink: 0,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            GO
          </button>
        </form>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "10px 20px 12px",
          overflowX: "auto",
          flexShrink: 0,
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            className="ts-filter"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            style={{
              padding: "11px 18px",
              minHeight: 44,
              borderRadius: 22,
              fontSize: 12,
              fontFamily: "monospace",
              letterSpacing: 1,
              background: filter === f ? "#FF4500" : "#151515",
              color: filter === f ? "white" : "#aaa",
              border: filter === f ? "2.5px solid #FF4500" : "1.5px solid #222",
              fontWeight: filter === f ? 800 : 500,
            }}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
        {/* Hot section */}
        {VENUES.filter((v) => v.hot && (filter === "All" || v.type === filter))
          .length > 0 && (
          <div style={{ marginBottom: 22 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 12,
              }}
            >
              <Icon name="fire" size={13} color="#FF4500" aria-hidden="true" />
              <h2
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "#FF4500",
                  letterSpacing: 2,
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                HOT THIS WEEK
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                overflowX: "auto",
                paddingBottom: 4,
              }}
            >
              {VENUES.filter(
                (v) => v.hot && (filter === "All" || v.type === filter)
              ).map((v) => (
                <button
                  key={v.id}
                  className="ts-card"
                  onClick={() => onVenue(v)}
                  type="button"
                  style={{
                    minWidth: 220,
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1.5px solid #222",
                    flexShrink: 0,
                    animation: "fadeUp 0.4s ease both",
                    background: "#111",
                    padding: 0,
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <VenueArt type={v.img} color={v.color} h={120} />
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: "rgba(0,0,0,0.8)",
                        borderRadius: 20,
                        padding: "4px 10px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Icon name="star" size={10} color="#FFD700" />
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 10,
                          color: "white",
                          fontWeight: 700,
                        }}
                      >
                        {v.rating}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <h3
                      style={{
                        fontFamily: "Georgia,serif",
                        fontSize: 16,
                        fontWeight: 700,
                        color: "white",
                        marginBottom: 4,
                        margin: "0 0 4px",
                      }}
                    >
                      {v.name}
                    </h3>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: "#aaa",
                        letterSpacing: 1,
                      }}
                    >
                      {v.location}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 12,
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontFamily: "Georgia,serif",
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#FF4500",
                          }}
                        >
                          {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(v.price)}
                        </span>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            color: "#999",
                            marginLeft: 4,
                          }}
                        >
                          /session
                        </span>
                      </div>
                      <div
                        style={{
                          background: v.available ? "#0d2a0d" : "#2a0d0d",
                          borderRadius: 20,
                          padding: "4px 12px",
                          fontFamily: "monospace",
                          fontSize: 10,
                          color: v.available ? "#4CAF50" : "#F44336",
                          fontWeight: 700,
                          border: `1px solid ${v.available ? "#4CAF5044" : "#F4433644"}`,
                        }}
                      >
                        {v.available ? "OPEN" : "FULL"}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* All venues */}
        <div
          aria-live="polite"
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            color: "#777",
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          {filtered.length} VENUES FOUND
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((v, i) => (
            <button
              key={v.id}
              className="ts-card"
              onClick={() => onVenue(v)}
              type="button"
              style={{
                borderRadius: 20,
                border: "1.5px solid #1a1a1a",
                animation: `fadeUp 0.4s ${i * 0.06}s ease both`,
                display: "flex",
                background: "#0f0f0f",
                padding: 0,
                textAlign: "left",
                cursor: "pointer",
                width: "100%",
                overflow: "hidden",
                alignItems: "stretch"
              }}
            >
              <div style={{ width: 100, flexShrink: 0, background: "#080808" }}>
                <VenueArt type={v.img} color={v.color} fill />
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "14px 16px",
                  position: "relative",
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFav(v.id);
                  }}
                  aria-label={favorites.has(v.id) ? `Remove ${v.name} from favourites` : `Add ${v.name} to favourites`}
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  <Icon
                    name={favorites.has(v.id) ? "hearth_filled" : "heart"}
                    size={20}
                    color={favorites.has(v.id) ? "#FF4500" : "#444"}
                  />
                </button>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: v.color,
                    letterSpacing: 2,
                    marginBottom: 2,
                    fontWeight: 800,
                  }}
                >
                  {v.type.toUpperCase()}
                </div>
                <h3
                  style={{
                    fontFamily: "Georgia,serif",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "white",
                    marginBottom: 2,
                    paddingRight: 30,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {v.name}
                </h3>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    color: "#888",
                    marginBottom: 10,
                    fontWeight: 600
                  }}
                >
                  {v.location}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    marginBottom: 10,
                  }}
                >
                  {v.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "#1a1a1a",
                        borderRadius: 6,
                        padding: "4px 10px",
                        fontFamily: "monospace",
                        fontSize: 9,
                        color: "#aaa",
                        border: "1px solid #222",
                        fontWeight: 700,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 800, color: "white" }}>{v.price} €</span>
                    <span style={{ fontFamily: "monospace", fontSize: 10, color: "#666", fontWeight: 700 }}>/SESSION</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Icon name="star" size={12} color="#FFD700" />
                    <span style={{ fontFamily: "monospace", fontSize: 12, color: "white", fontWeight: 800 }}>{v.rating}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const DetailScreen = ({ venue, onBack, onBook, isFav, toggleFav }) => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 8)); // Today: March 8, 2026
  const [tab, setTab] = useState("info");
  const [briefingComplete, setBriefingComplete] = useState(false);

  // Calendar State
  const today = new Date(2026, 2, 8);
  const [viewMonth, setViewMonth] = useState(2); // March
  const [viewYear, setViewYear] = useState(2026);

  // Calendar Helpers
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startDay = new Date(viewYear, viewMonth, 1).getDay();
  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const handlePrevMonth = () => {
    if (viewYear === 2026 && viewMonth === 2) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isDateSelected = (d) =>
    selectedDate &&
    selectedDate.getDate() === d &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getFullYear() === viewYear;

  const isPastDate = (d) => {
    const date = new Date(viewYear, viewMonth, d);
    return date < today;
  };

  const isMinMonth = viewYear === 2026 && viewMonth === 2;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .sess-btn{border:none;cursor:pointer;transition:background 0.18s,border-color 0.18s,box-shadow 0.18s;width:100%;text-align:left;}
        .sess-btn:active{transform:scale(0.97);}
        ::-webkit-scrollbar{display:none;}
      `}</style>

      {/* Hero */}
      <div style={{ position: "relative", flexShrink: 0, height: 220, overflow: "hidden" }}>
        <img 
          src={venue.type === "Karting" 
            ? "https://images.unsplash.com/photo-1530906358829-e84b2769270f?auto=format&fit=crop&q=80&w=800" 
            : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"} 
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg,rgba(8,8,8,0) 0%,rgba(8,8,8,0.8) 70%,#080808 100%)",
          }}
        />
        <button
          onClick={onBack}
          aria-label="Go back"
          style={{
            position: "absolute",
            top: 50,
            left: 16,
            background: "rgba(0,0,0,0.65)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10
          }}
        >
          <Icon name="chevron_left" size={18} color="white" />
        </button>
        <button
          onClick={() => toggleFav(venue.id)}
          aria-label={isFav ? `Remove ${venue.name} from favourites` : `Add ${venue.name} to favourites`}
          style={{
            position: "absolute",
            top: 50,
            right: 16,
            background: "rgba(0,0,0,0.65)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10
          }}
        >
          <Icon
            name={isFav ? "hearth_filled" : "heart"}
            size={15}
            color={isFav ? "#FF4500" : "white"}
          />
        </button>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 20,
            background: venue.color,
            borderRadius: 5,
            padding: "4px 12px",
            fontFamily: "monospace",
            fontSize: 10,
            color: "white",
            letterSpacing: 2,
            fontWeight: 700,
            zIndex: 5
          }}
        >
          {venue.type.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 20px 110px",
          marginTop: -16,
          animation: "slideUp 0.35s ease both",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 6,
          }}
        >
          <h1
            style={{
              fontFamily: "Georgia,serif",
              fontSize: 24,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
              flex: 1,
              paddingRight: 12,
              margin: 0,
            }}
          >
            {venue.name}
          </h1>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div
              style={{
                fontFamily: "Georgia,serif",
                fontSize: 24,
                fontWeight: 700,
                color: "#FF4500",
              }}
            >
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(venue.price)}
            </div>
            <div
              style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}
            >
              /session
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 18,
          }}
        >
          <Icon name="location" size={12} color="#aaa" />
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>
            {venue.location}
          </span>
          <span style={{ color: "#888", marginLeft: 6 }}>·</span>
          <Icon name="star" size={10} color="#FFD700" />
          <span style={{ fontFamily: "monospace", fontSize: 10, color: "#aaa", fontWeight: 700 }}>
            {venue.rating} ({venue.reviews})
          </span>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 8,
            marginBottom: 18,
          }}
        >
          {[
            { icon: "ruler", label: "LENGTH", val: venue.length },
            { icon: "volume", label: "NOISE", val: venue.noise },
            { icon: "shield", label: "INSURANCE", val: "Included" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#111",
                borderRadius: 12,
                padding: "12px 8px",
                border: "1px solid #1a1a1a",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 6,
                }}
              >
                <Icon name={s.icon} size={15} color={venue.color} />
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#aaa",
                  letterSpacing: 1,
                  marginBottom: 3,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 11,
                  color: "white",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {s.val}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginBottom: 16,
            background: "#111",
            borderRadius: 14,
            padding: 4,
            border: "2px solid #1a1a1a",
          }}
        >
          {["info", "sessions", "safety"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              type="button"
              style={{
                flex: 1,
                padding: "10px",
                minHeight: 40,
                borderRadius: 10,
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: 1,
                background: tab === t ? "#FF4500" : "transparent",
                color: tab === t ? "white" : "#aaa",
                border: tab === t ? "2.5px solid #FF4500" : "none",
                cursor: "pointer",
                transition: "all 0.2s",
                fontWeight: 700,
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {tab === "info" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Editorial Tagline */}
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: venue.color, letterSpacing: 2, marginBottom: 8, fontWeight: 800 }}>THE EXPERIENCE</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1.3 }}>
                {venue.type === "Circuit" ? "FIA-GRADE PRECISION. BUILT FOR PEAK PERFORMANCE AND HIGH-SPEED DYNAMICS." :
                 venue.type === "Karting" ? "REACTIVE AGILITY. TECHNICAL CORNERING IN A CONTROLLED ADRENALINE ENVIRONMENT." :
                 venue.type === "Airfield" ? "UNRESTRICTED VELOCITY. VAST TARMAC EXPANSE WITH ZERO NOISE LIMITS." :
                 "URBAN DYNAMICS. CONFIGURABLE LAYOUTS FOR PRECISION DRIFT AND AUTOCROSS."}
              </div>
            </div>

            {/* Track Blueprint Card */}
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#666", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>TRACK BLUEPRINT</div>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1.5px solid #1a1a1a", background: "#111" }}>
                <VenueArt type={venue.img} color={venue.color} h={180} />
              </div>
            </div>

            {/* Technical Spec Grid */}
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#666", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>TECHNICAL SPECS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { l: "LENGTH", v: venue.length || "VARIES" },
                  { l: "TURNS", v: venue.type === "Circuit" ? "12-15" : "8-10" },
                  { l: "SURFACE", v: venue.type === "Lot" ? "POLISHED CONCRETE" : "ASPHALT" },
                  { l: "NOISE", v: venue.noise || "UNLIMITED" }
                ].map(spec => (
                  <div key={spec.l} style={{ background: "#111", padding: "12px 16px", borderRadius: 12, border: "1px solid #1a1a1a" }}>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: "#aaa", marginBottom: 4, fontWeight: 700 }}>{spec.l}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "white", fontWeight: 700 }}>{spec.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Ratings */}
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#666", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>TRACK CHARACTERISTICS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { l: "TECHNICALITY", p: venue.type === "Karting" ? 95 : 75 },
                  { l: "ADRENALINE", p: venue.type === "Airfield" ? 90 : 85 },
                  { l: "BEGINNER FRIENDLY", p: venue.type === "Karting" ? 90 : 60 }
                ].map(rat => (
                  <div key={rat.l}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: "#ccc", fontWeight: 700 }}>{rat.l}</span>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: venue.color, fontWeight: 800 }}>{rat.p}%</span>
                    </div>
                    <div style={{ height: 5, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${rat.p}%`, background: venue.color, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {venue.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    background: `${venue.color}15`,
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "white",
                    border: `1px solid ${venue.color}44`,
                    fontWeight: 700,
                    letterSpacing: 0.5
                  }}
                >
                  #{t.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {tab === "sessions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Calendar Widget */}
            <div style={{ 
              background: "#111", 
              borderRadius: 16, 
              padding: "16px", 
              border: "1px solid #1a1a1a"
            }}>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: 12 
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button 
                    onClick={handlePrevMonth}
                    disabled={isMinMonth}
                    type="button"
                    aria-label="Previous month"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 8,
                      cursor: isMinMonth ? "default" : "pointer",
                      opacity: isMinMonth ? 0.2 : 1,
                      color: "white",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Icon name="chevron_left" size={16} />
                  </button>
                  <div style={{ 
                    fontFamily: "Georgia,serif", 
                    fontSize: 16, 
                    fontWeight: 700, 
                    color: "white",
                    minWidth: 120,
                    textAlign: "center"
                  }}>{monthNames[viewMonth]} {viewYear}</div>
                  <button 
                    onClick={handleNextMonth}
                    type="button"
                    aria-label="Next month"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 8,
                      cursor: "pointer",
                      color: "white",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Icon name="chevron_right" size={16} />
                  </button>
                </div>
                <div style={{ 
                  fontFamily: "monospace", 
                  fontSize: 10, 
                  color: venue.color, 
                  letterSpacing: 1,
                  fontWeight: 700
                }}>SELECT DATE</div>
              </div>

              {/* Day headers */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(7, 1fr)", 
                gap: 4, 
                marginBottom: 10 
              }}>
                {["S", "M", "T", "W", "T", "F", "S"].map(d => (
                  <div key={d} style={{ 
                    fontFamily: "monospace", 
                    fontSize: 10, 
                    color: "#888", 
                    textAlign: "center",
                    fontWeight: 700
                  }}>{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(7, 1fr)", 
                gap: 6 
              }}>
                {/* Empty cells for start day padding */}
                {[...Array(startDay)].map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1;
                  const past = isPastDate(day);
                  const selected = isDateSelected(day);
                  
                  return (
                    <button
                      key={day}
                      disabled={past}
                      type="button"
                      aria-label={`${day} ${monthNames[viewMonth]} ${viewYear}${selected ? ', selected' : ''}`}
                      aria-pressed={selected}
                      onClick={() => {
                        setSelectedDate(new Date(viewYear, viewMonth, day));
                        setSelectedSession(null);
                      }}
                      style={{
                        padding: "10px 0",
                        borderRadius: 10,
                        border: "2px solid",
                        borderColor: selected ? venue.color : "transparent",
                        background: selected ? `${venue.color}25` : past ? "transparent" : "#181818",
                        cursor: past ? "default" : "pointer",
                        fontFamily: "monospace",
                        fontSize: 11,
                        fontWeight: selected ? 800 : 500,
                        color: selected ? "white" : past ? "#444" : "#ccc",
                        transition: "all 0.15s",
                        opacity: past ? 0.3 : 1
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sessions List */}
            <div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "#aaa",
                  letterSpacing: 2,
                  marginBottom: 12,
                  fontWeight: 700,
                }}
              >
                AVAILABLE SLOTS · {selectedDate ? selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).toUpperCase() : 'TODAY'}
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {venue.sessions.map((s, i) => (
                  <button
                    key={s}
                    className="sess-btn"
                    onClick={() => setSelectedSession(s)}
                    type="button"
                    aria-pressed={selectedSession === s}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 18px",
                      borderRadius: 14,
                      background: selectedSession === s ? "#1a0900" : "#111",
                      border: `2px solid ${
                        selectedSession === s ? venue.color : "#1a1a1a"
                      }`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Icon
                        name="clock"
                        size={16}
                        color={selectedSession === s ? venue.color : "#666"}
                      />
                      <div>
                        <div
                          style={{
                            fontFamily: "Georgia,serif",
                            fontSize: 17,
                            fontWeight: 700,
                            color: "white",
                          }}
                        >
                          {s}
                        </div>
                        <div
                          style={{
                            fontFamily: "monospace",
                            fontSize: 12,
                            color: "#aaa",
                          }}
                        >
                          {i === 0 ? "EARLY BIRD · " : ""}2H SESSION
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          fontFamily: "monospace",
                          fontSize: 10,
                          color: "#4CAF50",
                          fontWeight: 700,
                        }}
                      >
                        {3 - i} SLOTS LEFT
                      </div>
                      {selectedSession === s && (
                        <Icon name="check" size={16} color={venue.color} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "safety" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Video Player Placeholder */}
            <div style={{ 
              width: "100%", 
              aspectRatio: "16/9", 
              background: "#111", 
              borderRadius: 16, 
              border: "2px solid #1a1a1a",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}>
              <div style={{ 
                position: "absolute", 
                inset: 0, 
                background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1530906358829-e84b2769270f?auto=format&fit=crop&q=80&w=800')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.6
              }} />
              <div style={{ 
                width: 60, 
                height: 60, 
                borderRadius: "50%", 
                background: "rgba(255,69,0,0.9)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                zIndex: 2,
                boxShadow: "0 0 30px rgba(255,69,0,0.4)"
              }}>
                <Icon name="zap" size={30} color="white" />
              </div>
              <div style={{ 
                position: "absolute", 
                bottom: 12, 
                left: 16, 
                zIndex: 2,
                fontFamily: "monospace",
                fontSize: 10,
                color: "white",
                letterSpacing: 1
              }}>
                MANDATORY SAFETY VIDEO · 8:12
              </div>
            </div>

            {/* Briefing Checklist */}
            <div style={{ background: "#111", borderRadius: 16, padding: "20px", border: "1.5px solid #1a1a1a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "white" }}>Briefing Checklist</h3>
                <div style={{ 
                  fontFamily: "monospace", 
                  fontSize: 9, 
                  color: briefingComplete ? "#4CAF50" : "#FFD700",
                  padding: "4px 10px",
                  borderRadius: 20,
                  background: briefingComplete ? "rgba(76,175,80,0.1)" : "rgba(255,215,0,0.1)",
                  border: `1px solid ${briefingComplete ? "#4CAF50" : "#FFD700"}`
                }}>
                  {briefingComplete ? "COMPLETE" : "PENDING"}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { t: "Track Flags & Signals", d: "Understanding yellow, red, and checkered flags." },
                  { t: "Pit Lane Protocol", d: "Speed limits and entry/exit procedures." },
                  { t: "Overtaking Rules", d: "Safe zones and 'point-by' requirements." },
                  { t: "Safety Gear Check", d: "Helmet, suit, and glove standards." }
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14 }}>
                    <div style={{ 
                      width: 18, 
                      height: 18, 
                      borderRadius: 4, 
                      border: "1.5px solid #333",
                      background: briefingComplete ? "#4CAF50" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2
                    }}>
                      {briefingComplete && <Icon name="check" size={12} color="white" />}
                    </div>
                    <div>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "white", marginBottom: 2 }}>{item.t}</div>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "#888", lineHeight: 1.4 }}>{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              {!briefingComplete && (
                <button 
                  onClick={() => setBriefingComplete(true)}
                  style={{
                    width: "100%",
                    marginTop: 20,
                    padding: "14px",
                    borderRadius: 12,
                    background: venue.color,
                    border: "none",
                    fontFamily: "monospace",
                    fontSize: 11,
                    letterSpacing: 2,
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  SIGN & COMPLETE BRIEFING
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "14px 20px 28px",
          background: "linear-gradient(0deg,#080808 55%,transparent)",
          display: "flex",
          gap: 12,
        }}
      >
        {selectedSession && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#111",
              borderRadius: 14,
              padding: "0 16px",
              border: "1.5px solid #222",
              flexShrink: 0,
            }}
          >
            <Icon name="clock" size={13} color="#FF4500" />
            <span
              style={{ fontFamily: "monospace", fontSize: 11, color: "white", fontWeight: 700 }}
            >
              {selectedSession}
            </span>
          </div>
        )}
        <button
          onClick={() => selectedSession && onBook(venue, selectedSession, briefingComplete)}
          type="button"
          style={{
            flex: 1,
            padding: "18px",
            borderRadius: 14,
            background: selectedSession
              ? "linear-gradient(135deg,#FF4500,#FF6B00)"
              : "#151515",
            border: "none",
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: 2,
            color: selectedSession ? "white" : "#666",
            cursor: selectedSession ? "pointer" : "default",
            fontWeight: 800,
            boxShadow: selectedSession
              ? "0 8px 24px rgba(255,69,0,0.35)"
              : "none",
            transition: "all 0.2s",
          }}
        >
          {selectedSession
            ? `BOOK · ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(venue.price)}`
            : "SELECT A SESSION FIRST"}
        </button>
      </div>
    </div>
  );
};

const VEHICLE_INSURANCE = [
  { id: "v_none", name: "NO COVER", price: 0, desc: "Third-party liability only. You are liable for all damage.", coverage: "€0", color: "#888" },
  { id: "v_std", name: "STANDARD", price: 25, desc: "On-track damage + liability. Provided by Reis.", coverage: "€5,000", color: "#2471A3" },
  { id: "v_adv", name: "ADVANCED", price: 55, desc: "Performance cover for high-value GT vehicles.", coverage: "€25,000", color: "#D35400" },
  { id: "v_pro", name: "PRO RACING", price: 95, desc: "Full comprehensive cover including transport.", coverage: "€75,000", color: "#FF4500" }
];

const DRIVER_INSURANCE = [
  { id: "d_std", name: "PERSONAL ACCIDENT", price: 10, desc: "Basic medical cover and personal liability.", coverage: "€10,000", color: "#2471A3" },
  { id: "d_pro", name: "PRO DRIVER", price: 25, desc: "Extended medical + income protection.", coverage: "€50,000", color: "#FF4500" }
];

const InsuranceSelectionScreen = ({ venue, cars = [], briefingComplete, onSelect, onBack }) => {
  const isBYO = venue.type !== "Karting";
  const [selectedCarId, setSelectedCarId] = useState(() => cars.length > 0 ? cars[0].id : null);
  const [selectedId, setSelectedId] = useState(isBYO ? "v_std" : "d_std");
  
  const options = isBYO ? VEHICLE_INSURANCE : DRIVER_INSURANCE;
  const selectedPlan = options.find(o => o.id === selectedId) || options[0];
  const selectedCar = cars.find(c => c.id === selectedCarId);

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "50px 20px 18px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Go back" style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevron_left" size={17} color="white" />
        </button>
        <div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 19, fontWeight: 700, color: "white" }}>Protection Plan</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>STEP 1 OF 2</div>
            {briefingComplete && (
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4CAF50", fontWeight: 700, padding: "2px 6px", background: "rgba(76,175,80,0.1)", borderRadius: 4 }}>
                BRIEFING OK
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 120px" }}>
        {isBYO && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>WHICH VEHICLE ARE YOU BRINGING?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cars.length === 0 ? (
                <div style={{ padding: 20, background: "#111", borderRadius: 12, border: "2px dashed #222", textAlign: "center" }}>
                   <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "#888" }}>No cars in your garage.</div>
                </div>
              ) : (
                cars.map(car => (
                  <button key={car.id} onClick={() => setSelectedCarId(car.id)} 
                    type="button"
                    aria-pressed={selectedCarId === car.id}
                    style={{ 
                      padding: "14px 16px", borderRadius: 14, 
                      background: selectedCarId === car.id ? "rgba(255,69,0,0.08)" : "#111", 
                      border: `2px solid ${selectedCarId === car.id ? "#FF4500" : "#1a1a1a"}`,
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s",
                      textAlign: "left", width: "100%", color: "white"
                    }}>
                    <Icon name="car" size={18} color={selectedCarId === car.id ? "#FF4500" : "#666"} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "white", fontWeight: 700 }}>{car.brand} {car.model}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: "#888" }}>{car.plate}</div>
                    </div>
                    {selectedCarId === car.id && <Icon name="check" size={16} color="#FF4500" />}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>
            {isBYO ? "VEHICLE PROTECTION" : "DRIVER PROTECTION"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {options.map((type) => {
              const isSel = selectedId === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedId(type.id)}
                  type="button"
                  aria-pressed={isSel}
                  style={{
                    background: isSel ? "#111" : "#0a0a0a",
                    borderRadius: 18,
                    padding: "20px",
                    border: `2.5px solid ${isSel ? type.color : "#1a1a1a"}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                      <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 800, color: isSel ? "white" : "#aaa", letterSpacing: 1 }}>{type.name}</span>
                      <span style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 800, color: isSel ? type.color : "#888" }}>
                        {type.price === 0 ? "FREE" : `+${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(type.price)}`}
                      </span>
                    </div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: isSel ? "#ccc" : "#888", lineHeight: 1.5, marginBottom: 10, fontWeight: 500 }}>
                      {type.desc}
                    </div>
                    {type.id !== "v_none" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: type.color, fontWeight: 800 }}>{isBYO ? "COVERAGE:" : "PERSONAL LIMIT:"}</div>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: "white", background: "#222", padding: "3px 10px", borderRadius: 6, fontWeight: 700 }}>{type.coverage}</div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 40px", background: "linear-gradient(0deg,#080808 80%,transparent 100%)", borderTop: "1px solid #151515" }}>
        <button
          onClick={() => onSelect(selectedPlan, selectedCar)}
          disabled={isBYO && !selectedCarId}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: 14,
            background: isBYO && !selectedCarId ? "#222" : selectedPlan.color,
            border: "none",
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: 3,
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: isBYO && !selectedCarId ? "none" : `0 12px 32px ${selectedPlan.color}40`,
          }}
        >
          {isBYO && !selectedCarId ? "SELECT A VEHICLE" : "CONTINUE TO CHECKOUT"}
        </button>
      </div>
    </div>
  );
};

const BriefingScreen = ({ venue, onComplete, onBack, isStandalone = false }) => {
  const [complete, setComplete] = useState(false);

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "50px 20px 18px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Go back" style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevron_left" size={17} color="white" />
        </button>
        <div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 19, fontWeight: 700, color: "white" }}>Safety Briefing</div>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>{venue.name.toUpperCase()}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 120px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 10 }}>
          {/* Video Player Placeholder */}
          <div style={{ 
            width: "100%", 
            aspectRatio: "16/9", 
            background: "#111", 
            borderRadius: 16, 
            border: "2px solid #1a1a1a",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}>
            <div style={{ 
              position: "absolute", 
              inset: 0, 
              background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1530906358829-e84b2769270f?auto=format&fit=crop&q=80&w=800')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.6
            }} />
            <div style={{ 
              width: 60, 
              height: 60, 
              borderRadius: "50%", 
              background: "rgba(255,69,0,0.9)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              zIndex: 2,
              boxShadow: "0 0 30px rgba(255,69,0,0.4)"
            }}>
              <Icon name="zap" size={30} color="white" />
            </div>
            <div style={{ 
              position: "absolute", 
              bottom: 12, 
              left: 16, 
              zIndex: 2,
              fontFamily: "monospace",
              fontSize: 10,
              color: "white",
              letterSpacing: 1
            }}>
              MANDATORY SAFETY VIDEO · 8:12
            </div>
          </div>

          {/* Briefing Checklist */}
          <div style={{ background: "#111", borderRadius: 16, padding: "20px", border: "1.5px solid #1a1a1a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "white" }}>Briefing Checklist</h3>
              <div style={{ 
                fontFamily: "monospace", 
                fontSize: 9, 
                color: complete ? "#4CAF50" : "#FFD700",
                padding: "4px 10px",
                borderRadius: 20,
                background: complete ? "rgba(76,175,80,0.1)" : "rgba(255,215,0,0.1)",
                border: `1px solid ${complete ? "#4CAF50" : "#FFD700"}`
              }}>
                {complete ? "COMPLETE" : "PENDING"}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { t: "Track Flags & Signals", d: "Understanding yellow, red, and checkered flags." },
                { t: "Pit Lane Protocol", d: "Speed limits and entry/exit procedures." },
                { t: "Overtaking Rules", d: "Safe zones and 'point-by' requirements." },
                { t: "Safety Gear Check", d: "Helmet, suit, and glove standards." }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div style={{ 
                    width: 18, 
                    height: 18, 
                    borderRadius: 4, 
                    border: "1.5px solid #333",
                    background: complete ? "#4CAF50" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2
                  }}>
                    {complete && <Icon name="check" size={12} color="white" />}
                  </div>
                  <div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "white", marginBottom: 2 }}>{item.t}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "#888", lineHeight: 1.4 }}>{item.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {!complete && (
              <button 
                onClick={() => { setComplete(true); if(isStandalone) setTimeout(() => onComplete(), 1000); }}
                style={{
                  width: "100%",
                  marginTop: 20,
                  padding: "14px",
                  borderRadius: 12,
                  background: venue.color || "#FF4500",
                  border: "none",
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                SIGN & COMPLETE BRIEFING
              </button>
            )}
          </div>
        </div>
      </div>

      {!isStandalone && complete && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 40px", background: "linear-gradient(0deg,#080808 80%,transparent 100%)" }}>
          <button 
            onClick={onComplete}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: 14,
              background: "#4CAF50",
              border: "none",
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 3,
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 12px 32px rgba(76,175,80,0.3)",
            }}
          >
            CONTINUE
          </button>
        </div>
      )}
    </div>
  );
};

const BookingScreen = ({ venue, session, insurance, preSelectedCarId, briefingComplete, cars = [], onBack, onConfirm, onDone }) => {
  const [confirmed, setConfirmed] = useState(false);
  const isBYO = venue.type !== "Karting";
  const [selectedCarId, setSelectedCarId] = useState(() => preSelectedCarId || (isBYO && cars.length > 0 ? cars[0].id : null));
  const selectedCar = cars.find((c) => c.id === selectedCarId) || null;

  const totalPrice = venue.price + insurance.price;

  if (confirmed)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080808",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 28px",
        }}
      >
        <style>{`@keyframes popIn{0%{transform:scale(0.2);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}`}</style>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#FF4500,#FF6B00)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            animation: "popIn 0.5s cubic-bezier(.34,1.56,.64,1) both",
            boxShadow: "0 0 50px rgba(255,69,0,0.35)",
          }}
        >
          <Icon name="check" size={36} color="white" />
        </div>
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 26,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          You're booked.
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            color: "#aaa",
            letterSpacing: 2,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          CONFIRMATION SENT TO YOUR EMAIL
        </div>
        <div
          style={{
            width: "100%",
            background: "#111",
            borderRadius: 16,
            padding: "20px",
            border: "1px solid #1a1a1a",
            marginBottom: 20,
          }}
        >
          {[
            { l: "VENUE", v: venue.name },
            { l: "DATE", v: "Sat 1 Mar 2026" },
            { l: "SESSION", v: session },
            { l: "VEHICLE", v: selectedCar ? [selectedCar.brand, selectedCar.model].filter(Boolean).join(" ") || selectedCar.plate : "—" },
            { l: "INSURANCE", v: insurance.name },
            { l: "TOTAL PAID", v: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(totalPrice) },
          ].map((r) => (
            <div
              key={r.l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#aaa",
                  letterSpacing: 2,
                }}
              >
                {r.l}
              </span>
              <span
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 13,
                  color: r.l === "TOTAL PAID" ? "#FF4500" : "white",
                  fontWeight: r.l === "TOTAL PAID" ? 700 : 400,
                }}
              >
                {r.v}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={onDone || onBack}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: 13,
            background: "#151515",
            border: "1px solid #222",
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: 2,
            color: "#ccc",
            cursor: "pointer",
          }}
        >
          BACK TO EXPLORE
        </button>
      </div>
    );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "50px 20px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          aria-label="Go back"
          style={{
            background: "#111",
            border: "1px solid #1a1a1a",
            borderRadius: 12,
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icon name="chevron_left" size={17} color="white" />
        </button>
        <div>
          <div
            style={{
              fontFamily: "Georgia,serif",
              fontSize: 19,
              fontWeight: 700,
              color: "white",
            }}
          >
            Confirm Booking
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>
            {venue.name} · {session}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 120px" }}>
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #1a1a1a",
            marginBottom: 16,
          }}
        >
          <VenueArt type={venue.img} color={venue.color} h={100} />
          <div
            style={{
              padding: "13px 16px",
              background: "#111",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {venue.name}
              </div>
              <div
                style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}
              >
                {venue.location}
              </div>
            </div>
            <div
              style={{
                fontFamily: "Georgia,serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#FF4500",
              }}
            >
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(venue.price)}
            </div>
          </div>
        </div>

        <div
          style={{
            background: briefingComplete ? "#0d1a0d" : "#1a150d",
            borderRadius: 13,
            padding: "14px 16px",
            border: `1px solid ${briefingComplete ? "#1a2a1a" : "#2a201a"}`,
            marginBottom: 12,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <Icon name={briefingComplete ? "check" : "zap"} size={16} color={briefingComplete ? "#4CAF50" : "#FFD700"} />
          <div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: briefingComplete ? "#4CAF50" : "#FFD700",
                letterSpacing: 1,
                marginBottom: 2,
                fontWeight: 700,
              }}
            >
              SAFETY BRIEFING {briefingComplete ? "COMPLETE" : "PENDING"}
            </div>
            <div
              style={{
                fontFamily: "Georgia,serif",
                fontSize: 12,
                color: "#aaa",
              }}
            >
              {briefingComplete 
                ? "8-min video watched · Digital waiver signed"
                : "Required before session start · Can be done at venue"}
            </div>
          </div>
        </div>

        {/* Insurance Summary (Selected in prev step) */}
        <div
          style={{
            background: "#111",
            borderRadius: 13,
            padding: "14px 16px",
            border: `1px solid ${insurance.color}40`,
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon
              name="shield"
              size={15}
              color={insurance.color}
            />
            <div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: insurance.color,
                  letterSpacing: 1,
                }}
              >
                {insurance.name}
              </div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "#ccc" }}>
                Coverage up to {insurance.coverage}
              </div>
            </div>
          </div>
          <button 
            onClick={onBack}
            style={{ 
              background: "none", 
              border: "none", 
              fontFamily: "monospace", 
              fontSize: 12, 
              color: "#aaa", 
              textDecoration: "underline",
              cursor: "pointer"
            }}
          >
            CHANGE
          </button>
        </div>

        {/* Car selector */}
        {isBYO ? (
          <div style={{ background: "#111", borderRadius: 13, padding: "14px 16px", border: "1.5px solid #1a1a1a", marginBottom: 12 }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>YOUR VEHICLE</div>
            {cars.length === 0 ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="car" size={18} color="#444" />
                <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "#666" }}>No vehicles saved — add one in Profile → My Garage</span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {cars.map((car) => {
                  const isSel = selectedCarId === car.id;
                  return (
                    <button key={car.id} onClick={() => setSelectedCarId(car.id)} 
                      type="button"
                      aria-pressed={isSel}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", borderRadius: 12, border: `2.5px solid ${isSel ? "#FF4500" : "#1e1e1e"}`, background: isSel ? "rgba(255,69,0,0.08)" : "#0d0d0d", cursor: "pointer", transition: "all 0.15s", width: "100%", textAlign: "left" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: isSel ? "rgba(255,69,0,0.15)" : "#151515", border: `1px solid ${isSel ? "rgba(255,69,0,0.4)" : "#222"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name="car" size={18} color={isSel ? "#FF4500" : "#666"} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "Georgia,serif", fontSize: 14, fontWeight: 700, color: isSel ? "white" : "#ccc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[car.brand, car.model].filter(Boolean).join(" ") || "—"}</div>
                        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                          {car.plate && <span style={{ fontFamily: "monospace", fontSize: 9, color: isSel ? "#FF4500" : "#888", fontWeight: 700, letterSpacing: 1 }}>{car.plate}</span>}
                          {car.year && <span style={{ fontFamily: "monospace", fontSize: 9, color: "#666" }}>{car.year}</span>}
                        </div>
                      </div>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${isSel ? "#FF4500" : "#444"}`, background: isSel ? "#FF4500" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {isSel && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: "#0d1a0d", borderRadius: 13, padding: "16px", border: "1.5px solid #1a2a1a", marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
            <Icon name="car" size={18} color="#4CAF50" />
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4CAF50", letterSpacing: 1, marginBottom: 2, fontWeight: 700 }}>VEHICLE PROVIDED</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "#aaa" }}>This venue provides the vehicle for your session.</div>
            </div>
          </div>
        )}

        <div
          style={{
            background: "#111",
            borderRadius: 14,
            padding: "20px",
            border: "1.5px solid #1a1a1a",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: "#888",
              letterSpacing: 2,
              marginBottom: 14,
              fontWeight: 700,
            }}
          >
            PRICE BREAKDOWN
          </div>
          {[
            { l: "Session fee", v: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(venue.price) },
            { l: "Insurance", v: insurance.price > 0 ? `+${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(insurance.price)}` : "None" },
            { l: "Platform fee", v: "Included" },
          ].map((r) => (
            <div
              key={r.l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 13,
                  color: "#aaa",
                }}
              >
                {r.l}
              </span>
              <span
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 13,
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {r.v}
              </span>
            </div>
          ))}
          <div
            style={{
              borderTop: "1.5px solid #1e1e1e",
              paddingTop: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "white",
                letterSpacing: 1,
                fontWeight: 700,
              }}
            >
              TOTAL
            </span>
            <span
              style={{
                fontFamily: "Georgia,serif",
                fontSize: 22,
                fontWeight: 800,
                color: "#FF4500",
              }}
            >
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(totalPrice)}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "14px 20px 30px",
          background: "linear-gradient(0deg,#080808 75%,transparent)",
        }}
      >
        <button
          onClick={() => { setConfirmed(true); onConfirm && onConfirm({ id: Date.now(), name: venue.name, date: "15 Mar 2026", session, status: "Upcoming", color: venue.color, img: venue.img, car: selectedCar, insurance, briefingComplete }); }}
          disabled={isBYO && !selectedCarId}
          style={{
            width: "100%",
            padding: "17px",
            borderRadius: 14,
            background: (isBYO && !selectedCarId) ? "#222" : "linear-gradient(135deg,#FF4500,#FF6B00)",
            border: "none",
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: 3,
            color: (isBYO && !selectedCarId) ? "#444" : "white",
            fontWeight: 700,
            cursor: (isBYO && !selectedCarId) ? "default" : "pointer",
            boxShadow: (isBYO && !selectedCarId) ? "none" : "0 12px 32px rgba(255,69,0,0.3)",
          }}
        >
          CONFIRM & PAY
        </button>
      </div>
    </div>
  );
};

// const SavedScreen = ({ favorites }) => {
//   const saved = VENUES.filter((v) => favorites.has(v.id));
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         background: "#080808",
//         display: "flex",
//         flexDirection: "column",
//         overflow: "hidden",
//       }}
//     >
//       <div style={{ padding: "52px 20px 20px", flexShrink: 0 }}>
//         <div
//           style={{
//             fontFamily: "monospace",
//             fontSize: 10,
//             color: "#FF4500",
//             letterSpacing: 3,
//             marginBottom: 4,
//           }}
//         >
//           YOUR LIST
//         </div>
//         <div
//           style={{
//             fontFamily: "Georgia,serif",
//             fontSize: 26,
//             fontWeight: 700,
//             color: "white",
//           }}
//         >
//           Saved Venues
//         </div>
//       </div>
//       <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
//         {saved.length === 0 ? (
//           <div style={{ textAlign: "center", padding: "60px 20px" }}>
//             <Icon name="heart" size={38} color="#222" />
//             <div
//               style={{
//                 fontFamily: "Georgia,serif",
//                 fontSize: 17,
//                 color: "#444",
//                 marginTop: 16,
//               }}
//             >
//               Nothing saved yet.
//             </div>
//             <div
//               style={{
//                 fontFamily: "monospace",
//                 fontSize: 9,
//                 color: "#333",
//                 marginTop: 6,
//                 letterSpacing: 1,
//               }}
//             >
//               TAP ♥ ON ANY VENUE TO SAVE IT
//             </div>
//           </div>
//         ) : (
//           saved.map((v) => (
//             <div
//               key={v.id}
//               style={{
//                 borderRadius: 16,
//                 overflow: "hidden",
//                 border: "1px solid #1a1a1a",
//                 marginBottom: 10,
//               }}
//             >
//               <VenueArt type={v.img} color={v.color} h={110} />
//               <div
//                 style={{
//                   padding: "13px 16px",
//                   background: "#111",
//                   display: "flex",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <div>
//                   <div
//                     style={{
//                       fontFamily: "Georgia,serif",
//                       fontSize: 15,
//                       fontWeight: 700,
//                       color: "white",
//                     }}
//                   >
//                     {v.name}
//                   </div>
//                   <div
//                     style={{
//                       fontFamily: "monospace",
//                       fontSize: 9,
//                       color: "#555",
//                     }}
//                   >
//                     {v.location}
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     fontFamily: "Georgia,serif",
//                     fontSize: 17,
//                     fontWeight: 700,
//                     color: "#FF4500",
//                   }}
//                 >
//                   €{v.price}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

const SessionStatsScreen = ({ booking, onBack }) => {
  const { name, color, stats, date, session } = booking;
  const pad = (n) => String(n).padStart(2, "0");

  const allMs = stats.laps.map(t => {
    const [mn, sc] = t.split(":");
    return parseInt(mn) * 60000 + parseFloat(sc) * 1000;
  });
  const minMs = Math.min(...allMs);
  const maxMs = Math.max(...allMs);

  const podiumColors = ["#FFD700", "#C0C0C0", "#CD7F32"];
  const isP1 = stats.position === 1;

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Header */}
      <div style={{ padding: "52px 20px 18px", flexShrink: 0 }}>
        <button
          onClick={onBack}
          type="button"
          aria-label="Back to bookings"
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 18, padding: 0 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: 2, fontWeight: 700 }}>BACK</span>
        </button>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: color, letterSpacing: 3, marginBottom: 4, fontWeight: 700 }}>SESSION COMPLETED</div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 26, fontWeight: 700, color: "white", lineHeight: 1.2 }}>{name}</div>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", marginTop: 4 }}>{date} · {session}</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 40px", animation: "fadeUp 0.35s ease both" }}>

        {/* Position hero */}
        <div
          style={{
            borderRadius: 18,
            background: `linear-gradient(135deg, ${color}18, ${color}06)`,
            border: `2px solid ${color}33`,
            padding: "24px 20px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: color, letterSpacing: 2, marginBottom: 6, fontWeight: 700 }}>POSICIÓN FINAL</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 64, fontWeight: 800, lineHeight: 1, color: stats.position <= 3 ? podiumColors[stats.position - 1] : "white" }}>
              P{stats.position}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", marginTop: 4, fontWeight: 700 }}>DE {stats.totalDrivers} PILOTOS</div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { l: "BEST LAP", v: stats.bestLap },
              { l: "AVERAGE TIME", v: stats.avgLap },
              { l: "TOTAL LAPS", v: stats.totalLaps },
            ].map(({ l, v }) => (
              <div key={l} style={{ borderBottom: "1.5px solid #1a1a1a", paddingBottom: 8 }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: "#888", letterSpacing: 1.5, marginBottom: 3, fontWeight: 700 }}>{l}</div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 700, color: "white" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lap times */}
        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#888", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>
          LAP TIMES · SAMPLE
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {stats.laps.map((lapTime, li) => {
            const isBest = lapTime === stats.bestLap;
            const [mn, sc] = lapTime.split(":");
            const thisMs = parseInt(mn) * 60000 + parseFloat(sc) * 1000;
            const pct = maxMs === minMs ? 60 : Math.round(20 + 80 * (1 - (thisMs - minMs) / (maxMs - minMs)));
            const diffMs = thisMs - minMs;
            const diffStr = diffMs === 0 ? "MEJOR" : `+${(diffMs / 1000).toFixed(3)}s`;
            return (
              <div
                key={li}
                style={{
                  background: isBest ? `${color}12` : "#111",
                  borderRadius: 12,
                  border: isBest ? `2px solid ${color}44` : "1.5px solid #181818",
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ fontFamily: "monospace", fontSize: 11, color: isBest ? color : "#666", width: 24, textAlign: "center", flexShrink: 0, fontWeight: 800 }}>
                  V{li + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: 8, background: "#1a1a1a", borderRadius: 4, overflow: "hidden", marginBottom: 0 }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: isBest ? `linear-gradient(90deg,${color},${color}88)` : `linear-gradient(90deg,#2e2e2e,#252525)`,
                        borderRadius: 4,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 800, color: isBest ? color : "white", flexShrink: 0, minWidth: 72, textAlign: "right" }}>
                  {lapTime}
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: isBest ? color : "#666",
                    minWidth: 52,
                    textAlign: "right",
                    flexShrink: 0,
                    letterSpacing: 0.5,
                    fontWeight: 700,
                  }}
                >
                  {diffStr}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary banner */}
        <div
          style={{
            background: isP1 ? "linear-gradient(135deg,#1a1200,#0a0a0a)" : "#111",
            borderRadius: 16,
            border: isP1 ? "2px solid #FFD70044" : "1.5px solid #1a1a1a",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 700, color: "white", marginBottom: 4 }}>
              {isP1 ? "Victory!" : stats.position <= 3 ? `Podium — P${stats.position}` : `Classified P${stats.position}`}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#888", letterSpacing: 1, fontWeight: 500 }}>
              {stats.totalLaps} LAPS · BEST: {stats.bestLap} · AVG: {stats.avgLap}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const INITIAL_BOOKINGS = [
  {
    id: 1, name: "Circuito de Jerez", date: "15 Feb 2026", session: "09:00", status: "Completed", color: "#C0392B", img: "jerez", briefingComplete: true,
    stats: {
      position: 3, totalDrivers: 14,
      bestLap: "1:42.847", avgLap: "1:44.312", totalLaps: 18,
      laps: ["1:47.201","1:44.882","1:43.510","1:43.201","1:42.847","1:43.098","1:43.774","1:44.130"],
    },
  },
  {
    id: 2, name: "Karting Lloret", date: "28 Jan 2026", session: "14:00", status: "Completed", color: "#2471A3", img: "karting", briefingComplete: true,
    stats: {
      position: 1, totalDrivers: 8,
      bestLap: "0:58.341", avgLap: "1:00.112", totalLaps: 24,
      laps: ["1:02.541","1:00.887","0:59.602","0:58.901","0:58.341","0:58.779","0:59.210","0:59.880"],
    },
  },
  { id: 3, name: "Circuito Navarra", date: "8 Mar 2026", session: "11:00", status: "Upcoming", color: "#D35400", img: "navarra", briefingComplete: false },
];

const AVAILABLE_SESSIONS = ["09:00", "11:00", "13:00", "15:00", "17:00"];

const BookingDetailScreen = ({ booking, onBack, onDelete, onReschedule, onBriefing, onStats }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCountdown = (dateStr, sessionStr) => {
    const months = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
    const parts = dateStr.split(" ");
    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    const [h, m] = sessionStr.split(":").map(Number);
    const target = new Date(year, month, day, h, m, 0);
    const diff = target - now;
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  };

  const pad = (n) => String(n).padStart(2, "0");
  const cd = booking.status === "Upcoming" ? getCountdown(booking.date, booking.session) : null;
  const isBriefingPending = booking.status === "Upcoming" && !booking.briefingComplete;

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "50px 20px 18px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Go back" style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevron_left" size={17} color="white" />
        </button>
        <div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 19, fontWeight: 700, color: "white" }}>Reservation Detail</div>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>ID: TS-{booking.id}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 120px" }}>
        <div style={{ borderRadius: 24, overflow: "hidden", border: "1.5px solid #1a1a1a", background: "#111", marginBottom: 24 }}>
          <VenueArt type={booking.img} color={booking.color} h={160} />
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 4 }}>{booking.name}</h2>
                <div style={{ fontFamily: "monospace", fontSize: 13, color: "#aaa", fontWeight: 700 }}>{booking.date} · {booking.session}</div>
              </div>
              <div style={{ background: booking.status === "Upcoming" ? "#0d1a0d" : "#1a1a1a", borderRadius: 20, padding: "4px 12px", fontFamily: "monospace", fontSize: 10, color: booking.status === "Upcoming" ? "#4CAF50" : "#888", fontWeight: 800 }}>
                {booking.status.toUpperCase()}
              </div>
            </div>

            {isBriefingPending && (
              <div style={{ padding: "16px", background: "rgba(255,215,0,0.08)", border: "1.5px solid rgba(255,215,0,0.2)", borderRadius: 16, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <Icon name="zap" size={18} color="#FFD700" />
                  <span style={{ fontFamily: "monospace", fontSize: 12, color: "#FFD700", fontWeight: 800, letterSpacing: 1 }}>ACTION REQUIRED</span>
                </div>
                <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "#aaa", lineHeight: 1.5, marginBottom: 16 }}>
                  A mandatory safety briefing is required for this venue. You can complete it now or at the circuit.
                </p>
                <button 
                  onClick={() => onBriefing(booking)}
                  style={{ width: "100%", padding: "14px", background: "#FFD700", border: "none", borderRadius: 12, fontFamily: "monospace", fontSize: 11, color: "#111", fontWeight: 800, cursor: "pointer" }}
                >
                  COMPLETE BRIEFING NOW
                </button>
              </div>
            )}

            {cd && (
              <div style={{ padding: "20px", background: `${booking.color}0d`, border: `1.5px solid ${booking.color}33`, borderRadius: 16, marginBottom: 20, textAlign: "center" }}>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: booking.color, letterSpacing: 2, marginBottom: 16, fontWeight: 800 }}>REMAINING TIME</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                  {[
                    { val: cd.days, label: "D" },
                    { val: cd.hours, label: "H" },
                    { val: cd.mins, label: "M" },
                    { val: cd.secs, label: "S" },
                  ].map(({ val, label }, idx) => (
                    <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                      {idx > 0 && <span style={{ fontFamily: "monospace", fontSize: 24, color: booking.color + "44" }}>:</span>}
                      <div>
                        <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 800, color: "white", lineHeight: 1 }}>{label === "D" ? val : pad(val)}</div>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: booking.color, fontWeight: 700, marginTop: 4 }}>{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {booking.status === "Completed" && booking.stats && (
              <button 
                onClick={() => onStats(booking)}
                style={{ width: "100%", padding: "16px", background: "#1a1a1a", border: "1.5px solid #222", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Icon name="zap" size={18} color={booking.color} />
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "white", fontWeight: 800, letterSpacing: 1 }}>VIEW SESSION STATS</span>
                </div>
                <Icon name="chevron_right" size={16} color="#666" />
              </button>
            )}
          </div>
        </div>

        {booking.status === "Upcoming" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#444", letterSpacing: 2, marginBottom: 4, marginLeft: 4 }}>MANAGE RESERVATION</div>
            
            {rescheduleId === booking.id ? (
              <div style={{ background: "#111", border: "1.5px solid #1e1e1e", borderRadius: 16, padding: "20px" }}>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: 1, marginBottom: 16, fontWeight: 700 }}>SELECT NEW SESSION TIME</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
                  {AVAILABLE_SESSIONS.filter((s) => s !== booking.session).map((slot) => (
                    <button key={slot} type="button" onClick={() => { onReschedule(booking.id, slot); setRescheduleId(null); }} style={{ background: "#080808", border: `2.5px solid ${booking.color}`, borderRadius: 12, padding: "12px 18px", fontFamily: "monospace", fontSize: 13, color: "white", cursor: "pointer", fontWeight: 800 }}>
                      {slot}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => setRescheduleId(null)} style={{ background: "none", border: "none", fontFamily: "monospace", fontSize: 11, color: "#888", cursor: "pointer", fontWeight: 700, textDecoration: "underline" }}>CANCEL CHANGE</button>
              </div>
            ) : confirmDelete ? (
              <div style={{ background: "#1a0000", border: "1.5px solid #3a0000", borderRadius: 16, padding: "20px" }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 15, color: "white", marginBottom: 16 }}>Confirm cancellation? This cannot be undone.</div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button type="button" onClick={() => setConfirmDelete(false)} style={{ flex: 1, background: "#111", border: "1.5px solid #333", borderRadius: 12, padding: "14px", fontFamily: "monospace", fontSize: 11, color: "#aaa", cursor: "pointer", fontWeight: 700 }}>KEEP BOOKING</button>
                  <button type="button" onClick={() => { onDelete(booking.id); onBack(); }} style={{ flex: 1, background: "#FF4500", border: "none", borderRadius: 12, padding: "14px", fontFamily: "monospace", fontSize: 11, color: "white", cursor: "pointer", fontWeight: 700 }}>YES, CANCEL</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 12 }}>
                <button 
                  onClick={() => setRescheduleId(booking.id)}
                  style={{ flex: 1, height: 56, background: "#111", border: "1.5px solid #1a1a1a", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer" }}
                >
                  <Icon name="edit" size={16} color="white" />
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "white", fontWeight: 800, letterSpacing: 1 }}>RESCHEDULE</span>
                </button>
                <button 
                  onClick={() => setConfirmDelete(true)}
                  style={{ width: 56, height: 56, background: "#111", border: "1.5px solid #1a1a1a", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                >
                  <Icon name="trash" size={18} color="#FF4500" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingsScreen = ({ onStats, onBriefing, onSelect, bookings, onDelete, onReschedule }) => {
  const MONTHS = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
  const parseDate = (dateStr, sessionStr = "00:00") => {
    const parts = dateStr.split(" ");
    const day = parseInt(parts[0]);
    const month = MONTHS[parts[1]];
    const year = parseInt(parts[2]);
    const [h, m] = sessionStr.split(":").map(Number);
    return new Date(year, month, day, h, m, 0).getTime();
  };
  const BOOKINGS = [...bookings].sort((a, b) => parseDate(b.date, b.session) - parseDate(a.date, a.session));

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "52px 20px 20px", flexShrink: 0 }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#FF4500", letterSpacing: 3, marginBottom: 4 }}>HISTORY</div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 26, fontWeight: 700, color: "white" }}>My Bookings</div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 100px" }}>
        {BOOKINGS.map((b) => {
          const isBriefingPending = b.status === "Upcoming" && !b.briefingComplete;
          return (
            <button
              key={b.id ?? b.name}
              onClick={() => onSelect(b)}
              style={{
                width: "100%",
                padding: 0,
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                marginBottom: 12
              }}
            >
              <div
                style={{
                  borderRadius: 18,
                  border: `1.5px solid ${isBriefingPending ? "#FFD70044" : "#1a1a1a"}`,
                  overflow: "hidden",
                  display: "flex",
                  background: "#111",
                  boxShadow: isBriefingPending ? "0 0 20px rgba(255,215,0,0.05)" : "none",
                }}
              >
                <div style={{ width: 90, flexShrink: 0 }}>
                  <VenueArt type={b.img} color={b.color} h={90} />
                </div>
                <div style={{ flex: 1, padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, alignItems: "flex-start" }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 14, fontWeight: 700, color: "white", flex: 1, paddingRight: 8 }}>{b.name}</div>
                    <div style={{ background: b.status === "Upcoming" ? "#0d1a0d" : "#1a1a1a", borderRadius: 20, padding: "2px 8px", fontFamily: "monospace", fontSize: 8, color: b.status === "Upcoming" ? "#4CAF50" : "#888", fontWeight: 800 }}>
                      {b.status.toUpperCase()}
                    </div>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", fontWeight: 700 }}>{b.date} · {b.session}</div>
                  
                  {b.status === "Upcoming" && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: b.briefingComplete ? "#4CAF50" : "#FFD700" }} />
                      <span style={{ fontFamily: "monospace", fontSize: 9, color: b.briefingComplete ? "#4CAF50" : "#FFD700", fontWeight: 800, letterSpacing: 1 }}>
                        BRIEFING {b.briefingComplete ? "OK" : "PENDING"}
                      </span>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", paddingRight: 12 }}>
                  <Icon name="chevron_right" size={16} color="#333" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const COMMUNITY_POSTS = [
  { id: 1, user: "Carlos R.", avatar: "CR", time: "12 min ago", text: "First laps at Jerez in the GT3 — Sector 2 is incredible. Anyone else out there today?", likes: 24, comments: 8, tag: "Jerez", color: "#C0392B" },
  { id: 2, user: "Laura T.", avatar: "LT", time: "1 h ago", text: "Tip: the braking zones into Turn 6 are brutal coming out of the fast sector. I was late twice until I moved my braking point 20 m earlier.", likes: 41, comments: 15, tag: "Tip", color: "#D35400" },
  { id: 3, user: "Marco V.", avatar: "MV", time: "3 h ago", text: "Lambo Huracán just cleared for Navarra. Session Saturday at 09:00 — anyone want to meet up?", likes: 17, comments: 6, tag: "Navarra", color: "#D35400" },
  { id: 4, user: "Sergio P.", avatar: "SP", time: "yesterday", text: "Airfield Rota is a unique venue. No noise limit and the long straight lets you put up some serious numbers in the R8.", likes: 33, comments: 11, tag: "Airfield", color: "#1A6B3C" },
  { id: 5, user: "Sophie L.", avatar: "SL", time: "yesterday", text: "Has anyone used the integrated TrackSwap insurance? Is it worth it compared to your own policy?", likes: 12, comments: 22, tag: "Question", color: "#2471A3" },
];

const GROUPS = [
  { name: "GT Spain", members: 234, tag: "GT · Supercars", color: "#C0392B",
    circuits: [
      { circuit: "Circuito de Jerez", length: "4.4 km", entries: [
        { pos: 1, name: "Carlos R.",  avatar: "CR", car: "BMW M4 GT3",          bestLap: "1:38.241", sessions: 18, delta: null },
        { pos: 2, name: "Marco V.",   avatar: "MV", car: "Lamborghini Huracán", bestLap: "1:38.709", sessions: 12, delta: "+0.468" },
        { pos: 3, name: "Sophie L.",  avatar: "SL", car: "Porsche 911 GT3",     bestLap: "1:39.102", sessions: 21, delta: "+0.861" },
        { pos: 4, name: "Sergio P.",  avatar: "SP", car: "Audi R8 LMS",         bestLap: "1:39.884", sessions: 9,  delta: "+1.643" },
        { pos: 5, name: "Laura T.",   avatar: "LT", car: "Ferrari 488 GT3",     bestLap: "1:40.312", sessions: 15, delta: "+2.071" },
        { pos: 6, name: "Alex M.",    avatar: "AM", car: "BMW M4 GT3",          bestLap: "1:41.055", sessions: 12, delta: "+2.814" },
        { pos: 7, name: "Javi O.",    avatar: "JO", car: "McLaren 720S GT3",    bestLap: "1:41.780", sessions: 7,  delta: "+3.539" },
      ]},
      { circuit: "Circuito Navarra", length: "3.9 km", entries: [
        { pos: 1, name: "Sophie L.",  avatar: "SL", car: "Porsche 911 GT3",     bestLap: "1:32.540", sessions: 8,  delta: null },
        { pos: 2, name: "Carlos R.",  avatar: "CR", car: "BMW M4 GT3",          bestLap: "1:33.018", sessions: 11, delta: "+0.478" },
        { pos: 3, name: "Laura T.",   avatar: "LT", car: "Ferrari 488 GT3",     bestLap: "1:33.874", sessions: 6,  delta: "+1.334" },
        { pos: 4, name: "Alex M.",    avatar: "AM", car: "BMW M4 GT3",          bestLap: "1:34.612", sessions: 5,  delta: "+2.072" },
        { pos: 5, name: "Marco V.",   avatar: "MV", car: "Lamborghini Huracán", bestLap: "1:35.220", sessions: 4,  delta: "+2.680" },
      ]},
    ],
  },
  { name: "Track Day Iberia", members: 891, tag: "All classes", color: "#FF4500",
    circuits: [
      { circuit: "Circuito de Jerez", length: "4.4 km", entries: [
        { pos: 1, name: "Raúl F.",   avatar: "RF", car: "Porsche 911 GT3 RS",  bestLap: "1:36.554", sessions: 33, delta: null },
        { pos: 2, name: "Carlos R.", avatar: "CR", car: "BMW M4 GT3",          bestLap: "1:37.102", sessions: 18, delta: "+0.548" },
        { pos: 3, name: "Ana B.",    avatar: "AB", car: "Cupra TCR",           bestLap: "1:39.441", sessions: 11, delta: "+2.887" },
        { pos: 4, name: "Pedro S.",  avatar: "PS", car: "Seat León Cup",       bestLap: "1:40.119", sessions: 24, delta: "+3.565" },
        { pos: 5, name: "Marco V.",  avatar: "MV", car: "Lamborghini Huracán", bestLap: "1:40.887", sessions: 12, delta: "+4.333" },
      ]},
      { circuit: "Circuito Navarra", length: "3.9 km", entries: [
        { pos: 1, name: "Pedro S.",  avatar: "PS", car: "Seat León Cup",       bestLap: "1:36.002", sessions: 15, delta: null },
        { pos: 2, name: "Raúl F.",   avatar: "RF", car: "Porsche 911 GT3 RS",  bestLap: "1:36.441", sessions: 20, delta: "+0.439" },
        { pos: 3, name: "Ana B.",    avatar: "AB", car: "Cupra TCR",           bestLap: "1:37.890", sessions: 7,  delta: "+1.888" },
        { pos: 4, name: "Alex M.",   avatar: "AM", car: "BMW M4 GT3",          bestLap: "1:39.200", sessions: 3,  delta: "+3.198" },
      ]},
      { circuit: "Airfield Rota", length: "2.1 km", entries: [
        { pos: 1, name: "Marco V.",  avatar: "MV", car: "Lamborghini Huracán", bestLap: "0:44.112", sessions: 5,  delta: null },
        { pos: 2, name: "Raúl F.",   avatar: "RF", car: "Porsche 911 GT3 RS",  bestLap: "0:44.780", sessions: 8,  delta: "+0.668" },
        { pos: 3, name: "Carlos R.", avatar: "CR", car: "BMW M4 GT3",          bestLap: "0:45.330", sessions: 6,  delta: "+1.218" },
      ]},
    ],
  },
  { name: "Drift Collective ES", members: 157, tag: "Drift · Autocross", color: "#6C3483",
    circuits: [
      { circuit: "Industrial Lot BCN", length: "Custom", entries: [
        { pos: 1, name: "Dani R.",   avatar: "DR", car: "Nissan 350Z",  bestLap: "0:48.112", sessions: 27, delta: null },
        { pos: 2, name: "Toni K.",   avatar: "TK", car: "Toyota GR86",  bestLap: "0:48.901", sessions: 19, delta: "+0.789" },
        { pos: 3, name: "Iván M.",   avatar: "IM", car: "BMW E36",      bestLap: "0:49.340", sessions: 14, delta: "+1.228" },
        { pos: 4, name: "Rubén D.",  avatar: "RD", car: "Mazda RX-7",   bestLap: "0:50.550", sessions: 8,  delta: "+2.438" },
      ]},
      { circuit: "Karting Lloret", length: "1.2 km", entries: [
        { pos: 1, name: "Toni K.",   avatar: "TK", car: "Toyota GR86",  bestLap: "0:58.204", sessions: 11, delta: null },
        { pos: 2, name: "Dani R.",   avatar: "DR", car: "Nissan 350Z",  bestLap: "0:58.990", sessions: 9,  delta: "+0.786" },
        { pos: 3, name: "Rubén D.",  avatar: "RD", car: "Mazda RX-7",   bestLap: "1:00.112", sessions: 5,  delta: "+1.908" },
      ]},
    ],
  },
  { name: "EV Track Club", members: 63, tag: "Electric", color: "#2471A3",
    circuits: [
      { circuit: "Airfield Rota", length: "2.1 km", entries: [
        { pos: 1, name: "Sophie L.", avatar: "SL", car: "Tesla Model S Plaid",  bestLap: "0:42.881", sessions: 10, delta: null },
        { pos: 2, name: "Erik N.",   avatar: "EN", car: "Porsche Taycan Turbo", bestLap: "0:43.540", sessions: 7,  delta: "+0.659" },
        { pos: 3, name: "Mia C.",    avatar: "MC", car: "BMW i4 M50",          bestLap: "0:44.210", sessions: 5,  delta: "+1.329" },
      ]},
      { circuit: "Circuito Navarra", length: "3.9 km", entries: [
        { pos: 1, name: "Erik N.",   avatar: "EN", car: "Porsche Taycan Turbo", bestLap: "1:41.002", sessions: 6,  delta: null },
        { pos: 2, name: "Sophie L.", avatar: "SL", car: "Tesla Model S Plaid",  bestLap: "1:41.998", sessions: 8,  delta: "+0.996" },
        { pos: 3, name: "Mia C.",    avatar: "MC", car: "BMW i4 M50",          bestLap: "1:43.445", sessions: 4,  delta: "+2.443" },
      ]},
    ],
  },
];

const MEDAL_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

const GroupDetailView = ({ group, onBack }) => {
  const [gtab, setGtab] = useState("leaderboard");
  const [circuitIdx, setCircuitIdx] = useState(0);

  const circuitData = group.circuits[circuitIdx];
  const entries = circuitData.entries;
  const myPos = entries.find((e) => e.avatar === "AM");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Group header */}
      <div style={{ padding: "8px 0 0", flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Back to groups" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: "0 0 12px", color: "#aaa" }}>
          <Icon name="chevron_left" size={15} color="#aaa" />
          <span style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: 2 }}>GROUPS</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `${group.color}22`, border: `1px solid ${group.color}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="users" size={22} color={group.color} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 700, color: "white" }}>{group.name}</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 1 }}>{group.members} MEMBERS · {group.tag.toUpperCase()}</div>
          </div>
          <div style={{ background: group.color, border: "none", borderRadius: 20, padding: "6px 14px", fontFamily: "monospace", fontSize: 12, color: "white", letterSpacing: 1 }}>JOINED</div>
        </div>
        {/* Sub-tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #181818" }}>
          {["leaderboard", "members"].map((t) => (
            <button key={t} onClick={() => setGtab(t)} aria-pressed={gtab === t} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 16px", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, color: gtab === t ? group.color : "#aaa", borderBottom: gtab === t ? `2px solid ${group.color}` : "2px solid transparent", transition: "color 0.2s, border-color 0.2s", marginBottom: -1 }}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-tab content */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 16 }}>
        {gtab === "leaderboard" && (
          <>
            {/* Circuit selector */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2, marginBottom: 8 }}>CIRCUIT</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {group.circuits.map((c, i) => (
                  <button key={c.circuit} onClick={() => setCircuitIdx(i)} aria-pressed={circuitIdx === i} style={{ background: circuitIdx === i ? group.color : "#111", border: `1px solid ${circuitIdx === i ? group.color : "#222"}`, borderRadius: 20, padding: "6px 14px", fontFamily: "monospace", fontSize: 12, color: circuitIdx === i ? "white" : "#ccc", cursor: "pointer", letterSpacing: 1, transition: "background 0.15s, border-color 0.15s, color 0.15s" }}>
                    {c.circuit}
                  </button>
                ))}
              </div>
            </div>

            {/* My position banner */}
            {myPos && (
              <div style={{ background: `${group.color}15`, border: `1px solid ${group.color}44`, borderRadius: 12, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={group.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: group.color, letterSpacing: 1 }}>YOUR POSITION</span>
                <span style={{ fontFamily: "Georgia,serif", fontSize: 14, fontWeight: 700, color: "white", marginLeft: "auto" }}>#{myPos.pos}</span>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: group.color }}>{myPos.bestLap}</span>
              </div>
            )}
            {/* Podium top 3 */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 20, justifyContent: "center" }}>
              {[entries[1], entries[0], entries[2]].map((entry, i) => {
                if (!entry) return null;
                const heights = [80, 100, 65];
                const podiumPos = [2, 1, 3];
                return (
                  <div key={entry.name} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg,${MEDAL_COLORS[podiumPos[i]-1]},${MEDAL_COLORS[podiumPos[i]-1]}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#111", border: `2px solid ${MEDAL_COLORS[podiumPos[i]-1]}` }}>{entry.avatar}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "white", textAlign: "center", fontWeight: 700 }}>{entry.name.split(" ")[0]}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: MEDAL_COLORS[podiumPos[i]-1] }}>{entry.bestLap}</div>
                    <div style={{ width: "100%", height: heights[i], background: `${MEDAL_COLORS[podiumPos[i]-1]}22`, border: `1px solid ${MEDAL_COLORS[podiumPos[i]-1]}55`, borderRadius: "8px 8px 0 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 700, color: MEDAL_COLORS[podiumPos[i]-1] }}>P{podiumPos[i]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Full list */}
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 10 }}>ALL DRIVERS</div>
            {entries.map((entry) => {
              const isMe = entry.avatar === "AM";
              return (
                <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, marginBottom: 6, background: isMe ? `${group.color}10` : "#0f0f0f", border: `1px solid ${isMe ? group.color + "44" : "#1a1a1a"}` }}>
                  <div style={{ width: 22, textAlign: "center", fontFamily: "Georgia,serif", fontSize: 14, fontWeight: 700, color: entry.pos <= 3 ? MEDAL_COLORS[entry.pos - 1] : "#aaa", flexShrink: 0 }}>{entry.pos}</div>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: isMe ? `linear-gradient(135deg,#FF4500,#FF8C00)` : `${group.color}22`, border: `1px solid ${isMe ? "#FF4500" : group.color + "44"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: isMe ? "white" : group.color, flexShrink: 0 }}>{entry.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 700, color: isMe ? "white" : "#ccc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entry.name}{isMe && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", marginLeft: 6, letterSpacing: 1 }}>YOU</span>}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 0.5, marginTop: 1 }}>{entry.car}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: entry.pos === 1 ? MEDAL_COLORS[0] : "white" }}>{entry.bestLap}</div>
                    {entry.delta && <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", marginTop: 1 }}>{entry.delta}</div>}
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 4 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc" }}>{entry.sessions}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: "#aaa", letterSpacing: 0.5 }}>SESS</div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        {gtab === "members" && (
          <>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2, marginBottom: 12 }}>{group.members} MEMBERS</div>
            {/* Unique members across all circuits */}
            {Array.from(new Map(group.circuits.flatMap(c => c.entries).map(e => [e.avatar, e])).values()).map((entry) => {
              const isMe = entry.avatar === "AM";
              const allCircuits = group.circuits.filter(c => c.entries.find(e => e.avatar === entry.avatar));
              return (
                <div key={entry.avatar} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #141414" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: isMe ? "linear-gradient(135deg,#FF4500,#FF8C00)" : `${group.color}22`, border: `1px solid ${isMe ? "#FF4500" : group.color+"44"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: isMe ? "white" : group.color, flexShrink: 0 }}>{entry.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 700, color: "white" }}>{entry.name}{isMe && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", marginLeft: 6, letterSpacing: 1 }}>YOU</span>}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 0.5, marginTop: 1 }}>{entry.sessions} sessions · {allCircuits.length} circuit{allCircuits.length > 1 ? "s" : ""}</div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

const CommunityScreen = () => {
  const [ctab, setCtab] = useState("feed");
  const [liked, setLiked] = useState(new Set());
  const [selectedGroup, setSelectedGroup] = useState(null);
  const toggleLike = (id) => setLiked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 0", flexShrink: 0 }}>
        <div style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", letterSpacing: 3, marginBottom: 4 }}>
          DRIVERS
        </div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 26, fontWeight: 700, color: "white", marginBottom: 16 }}>
          Community
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #181818" }}>
          {["feed", "groups", "events"].map((t) => (
            <button key={t} onClick={() => setCtab(t)} aria-pressed={ctab === t} style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 18px", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, color: ctab === t ? "#FF4500" : "#aaa", borderBottom: ctab === t ? "2px solid #FF4500" : "2px solid transparent", transition: "color 0.2s, border-color 0.2s", marginBottom: -1 }}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 90px" }}>
        {ctab === "feed" && (
          <>
            {/* Weekly leaderboard highlight */}
            <button type="button" onClick={() => { setCtab("groups"); setSelectedGroup(GROUPS[0]); }} style={{ display: "block", width: "100%", textAlign: "left", marginBottom: 14, borderRadius: 16, background: "linear-gradient(135deg,rgba(192,57,43,0.15),rgba(192,57,43,0.05))", border: "1px solid rgba(192,57,43,0.3)", padding: "14px 16px", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "#FFD700", letterSpacing: 2 }}>WEEKLY HIGHLIGHT · GT SPAIN</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#FFD700,#FFA500)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#111" }}>CR</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 14, fontWeight: 700, color: "white" }}>Carlos R. set the fastest lap this week</div>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", marginTop: 2 }}>BMW M4 GT3 · <span style={{ color: "#FFD700" }}>1:38.241</span> at Jerez</div>
                </div>
                <Icon name="chevron_right" size={14} color="#C0392B" />
              </div>
            </button>
            {COMMUNITY_POSTS.map((post) => (
          <div key={post.id} style={{ marginBottom: 14, borderRadius: 16, background: "#111", border: "1px solid #1a1a1a", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#FF4500,#FF8C00)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 11, color: "white", fontWeight: 700, flexShrink: 0 }}>
                {post.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 700, color: "white" }}>{post.user}</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "#aaa", letterSpacing: 1 }}>{post.time}</div>
              </div>
              <div style={{ background: "#1a1a1a", borderRadius: 20, padding: "4px 10px", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: post.color }} />
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 1 }}>{post.tag.toUpperCase()}</span>
              </div>
            </div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "#ccc", lineHeight: 1.55, marginBottom: 14 }}>
              {post.text}
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <button onClick={() => toggleLike(post.id)} aria-label={`Like post by ${post.user}`} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill={liked.has(post.id) ? "#FF4500" : "none"} stroke={liked.has(post.id) ? "#FF4500" : "#888"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: liked.has(post.id) ? "#FF4500" : "#aaa" }}>{post.likes + (liked.has(post.id) ? 1 : 0)}</span>
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
          </>
        )}

        {ctab === "groups" && (
          <>
            {selectedGroup ? (
              <GroupDetailView group={selectedGroup} onBack={() => setSelectedGroup(null)} />
            ) : (
              <>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2, marginBottom: 14 }}>POPULAR GROUPS</div>
                {GROUPS.map((g) => (
                  <button type="button" key={g.name} onClick={() => setSelectedGroup(g)} style={{ display: "flex", width: "100%", background: "none", border: "none", borderBottom: "1px solid #141414", textAlign: "left", alignItems: "center", gap: 14, padding: "14px 0", cursor: "pointer" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: `${g.color}22`, border: `1px solid ${g.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="users" size={18} color={g.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 14, fontWeight: 700, color: "white", marginBottom: 2 }}>{g.name}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 1 }}>{g.members} MEMBERS · {g.tag.toUpperCase()}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: g.color, background: `${g.color}15`, border: `1px solid ${g.color}33`, borderRadius: 20, padding: "4px 10px", letterSpacing: 1, display: "flex", alignItems: "center", gap: 4 }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={g.color} strokeWidth="2.5"><polyline points="18 9 12 3 6 9"/><polyline points="18 15 12 21 6 15"/></svg>
                        LB
                      </div>
                      <Icon name="chevron_right" size={14} color="#888" />
                    </div>
                  </button>
                ))}
              </>
            )}
          </>
        )}

        {ctab === "events" && (
          <div style={{ textAlign: "center", padding: "50px 20px" }}>
            <Icon name="users" size={40} color="#555" />
            <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "#aaa", marginTop: 16, marginBottom: 8 }}>Coming Soon</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#888", letterSpacing: 1 }}>DRIVER MEETUPS & EVENTS</div>
          </div>
        )}
      </div>
    </div>
  );
};

const COUNTRIES = ["Spain","Germany","France","Italy","Portugal","United Kingdom","Netherlands","Belgium","Switzerland","Austria","Poland","Sweden","Norway","Denmark","Other"];
const CATEGORIES = ["B","B+E","A","A2","A1","AM","C","C+E","D"];

const LicenceScreen = ({ onBack }) => {
  const [country, setCountry] = useState("Spain");
  const [showCountry, setShowCountry] = useState(false);
  const [licNum, setLicNum] = useState("");
  const [expDate, setExpDate] = useState("");
  const [issued, setIssued] = useState("");
  const [cats, setCats] = useState(new Set(["B"]));
  const [saved, setSaved] = useState(false);

  const toggleCat = (c) => setCats(prev => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n; });

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 20px", flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Go back" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: 0 }}>
          <Icon name="chevron_left" size={18} color="#aaa" />
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2 }}>BACK</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: "rgba(255,69,0,0.12)", border: "1px solid rgba(255,69,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="id_card" size={20} color="#FF4500" />
          </div>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", letterSpacing: 3 }}>PROFILE</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 700, color: "white" }}>Driving Licence</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
        {/* Country */}
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="lic-country" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block", cursor: "pointer" }}>LICENCE COUNTRY</label>
          <div id="lic-country" role="combobox" aria-expanded={showCountry} aria-haspopup="listbox" tabIndex={0} onClick={() => setShowCountry(!showCountry)} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setShowCountry(!showCountry)} style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="globe" size={16} color="#888" />
              <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "white" }}>{country}</span>
            </div>
            <Icon name="chevron_down" size={16} color="#888" />
          </div>
          {showCountry && (
            <div role="listbox" style={{ background: "#111", border: "1px solid #222", borderRadius: 12, marginTop: 4, maxHeight: 160, overflowY: "auto" }}>
              {COUNTRIES.map((c) => (
                <div key={c} role="option" aria-selected={c === country} onClick={() => { setCountry(c); setShowCountry(false); }} style={{ padding: "12px 16px", fontFamily: "Georgia,serif", fontSize: 13, color: c === country ? "#FF4500" : "#ccc", borderBottom: "1px solid #141414", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                  {c} {c === country && <Icon name="check" size={14} color="#FF4500" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Licence number */}
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="lic-number" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>LICENCE NUMBER</label>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="id_card" size={16} color="#888" />
            <input id="lic-number" name="licence-number" autoComplete="off" value={licNum} onChange={e => setLicNum(e.target.value)} placeholder="e.g. 12345678A" style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 14, fontFamily: "Georgia,serif", flex: 1 }} />
          </div>
        </div>

        {/* Dates row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
          <div>
            <label htmlFor="lic-issued" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>ISSUE DATE</label>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 12px" }}>
              <input id="lic-issued" name="licence-issued" autoComplete="off" type="text" value={issued} onChange={e => setIssued(e.target.value)} placeholder="MM/YYYY" style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 13, fontFamily: "Georgia,serif", width: "100%" }} />
            </div>
          </div>
          <div>
            <label htmlFor="lic-expiry" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>EXPIRY DATE</label>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 12px" }}>
              <input id="lic-expiry" name="licence-expiry" autoComplete="off" type="text" value={expDate} onChange={e => setExpDate(e.target.value)} placeholder="MM/YYYY" style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 13, fontFamily: "Georgia,serif", width: "100%" }} />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2, marginBottom: 12 }}>CATEGORIES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => toggleCat(c)} style={{ padding: "8px 16px", borderRadius: 20, border: cats.has(c) ? "1px solid #FF4500" : "1px solid #222", background: cats.has(c) ? "rgba(255,69,0,0.12)" : "#111", fontFamily: "monospace", fontSize: 12, color: cats.has(c) ? "#FF4500" : "#aaa", cursor: "pointer", letterSpacing: 1 }}>
                {c}
              </button>
            ))}
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: "#aaa", letterSpacing: 1, marginTop: 10 }}>SELECT THE CATEGORIES THAT APPEAR ON YOUR LICENCE</div>
        </div>

        {/* Info card */}
        <div style={{ background: "rgba(255,69,0,0.06)", border: "1px solid rgba(255,69,0,0.15)", borderRadius: 14, padding: "14px 16px", marginBottom: 28, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <Icon name="shield" size={16} color="#FF4500" />
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", lineHeight: 1.6, letterSpacing: 0.5 }}>
            YOUR DATA IS VERIFIED BEFORE CONFIRMING TRACK SESSIONS. ALL INFORMATION IS HANDLED WITH FULL CONFIDENTIALITY.
          </div>
        </div>

        {/* Save button */}
        {saved ? (
          <div style={{ width: "100%", background: "#0d2a0d", border: "1px solid #4CAF50", borderRadius: 14, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <Icon name="check" size={18} color="#4CAF50" />
            <span style={{ fontFamily: "monospace", fontSize: 12, color: "#4CAF50", letterSpacing: 2 }}>SAVED</span>
          </div>
        ) : (
          <button onClick={() => setSaved(true)} style={{ width: "100%", background: "#FF4500", border: "none", borderRadius: 14, padding: "16px", fontFamily: "monospace", fontSize: 12, letterSpacing: 2, color: "white", cursor: "pointer" }}>
            SAVE LICENCE
          </button>
        )}
      </div>
    </div>
  );
};

const CAR_BRANDS = ["Audi","BMW","Ferrari","Ford","Honda","Lamborghini","Lotus","McLaren","Mercedes","Mitsubishi","Nissan","Porsche","Renault","Subaru","Toyota","Volkswagen","Other"];
const CAR_YEARS = Array.from({ length: 30 }, (_, i) => String(2025 - i));

const CarScreen = ({ cars, onSave, onDelete, onBack }) => {
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [showBrand, setShowBrand] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openNew = () => {
    setEditing(null); setPlate(""); setBrand(""); setModel(""); setYear("");
    setShowBrand(false); setShowYear(false);
    setView("form");
  };
  const openEdit = (car) => {
    setEditing(car); setPlate(car.plate); setBrand(car.brand); setModel(car.model); setYear(car.year);
    setShowBrand(false); setShowYear(false);
    setView("form");
  };
  const handleSave = () => {
    if (!plate && !brand && !model) return;
    onSave({ id: editing ? editing.id : Date.now(), plate, brand, model, year });
    setEditing(null); setView("list");
  };
  const handleDelete = (id) => { onDelete(id); setConfirmDelete(null); };

  /* ── FORM VIEW ── */
  if (view === "form") {
    return (
      <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "52px 20px 20px", flexShrink: 0 }}>
          <button onClick={() => setView("list")} aria-label="Back to vehicle list" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: 0 }}>
            <Icon name="chevron_left" size={18} color="#aaa" />
            <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2 }}>BACK</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, background: "rgba(255,69,0,0.12)", border: "1px solid rgba(255,69,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="car" size={20} color="#FF4500" />
            </div>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", letterSpacing: 3 }}>MY GARAGE</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 700, color: "white" }}>{editing ? "Edit Vehicle" : "Add Vehicle"}</div>
            </div>
          </div>
        </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
        {/* Plate */}
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="car-plate" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>PLATE NUMBER</label>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "#1a2a5e", borderRadius: 4, padding: "2px 6px", fontFamily: "monospace", fontSize: 12, color: "#5b8af0", letterSpacing: 1 }}>ES</div>
            <input id="car-plate" name="plate" autoComplete="off" value={plate} onChange={e => setPlate(e.target.value.toUpperCase())} placeholder="1234 ABC" maxLength={8} style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 18, fontFamily: "monospace", flex: 1, letterSpacing: 4 }} />
          </div>
        </div>

        {/* Brand */}
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="car-brand" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>BRAND</label>
          <div id="car-brand" role="combobox" aria-expanded={showBrand} aria-haspopup="listbox" tabIndex={0} onClick={() => setShowBrand(!showBrand)} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setShowBrand(!showBrand)} style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: brand ? "white" : "#aaa" }}>{brand || "Select brand"}</span>
            <Icon name="chevron_down" size={16} color="#888" />
          </div>
          {showBrand && (
            <div role="listbox" style={{ background: "#111", border: "1px solid #222", borderRadius: 12, marginTop: 4, maxHeight: 160, overflowY: "auto" }}>
              {CAR_BRANDS.map((b) => (
                <div key={b} role="option" aria-selected={b === brand} onClick={() => { setBrand(b); setShowBrand(false); }} style={{ padding: "12px 16px", fontFamily: "Georgia,serif", fontSize: 13, color: b === brand ? "#FF4500" : "#ccc", borderBottom: "1px solid #141414", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                  {b} {b === brand && <Icon name="check" size={14} color="#FF4500" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Model */}
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="car-model" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>MODEL</label>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px" }}>
            <input id="car-model" name="car-model" autoComplete="off" value={model} onChange={e => setModel(e.target.value)} placeholder="e.g. M3 GT, 911 GT3, R8..." style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 14, fontFamily: "Georgia,serif", width: "100%" }} />
          </div>
        </div>

        {/* Year */}
        <div style={{ marginBottom: 28 }}>
          <label htmlFor="car-year" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>YEAR</label>
          <div id="car-year" role="combobox" aria-expanded={showYear} aria-haspopup="listbox" tabIndex={0} onClick={() => setShowYear(!showYear)} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setShowYear(!showYear)} style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: year ? "white" : "#aaa" }}>{year || "Select year"}</span>
            <Icon name="chevron_down" size={16} color="#888" />
          </div>
          {showYear && (
            <div role="listbox" style={{ background: "#111", border: "1px solid #222", borderRadius: 12, marginTop: 4, maxHeight: 160, overflowY: "auto" }}>
              {CAR_YEARS.map((y) => (
                <div key={y} role="option" aria-selected={y === year} onClick={() => { setYear(y); setShowYear(false); }} style={{ padding: "12px 16px", fontFamily: "Georgia,serif", fontSize: 13, color: y === year ? "#FF4500" : "#ccc", borderBottom: "1px solid #141414", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                  {y} {y === year && <Icon name="check" size={14} color="#FF4500" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview card */}
        {(plate || brand || model) && (
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "16px", marginBottom: 20 }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#888", letterSpacing: 2, marginBottom: 12 }}>PREVIEW</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,69,0,0.1)", border: "1px solid rgba(255,69,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="car" size={22} color="#FF4500" />
              </div>
              <div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 700, color: "white" }}>{[brand, model].filter(Boolean).join(" ") || "—"}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  {plate && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", background: "rgba(255,69,0,0.08)", padding: "2px 8px", borderRadius: 6, letterSpacing: 2 }}>{plate}</span>}
                  {year && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>{year}</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        <button onClick={handleSave} style={{ width: "100%", background: plate || brand || model ? "#FF4500" : "#1a1a1a", border: "none", borderRadius: 14, padding: "16px", fontFamily: "monospace", fontSize: 12, letterSpacing: 2, color: plate || brand || model ? "white" : "#aaa", cursor: plate || brand || model ? "pointer" : "default" }}>
            {editing ? "UPDATE VEHICLE" : "SAVE VEHICLE"}
          </button>
        </div>
      </div>
    );
  }

  /* ── LIST VIEW ── */
  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "52px 20px 20px", flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Go back to profile" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: 0 }}>
          <Icon name="chevron_left" size={18} color="#aaa" />
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2 }}>BACK</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, background: "rgba(255,69,0,0.12)", border: "1px solid rgba(255,69,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="car" size={20} color="#FF4500" />
            </div>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", letterSpacing: 3 }}>PROFILE</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 700, color: "white" }}>My Garage</div>
            </div>
          </div>
          <button onClick={openNew} aria-label="Add new vehicle" style={{ background: "#FF4500", border: "none", borderRadius: 12, padding: "8px 14px", fontFamily: "monospace", fontSize: 12, letterSpacing: 2, color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> ADD
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
        {cars.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(255,69,0,0.08)", border: "1px solid rgba(255,69,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Icon name="car" size={28} color="#FF4500" />
            </div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "#ccc", marginBottom: 8 }}>No vehicles yet</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 1 }}>TAP + ADD TO GET STARTED</div>
          </div>
        ) : (
          cars.map((car) => (
            <div key={car.id} style={{ marginBottom: 12 }}>
              {confirmDelete === car.id ? (
                <div style={{ background: "#1a0000", border: "1px solid #FF4500", borderRadius: 16, padding: "16px" }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "white", marginBottom: 12 }}>Delete <b>{[car.brand, car.model].filter(Boolean).join(" ") || car.plate}</b>?</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, background: "#111", border: "1px solid #333", borderRadius: 10, padding: "10px", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, color: "#aaa", cursor: "pointer" }}>CANCEL</button>
                    <button onClick={() => handleDelete(car.id)} style={{ flex: 1, background: "#FF4500", border: "none", borderRadius: 10, padding: "10px", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, color: "white", cursor: "pointer" }}>DELETE</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "16px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,69,0,0.1)", border: "1px solid rgba(255,69,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="car" size={22} color="#FF4500" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 700, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[car.brand, car.model].filter(Boolean).join(" ") || "—"}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      {car.plate && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", background: "rgba(255,69,0,0.08)", padding: "2px 8px", borderRadius: 6, letterSpacing: 2 }}>{car.plate}</span>}
                      {car.year && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>{car.year}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button onClick={() => openEdit(car)} aria-label={`Edit ${car.brand} ${car.model}`} style={{ background: "#171717", border: "1px solid #2a2a2a", borderRadius: 10, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="edit" size={14} color="#aaa" />
                    </button>
                    <button onClick={() => setConfirmDelete(car.id)} aria-label={`Delete ${car.brand} ${car.model}`} style={{ background: "#1a0000", border: "1px solid #3a0000", borderRadius: 10, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="trash" size={14} color="#FF4500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const ProfileScreen = ({ onLicence, onCar, carsCount = 0 }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "#080808",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <div
      style={{ padding: "52px 20px 24px", textAlign: "center", flexShrink: 0 }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#FF4500,#FF8C00)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
        }}
      >
        <Icon name="user" size={28} color="white" />
      </div>
      <div
        style={{
          fontFamily: "Georgia,serif",
          fontSize: 21,
          fontWeight: 700,
          color: "white",
        }}
      >
        Alex Martín
      </div>
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 11,
          color: "#aaa",
          marginTop: 4,
        }}
      >
        alex.martin@gmail.com
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 28,
          marginTop: 24,
        }}
      >
        {[
          { v: "12", l: "SESSIONS" },
          { v: "4.9", l: "RATING" },
          { v: "3", l: "SAVED" },
        ].map((s) => (
          <div key={s.l} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "Georgia,serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#FF4500",
              }}
            >
              {s.v}
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                color: "#888",
                letterSpacing: 1,
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
      {[
        { label: "Driving Licence", action: onLicence },
        { label: `My Garage${carsCount > 0 ? ` (${carsCount})` : ""}`, action: onCar },
        { label: "Payment Method", action: null },
        { label: "Notifications", action: null },
        { label: "Insurance History", action: null },
        { label: "Help & Support", action: null },
        { label: "Log Out", action: null, danger: true },
      ].map((item, i) => (
        <button
          key={i}
          type="button"
          onClick={item.action || undefined}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 0",
            border: "none",
            borderBottom: "1px solid #1a1a1a",
            background: "none",
            width: "100%",
            cursor: item.action ? "pointer" : "default",
            textAlign: "left"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "Georgia,serif", fontSize: 15, color: item.danger ? "#FF4500" : "#eee" }}>
              {item.label}
            </span>
          </div>
          {!item.danger && (
            <Icon name="chevron_right" size={16} color={item.action ? "#888" : "#444"} />
          )}
        </button>
      ))}
    </div>
  </div>
);

const NavBar = ({ tab, setTab }) => (
  <nav
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      background: "rgba(8,8,8,0.98)",
      backdropFilter: "blur(24px)",
      borderTop: "1px solid #1a1a1a",
      display: "flex",
      justifyContent: "space-around",
      padding: "12px 0 28px",
      zIndex: 100,
    }}
  >
    {[
	  { id: "home", icon: "home", label: "Explore" },
      { id: "map", icon: "map_pin", label: "Map" },
      { id: "community", icon: "users", label: "Community" },
      { id: "bookings", icon: "ticket", label: "Bookings" },
      { id: "profile", icon: "user", label: "Profile" },
    ].map((item) => (
      <button
        key={item.id}
        type="button"
        onClick={() => setTab(item.id)}
        aria-pressed={tab === item.id}
        aria-label={`Go to ${item.label}`}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          padding: "0 12px",
          transition: "transform 0.15s",
        }}
      >
        <Icon
          name={item.icon}
          size={22}
          color={tab === item.id ? "#FF4500" : "#666"}
        />
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 9,
            fontWeight: tab === item.id ? 700 : 400,
            letterSpacing: 0.5,
            color: tab === item.id ? "#FF4500" : "#888",
          }}
        >
          {item.label.toUpperCase()}
        </span>
      </button>
    ))}
  </nav>
);

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [tab, setTab] = useState("home");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [bookVenue, setBookVenue] = useState(null);
  const [bookSession, setBookSession] = useState(null);
  const [bookInsurance, setBookInsurance] = useState(null);
  const [bookCarId, setBookCarId] = useState(null);
  const [bookBriefingComplete, setBookBriefingComplete] = useState(false);
  const [briefingBooking, setBriefingBooking] = useState(null);
  const [detailBooking, setDetailBooking] = useState(null);
  const [favorites, setFavorites] = useState(new Set([1]));
  const [statsBooking, setStatsBooking] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  const addBooking = (b) => setBookings((prev) => [b, ...prev]);
  const deleteBooking = (id) => setBookings((prev) => prev.filter((b) => b.id !== id));
  const rescheduleBooking = (id, newSession) => setBookings((prev) =>
    prev.map((b) => b.id === id ? { ...b, session: newSession } : b)
  );

  const saveCar = (car) => setCars((prev) => {
    const exists = prev.find((c) => c.id === car.id);
    return exists ? prev.map((c) => c.id === car.id ? car : c) : [...prev, car];
  });
  const deleteCar = (id) => setCars((prev) => prev.filter((c) => c.id !== id));

  const toggleFav = (id) =>
    setFavorites((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const goDetail = (v) => {
    setSelectedVenue(v);
    setScreen("detail");
  };
  const goInsurance = (v, s, briefing) => {
    setBookVenue(v);
    setBookSession(s);
    setBookBriefingComplete(briefing || false);
    setScreen("insurance");
  };
  const goBook = (insurance) => {
    setBookInsurance(insurance);
    setScreen("booking");
  };
  const goBriefingForBooking = (b) => {
    setBriefingBooking(b);
    setScreen("briefing_standalone");
  };
  const goBookingDetail = (b) => {
    setDetailBooking(b);
    setScreen("booking_detail");
  };
  const completeBriefing = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, briefingComplete: true } : b));
    setScreen("main");
    setTab("bookings");
  };

  const renderMain = () => {
    if (tab === "map") return <MapScreen onVenue={goDetail} />;
    if (tab === "community") return <CommunityScreen />;
    if (tab === "home") return <HomeScreen onVenue={goDetail}
          favorites={favorites}
          toggleFav={toggleFav} />;
    if (tab === "bookings") return <BookingsScreen onSelect={goBookingDetail} onBriefing={goBriefingForBooking} onStats={(b) => { setStatsBooking(b); setScreen("stats"); }} bookings={bookings} onDelete={deleteBooking} onReschedule={rescheduleBooking} />;
    if (tab === "profile") return <ProfileScreen onLicence={() => setScreen("licence")} onCar={() => setScreen("car")} carsCount={cars.length} />;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia,serif",
        padding: "20px",
        colorScheme: "dark",
      }}
    >
      <style>{`*{box-sizing:border-box;margin:0;padding:0;} body{background:#111;} input::placeholder{color:#444;} ::-webkit-scrollbar{display:none;}`}</style>

      {/* Top label */}
      {/* <div
        style={{
          position: "fixed",
          top: 18,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "monospace",
          fontSize: 9,
          color: "#333",
          letterSpacing: 3,
          zIndex: 1000,
          whiteSpace: "nowrap",
        }}
      >
        TRACKSWAP · DRIVER APP · PITCH DEMO
      </div> */}

      {/* Feature callouts — right side */}
      {/* <div
        style={{
          position: "fixed",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          pointerEvents: "none",
        }}
      >
        {[
          { dot: "#4CAF50", text: "Real-time availability" },
          { dot: "#FF4500", text: "Integrated insurance" },
          { dot: "#FFD700", text: "Digital safety brief" },
          { dot: "#2196F3", text: "Non-traditional venues" },
          { dot: "#9C27B0", text: "Dynamic pricing" },
        ].map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: item.dot,
                flexShrink: 0,
                boxShadow: `0 0 8px ${item.dot}`,
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                color: "#444",
                letterSpacing: 1,
                whiteSpace: "nowrap",
              }}
            >
              {item.text.toUpperCase()}
            </span>
          </div>
        ))}
      </div> */}

      {/* Screen label — left side */}
      {/* <div
        style={{
          position: "fixed",
          left: 24,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 8,
            color: "#2a2a2a",
            letterSpacing: 2,
          }}
        >
          SCREENS
        </div>
        {[
          { s: "splash", l: "Splash" },
          { s: "main", l: "Main" },
          { s: "detail", l: "Detail" },
          { s: "booking", l: "Booking" },
          { s: "licence", l: "Licence" },
          { s: "car", l: "Car" },
        ].map((item) => (
          <div
            key={item.s}
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              color:
                screen === item.s || (screen === "main" && item.s === "main")
                  ? "#FF4500"
                  : "#2a2a2a",
              letterSpacing: 1,
              transition: "color 0.2s",
            }}
          >
            {screen === item.s ? "▶ " : ""}
            {item.l.toUpperCase()}
          </div>
        ))}
      </div> */}

      {/* Phone */}
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 52,
          background: "#050505",
          border: "10px solid #1c1c1e",
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 0 0 1px #2a2a2a,0 50px 120px rgba(0,0,0,0.9),0 0 80px rgba(255,69,0,0.04)",
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 126,
            height: 34,
            background: "#050505",
            borderRadius: "0 0 20px 20px",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#1a1a1a",
            }}
          />
          <div
            style={{
              width: 58,
              height: 5,
              background: "#1a1a1a",
              borderRadius: 3,
            }}
          />
        </div>

        {/* Screen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 42,
            overflow: "hidden",
          }}
        >
          {screen === "splash" && (
            <SplashScreen onDone={() => setScreen("main")} />
          )}
          {screen === "main" && (
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              {renderMain()}
              <NavBar
                tab={tab}
                setTab={(t) => {
                  setTab(t);
                  setScreen("main");
                }}
              />
            </div>
          )}
          {screen === "detail" && selectedVenue && (
            <DetailScreen
              venue={selectedVenue}
              onBack={() => setScreen("main")}
              onBook={(v, s) => goInsurance(v, s)}
              isFav={favorites.has(selectedVenue.id)}
              toggleFav={toggleFav}
            />
          )}
          {screen === "insurance" && bookVenue && (
            <InsuranceSelectionScreen
              venue={bookVenue}
              session={bookSession}
              cars={cars}
              briefingComplete={bookBriefingComplete}
              onSelect={(i, c) => {
                setBookInsurance(i);
                setBookCarId(c?.id || null);
                setScreen("booking");
              }}
              onBack={() => setScreen("detail")}
            />
          )}
          {screen === "booking" && bookVenue && bookInsurance && (
            <BookingScreen
              venue={bookVenue}
              session={bookSession}
              insurance={bookInsurance}
              preSelectedCarId={bookCarId}
              briefingComplete={bookBriefingComplete}
              cars={cars}
              onConfirm={(b) => addBooking(b)}
              onDone={() => { setTab("bookings"); setScreen("main"); }}
              onBack={() => setScreen("insurance")}
            />
          )}
          {screen === "briefing_standalone" && briefingBooking && (
            <BriefingScreen
              venue={VENUES.find(v => v.name === briefingBooking.name) || { name: briefingBooking.name }}
              isStandalone={true}
              onComplete={() => completeBriefing(briefingBooking.id)}
              onBack={() => setScreen("main")}
            />
          )}
          {screen === "booking_detail" && detailBooking && (
            <BookingDetailScreen
              booking={detailBooking}
              onBack={() => setScreen("main")}
              onDelete={deleteBooking}
              onReschedule={rescheduleBooking}
              onBriefing={goBriefingForBooking}
              onStats={(b) => { setStatsBooking(b); setScreen("stats"); }}
            />
          )}
          {screen === "licence" && (
            <LicenceScreen onBack={() => setScreen("main")} />
          )}
          {screen === "car" && (
            <CarScreen cars={cars} onSave={saveCar} onDelete={deleteCar} onBack={() => setScreen("main")} />
          )}
          {screen === "stats" && statsBooking && (
            <SessionStatsScreen
              booking={statsBooking}
              onBack={() => { setScreen("main"); setTab("bookings"); }}
            />
          )}
        </div>

        {/* Home indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 5,
            background: "#444",
            borderRadius: 3,
            zIndex: 300,
          }}
        />
      </div>
    </div>
  );
}
