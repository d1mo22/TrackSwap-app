import { useState } from "react";
import Icon from "../components/Icon.jsx";
import VenueArt from "../components/VenueArt.jsx";
import { useLanguage } from "../i18n/index.jsx";

export default function DetailScreen({ venue, onBack, onBook, isFav, toggleFav }) {
  const { t, lang } = useLanguage();
  const locale = lang === "es" ? "es-ES" : lang === "pt" ? "pt-PT" : "en-GB";
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
  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(2026, i, 1)).toUpperCase()
  );
  const dayHeaders = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(new Date(2026, 0, 4 + i))
  );

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
              {t("home_per_session")}
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
            { icon: "ruler", label: t("detail_length").toUpperCase(), val: venue.length },
            { icon: "volume", label: t("detail_noise").toUpperCase(), val: venue.noise },
            { icon: "shield", label: t("detail_insurance"), val: t("detail_included") },
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
          {["info", "sessions", "safety"].map((tabId) => (
            <button
              key={tabId}
              onClick={() => setTab(tabId)}
              aria-pressed={tab === tabId}
              type="button"
              style={{
                flex: 1,
                padding: "10px",
                minHeight: 40,
                borderRadius: 10,
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: 1,
                background: tab === tabId ? "#FF4500" : "transparent",
                color: tab === tabId ? "white" : "#aaa",
                border: tab === tabId ? "2.5px solid #FF4500" : "none",
                cursor: "pointer",
                transition: "all 0.2s",
                fontWeight: 700,
              }}
            >
              {tabId === "info" ? t("detail_tab_info") : tabId === "sessions" ? t("detail_tab_sessions") : t("detail_tab_safety")}
            </button>
          ))}
        </div>

        {tab === "info" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Editorial Tagline */}
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: venue.color, letterSpacing: 2, marginBottom: 8, fontWeight: 800 }}>{t("detail_experience")}</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 700, color: "white", lineHeight: 1.3 }}>
                {venue.type === "Circuit" ? t("detail_desc_circuit") :
                 venue.type === "Karting" ? t("detail_desc_karting") :
                 venue.type === "Airfield" ? t("detail_desc_airfield") :
                 t("detail_desc_lot")}
              </div>
            </div>

            {/* Track Blueprint Card */}
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#666", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>{t("detail_blueprint")}</div>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1.5px solid #1a1a1a", background: "#111" }}>
                <VenueArt type={venue.img} color={venue.color} h={180} />
              </div>
            </div>

            {/* Technical Spec Grid */}
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#666", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>{t("detail_tech_specs")}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { l: t("detail_length").toUpperCase(), v: venue.length || "VARIES" },
                  { l: t("detail_turns"), v: venue.type === "Circuit" ? "12-15" : "8-10" },
                  { l: t("detail_surface"), v: venue.type === "Lot" ? "POLISHED CONCRETE" : "ASPHALT" },
                  { l: t("detail_noise").toUpperCase(), v: venue.noise || "UNLIMITED" }
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
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#666", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>{t("detail_characteristics")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { l: t("detail_technicality"), p: venue.type === "Karting" ? 95 : 75 },
                  { l: t("detail_adrenaline"), p: venue.type === "Airfield" ? 90 : 85 },
                  { l: t("detail_beginner"), p: venue.type === "Karting" ? 90 : 60 }
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
                }}>{t("detail_select_date")}</div>
              </div>

              {/* Day headers */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 4,
                marginBottom: 10
              }}>
                {dayHeaders.map((d, i) => (
                  <div key={i} style={{
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
                {t("detail_available_slots")} · {selectedDate ? selectedDate.toLocaleDateString(locale, { day: 'numeric', month: 'short' }).toUpperCase() : t("detail_select_date")}
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
                          {i === 0 ? `${t("detail_early_bird")} · ` : ""}{t("detail_2h_session")}
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
                        {`${3 - i} ${t("detail_slots_left")}`}
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
                {t("detail_safety_video")}
              </div>
            </div>

            {/* Briefing Checklist */}
            <div style={{ background: "#111", borderRadius: 16, padding: "20px", border: "1.5px solid #1a1a1a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "white" }}>{t("detail_briefing_checklist")}</h3>
                <div style={{
                  fontFamily: "monospace",
                  fontSize: 9,
                  color: briefingComplete ? "#4CAF50" : "#FFD700",
                  padding: "4px 10px",
                  borderRadius: 20,
                  background: briefingComplete ? "rgba(76,175,80,0.1)" : "rgba(255,215,0,0.1)",
                  border: `1px solid ${briefingComplete ? "#4CAF50" : "#FFD700"}`
                }}>
                  {briefingComplete ? t("detail_status_complete") : t("detail_status_pending")}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { title: t("detail_check_1_title"), desc: t("detail_check_1_desc") },
                  { title: t("detail_check_2_title"), desc: t("detail_check_2_desc") },
                  { title: t("detail_check_3_title"), desc: t("detail_check_3_desc") },
                  { title: t("detail_check_4_title"), desc: t("detail_check_4_desc") },
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
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "white", marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "#888", lineHeight: 1.4 }}>{item.desc}</div>
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
                  {t("detail_sign_briefing")}
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
            ? `${t("detail_book")} · ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(venue.price)}`
            : t("detail_select_session")}
        </button>
      </div>
    </div>
  );
}
