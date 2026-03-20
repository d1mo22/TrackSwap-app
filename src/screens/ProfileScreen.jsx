import Icon from "../components/Icon.jsx";
import { useLanguage } from "../i18n/index.jsx";

export default function ProfileScreen({ onLicence, onCar, carsCount = 0 }) {
  const { t } = useLanguage();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{ padding: "52px 20px 24px", textAlign: "center", flexShrink: 0 }}
      >
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#FF4500,#FF8C00)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
          }}
        >
          <Icon name="user" size={28} color="white" />
        </div>
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 21,
            fontWeight: 700,
            color: "white",
          }}
        >
          Alex Martín
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#aaa",
            marginTop: 4,
          }}
        >
          alex.martin@gmail.com
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 28,
            marginTop: 24,
          }}
        >
          {[
            { v: "12", l: t("profile_sessions") },
            { v: "4.9", l: t("profile_rating") },
            { v: "3", l: t("profile_saved") },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#FF4500",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 9,
                  color: "#888",
                  letterSpacing: 1,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 90px" }}>
        {[
          { label: t("profile_licence"), action: onLicence },
          { label: `${t("profile_car")}${carsCount > 0 ? ` (${carsCount})` : ""}`, action: onCar },
          { label: t("profile_payment"), action: null },
          { label: t("profile_notifications"), action: null },
          { label: t("profile_insurance_history"), action: null },
          { label: t("profile_help"), action: null },
          { label: t("profile_logout"), action: null, danger: true },
        ].map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={item.action || undefined}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "18px 0",
              border: "none",
              borderBottom: "1px solid #1a1a1a",
              background: "none",
              width: "100%",
              cursor: item.action ? "pointer" : "default",
              textAlign: "left"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "Georgia,serif", fontSize: 15, color: item.danger ? "#FF4500" : "#eee" }}>
                {item.label}
              </span>
            </div>
            {!item.danger && (
              <Icon name="chevron_right" size={16} color={item.action ? "#888" : "#444"} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
