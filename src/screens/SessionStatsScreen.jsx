import { useLanguage } from "../i18n/index.jsx";

export default function SessionStatsScreen({ booking, onBack }) {
  const { t } = useLanguage();
  const { name, color, stats, date, session } = booking;
  const pad = (n) => String(n).padStart(2, "0");

  const allMs = stats.laps.map(lapStr => {
    const [mn, sc] = lapStr.split(":");
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
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: 2, fontWeight: 700 }}>{t("back").toUpperCase()}</span>
        </button>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: color, letterSpacing: 3, marginBottom: 4, fontWeight: 700 }}>{t("stats_session_completed")}</div>
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
            <div style={{ fontFamily: "monospace", fontSize: 9, color: color, letterSpacing: 2, marginBottom: 6, fontWeight: 700 }}>{t("stats_final_position")}</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 64, fontWeight: 800, lineHeight: 1, color: stats.position <= 3 ? podiumColors[stats.position - 1] : "white" }}>
              P{stats.position}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#888", marginTop: 4, fontWeight: 700 }}>{t("stats_of")} {stats.totalDrivers} {t("stats_drivers")}</div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { l: t("stats_best_lap"), v: stats.bestLap },
              { l: t("stats_avg_time"), v: stats.avgLap },
              { l: t("stats_total_laps"), v: stats.totalLaps },
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
          {t("stats_lap_times")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {stats.laps.map((lapTime, li) => {
            const isBest = lapTime === stats.bestLap;
            const [mn, sc] = lapTime.split(":");
            const thisMs = parseInt(mn) * 60000 + parseFloat(sc) * 1000;
            const pct = maxMs === minMs ? 60 : Math.round(20 + 80 * (1 - (thisMs - minMs) / (maxMs - minMs)));
            const diffMs = thisMs - minMs;
            const diffStr = diffMs === 0 ? t("stats_best_label") : `+${(diffMs / 1000).toFixed(3)}s`;
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
              {isP1 ? t("stats_victory") : stats.position <= 3 ? `${t("stats_podium")} P${stats.position}` : `${t("stats_classified")} P${stats.position}`}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#888", letterSpacing: 1, fontWeight: 500 }}>
              {stats.totalLaps} {t("stats_laps")} · {t("stats_best")}: {stats.bestLap} · {t("stats_avg")}: {stats.avgLap}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
