import Icon from "../components/Icon.jsx";
import { useLanguage } from "../i18n/index.jsx";

export default function NavBar({ tab, setTab }) {
  const { t } = useLanguage();
  return (
    <nav
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(8,8,8,0.98)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid #1a1a1a",
        display: "flex",
        justifyContent: "space-around",
        padding: "12px 0 28px",
        zIndex: 100,
      }}
    >
      {[
        { id: "home", icon: "home", label: t("nav_home") },
        { id: "map", icon: "map_pin", label: t("nav_map") },
        { id: "community", icon: "users", label: t("nav_community") },
        { id: "bookings", icon: "ticket", label: t("nav_bookings") },
        { id: "profile", icon: "user", label: t("nav_profile") },
      ].map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => setTab(item.id)}
          aria-pressed={tab === item.id}
          aria-label={`Go to ${item.label}`}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: "0 12px",
            transition: "transform 0.15s",
          }}
        >
          <Icon
            name={item.icon}
            size={22}
            color={tab === item.id ? "#FF4500" : "#666"}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 9,
              fontWeight: tab === item.id ? 700 : 400,
              letterSpacing: 0.5,
              color: tab === item.id ? "#FF4500" : "#888",
            }}
          >
            {item.label.toUpperCase()}
          </span>
        </button>
      ))}
    </nav>
  );
}
