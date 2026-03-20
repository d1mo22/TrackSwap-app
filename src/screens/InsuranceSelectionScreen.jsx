import { useState } from "react";
import Icon from "../components/Icon.jsx";
import { useLanguage } from "../i18n/index.jsx";

export default function InsuranceSelectionScreen({ venue, cars = [], briefingComplete, onSelect, onBack }) {
  const { t } = useLanguage();
  const isBYO = venue.type !== "Karting";

  const VEHICLE_INSURANCE = [
    { id: "v_none", name: t("ins_name_no_cover"), price: 0, desc: t("ins_plan_none_desc"), coverage: "€0", color: "#888" },
    { id: "v_std", name: t("ins_name_standard"), price: 25, desc: t("ins_plan_std_desc"), coverage: "€5,000", color: "#2471A3" },
    { id: "v_adv", name: t("ins_name_advanced"), price: 55, desc: t("ins_plan_adv_desc"), coverage: "€25,000", color: "#D35400" },
    { id: "v_pro", name: t("ins_name_pro_racing"), price: 95, desc: t("ins_plan_pro_desc"), coverage: "€75,000", color: "#FF4500" }
  ];
  const DRIVER_INSURANCE = [
    { id: "d_std", name: t("ins_name_personal_accident"), price: 10, desc: t("ins_plan_accident_desc"), coverage: "€10,000", color: "#2471A3" },
    { id: "d_pro", name: t("ins_name_pro_driver"), price: 25, desc: t("ins_plan_prodriver_desc"), coverage: "€50,000", color: "#FF4500" }
  ];
  const [selectedCarId, setSelectedCarId] = useState(() => cars.length > 0 ? cars[0].id : null);
  const [selectedId, setSelectedId] = useState(isBYO ? "v_std" : "d_std");

  const options = isBYO ? VEHICLE_INSURANCE : DRIVER_INSURANCE;
  const selectedPlan = options.find(o => o.id === selectedId) || options[0];
  const selectedCar = cars.find(c => c.id === selectedCarId);

  return (
    <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "50px 20px 18px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} aria-label="Go back" style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name="chevron_left" size={17} color="white" />
        </button>
        <div>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 19, fontWeight: 700, color: "white" }}>{t("ins_protection_plan")}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>{t("ins_step_1")}</div>
            {briefingComplete && (
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4CAF50", fontWeight: 700, padding: "2px 6px", background: "rgba(76,175,80,0.1)", borderRadius: 4 }}>
                {t("ins_briefing_ok")}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 120px" }}>
        {isBYO && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>{t("ins_which_vehicle")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cars.length === 0 ? (
                <div style={{ padding: 20, background: "#111", borderRadius: 12, border: "2px dashed #222", textAlign: "center" }}>
                   <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "#888" }}>{t("ins_no_cars")}</div>
                </div>
              ) : (
                cars.map(car => (
                  <button key={car.id} onClick={() => setSelectedCarId(car.id)}
                    type="button"
                    aria-pressed={selectedCarId === car.id}
                    style={{
                      padding: "14px 16px", borderRadius: 14,
                      background: selectedCarId === car.id ? "rgba(255,69,0,0.08)" : "#111",
                      border: `2px solid ${selectedCarId === car.id ? "#FF4500" : "#1a1a1a"}`,
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s",
                      textAlign: "left", width: "100%", color: "white"
                    }}>
                    <Icon name="car" size={18} color={selectedCarId === car.id ? "#FF4500" : "#666"} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "white", fontWeight: 700 }}>{car.brand} {car.model}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: "#888" }}>{car.plate}</div>
                    </div>
                    {selectedCarId === car.id && <Icon name="check" size={16} color="#FF4500" />}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>
            {isBYO ? t("ins_vehicle_protection") : t("ins_driver_protection")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {options.map((type) => {
              const isSel = selectedId === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedId(type.id)}
                  type="button"
                  aria-pressed={isSel}
                  style={{
                    background: isSel ? "#111" : "#0a0a0a",
                    borderRadius: 18,
                    padding: "20px",
                    border: `2.5px solid ${isSel ? type.color : "#1a1a1a"}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                      <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 800, color: isSel ? "white" : "#aaa", letterSpacing: 1 }}>{type.name}</span>
                      <span style={{ fontFamily: "Georgia,serif", fontSize: 16, fontWeight: 800, color: isSel ? type.color : "#888" }}>
                        {type.price === 0 ? t("ins_free") : `+${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(type.price)}`}
                      </span>
                    </div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: isSel ? "#ccc" : "#888", lineHeight: 1.5, marginBottom: 10, fontWeight: 500 }}>
                      {type.desc}
                    </div>
                    {type.id !== "v_none" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: type.color, fontWeight: 800 }}>{isBYO ? t("ins_coverage") : t("ins_personal_limit")}</div>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: "white", background: "#222", padding: "3px 10px", borderRadius: 6, fontWeight: 700 }}>{type.coverage}</div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px 40px", background: "linear-gradient(0deg,#080808 80%,transparent 100%)", borderTop: "1px solid #151515" }}>
        <button
          onClick={() => onSelect(selectedPlan, selectedCar)}
          disabled={isBYO && !selectedCarId}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: 14,
            background: isBYO && !selectedCarId ? "#222" : selectedPlan.color,
            border: "none",
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: 3,
            color: "white",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: isBYO && !selectedCarId ? "none" : `0 12px 32px ${selectedPlan.color}40`,
          }}
        >
          {isBYO && !selectedCarId ? t("ins_select_vehicle") : t("ins_continue")}
        </button>
      </div>
    </div>
  );
}
