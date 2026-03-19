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
