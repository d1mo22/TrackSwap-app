import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { useLanguage } from "../i18n/index.jsx";

export default function BriefingScreen({ venue, onComplete, onBack, isStandalone = false }) {
  const { t } = useLanguage();
  const [complete, setComplete] = useState(false);

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "50px 20px 18px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Go back" style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevron_left" size={17} color="white" />
        </button>
        <div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 19, fontWeight: 700, color: "white" }}>{t("briefing_title")}</div>
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
                color: complete ? "#4CAF50" : "#FFD700",
                padding: "4px 10px",
                borderRadius: 20,
                background: complete ? "rgba(76,175,80,0.1)" : "rgba(255,215,0,0.1)",
                border: `1px solid ${complete ? "#4CAF50" : "#FFD700"}`
              }}>
                {complete ? t("detail_status_complete") : t("detail_status_pending")}
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
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "white", marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 11, color: "#888", lineHeight: 1.4 }}>{item.desc}</div>
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
                {t("detail_sign_briefing")}
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
            {t("briefing_continue")}
          </button>
        </div>
      )}
    </div>
  );
}
