import { useState } from "react";
import Icon from "../components/Icon.jsx";
import GroupDetailView from "./GroupDetailView.jsx";
import { useLanguage } from "../i18n/index.jsx";

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

export default function CommunityScreen() {
  const { t } = useLanguage();
  const [ctab, setCtab] = useState("feed");
  const [liked, setLiked] = useState(new Set());
  const [selectedGroup, setSelectedGroup] = useState(null);
  const toggleLike = (id) => setLiked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 0", flexShrink: 0 }}>
        <div style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", letterSpacing: 3, marginBottom: 4 }}>
          {t("community_drivers")}
        </div>
        <div style={{ fontFamily: "Georgia,serif", fontSize: 26, fontWeight: 700, color: "white", marginBottom: 16 }}>
          {t("community_title")}
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #181818" }}>
          {[
            { id: "feed",   label: t("community_tab_feed") },
            { id: "groups", label: t("community_tab_groups") },
            { id: "events", label: t("community_tab_events") },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setCtab(tab.id)} aria-pressed={ctab === tab.id} style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 18px", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, color: ctab === tab.id ? "#FF4500" : "#aaa", borderBottom: ctab === tab.id ? "2px solid #FF4500" : "2px solid transparent", transition: "color 0.2s, border-color 0.2s", marginBottom: -1 }}>
              {tab.label.toUpperCase()}
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
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "#FFD700", letterSpacing: 2 }}>{t("community_weekly_highlight")} · GT SPAIN</span>
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
                <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2, marginBottom: 14 }}>{t("community_popular_groups")}</div>
                {GROUPS.map((g) => (
                  <button type="button" key={g.name} onClick={() => setSelectedGroup(g)} style={{ display: "flex", width: "100%", background: "none", border: "none", borderBottom: "1px solid #141414", textAlign: "left", alignItems: "center", gap: 14, padding: "14px 0", cursor: "pointer" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: `${g.color}22`, border: `1px solid ${g.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="users" size={18} color={g.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 14, fontWeight: 700, color: "white", marginBottom: 2 }}>{g.name}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 1 }}>{g.members} {t("community_members")} · {g.tag.toUpperCase()}</div>
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
            <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "#aaa", marginTop: 16, marginBottom: 8 }}>{t("community_coming_soon")}</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#888", letterSpacing: 1 }}>{t("community_events_label")}</div>
          </div>
        )}
      </div>
    </div>
  );
}
