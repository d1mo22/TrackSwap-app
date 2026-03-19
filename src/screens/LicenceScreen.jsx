import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { useLanguage } from "../i18n/index.jsx";

const COUNTRIES = ["Spain","Germany","France","Italy","Portugal","United Kingdom","Netherlands","Belgium","Switzerland","Austria","Poland","Sweden","Norway","Denmark","Other"];
const CATEGORIES = ["B","B+E","A","A2","A1","AM","C","C+E","D"];

export default function LicenceScreen({ onBack }) {
  const { t } = useLanguage();
  const [country, setCountry] = useState("Spain");
  const [showCountry, setShowCountry] = useState(false);
  const [licNum, setLicNum] = useState("");
  const [expDate, setExpDate] = useState("");
  const [issued, setIssued] = useState("");
  const [cats, setCats] = useState(new Set(["B"]));
  const [saved, setSaved] = useState(false);

  const toggleCat = (c) => setCats(prev => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n; });

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 20px", flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Go back" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: 0 }}>
          <Icon name="chevron_left" size={18} color="#aaa" />
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2 }}>{t("back").toUpperCase()}</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: "rgba(255,69,0,0.12)", border: "1px solid rgba(255,69,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="id_card" size={20} color="#FF4500" />
          </div>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", letterSpacing: 3 }}>PROFILE</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 700, color: "white" }}>Driving Licence</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
        {/* Country */}
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="lic-country" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block", cursor: "pointer" }}>LICENCE COUNTRY</label>
          <div id="lic-country" role="combobox" aria-expanded={showCountry} aria-haspopup="listbox" tabIndex={0} onClick={() => setShowCountry(!showCountry)} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setShowCountry(!showCountry)} style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="globe" size={16} color="#888" />
              <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "white" }}>{country}</span>
            </div>
            <Icon name="chevron_down" size={16} color="#888" />
          </div>
          {showCountry && (
            <div role="listbox" style={{ background: "#111", border: "1px solid #222", borderRadius: 12, marginTop: 4, maxHeight: 160, overflowY: "auto" }}>
              {COUNTRIES.map((c) => (
                <div key={c} role="option" aria-selected={c === country} onClick={() => { setCountry(c); setShowCountry(false); }} style={{ padding: "12px 16px", fontFamily: "Georgia,serif", fontSize: 13, color: c === country ? "#FF4500" : "#ccc", borderBottom: "1px solid #141414", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                  {c} {c === country && <Icon name="check" size={14} color="#FF4500" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Licence number */}
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="lic-number" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>LICENCE NUMBER</label>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="id_card" size={16} color="#888" />
            <input id="lic-number" name="licence-number" autoComplete="off" value={licNum} onChange={e => setLicNum(e.target.value)} placeholder="e.g. 12345678A" style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 14, fontFamily: "Georgia,serif", flex: 1 }} />
          </div>
        </div>

        {/* Dates row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
          <div>
            <label htmlFor="lic-issued" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>ISSUE DATE</label>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 12px" }}>
              <input id="lic-issued" name="licence-issued" autoComplete="off" type="text" value={issued} onChange={e => setIssued(e.target.value)} placeholder="MM/YYYY" style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 13, fontFamily: "Georgia,serif", width: "100%" }} />
            </div>
          </div>
          <div>
            <label htmlFor="lic-expiry" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>EXPIRY DATE</label>
            <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 12px" }}>
              <input id="lic-expiry" name="licence-expiry" autoComplete="off" type="text" value={expDate} onChange={e => setExpDate(e.target.value)} placeholder="MM/YYYY" style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 13, fontFamily: "Georgia,serif", width: "100%" }} />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2, marginBottom: 12 }}>CATEGORIES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => toggleCat(c)} style={{ padding: "8px 16px", borderRadius: 20, border: cats.has(c) ? "1px solid #FF4500" : "1px solid #222", background: cats.has(c) ? "rgba(255,69,0,0.12)" : "#111", fontFamily: "monospace", fontSize: 12, color: cats.has(c) ? "#FF4500" : "#aaa", cursor: "pointer", letterSpacing: 1 }}>
                {c}
              </button>
            ))}
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: "#aaa", letterSpacing: 1, marginTop: 10 }}>SELECT THE CATEGORIES THAT APPEAR ON YOUR LICENCE</div>
        </div>

        {/* Info card */}
        <div style={{ background: "rgba(255,69,0,0.06)", border: "1px solid rgba(255,69,0,0.15)", borderRadius: 14, padding: "14px 16px", marginBottom: 28, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <Icon name="shield" size={16} color="#FF4500" />
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", lineHeight: 1.6, letterSpacing: 0.5 }}>
            YOUR DATA IS VERIFIED BEFORE CONFIRMING TRACK SESSIONS. ALL INFORMATION IS HANDLED WITH FULL CONFIDENTIALITY.
          </div>
        </div>

        {/* Save button */}
        {saved ? (
          <div style={{ width: "100%", background: "#0d2a0d", border: "1px solid #4CAF50", borderRadius: 14, padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <Icon name="check" size={18} color="#4CAF50" />
            <span style={{ fontFamily: "monospace", fontSize: 12, color: "#4CAF50", letterSpacing: 2 }}>SAVED</span>
          </div>
        ) : (
          <button onClick={() => setSaved(true)} style={{ width: "100%", background: "#FF4500", border: "none", borderRadius: 14, padding: "16px", fontFamily: "monospace", fontSize: 12, letterSpacing: 2, color: "white", cursor: "pointer" }}>
            {t("save").toUpperCase()}
          </button>
        )}
      </div>
    </div>
  );
}
