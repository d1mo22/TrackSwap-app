import { useState } from "react";
import Icon from "../components/Icon.jsx";
import VenueArt from "../components/VenueArt.jsx";
import { VENUES, FILTERS } from "../constants/venues.js";
import { useLanguage } from "../i18n/index.jsx";

const HomeScreen = ({ onVenue, favorites, toggleFav }) => {
  const { t } = useLanguage();
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
              {t("home_greeting")}, ALEX
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
              {t("home_tagline")}
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
            placeholder={t("home_search")}
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
            {t("home_go")}
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
        {FILTERS.map((f) => {
          const filterLabelKey = {
            "All": "filter_all",
            "Circuit": "filter_circuit",
            "Karting": "filter_karting",
            "Bring Car": "filter_bring_car",
            "Car Provided": "filter_car_provided",
          }[f] || f;
          return (
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
              {t(filterLabelKey).toUpperCase()}
            </button>
          );
        })}
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
                {t("home_hot")}
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
                          {t("home_per_session")}
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
                        {v.available ? t("home_open") : t("home_full")}
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
          {filtered.length} {t("home_venues_found")}
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
                    <span style={{ fontFamily: "monospace", fontSize: 10, color: "#666", fontWeight: 700 }}>{t("home_per_session").toUpperCase()}</span>
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

export default HomeScreen;
