import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { VENUES } from "../constants/venues.js";
import { useLanguage } from "../i18n/index.jsx";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/dark";

export default function MapScreen({ onVenue }) {
  const { t } = useLanguage();
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
            }}>{t("map_view")}</button>
          </div>
        </div>
      )}
    </div>
  );
}
