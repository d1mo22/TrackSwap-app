# TrackSwap — Refactor + Map + i18n Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split two 5K-line monolithic files into a maintainable component structure, replace the SVG map with MapLibre GL, and add ES/EN/PT language switching via a splash-screen pill picker.

**Architecture:** Shared primitives live in `src/components/`, per-app screens in `src/screens/` and `src/dashboard/`, constants in `src/constants/`, and translations in `src/i18n/`. Both `App.jsx` and `Dashboard.jsx` shrink to pure routing shells. Tailwind is added via `@tailwindcss/vite` (used only by the map component). Language state is a React Context backed by localStorage.

**Tech Stack:** React 18, Vite, MapLibre GL 4, Tailwind CSS v4 (via `@tailwindcss/vite`), custom i18n Context (no external library)

---

## File Map

### New files to create
```
src/
  components/
    Icon.jsx           ← merged Icon from App.jsx:176 + Dashboard.jsx:175
    VenueArt.jsx       ← from App.jsx:476–591
    Badge.jsx          ← from Dashboard.jsx:377–405
    StatCard.jsx       ← from Dashboard.jsx:406–494
    Btn.jsx            ← from Dashboard.jsx:848–876
  constants/
    theme.js           ← App brand tokens: #FF4500, #050505; Dashboard tokens: T object
    venues.js          ← VENUES, FILTERS, CIRCUITS_DATA, INITIAL_BOOKINGS, AVAILABLE_SESSIONS
    dashboard.js       ← SLOTS, BOOKINGS, NOISE_DATA, REVENUE_DATA, UTIL_DATA, DAYS, MONTHS
  screens/
    SplashScreen.jsx   ← App.jsx:592 + language picker added
    MapScreen.jsx      ← MapLibre GL replacement of App.jsx:692
    HomeScreen.jsx     ← App.jsx:883
    DetailScreen.jsx   ← App.jsx:1381
    InsuranceSelectionScreen.jsx  ← App.jsx:2206
    BriefingScreen.jsx ← App.jsx:2345
    BookingScreen.jsx  ← App.jsx:2510
    SessionStatsScreen.jsx  ← App.jsx:3126
    BookingDetailScreen.jsx ← App.jsx:3309
    BookingsScreen.jsx ← App.jsx:3469
    GroupDetailView.jsx ← App.jsx:3631
    CommunityScreen.jsx ← App.jsx:3759
    LicenceScreen.jsx  ← App.jsx:3886
    CarScreen.jsx      ← App.jsx:4003
    ProfileScreen.jsx  ← App.jsx:4205
    NavBar.jsx         ← App.jsx:4332
  dashboard/
    OverviewScreen.jsx ← Dashboard.jsx:877
    CalendarScreen.jsx ← Dashboard.jsx:1649
    BookingsScreen.jsx ← Dashboard.jsx:2094
    AnalyticsScreen.jsx ← Dashboard.jsx:2338
    NoiseScreen.jsx    ← Dashboard.jsx:2712
    PricingScreen.jsx  ← Dashboard.jsx:3139
    SettingsScreen.jsx ← Dashboard.jsx:3623
    Sidebar.jsx        ← Dashboard.jsx:495
    TopBar.jsx         ← Dashboard.jsx:809
  i18n/
    index.jsx          ← LanguageContext, LanguageProvider, useLanguage hook
    es.js              ← Spanish strings
    en.js              ← English strings
    pt.js              ← Portuguese strings
  index.css            ← @import "tailwindcss" + maplibre-gl/dist/maplibre-gl.css
```

### Files to modify
```
src/App.jsx            ← gutted to routing shell only (~120 lines)
src/Dashboard.jsx      ← gutted to routing shell only (~90 lines)
src/main.jsx           ← wrap both apps in LanguageProvider, import index.css
vite.config.js         ← add @tailwindcss/vite plugin
```

---

## Task 1: Create folder structure & extract constants

**Files:**
- Create: `src/constants/theme.js`
- Create: `src/constants/venues.js`
- Create: `src/constants/dashboard.js`

- [ ] Create `src/constants/theme.js` with the App brand tokens:
```js
// App (dark) theme
export const APP = {
  bg: "#050505",
  card: "#0d0d0d",
  border: "#1a1a1a",
  accent: "#FF4500",
  accentHover: "#e03d00",
  text: "#ffffff",
  textMid: "#888888",
  textLight: "#444444",
  font: "monospace",
};

// Dashboard (light) theme
export const DASH = {
  bg: "#F7F5F2",
  bgCard: "#FFFFFF",
  bgDark: "#0E0E0E",
  border: "#E8E4DF",
  borderStrong: "#D0C8BF",
  text: "#0E0E0E",
  textMid: "#6B6560",
  textLight: "#A8A39D",
  orange: "#E84A00",
  orangeLight: "#FFF0EA",
  orangeMid: "#FF6B2B",
  green: "#1A7A4A",
  greenLight: "#EAF5EE",
  red: "#C0392B",
  redLight: "#FDECEA",
  yellow: "#D4820A",
  yellowLight: "#FEF6E4",
  blue: "#1A4D8F",
  blueLight: "#EAF0FA",
};
```

- [ ] Create `src/constants/venues.js` — cut CIRCUITS_DATA (App.jsx:3–84), VENUES (App.jsx:86–173), FILTERS (App.jsx:174), INITIAL_BOOKINGS (App.jsx:3287–3306), AVAILABLE_SESSIONS (App.jsx:3307–3308). Add `lat` and `lng` as real object properties to each venue object in VENUES:
```js
// id 1 — Circuito de Jerez:  add  lat: 36.7082,  lng: -6.0341
// id 2 — Circuito de Navarra: add lat: 42.5681,  lng: -2.0132
// id 3 — Karting Lloret:     add  lat: 41.6950,  lng:  2.8490
// id 4 — Airfield Rota:      add  lat: 36.6440,  lng: -6.3498
// id 5 — Industrial Lot BCN: add  lat: 41.3430,  lng:  2.1200

// Example of correct format for venue id 1:
const VENUES = [
  {
    id: 1,
    name: "Circuito de Jerez",
    lat: 36.7082,
    lng: -6.0341,
    // ... rest of existing properties unchanged
  },
  // ... repeat pattern for all 5 venues
];
export { CIRCUITS_DATA, VENUES, FILTERS, INITIAL_BOOKINGS, AVAILABLE_SESSIONS };
```

- [ ] Create `src/constants/dashboard.js` — cut DAYS, MONTHS, generateSlots, SLOTS, BOOKINGS, NOISE_DATA, REVENUE_DATA, UTIL_DATA from Dashboard.jsx:27–172:
```js
export { DAYS, MONTHS, SLOTS, BOOKINGS, NOISE_DATA, REVENUE_DATA, UTIL_DATA };
```

- [ ] Verify: `npm run dev` — app should still load (no imports changed yet)

---

## Task 2: Extract shared Icon component

**Files:**
- Create: `src/components/Icon.jsx`

The Icon components in App.jsx:176–475 and Dashboard.jsx:175–376 are near-identical. The App version is authoritative (has more icons).

- [ ] Create `src/components/Icon.jsx` using the **Dashboard signature** (superset — adds `style` prop and `size=18` default that Dashboard screens rely on). Copy the full SVG body from App.jsx:176–475 (it has more icons), then update the function signature:
```jsx
export default function Icon({ name, size = 18, color = "currentColor", style = {} }) {
  // ... full SVG switch/map from App.jsx:176–475
}
```

- [ ] In App.jsx, delete the local Icon definition (lines 176–475) and add at top:
```js
import Icon from "./components/Icon.jsx";
```

- [ ] In Dashboard.jsx, delete the local Icon definition (lines 175–376) and add at top:
```js
import Icon from "./components/Icon.jsx";
```

- [ ] Verify: `npm run dev` — all icons still render in both App and Dashboard

---

## Task 3: Extract VenueArt and App-side shared components

**Files:**
- Create: `src/components/VenueArt.jsx`

- [ ] Create `src/components/VenueArt.jsx` by cutting VenueArt from App.jsx:476–591, add import + export. Use the actual prop signature:
```jsx
import { CIRCUITS_DATA } from "../constants/venues.js";
export default function VenueArt({ type, color, h = 160, fill }) {
  // ... from App.jsx:476
}
```

- [ ] In App.jsx remove VenueArt definition, add import:
```js
import VenueArt from "./components/VenueArt.jsx";
```

- [ ] Verify: `npm run dev` — venue art still renders in detail screens

---

## Task 4: Extract Dashboard shared components

**Files:**
- Create: `src/components/Badge.jsx`
- Create: `src/components/StatCard.jsx`
- Create: `src/components/Btn.jsx`
- Create: `src/dashboard/Sidebar.jsx`
- Create: `src/dashboard/TopBar.jsx`

- [ ] Create `src/components/Badge.jsx` (cut from Dashboard.jsx:377–405):
```jsx
import { DASH as T } from "../constants/theme.js";
export default function Badge({ status }) { /* ... */ }
```

- [ ] Create `src/components/StatCard.jsx` (cut from Dashboard.jsx:406–494), import Badge:
```jsx
import { DASH as T } from "../constants/theme.js";
import Badge from "./Badge.jsx";
export default function StatCard({ ... }) { /* ... */ }
```

- [ ] Create `src/components/Btn.jsx` (cut from Dashboard.jsx:848–876). Use the actual prop signature:
```jsx
import { DASH as T } from "../constants/theme.js";
export default function Btn({ label, icon, primary, onClick, small }) { /* ... */ }
```

- [ ] Create `src/dashboard/Sidebar.jsx` (cut from Dashboard.jsx:495–808), add imports for Icon. Use actual prop signature:
```jsx
import Icon from "../components/Icon.jsx";
import { DASH as T } from "../constants/theme.js";
export default function Sidebar({ active, setActive, collapsed, setCollapsed }) { /* ... */ }
```

- [ ] Create `src/dashboard/TopBar.jsx` (cut from Dashboard.jsx:809–847). Use actual prop signature including `actions`:
```jsx
import { DASH as T } from "../constants/theme.js";
export default function TopBar({ title, subtitle, actions }) { /* ... */ }
```

- [ ] Add imports to Dashboard.jsx for all removed components, verify: `npm run dev`

---

## Task 5: Split App screens — part 1 (SplashScreen through HomeScreen)

**Files:**
- Create: `src/screens/SplashScreen.jsx`
- Create: `src/screens/MapScreen.jsx` (temporary — will be replaced in Task 10)
- Create: `src/screens/HomeScreen.jsx`

- [ ] Create `src/screens/SplashScreen.jsx` (cut from App.jsx:592–691):
```jsx
import { useState, useEffect } from "react";
export default function SplashScreen({ onDone }) { /* ... */ }
```

- [ ] Create `src/screens/MapScreen.jsx` (cut from App.jsx:692–880), import VENUES from constants:
```jsx
import { useState, useEffect } from "react";
import { VENUES } from "../constants/venues.js";
import VenueArt from "../components/VenueArt.jsx";
export default function MapScreen({ onVenue }) { /* ... SVG map for now */ }
```

- [ ] Create `src/screens/HomeScreen.jsx` (cut from App.jsx:883–1380), imports:
```jsx
import { useState } from "react";
import Icon from "../components/Icon.jsx";
import VenueArt from "../components/VenueArt.jsx";
import { VENUES, FILTERS } from "../constants/venues.js";
export default function HomeScreen({ onVenue, favorites, toggleFav }) { /* ... */ }
```

- [ ] Remove those 3 screen definitions from App.jsx, add imports at top
- [ ] Verify: `npm run dev` — Splash, Map, Home screens still work

---

## Task 6: Split App screens — part 2 (DetailScreen through NavBar)

**Files:** Create all remaining screen files in `src/screens/`

- [ ] Create `src/screens/DetailScreen.jsx` (App.jsx:1381–2205) with imports for Icon, VenueArt, VENUES, CIRCUITS_DATA
- [ ] Create `src/screens/InsuranceSelectionScreen.jsx` (App.jsx:2206–2344) with Icon import
- [ ] Create `src/screens/BriefingScreen.jsx` (App.jsx:2345–2509) with Icon import
- [ ] Create `src/screens/BookingScreen.jsx` (App.jsx:2510–3125) with Icon, VENUES imports
- [ ] Create `src/screens/SessionStatsScreen.jsx` (App.jsx:3126–3308) with Icon import
- [ ] **Note:** `INITIAL_BOOKINGS` (App.jsx:3287–3306) and `AVAILABLE_SESSIONS` (App.jsx:3307–3308) sit between these screen blocks. They must have already been moved to `constants/venues.js` in Task 1. Do NOT include them in any screen file.
- [ ] Create `src/screens/BookingDetailScreen.jsx` (App.jsx:3309–3468) with imports:
  ```jsx
  import Icon from "../components/Icon.jsx";
  import { AVAILABLE_SESSIONS } from "../constants/venues.js";
  ```
- [ ] Create `src/screens/BookingsScreen.jsx` (App.jsx:3469–3630) with Icon import
- [ ] Create `src/screens/GroupDetailView.jsx` (App.jsx:3631–3758) with Icon import
- [ ] Create `src/screens/CommunityScreen.jsx` (App.jsx:3759–3885) with Icon import
- [ ] Create `src/screens/LicenceScreen.jsx` (App.jsx:3886–4002) with Icon import
- [ ] Create `src/screens/CarScreen.jsx` (App.jsx:4003–4204) with Icon import
- [ ] Create `src/screens/ProfileScreen.jsx` (App.jsx:4205–4331) with Icon import
- [ ] Create `src/screens/NavBar.jsx` (App.jsx:4332–4392) with Icon import
- [ ] Remove all screen definitions from App.jsx; add imports for all 13 files above
- [ ] Verify App.jsx is now ~120 lines (only state + routing logic + imports)
- [ ] Verify: `npm run dev` — full navigation flow works end to end

---

## Task 7: Split Dashboard screens

**Files:** Create all Dashboard screen files in `src/dashboard/`

Every Dashboard screen uses `T.something` (355 occurrences). **Every file below must include** `import { DASH as T } from "../constants/theme.js"` — the alias `T` preserves all existing `T.bg`, `T.orange`, etc. references without any find/replace.

- [ ] Create `src/dashboard/OverviewScreen.jsx` (Dashboard.jsx:877–1648), imports: Icon, Badge, StatCard, Btn, TopBar, `{ DASH as T }` from theme, BOOKINGS, REVENUE_DATA, UTIL_DATA from dashboard constants
- [ ] Create `src/dashboard/CalendarScreen.jsx` (Dashboard.jsx:1649–2093), imports: Icon, Badge, Btn, TopBar, `{ DASH as T }`, SLOTS, DAYS, MONTHS
- [ ] Create `src/dashboard/BookingsScreen.jsx` (Dashboard.jsx:2094–2337), imports: Icon, Badge, Btn, TopBar, `{ DASH as T }`, BOOKINGS
- [ ] Create `src/dashboard/AnalyticsScreen.jsx` (Dashboard.jsx:2338–2711), imports: Icon, TopBar, `{ DASH as T }`, REVENUE_DATA, UTIL_DATA, NOISE_DATA
- [ ] Create `src/dashboard/NoiseScreen.jsx` (Dashboard.jsx:2712–3138), imports: Icon, TopBar, `{ DASH as T }`, NOISE_DATA
- [ ] Create `src/dashboard/PricingScreen.jsx` (Dashboard.jsx:3139–3622), imports: Icon, Btn, TopBar, `{ DASH as T }`
- [ ] Create `src/dashboard/SettingsScreen.jsx` (Dashboard.jsx:3623–end), imports: Icon, Btn, Badge, TopBar, `{ DASH as T }`
- [ ] Remove all screen + Sidebar + TopBar + Badge + StatCard + Btn definitions from Dashboard.jsx; add imports
- [ ] Verify Dashboard.jsx is now ~90 lines
- [ ] Verify: `npm run dev` — all 7 Dashboard screens navigate correctly

---

## Task 8: Install Tailwind + MapLibre GL

**Files:**
- Modify: `vite.config.js`
- Create: `src/index.css`
- Modify: `src/main.jsx`

- [ ] Install dependencies:
```bash
npm install maplibre-gl
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] Update `vite.config.js`:
```js
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, open: true, watch: { usePolling: true, interval: 300 } },
});
```

- [ ] Create `src/index.css`:
```css
@import "tailwindcss";
@import "maplibre-gl/dist/maplibre-gl.css";
```

- [ ] Update `src/main.jsx` to import the CSS. Also remove the dead `Dashboard` import (it's imported but never rendered in main.jsx — the current file imports it but only renders `<App />`):
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// Dashboard is rendered separately — not imported here

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] Verify: `npm run dev` — no errors, app still renders

---

## Task 9: Replace MapScreen with MapLibre GL

**Files:**
- Modify: `src/screens/MapScreen.jsx`

- [ ] Replace `src/screens/MapScreen.jsx` entirely:
```jsx
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { VENUES } from "../constants/venues.js";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/dark";

export default function MapScreen({ onVenue }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;
    const map = new maplibregl.Map({
      container: mapRef.current,
      style: MAP_STYLE,
      center: [-3.7, 40.4], // Spain center
      zoom: 5.5,
    });
    mapInstanceRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add GPS marker
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        new maplibregl.Marker({ color: "#2196F3" })
          .setLngLat([pos.coords.longitude, pos.coords.latitude])
          .addTo(map);
      });
    }

    // Add venue markers
    VENUES.forEach((venue) => {
      const el = document.createElement("div");
      el.style.cssText = `
        width:14px;height:14px;border-radius:50%;
        background:${venue.color};border:2px solid #fff;
        cursor:pointer;box-shadow:0 0 6px ${venue.color};
      `;
      el.addEventListener("click", () => setSelected(venue));
      new maplibregl.Marker({ element: el })
        .setLngLat([venue.lng, venue.lat])
        .addTo(map);
    });

    return () => { map.remove(); mapInstanceRef.current = null; };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {selected && (
        <div style={{
          position: "absolute", bottom: 80, left: 12, right: 12,
          background: "rgba(12,12,14,0.96)", border: "1px solid #1a1a1a",
          borderRadius: 20, padding: 16,
          animation: "slideUp 0.25s ease",
        }}>
          <style>{`@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 13, color: "#fff", fontWeight: 700 }}>{selected.name}</div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#666", marginTop: 2 }}>{selected.location}</div>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 700, color: "#FF4500" }}>
              {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(selected.price)}
            </div>
            <button onClick={() => onVenue(selected)} style={{
              background: "#FF4500", border: "none", borderRadius: 10, padding: "10px 20px",
              fontFamily: "monospace", fontSize: 11, letterSpacing: 2, color: "#fff", cursor: "pointer",
            }}>VIEW →</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] Verify: `npm run dev`, navigate to Map tab — real map tiles load, venue pins visible, clicking a pin shows card, clicking "VIEW →" navigates to detail

---

## Task 10: Create i18n context and translation files

**Files:**
- Create: `src/i18n/index.jsx`
- Create: `src/i18n/es.js`
- Create: `src/i18n/en.js`
- Create: `src/i18n/pt.js`

- [ ] Create `src/i18n/es.js` with all Spanish strings:
```js
export default {
  // Splash
  splash_tagline: "TRACK DAY MARKETPLACE",
  splash_select_language: "SELECCIONA IDIOMA",
  splash_continue: "CONTINUAR",
  // Nav
  nav_map: "Mapa",
  nav_home: "Inicio",
  nav_bookings: "Reservas",
  nav_community: "Comunidad",
  nav_profile: "Perfil",
  // Home
  home_explore: "Explorar",
  home_search: "Buscar circuitos...",
  home_favorites: "Favoritos",
  home_featured: "Destacados",
  home_nearby: "Cerca de ti",
  home_book_now: "RESERVAR",
  // Map
  map_locating: "LOCALIZANDO...",
  map_located: "UBICADO",
  map_view: "VER →",
  // Detail
  detail_book: "RESERVAR SESIÓN",
  detail_reviews: "reseñas",
  detail_length: "Longitud",
  detail_noise: "Ruido máx.",
  detail_available: "Disponible hoy",
  // Booking flow
  booking_select_session: "SELECCIONAR SESIÓN",
  booking_insurance: "SEGURO",
  booking_confirm: "CONFIRMAR RESERVA",
  booking_total: "TOTAL",
  // Bookings list
  bookings_title: "Mis Reservas",
  bookings_empty: "Sin reservas",
  // Profile
  profile_title: "Perfil",
  profile_licence: "Licencia",
  profile_car: "Mi Coche",
  profile_logout: "Cerrar sesión",
  // Common
  back: "Atrás",
  save: "Guardar",
  cancel: "Cancelar",
  confirm: "Confirmar",
  delete: "Eliminar",
};
```

- [ ] Create `src/i18n/en.js` with English equivalents:
```js
export default {
  splash_tagline: "TRACK DAY MARKETPLACE",
  splash_select_language: "SELECT LANGUAGE",
  splash_continue: "CONTINUE",
  nav_map: "Map",
  nav_home: "Home",
  nav_bookings: "Bookings",
  nav_community: "Community",
  nav_profile: "Profile",
  home_explore: "Explore",
  home_search: "Search circuits...",
  home_favorites: "Favorites",
  home_featured: "Featured",
  home_nearby: "Near you",
  home_book_now: "BOOK NOW",
  map_locating: "LOCATING...",
  map_located: "LOCATED",
  map_view: "VIEW →",
  detail_book: "BOOK SESSION",
  detail_reviews: "reviews",
  detail_length: "Length",
  detail_noise: "Max noise",
  detail_available: "Available today",
  booking_select_session: "SELECT SESSION",
  booking_insurance: "INSURANCE",
  booking_confirm: "CONFIRM BOOKING",
  booking_total: "TOTAL",
  bookings_title: "My Bookings",
  bookings_empty: "No bookings yet",
  profile_title: "Profile",
  profile_licence: "Licence",
  profile_car: "My Car",
  profile_logout: "Log out",
  back: "Back",
  save: "Save",
  cancel: "Cancel",
  confirm: "Confirm",
  delete: "Delete",
};
```

- [ ] Create `src/i18n/pt.js` with Portuguese equivalents:
```js
export default {
  splash_tagline: "MERCADO DE TRACK DAYS",
  splash_select_language: "SELECIONAR IDIOMA",
  splash_continue: "CONTINUAR",
  nav_map: "Mapa",
  nav_home: "Início",
  nav_bookings: "Reservas",
  nav_community: "Comunidade",
  nav_profile: "Perfil",
  home_explore: "Explorar",
  home_search: "Buscar circuitos...",
  home_favorites: "Favoritos",
  home_featured: "Destaques",
  home_nearby: "Perto de você",
  home_book_now: "RESERVAR",
  map_locating: "LOCALIZANDO...",
  map_located: "LOCALIZADO",
  map_view: "VER →",
  detail_book: "RESERVAR SESSÃO",
  detail_reviews: "avaliações",
  detail_length: "Comprimento",
  detail_noise: "Ruído máx.",
  detail_available: "Disponível hoje",
  booking_select_session: "SELECIONAR SESSÃO",
  booking_insurance: "SEGURO",
  booking_confirm: "CONFIRMAR RESERVA",
  booking_total: "TOTAL",
  bookings_title: "Minhas Reservas",
  bookings_empty: "Sem reservas",
  profile_title: "Perfil",
  profile_licence: "Licença",
  profile_car: "Meu Carro",
  profile_logout: "Sair",
  back: "Voltar",
  save: "Salvar",
  cancel: "Cancelar",
  confirm: "Confirmar",
  delete: "Excluir",
};
```

- [ ] Create `src/i18n/index.jsx`:
```jsx
import { createContext, useContext, useState } from "react";
import es from "./es.js";
import en from "./en.js";
import pt from "./pt.js";

const LANGS = { es, en, pt };
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "es");

  const changeLang = (l) => {
    localStorage.setItem("lang", l);
    setLang(l);
  };

  const t = (key) => LANGS[lang]?.[key] ?? LANGS.es[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
```

- [ ] Wrap `<App />` in `src/main.jsx` with `<LanguageProvider>`:
```jsx
import { LanguageProvider } from "./i18n/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
);
```

- [ ] Verify: `npm run dev` — no errors

---

## Task 11: Add language picker to SplashScreen

**Files:**
- Modify: `src/screens/SplashScreen.jsx`

SplashScreen currently auto-advances after 2400ms. We change it to: show language pills immediately, let user pick, then tap "Continuar" to advance. Remove the auto-timeout.

- [ ] Replace `src/screens/SplashScreen.jsx`:
```jsx
import { useLanguage } from "../i18n/index.jsx";

export default function SplashScreen({ onDone }) {
  const { lang, setLang, t } = useLanguage();

  const langs = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
    { code: "pt", label: "PT" },
  ];

  return (
    <div style={{
      width: "100%", height: "100%", background: "#050505",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @keyframes ring1{0%{transform:scale(0.6);opacity:0.6}100%{transform:scale(2.8);opacity:0}}
        @keyframes ring2{0%{transform:scale(0.6);opacity:0.4}100%{transform:scale(2.2);opacity:0}}
        @keyframes logoIn{0%{opacity:0;transform:scale(0.6)}60%{opacity:1;transform:scale(1.06)}100%{opacity:1;transform:scale(1)}}
        @keyframes tagIn{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:translateY(0)}}
      `}</style>
      {/* Animated rings */}
      <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", border:"2px solid #FF4500", animation:"ring1 2s ease-out 0.3s infinite", opacity:0 }} />
      <div style={{ position:"absolute", width:140, height:140, borderRadius:"50%", border:"1px solid #FF4500", animation:"ring2 2s ease-out 0.6s infinite", opacity:0 }} />
      {/* Logo */}
      <div style={{ animation:"logoIn 0.8s ease forwards", textAlign:"center", zIndex:1 }}>
        <div style={{ fontFamily:"monospace", fontSize:36, fontWeight:800, color:"#fff", letterSpacing:6 }}>
          TRACK<span style={{ color:"#FF4500" }}>SWAP</span>
        </div>
        <div style={{ fontFamily:"monospace", fontSize:11, color:"#333", letterSpacing:4, marginTop:4, animation:"tagIn 0.6s ease 0.5s both" }}>
          {t("splash_tagline")}
        </div>
      </div>
      {/* Language picker */}
      <div style={{ zIndex:1, marginTop:48, display:"flex", flexDirection:"column", alignItems:"center", gap:16, animation:"tagIn 0.6s ease 0.7s both", opacity:0 }}>
        <div style={{ fontFamily:"monospace", fontSize:9, color:"#444", letterSpacing:3 }}>
          {t("splash_select_language")}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {langs.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              style={{
                fontFamily:"monospace", fontSize:11, fontWeight:700, letterSpacing:2,
                padding:"6px 16px", borderRadius:20, cursor:"pointer", border:"1px solid",
                background: lang === code ? "#FF4500" : "transparent",
                color: lang === code ? "#fff" : "#444",
                borderColor: lang === code ? "#FF4500" : "#222",
                transition:"all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={onDone}
          style={{
            marginTop:8, width:200, background:"#FF4500", border:"none",
            borderRadius:12, padding:"14px 0", fontFamily:"monospace",
            fontSize:11, letterSpacing:3, color:"#fff", cursor:"pointer",
            fontWeight:700,
          }}
        >
          {t("splash_continue")}
        </button>
      </div>
    </div>
  );
}
```

- [ ] Verify: `npm run dev` — Splash shows pill buttons, selecting ES/EN/PT highlights correctly, tapping Continue advances to main app

---

## Task 12: Wire translations into NavBar and core screens

**Files:**
- Modify: `src/screens/NavBar.jsx`
- Modify: `src/screens/HomeScreen.jsx`
- Modify: `src/screens/MapScreen.jsx`
- Modify: `src/screens/BookingsScreen.jsx`
- Modify: `src/screens/ProfileScreen.jsx`

These are the highest-visibility screens. Pattern for each file:

- [ ] In each screen, add at the **top of the file** (with other imports):
```js
import { useLanguage } from "../i18n/index.jsx";
```

- [ ] Inside the component function, add:
```js
const { t } = useLanguage();
```

- [ ] In `NavBar.jsx`, replace tab labels with `t()` calls:
```jsx
// Before: "Map", "Home", "Bookings", "Community", "Profile"
// After:  t("nav_map"), t("nav_home"), t("nav_bookings"), t("nav_community"), t("nav_profile")
```

- [ ] In `HomeScreen.jsx`, replace hardcoded "Explore", "Search circuits...", "BOOK NOW", section headers
- [ ] In `MapScreen.jsx`, replace "LOCATING...", "LOCATED", "VIEW →"
- [ ] In `BookingsScreen.jsx`, replace "My Bookings", empty-state text
- [ ] In `ProfileScreen.jsx`, replace "Profile", "Licence", "My Car", "Log out"

- [ ] Verify: `npm run dev` — switch language on splash, navigate through app, verify labels change

---

## Task 13: Wire translations into remaining screens

**Files:** All remaining screen files in `src/screens/` and `src/dashboard/`

- [ ] Add `const { t } = useLanguage()` + replace translatable strings in:
  - `DetailScreen.jsx` — "BOOK SESSION", "reviews", "Length", "Max noise", "Available today"
  - `InsuranceSelectionScreen.jsx` — section labels, option names
  - `BriefingScreen.jsx` — section labels, CTA
  - `BookingScreen.jsx` — "SELECT SESSION", "INSURANCE", "CONFIRM BOOKING", "TOTAL"
  - `SessionStatsScreen.jsx` — stats labels
  - `BookingDetailScreen.jsx` — status labels, action buttons
  - `GroupDetailView.jsx` / `CommunityScreen.jsx` — labels
  - `LicenceScreen.jsx` / `CarScreen.jsx` — form labels

- [ ] For each Dashboard screen file in Task 13, also add `import { useLanguage } from "../i18n/index.jsx"` at the top of the file before using `useLanguage()`
- [ ] For Dashboard (optional — admin tool, lower priority): Add `useLanguage` to `SettingsScreen.jsx` only, add a language picker there as a bonus UX touch

- [ ] Final verify: Full navigation in ES, EN, and PT — no untranslated strings visible in main user flows

---

## Verification Checklist

- [ ] `npm run dev` starts clean (no console errors)
- [ ] Both `App.jsx` < 150 lines, `Dashboard.jsx` < 100 lines
- [ ] No duplicate Icon component definitions (`grep -r "function Icon" src/` returns 1 result)
- [ ] All 16 App screens navigate correctly end-to-end
- [ ] All 7 Dashboard screens navigate correctly
- [ ] Map tab shows real map tiles (not SVG grid)
- [ ] Venue pins visible on map, clicking shows card, "VIEW →" opens detail
- [ ] Splash screen shows ES/EN/PT pill buttons in `#FF4500` / dark theme
- [ ] Language persists after closing and reopening (localStorage)
- [ ] NavBar labels change with language
- [ ] Core booking flow labels change with language
