import Icon from "../components/Icon.jsx";
import VenueArt from "../components/VenueArt.jsx";
import { useLanguage } from "../i18n/index.jsx";

export default function BookingsScreen({ onStats, onBriefing, onSelect, bookings, onDelete, onReschedule }) {
  const { t } = useLanguage();
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
        <div style={{ fontFamily: "Georgia,serif", fontSize: 26, fontWeight: 700, color: "white" }}>{t("bookings_title")}</div>
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
                    <div style={{ background: b.status === "Upcoming" ? "#0d1a0d" : "#1a1a1a", borderRadius: 20, padding: "4px 12px", fontFamily: "monospace", fontSize: 11, color: b.status === "Upcoming" ? "#4CAF50" : "#888", fontWeight: 800, letterSpacing: 1 }}>
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
}
