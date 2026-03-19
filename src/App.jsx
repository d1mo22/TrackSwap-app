import { useState } from "react";
import SplashScreen from "./screens/SplashScreen.jsx";
import MapScreen from "./screens/MapScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import DetailScreen from "./screens/DetailScreen.jsx";
import InsuranceSelectionScreen from "./screens/InsuranceSelectionScreen.jsx";
import BriefingScreen from "./screens/BriefingScreen.jsx";
import BookingScreen from "./screens/BookingScreen.jsx";
import SessionStatsScreen from "./screens/SessionStatsScreen.jsx";
import BookingDetailScreen from "./screens/BookingDetailScreen.jsx";
import BookingsScreen from "./screens/BookingsScreen.jsx";
import CommunityScreen from "./screens/CommunityScreen.jsx";
import LicenceScreen from "./screens/LicenceScreen.jsx";
import CarScreen from "./screens/CarScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import NavBar from "./screens/NavBar.jsx";
import { VENUES, INITIAL_BOOKINGS } from "./constants/venues.js";

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [tab, setTab] = useState("home");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [bookVenue, setBookVenue] = useState(null);
  const [bookSession, setBookSession] = useState(null);
  const [bookInsurance, setBookInsurance] = useState(null);
  const [bookCarId, setBookCarId] = useState(null);
  const [bookBriefingComplete, setBookBriefingComplete] = useState(false);
  const [briefingBooking, setBriefingBooking] = useState(null);
  const [detailBooking, setDetailBooking] = useState(null);
  const [favorites, setFavorites] = useState(new Set([1]));
  const [statsBooking, setStatsBooking] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  const addBooking = (b) => setBookings((prev) => [b, ...prev]);
  const deleteBooking = (id) => setBookings((prev) => prev.filter((b) => b.id !== id));
  const rescheduleBooking = (id, newSession) => setBookings((prev) =>
    prev.map((b) => b.id === id ? { ...b, session: newSession } : b)
  );

  const saveCar = (car) => setCars((prev) => {
    const exists = prev.find((c) => c.id === car.id);
    return exists ? prev.map((c) => c.id === car.id ? car : c) : [...prev, car];
  });
  const deleteCar = (id) => setCars((prev) => prev.filter((c) => c.id !== id));

  const toggleFav = (id) =>
    setFavorites((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const goDetail = (v) => {
    setSelectedVenue(v);
    setScreen("detail");
  };
  const goInsurance = (v, s, briefing) => {
    setBookVenue(v);
    setBookSession(s);
    setBookBriefingComplete(briefing || false);
    setScreen("insurance");
  };
  const goBook = (insurance) => {
    setBookInsurance(insurance);
    setScreen("booking");
  };
  const goBriefingForBooking = (b) => {
    setBriefingBooking(b);
    setScreen("briefing_standalone");
  };
  const goBookingDetail = (b) => {
    setDetailBooking(b);
    setScreen("booking_detail");
  };
  const completeBriefing = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, briefingComplete: true } : b));
    setScreen("main");
    setTab("bookings");
  };

  const renderMain = () => {
    if (tab === "map") return <MapScreen onVenue={goDetail} />;
    if (tab === "community") return <CommunityScreen />;
    if (tab === "home") return <HomeScreen onVenue={goDetail}
          favorites={favorites}
          toggleFav={toggleFav} />;
    if (tab === "bookings") return <BookingsScreen onSelect={goBookingDetail} onBriefing={goBriefingForBooking} onStats={(b) => { setStatsBooking(b); setScreen("stats"); }} bookings={bookings} onDelete={deleteBooking} onReschedule={rescheduleBooking} />;
    if (tab === "profile") return <ProfileScreen onLicence={() => setScreen("licence")} onCar={() => setScreen("car")} carsCount={cars.length} />;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia,serif",
        padding: "20px",
        colorScheme: "dark",
      }}
    >
      <style>{`*{box-sizing:border-box;margin:0;padding:0;} body{background:#111;} input::placeholder{color:#444;} ::-webkit-scrollbar{display:none;}`}</style>

      {/* Phone */}
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 52,
          background: "#050505",
          border: "10px solid #1c1c1e",
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 0 0 1px #2a2a2a,0 50px 120px rgba(0,0,0,0.9),0 0 80px rgba(255,69,0,0.04)",
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 126,
            height: 34,
            background: "#050505",
            borderRadius: "0 0 20px 20px",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#1a1a1a",
            }}
          />
          <div
            style={{
              width: 58,
              height: 5,
              background: "#1a1a1a",
              borderRadius: 3,
            }}
          />
        </div>

        {/* Screen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 42,
            overflow: "hidden",
          }}
        >
          {screen === "splash" && (
            <SplashScreen onDone={() => setScreen("main")} />
          )}
          {screen === "main" && (
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              {renderMain()}
              <NavBar
                tab={tab}
                setTab={(t) => {
                  setTab(t);
                  setScreen("main");
                }}
              />
            </div>
          )}
          {screen === "detail" && selectedVenue && (
            <DetailScreen
              venue={selectedVenue}
              onBack={() => setScreen("main")}
              onBook={(v, s) => goInsurance(v, s)}
              isFav={favorites.has(selectedVenue.id)}
              toggleFav={toggleFav}
            />
          )}
          {screen === "insurance" && bookVenue && (
            <InsuranceSelectionScreen
              venue={bookVenue}
              session={bookSession}
              cars={cars}
              briefingComplete={bookBriefingComplete}
              onSelect={(i, c) => {
                setBookInsurance(i);
                setBookCarId(c?.id || null);
                setScreen("booking");
              }}
              onBack={() => setScreen("detail")}
            />
          )}
          {screen === "booking" && bookVenue && bookInsurance && (
            <BookingScreen
              venue={bookVenue}
              session={bookSession}
              insurance={bookInsurance}
              preSelectedCarId={bookCarId}
              briefingComplete={bookBriefingComplete}
              cars={cars}
              onConfirm={(b) => addBooking(b)}
              onDone={() => { setTab("bookings"); setScreen("main"); }}
              onBack={() => setScreen("insurance")}
            />
          )}
          {screen === "briefing_standalone" && briefingBooking && (
            <BriefingScreen
              venue={VENUES.find(v => v.name === briefingBooking.name) || { name: briefingBooking.name }}
              isStandalone={true}
              onComplete={() => completeBriefing(briefingBooking.id)}
              onBack={() => setScreen("main")}
            />
          )}
          {screen === "booking_detail" && detailBooking && (
            <BookingDetailScreen
              booking={detailBooking}
              onBack={() => setScreen("main")}
              onDelete={deleteBooking}
              onReschedule={rescheduleBooking}
              onBriefing={goBriefingForBooking}
              onStats={(b) => { setStatsBooking(b); setScreen("stats"); }}
            />
          )}
          {screen === "licence" && (
            <LicenceScreen onBack={() => setScreen("main")} />
          )}
          {screen === "car" && (
            <CarScreen cars={cars} onSave={saveCar} onDelete={deleteCar} onBack={() => setScreen("main")} />
          )}
          {screen === "stats" && statsBooking && (
            <SessionStatsScreen
              booking={statsBooking}
              onBack={() => { setScreen("main"); setTab("bookings"); }}
            />
          )}
        </div>

        {/* Home indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 5,
            background: "#444",
            borderRadius: 3,
            zIndex: 300,
          }}
        />
      </div>
    </div>
  );
}
