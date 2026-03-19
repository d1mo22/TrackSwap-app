import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { useLanguage } from "../i18n/index.jsx";

const MEDAL_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

export default function GroupDetailView({ group, onBack }) {
  const { t } = useLanguage();
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
          <span style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: 2 }}>{t("group_back")}</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `${group.color}22`, border: `1px solid ${group.color}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="users" size={22} color={group.color} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 18, fontWeight: 700, color: "white" }}>{group.name}</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 1 }}>{group.members} {t("community_members")} · {group.tag.toUpperCase()}</div>
          </div>
          <div style={{ background: group.color, border: "none", borderRadius: 20, padding: "6px 14px", fontFamily: "monospace", fontSize: 12, color: "white", letterSpacing: 1 }}>{t("group_joined")}</div>
        </div>
        {/* Sub-tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #181818" }}>
          {[
            { id: "leaderboard", label: t("group_tab_leaderboard") },
            { id: "members",     label: t("group_tab_members") },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setGtab(tab.id)} aria-pressed={gtab === tab.id} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 16px", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, color: gtab === tab.id ? group.color : "#aaa", borderBottom: gtab === tab.id ? `2px solid ${group.color}` : "2px solid transparent", transition: "color 0.2s, border-color 0.2s", marginBottom: -1 }}>
              {tab.label.toUpperCase()}
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
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2, marginBottom: 8 }}>{t("group_circuit")}</div>
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
                <span style={{ fontFamily: "monospace", fontSize: 12, color: group.color, letterSpacing: 1 }}>{t("group_your_position")}</span>
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
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 10 }}>{t("group_all_drivers")}</div>
            {entries.map((entry) => {
              const isMe = entry.avatar === "AM";
              return (
                <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, marginBottom: 6, background: isMe ? `${group.color}10` : "#0f0f0f", border: `1px solid ${isMe ? group.color + "44" : "#1a1a1a"}` }}>
                  <div style={{ width: 22, textAlign: "center", fontFamily: "Georgia,serif", fontSize: 14, fontWeight: 700, color: entry.pos <= 3 ? MEDAL_COLORS[entry.pos - 1] : "#aaa", flexShrink: 0 }}>{entry.pos}</div>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: isMe ? `linear-gradient(135deg,#FF4500,#FF8C00)` : `${group.color}22`, border: `1px solid ${isMe ? "#FF4500" : group.color + "44"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: isMe ? "white" : group.color, flexShrink: 0 }}>{entry.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 700, color: isMe ? "white" : "#ccc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entry.name}{isMe && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", marginLeft: 6, letterSpacing: 1 }}>{t("group_you")}</span>}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 0.5, marginTop: 1 }}>{entry.car}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: entry.pos === 1 ? MEDAL_COLORS[0] : "white" }}>{entry.bestLap}</div>
                    {entry.delta && <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", marginTop: 1 }}>{entry.delta}</div>}
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 4 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc" }}>{entry.sessions}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: "#aaa", letterSpacing: 0.5 }}>{t("group_sessions_short")}</div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        {gtab === "members" && (
          <>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2, marginBottom: 12 }}>{group.members} {t("community_members")}</div>
            {/* Unique members across all circuits */}
            {Array.from(new Map(group.circuits.flatMap(c => c.entries).map(e => [e.avatar, e])).values()).map((entry) => {
              const isMe = entry.avatar === "AM";
              const allCircuits = group.circuits.filter(c => c.entries.find(e => e.avatar === entry.avatar));
              return (
                <div key={entry.avatar} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #141414" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: isMe ? "linear-gradient(135deg,#FF4500,#FF8C00)" : `${group.color}22`, border: `1px solid ${isMe ? "#FF4500" : group.color+"44"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: isMe ? "white" : group.color, flexShrink: 0 }}>{entry.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 13, fontWeight: 700, color: "white" }}>{entry.name}{isMe && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", marginLeft: 6, letterSpacing: 1 }}>{t("group_you")}</span>}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 0.5, marginTop: 1 }}>{entry.sessions} {t("group_sessions_unit")} · {allCircuits.length} {t("group_circuits_unit")}</div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
