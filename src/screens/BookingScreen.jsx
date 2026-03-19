import { useState } from "react";
import Icon from "../components/Icon.jsx";
import VenueArt from "../components/VenueArt.jsx";
import { useLanguage } from "../i18n/index.jsx";

export default function BookingScreen({ venue, session, insurance, preSelectedCarId, briefingComplete, cars = [], onBack, onConfirm, onDone }) {
  const { t } = useLanguage();
  const [confirmed, setConfirmed] = useState(false);
  const isBYO = venue.type !== "Karting";
  const [selectedCarId, setSelectedCarId] = useState(() => preSelectedCarId || (isBYO && cars.length > 0 ? cars[0].id : null));
  const selectedCar = cars.find((c) => c.id === selectedCarId) || null;

  const totalPrice = venue.price + insurance.price;

  if (confirmed)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#080808",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 28px",
        }}
      >
        <style>{`@keyframes popIn{0%{transform:scale(0.2);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}`}</style>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#FF4500,#FF6B00)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            animation: "popIn 0.5s cubic-bezier(.34,1.56,.64,1) both",
            boxShadow: "0 0 50px rgba(255,69,0,0.35)",
          }}
        >
          <Icon name="check" size={36} color="white" />
        </div>
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 26,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          You're booked.
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            color: "#aaa",
            letterSpacing: 2,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          CONFIRMATION SENT TO YOUR EMAIL
        </div>
        <div
          style={{
            width: "100%",
            background: "#111",
            borderRadius: 16,
            padding: "20px",
            border: "1px solid #1a1a1a",
            marginBottom: 20,
          }}
        >
          {[
            { l: "VENUE", v: venue.name },
            { l: "DATE", v: "Sat 1 Mar 2026" },
            { l: "SESSION", v: session },
            { l: "VEHICLE", v: selectedCar ? [selectedCar.brand, selectedCar.model].filter(Boolean).join(" ") || selectedCar.plate : "—" },
            { l: "INSURANCE", v: insurance.name },
            { l: "TOTAL PAID", v: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(totalPrice) },
          ].map((r) => (
            <div
              key={r.l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#aaa",
                  letterSpacing: 2,
                }}
              >
                {r.l}
              </span>
              <span
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 13,
                  color: r.l === "TOTAL PAID" ? "#FF4500" : "white",
                  fontWeight: r.l === "TOTAL PAID" ? 700 : 400,
                }}
              >
                {r.v}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={onDone || onBack}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: 13,
            background: "#151515",
            border: "1px solid #222",
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: 2,
            color: "#ccc",
            cursor: "pointer",
          }}
        >
          BACK TO EXPLORE
        </button>
      </div>
    );

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
        style={{
          padding: "50px 20px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          aria-label="Go back"
          style={{
            background: "#111",
            border: "1px solid #1a1a1a",
            borderRadius: 12,
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icon name="chevron_left" size={17} color="white" />
        </button>
        <div>
          <div
            style={{
              fontFamily: "Georgia,serif",
              fontSize: 19,
              fontWeight: 700,
              color: "white",
            }}
          >
            Confirm Booking
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}>
            {venue.name} · {session}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 120px" }}>
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #1a1a1a",
            marginBottom: 16,
          }}
        >
          <VenueArt type={venue.img} color={venue.color} h={100} />
          <div
            style={{
              padding: "13px 16px",
              background: "#111",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {venue.name}
              </div>
              <div
                style={{ fontFamily: "monospace", fontSize: 12, color: "#aaa" }}
              >
                {venue.location}
              </div>
            </div>
            <div
              style={{
                fontFamily: "Georgia,serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#FF4500",
              }}
            >
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(venue.price)}
            </div>
          </div>
        </div>

        <div
          style={{
            background: briefingComplete ? "#0d1a0d" : "#1a150d",
            borderRadius: 13,
            padding: "14px 16px",
            border: `1px solid ${briefingComplete ? "#1a2a1a" : "#2a201a"}`,
            marginBottom: 12,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <Icon name={briefingComplete ? "check" : "zap"} size={16} color={briefingComplete ? "#4CAF50" : "#FFD700"} />
          <div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: briefingComplete ? "#4CAF50" : "#FFD700",
                letterSpacing: 1,
                marginBottom: 2,
                fontWeight: 700,
              }}
            >
              SAFETY BRIEFING {briefingComplete ? "COMPLETE" : "PENDING"}
            </div>
            <div
              style={{
                fontFamily: "Georgia,serif",
                fontSize: 12,
                color: "#aaa",
              }}
            >
              {briefingComplete
                ? "8-min video watched · Digital waiver signed"
                : "Required before session start · Can be done at venue"}
            </div>
          </div>
        </div>

        {/* Insurance Summary (Selected in prev step) */}
        <div
          style={{
            background: "#111",
            borderRadius: 13,
            padding: "14px 16px",
            border: `1px solid ${insurance.color}40`,
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon
              name="shield"
              size={15}
              color={insurance.color}
            />
            <div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: insurance.color,
                  letterSpacing: 1,
                }}
              >
                {insurance.name}
              </div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "#ccc" }}>
                Coverage up to {insurance.coverage}
              </div>
            </div>
          </div>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              fontFamily: "monospace",
              fontSize: 12,
              color: "#aaa",
              textDecoration: "underline",
              cursor: "pointer"
            }}
          >
            CHANGE
          </button>
        </div>

        {/* Car selector */}
        {isBYO ? (
          <div style={{ background: "#111", borderRadius: 13, padding: "14px 16px", border: "1.5px solid #1a1a1a", marginBottom: 12 }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: 2, marginBottom: 12, fontWeight: 700 }}>YOUR VEHICLE</div>
            {cars.length === 0 ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="car" size={18} color="#444" />
                <span style={{ fontFamily: "Georgia,serif", fontSize: 14, color: "#666" }}>No vehicles saved — add one in Profile → My Garage</span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {cars.map((car) => {
                  const isSel = selectedCarId === car.id;
                  return (
                    <button key={car.id} onClick={() => setSelectedCarId(car.id)}
                      type="button"
                      aria-pressed={isSel}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", borderRadius: 12, border: `2.5px solid ${isSel ? "#FF4500" : "#1e1e1e"}`, background: isSel ? "rgba(255,69,0,0.08)" : "#0d0d0d", cursor: "pointer", transition: "all 0.15s", width: "100%", textAlign: "left" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: isSel ? "rgba(255,69,0,0.15)" : "#151515", border: `1px solid ${isSel ? "rgba(255,69,0,0.4)" : "#222"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name="car" size={18} color={isSel ? "#FF4500" : "#666"} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "Georgia,serif", fontSize: 14, fontWeight: 700, color: isSel ? "white" : "#ccc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{[car.brand, car.model].filter(Boolean).join(" ") || "—"}</div>
                        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                          {car.plate && <span style={{ fontFamily: "monospace", fontSize: 9, color: isSel ? "#FF4500" : "#888", fontWeight: 700, letterSpacing: 1 }}>{car.plate}</span>}
                          {car.year && <span style={{ fontFamily: "monospace", fontSize: 9, color: "#666" }}>{car.year}</span>}
                        </div>
                      </div>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${isSel ? "#FF4500" : "#444"}`, background: isSel ? "#FF4500" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {isSel && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: "#0d1a0d", borderRadius: 13, padding: "16px", border: "1.5px solid #1a2a1a", marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
            <Icon name="car" size={18} color="#4CAF50" />
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4CAF50", letterSpacing: 1, marginBottom: 2, fontWeight: 700 }}>VEHICLE PROVIDED</div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "#aaa" }}>This venue provides the vehicle for your session.</div>
            </div>
          </div>
        )}

        <div
          style={{
            background: "#111",
            borderRadius: 14,
            padding: "20px",
            border: "1.5px solid #1a1a1a",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: "#888",
              letterSpacing: 2,
              marginBottom: 14,
              fontWeight: 700,
            }}
          >
            PRICE BREAKDOWN
          </div>
          {[
            { l: "Session fee", v: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(venue.price) },
            { l: "Insurance", v: insurance.price > 0 ? `+${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(insurance.price)}` : "None" },
            { l: "Platform fee", v: "Included" },
          ].map((r) => (
            <div
              key={r.l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 13,
                  color: "#aaa",
                }}
              >
                {r.l}
              </span>
              <span
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 13,
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {r.v}
              </span>
            </div>
          ))}
          <div
            style={{
              borderTop: "1.5px solid #1e1e1e",
              paddingTop: 14,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "white",
                letterSpacing: 1,
                fontWeight: 700,
              }}
            >
              {t("booking_total").toUpperCase()}
            </span>
            <span
              style={{
                fontFamily: "Georgia,serif",
                fontSize: 22,
                fontWeight: 800,
                color: "#FF4500",
              }}
            >
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(totalPrice)}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "14px 20px 30px",
          background: "linear-gradient(0deg,#080808 75%,transparent)",
        }}
      >
        <button
          onClick={() => { setConfirmed(true); onConfirm && onConfirm({ id: Date.now(), name: venue.name, date: "15 Mar 2026", session, status: "Upcoming", color: venue.color, img: venue.img, car: selectedCar, insurance, briefingComplete }); }}
          disabled={isBYO && !selectedCarId}
          style={{
            width: "100%",
            padding: "17px",
            borderRadius: 14,
            background: (isBYO && !selectedCarId) ? "#222" : "linear-gradient(135deg,#FF4500,#FF6B00)",
            border: "none",
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: 3,
            color: (isBYO && !selectedCarId) ? "#444" : "white",
            fontWeight: 700,
            cursor: (isBYO && !selectedCarId) ? "default" : "pointer",
            boxShadow: (isBYO && !selectedCarId) ? "none" : "0 12px 32px rgba(255,69,0,0.3)",
          }}
        >
          {t("booking_confirm").toUpperCase()}
        </button>
      </div>
    </div>
  );
}
