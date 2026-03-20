import { useState, useEffect } from "react";
import Icon from "../components/Icon.jsx";
import VenueArt from "../components/VenueArt.jsx";
import { AVAILABLE_SESSIONS } from "../constants/venues.js";
import { useLanguage } from "../i18n/index.jsx";

export default function BookingDetailScreen({ booking, onBack, onDelete, onReschedule, onBriefing, onStats }) {
  const { t } = useLanguage();
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
  const statusLabel = { Upcoming: t("status_upcoming"), Completed: t("status_completed"), Cancelled: t("status_cancelled") };
  const cd = booking.status === "Upcoming" ? getCountdown(booking.date, booking.session) : null;
  const isBriefingPending = booking.status === "Upcoming" && !booking.briefingComplete;

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "50px 20px 18px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Go back" style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevron_left" size={17} color="white" />
        </button>
        <div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 19, fontWeight: 700, color: "white" }}>{t("bkd_title")}</div>
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
                {statusLabel[booking.status] || booking.status.toUpperCase()}
              </div>
            </div>

            {isBriefingPending && (
              <div style={{ padding: "16px", background: "rgba(255,215,0,0.08)", border: "1.5px solid rgba(255,215,0,0.2)", borderRadius: 16, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <Icon name="zap" size={18} color="#FFD700" />
                  <span style={{ fontFamily: "monospace", fontSize: 12, color: "#FFD700", fontWeight: 800, letterSpacing: 1 }}>{t("bkd_action_required")}</span>
                </div>
                <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "#aaa", lineHeight: 1.5, marginBottom: 16 }}>
                  {t("bkd_briefing_required")}
                </p>
                <button
                  onClick={() => onBriefing(booking)}
                  style={{ width: "100%", padding: "14px", background: "#FFD700", border: "none", borderRadius: 12, fontFamily: "monospace", fontSize: 11, color: "#111", fontWeight: 800, cursor: "pointer" }}
                >
                  {t("bkd_complete_now")}
                </button>
              </div>
            )}

            {cd && (
              <div style={{ padding: "20px", background: `${booking.color}0d`, border: `1.5px solid ${booking.color}33`, borderRadius: 16, marginBottom: 20, textAlign: "center" }}>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: booking.color, letterSpacing: 2, marginBottom: 16, fontWeight: 800 }}>{t("bkd_remaining_time")}</div>
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
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "white", fontWeight: 800, letterSpacing: 1 }}>{t("bkd_view_stats")}</span>
                </div>
                <Icon name="chevron_right" size={16} color="#666" />
              </button>
            )}
          </div>
        </div>

        {booking.status === "Upcoming" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#444", letterSpacing: 2, marginBottom: 4, marginLeft: 4 }}>{t("bkd_manage")}</div>

            {rescheduleId === booking.id ? (
              <div style={{ background: "#111", border: "1.5px solid #1e1e1e", borderRadius: 16, padding: "20px" }}>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: 1, marginBottom: 16, fontWeight: 700 }}>{t("bkd_select_session")}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
                  {AVAILABLE_SESSIONS.filter((s) => s !== booking.session).map((slot) => (
                    <button key={slot} type="button" onClick={() => { onReschedule(booking.id, slot); setRescheduleId(null); }} style={{ background: "#080808", border: `2.5px solid ${booking.color}`, borderRadius: 12, padding: "12px 18px", fontFamily: "monospace", fontSize: 13, color: "white", cursor: "pointer", fontWeight: 800 }}>
                      {slot}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => setRescheduleId(null)} style={{ background: "none", border: "none", fontFamily: "monospace", fontSize: 11, color: "#888", cursor: "pointer", fontWeight: 700, textDecoration: "underline" }}>{t("bkd_cancel_change")}</button>
              </div>
            ) : confirmDelete ? (
              <div style={{ background: "#1a0000", border: "1.5px solid #3a0000", borderRadius: 16, padding: "20px" }}>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 15, color: "white", marginBottom: 16 }}>{t("bkd_confirm_cancel")}</div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button type="button" onClick={() => setConfirmDelete(false)} style={{ flex: 1, background: "#111", border: "1.5px solid #333", borderRadius: 12, padding: "14px", fontFamily: "monospace", fontSize: 11, color: "#aaa", cursor: "pointer", fontWeight: 700 }}>{t("bkd_keep")}</button>
                  <button type="button" onClick={() => { onDelete(booking.id); onBack(); }} style={{ flex: 1, background: "#FF4500", border: "none", borderRadius: 12, padding: "14px", fontFamily: "monospace", fontSize: 11, color: "white", cursor: "pointer", fontWeight: 700 }}>{t("bkd_yes_cancel")}</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => setRescheduleId(booking.id)}
                  style={{ flex: 1, height: 56, background: "#111", border: "1.5px solid #1a1a1a", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer" }}
                >
                  <Icon name="edit" size={16} color="white" />
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "white", fontWeight: 800, letterSpacing: 1 }}>{t("bkd_reschedule")}</span>
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
}
