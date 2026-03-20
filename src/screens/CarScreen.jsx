import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { useLanguage } from "../i18n/index.jsx";

const CAR_BRANDS = ["Audi","BMW","Ferrari","Ford","Honda","Lamborghini","Lotus","McLaren","Mercedes","Mitsubishi","Nissan","Porsche","Renault","Subaru","Toyota","Volkswagen","Other"];
const CAR_YEARS = Array.from({ length: 30 }, (_, i) => String(2025 - i));

export default function CarScreen({ cars, onSave, onDelete, onBack }) {
  const { t } = useLanguage();
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [showBrand, setShowBrand] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openNew = () => {
    setEditing(null); setPlate(""); setBrand(""); setModel(""); setYear("");
    setShowBrand(false); setShowYear(false);
    setView("form");
  };
  const openEdit = (car) => {
    setEditing(car); setPlate(car.plate); setBrand(car.brand); setModel(car.model); setYear(car.year);
    setShowBrand(false); setShowYear(false);
    setView("form");
  };
  const handleSave = () => {
    if (!plate && !brand && !model) return;
    onSave({ id: editing ? editing.id : Date.now(), plate, brand, model, year });
    setEditing(null); setView("list");
  };
  const handleDelete = (id) => { onDelete(id); setConfirmDelete(null); };

  /* -- FORM VIEW -- */
  if (view === "form") {
    return (
      <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "52px 20px 20px", flexShrink: 0 }}>
          <button onClick={() => setView("list")} aria-label="Back to vehicle list" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: 0 }}>
            <Icon name="chevron_left" size={18} color="#aaa" />
            <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2 }}>{t("back").toUpperCase()}</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, background: "rgba(255,69,0,0.12)", border: "1px solid rgba(255,69,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="car" size={20} color="#FF4500" />
            </div>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", letterSpacing: 3 }}>{t("car_my_garage").toUpperCase()}</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 700, color: "white" }}>{editing ? t("car_edit_vehicle") : t("car_add_vehicle")}</div>
            </div>
          </div>
        </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
        {/* Plate */}
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="car-plate" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>{t("car_plate")}</label>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "#1a2a5e", borderRadius: 4, padding: "2px 6px", fontFamily: "monospace", fontSize: 12, color: "#5b8af0", letterSpacing: 1 }}>ES</div>
            <input id="car-plate" name="plate" autoComplete="off" value={plate} onChange={e => setPlate(e.target.value.toUpperCase())} placeholder="1234 ABC" maxLength={8} style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 18, fontFamily: "monospace", flex: 1, letterSpacing: 4 }} />
          </div>
        </div>

        {/* Brand */}
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="car-brand" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>{t("car_brand")}</label>
          <div id="car-brand" role="combobox" aria-expanded={showBrand} aria-haspopup="listbox" tabIndex={0} onClick={() => setShowBrand(!showBrand)} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setShowBrand(!showBrand)} style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: brand ? "white" : "#aaa" }}>{brand || t("car_select_brand")}</span>
            <Icon name="chevron_down" size={16} color="#888" />
          </div>
          {showBrand && (
            <div role="listbox" style={{ background: "#111", border: "1px solid #222", borderRadius: 12, marginTop: 4, maxHeight: 160, overflowY: "auto" }}>
              {CAR_BRANDS.map((b) => (
                <div key={b} role="option" aria-selected={b === brand} onClick={() => { setBrand(b); setShowBrand(false); }} style={{ padding: "12px 16px", fontFamily: "Georgia,serif", fontSize: 13, color: b === brand ? "#FF4500" : "#ccc", borderBottom: "1px solid #141414", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                  {b} {b === brand && <Icon name="check" size={14} color="#FF4500" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Model */}
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="car-model" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>{t("car_model")}</label>
          <div style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px" }}>
            <input id="car-model" name="car-model" autoComplete="off" value={model} onChange={e => setModel(e.target.value)} placeholder="e.g. M3 GT, 911 GT3, R8..." style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 14, fontFamily: "Georgia,serif", width: "100%" }} />
          </div>
        </div>

        {/* Year */}
        <div style={{ marginBottom: 28 }}>
          <label htmlFor="car-year" style={{ fontFamily: "monospace", fontSize: 12, color: "#ccc", letterSpacing: 2, marginBottom: 8, display: "block" }}>{t("car_year")}</label>
          <div id="car-year" role="combobox" aria-expanded={showYear} aria-haspopup="listbox" tabIndex={0} onClick={() => setShowYear(!showYear)} onKeyDown={e => (e.key === "Enter" || e.key === " ") && setShowYear(!showYear)} style={{ background: "#111", border: "1px solid #222", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: year ? "white" : "#aaa" }}>{year || t("car_select_year")}</span>
            <Icon name="chevron_down" size={16} color="#888" />
          </div>
          {showYear && (
            <div role="listbox" style={{ background: "#111", border: "1px solid #222", borderRadius: 12, marginTop: 4, maxHeight: 160, overflowY: "auto" }}>
              {CAR_YEARS.map((y) => (
                <div key={y} role="option" aria-selected={y === year} onClick={() => { setYear(y); setShowYear(false); }} style={{ padding: "12px 16px", fontFamily: "Georgia,serif", fontSize: 13, color: y === year ? "#FF4500" : "#ccc", borderBottom: "1px solid #141414", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                  {y} {y === year && <Icon name="check" size={14} color="#FF4500" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview card */}
        {(plate || brand || model) && (
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "16px", marginBottom: 20 }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#888", letterSpacing: 2, marginBottom: 12 }}>{t("car_preview")}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,69,0,0.1)", border: "1px solid rgba(255,69,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="car" size={22} color="#FF4500" />
              </div>
              <div>
                <div style={{ fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 700, color: "white" }}>{[brand, model].filter(Boolean).join(" ") || "—"}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  {plate && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", background: "rgba(255,69,0,0.08)", padding: "2px 8px", borderRadius: 6, letterSpacing: 2 }}>{plate}</span>}
                  {year && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>{year}</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        <button onClick={handleSave} style={{ width: "100%", background: plate || brand || model ? "#FF4500" : "#1a1a1a", border: "none", borderRadius: 14, padding: "16px", fontFamily: "monospace", fontSize: 12, letterSpacing: 2, color: plate || brand || model ? "white" : "#aaa", cursor: plate || brand || model ? "pointer" : "default" }}>
            {t("save").toUpperCase()}
          </button>
        </div>
      </div>
    );
  }

  /* -- LIST VIEW -- */
  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "52px 20px 20px", flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Go back to profile" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: 0 }}>
          <Icon name="chevron_left" size={18} color="#aaa" />
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 2 }}>{t("back").toUpperCase()}</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, background: "rgba(255,69,0,0.12)", border: "1px solid rgba(255,69,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="car" size={20} color="#FF4500" />
            </div>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", letterSpacing: 3 }}>PROFILE</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 22, fontWeight: 700, color: "white" }}>{t("car_my_garage")}</div>
            </div>
          </div>
          <button onClick={openNew} aria-label="Add new vehicle" style={{ background: "#FF4500", border: "none", borderRadius: 12, padding: "8px 14px", fontFamily: "monospace", fontSize: 12, letterSpacing: 2, color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            {t("car_add_btn")}
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
        {cars.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(255,69,0,0.08)", border: "1px solid rgba(255,69,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Icon name="car" size={28} color="#FF4500" />
            </div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: "#ccc", marginBottom: 8 }}>{t("car_no_vehicles")}</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa", letterSpacing: 1 }}>{t("car_add_hint")}</div>
          </div>
        ) : (
          cars.map((car) => (
            <div key={car.id} style={{ marginBottom: 12 }}>
              {confirmDelete === car.id ? (
                <div style={{ background: "#1a0000", border: "1px solid #FF4500", borderRadius: 16, padding: "16px" }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "white", marginBottom: 12 }}>Delete <b>{[car.brand, car.model].filter(Boolean).join(" ") || car.plate}</b>?</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, background: "#111", border: "1px solid #333", borderRadius: 10, padding: "10px", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, color: "#aaa", cursor: "pointer" }}>{t("cancel").toUpperCase()}</button>
                    <button onClick={() => handleDelete(car.id)} style={{ flex: 1, background: "#FF4500", border: "none", borderRadius: 10, padding: "10px", fontFamily: "monospace", fontSize: 12, letterSpacing: 1, color: "white", cursor: "pointer" }}>{t("delete").toUpperCase()}</button>
                  </div>
                </div>
              ) : (
                <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "16px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,69,0,0.1)", border: "1px solid rgba(255,69,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="car" size={22} color="#FF4500" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 15, fontWeight: 700, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[car.brand, car.model].filter(Boolean).join(" ") || "—"}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      {car.plate && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#FF4500", background: "rgba(255,69,0,0.08)", padding: "2px 8px", borderRadius: 6, letterSpacing: 2 }}>{car.plate}</span>}
                      {car.year && <span style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>{car.year}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button onClick={() => openEdit(car)} aria-label={`Edit ${car.brand} ${car.model}`} style={{ background: "#171717", border: "1px solid #2a2a2a", borderRadius: 10, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="edit" size={14} color="#aaa" />
                    </button>
                    <button onClick={() => setConfirmDelete(car.id)} aria-label={`Delete ${car.brand} ${car.model}`} style={{ background: "#1a0000", border: "1px solid #3a0000", borderRadius: 10, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="trash" size={14} color="#FF4500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
