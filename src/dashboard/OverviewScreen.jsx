import Icon from "../components/Icon.jsx";
import Badge from "../components/Badge.jsx";
import StatCard from "../components/StatCard.jsx";
import Btn from "../components/Btn.jsx";
import TopBar from "./TopBar.jsx";
import { DASH as T } from "../constants/theme.js";
import { BOOKINGS, NOISE_DATA, REVENUE_DATA, SLOTS, DAYS } from "../constants/dashboard.js";

const OverviewScreen = ({ setActive }) => {
	const upcomingBookings = BOOKINGS.filter(
		(b) => b.status !== "cancelled",
	).slice(0, 4);
	const noiseLevel = 84;
	const noiseLimit = 98;
	const noisePercent = (noiseLevel / noiseLimit) * 100;

	return (
		<div style={{ animation: "fadeIn 0.3s ease" }}>
			<TopBar
				title="Good morning, José."
				subtitle="JEREZ CIRCUIT · MARCH 2026"
				actions={
					<>
						<Btn label="EXPORT REPORT" icon="download" />
						<Btn label="ADD SLOT" icon="plus" primary />
					</>
				}
			/>

			{/* Stats row */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4, 1fr)",
					gap: 14,
					marginBottom: 24,
				}}
			>
				<StatCard
					label="Revenue MTD"
					value="€7,480"
					sub="vs €5,200 last month"
					icon="trending_up"
					accent={T.orange}
					delta={44}
					delay={0}
				/>
				<StatCard
					label="Sessions Booked"
					value="24"
					sub="of 31 slots available"
					icon="ticket"
					accent={T.green}
					delta={18}
					delay={0.05}
				/>
				<StatCard
					label="Utilisation"
					value="77%"
					sub="avg this week"
					icon="chart"
					accent={T.blue}
					delta={12}
					delay={0.1}
				/>
				<StatCard
					label="Avg Rating"
					value="4.9 ★"
					sub="from 214 reviews"
					icon="star"
					accent={T.yellow}
					delay={0.15}
				/>
			</div>

			{/* Main grid */}
			<div
				style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 14 }}
			>
				{/* Left col */}
				<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
					{/* Mini calendar */}
					<div
						style={{
							background: T.bgCard,
							borderRadius: 16,
							padding: "22px 24px",
							border: `1px solid ${T.border}`,
							animation: "fadeUp 0.5s 0.2s ease both",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 18,
							}}
						>
							<div
								style={{
									fontFamily: "Georgia, serif",
									fontSize: 16,
									fontWeight: 700,
									color: T.text,
								}}
							>
								March 2026
							</div>
							<div style={{ display: "flex", gap: 8 }}>
								<div style={{ display: "flex", gap: 14, alignItems: "center" }}>
									{[
										{ color: T.green, label: "Booked" },
										{ color: T.yellow, label: "Reserved" },
										{ color: "#D0C8BF", label: "Blocked" },
										{ color: T.blue, label: "Open" },
									].map((l) => (
										<div
											key={l.label}
											style={{ display: "flex", alignItems: "center", gap: 5 }}
										>
											<div
												style={{
													width: 8,
													height: 8,
													borderRadius: 2,
													background: l.color,
												}}
											/>
											<span
												style={{
													fontFamily: "monospace",
													fontSize: 9,
													color: T.textLight,
													letterSpacing: 1,
												}}
											>
												{l.label.toUpperCase()}
											</span>
										</div>
									))}
								</div>
								<button
									onClick={() => setActive("calendar")}
									style={{
										background: "none",
										border: "none",
										cursor: "pointer",
										fontFamily: "monospace",
										fontSize: 9,
										color: T.orange,
										letterSpacing: 1,
										marginLeft: 8,
									}}
								>
									VIEW FULL →
								</button>
							</div>
						</div>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(7, 1fr)",
								gap: 4,
							}}
						>
							{DAYS.map((d) => (
								<div
									key={d}
									style={{
										fontFamily: "monospace",
										fontSize: 8,
										color: T.textLight,
										textAlign: "center",
										padding: "4px 0",
										letterSpacing: 1,
									}}
								>
									{d}
								</div>
							))}
							{[...Array(4)].map((_, i) => (
								<div key={`e${i}`} />
							))}
							{[...Array(31)].map((_, i) => {
								const d = i + 1;
								const slots = SLOTS[d];
								const booked = slots.filter(
									(s) => s.status === "booked",
								).length;
								const reserved = slots.filter(
									(s) => s.status === "reserved",
								).length;
								const blocked = slots.filter(
									(s) => s.status === "blocked",
								).length;
								const open = slots.filter((s) => s.status === "open").length;
								const dominant =
									booked >= 3
										? "booked"
										: reserved >= 2
											? "reserved"
											: blocked >= 3
												? "blocked"
												: "open";
								const colors = {
									booked: T.greenLight,
									reserved: T.yellowLight,
									blocked: "#F0EDE8",
									open: T.blueLight,
								};
								const textColors = {
									booked: T.green,
									reserved: T.yellow,
									blocked: T.textMid,
									open: T.blue,
								};
								const isToday = d === 1;
								return (
									<div
										key={d}
										style={{
											aspectRatio: "1",
											borderRadius: 8,
											background: isToday ? T.orange : colors[dominant],
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											cursor: "pointer",
											border: isToday ? "none" : `1px solid ${T.border}`,
											transition: "transform 0.1s",
										}}
										onMouseEnter={(e) =>
											(e.currentTarget.style.transform = "scale(1.08)")
										}
										onMouseLeave={(e) =>
											(e.currentTarget.style.transform = "scale(1)")
										}
									>
										<span
											style={{
												fontFamily: "monospace",
												fontSize: 10,
												fontWeight: 700,
												color: isToday ? "white" : textColors[dominant],
											}}
										>
											{d}
										</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* Upcoming bookings */}
					<div
						style={{
							background: T.bgCard,
							borderRadius: 16,
							padding: "22px 24px",
							border: `1px solid ${T.border}`,
							animation: "fadeUp 0.5s 0.25s ease both",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 18,
							}}
						>
							<div
								style={{
									fontFamily: "Georgia, serif",
									fontSize: 16,
									fontWeight: 700,
									color: T.text,
								}}
							>
								Upcoming Bookings
							</div>
							<button
								onClick={() => setActive("bookings")}
								style={{
									background: "none",
									border: "none",
									cursor: "pointer",
									fontFamily: "monospace",
									fontSize: 9,
									color: T.orange,
									letterSpacing: 1,
								}}
							>
								VIEW ALL →
							</button>
						</div>
						<div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
							{upcomingBookings.map((b, i) => (
								<div
									key={b.id}
									style={{
										display: "flex",
										alignItems: "center",
										gap: 14,
										padding: "12px 0",
										borderBottom:
											i < upcomingBookings.length - 1
												? `1px solid ${T.border}`
												: "none",
									}}
								>
									<div
										style={{
											width: 36,
											height: 36,
											borderRadius: "50%",
											background: `linear-gradient(135deg, ${T.orange}22, ${T.orange}44)`,
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											fontFamily: "monospace",
											fontSize: 10,
											fontWeight: 700,
											color: T.orange,
											flexShrink: 0,
										}}
									>
										{b.avatar}
									</div>
									<div style={{ flex: 1, minWidth: 0 }}>
										<div
											style={{
												fontFamily: "Georgia, serif",
												fontSize: 13,
												fontWeight: 700,
												color: T.text,
											}}
										>
											{b.driver}
										</div>
										<div
											style={{
												fontFamily: "monospace",
												fontSize: 9,
												color: T.textLight,
											}}
										>
											{b.vehicle}
										</div>
									</div>
									<div style={{ textAlign: "right", flexShrink: 0 }}>
										<div
											style={{
												fontFamily: "monospace",
												fontSize: 10,
												color: T.text,
											}}
										>
											{b.date} · {b.time}
										</div>
										<div
											style={{
												fontFamily: "Georgia, serif",
												fontSize: 13,
												fontWeight: 700,
												color: T.orange,
											}}
										>
											€{b.price}
										</div>
									</div>
									<Badge status={b.status} />
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right col */}
				<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
					{/* Noise monitor */}
					<div
						style={{
							background: T.bgDark,
							borderRadius: 16,
							padding: "22px 22px",
							border: "1px solid #1e1e1e",
							animation: "fadeUp 0.5s 0.3s ease both",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 16,
							}}
						>
							<div
								style={{
									fontFamily: "Georgia, serif",
									fontSize: 15,
									fontWeight: 700,
									color: "white",
								}}
							>
								Noise Monitor
							</div>
							<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
								<div
									style={{
										width: 7,
										height: 7,
										borderRadius: "50%",
										background: "#4CAF50",
										boxShadow: "0 0 6px #4CAF50",
									}}
								/>
								<span
									style={{
										fontFamily: "monospace",
										fontSize: 9,
										color: "#666",
										letterSpacing: 1,
									}}
								>
									LIVE
								</span>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-end",
								marginBottom: 8,
							}}
						>
							<div>
								<div
									style={{
										fontFamily: "'Georgia', serif",
										fontSize: 38,
										fontWeight: 700,
										color:
											noiseLevel > 90
												? "#FF4500"
												: noiseLevel > 80
													? "#FFD700"
													: "#4CAF50",
										lineHeight: 1,
									}}
								>
									{noiseLevel}
								</div>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 9,
										color: "#888",
										letterSpacing: 2,
									}}
								>
									dB CURRENT
								</div>
							</div>
							<div style={{ textAlign: "right" }}>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 12,
										color: "#888",
									}}
								>
									{noiseLimit} dB
								</div>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 9,
										color: "#888",
										letterSpacing: 1,
									}}
								>
									LIMIT
								</div>
							</div>
						</div>
						<div
							style={{
								background: "#1a1a1a",
								borderRadius: 6,
								height: 8,
								marginBottom: 14,
								overflow: "hidden",
							}}
						>
							<div
								style={{
									height: "100%",
									width: "100%",
									background:
										noiseLevel > 90
											? "#FF4500"
											: noiseLevel > 80
												? "#FFD700"
												: "#4CAF50",
									borderRadius: 6,
									transform: `scaleX(${noisePercent / 100})`,
									transformOrigin: "left",
									transition: "transform 1s ease",
								}}
							/>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: 14,
							}}
						>
							<div
								style={{ fontFamily: "monospace", fontSize: 9, color: "#888" }}
							>
								0 dB
							</div>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 9,
									color: "#4CAF50",
								}}
							>
								SAFE ZONE
							</div>
							<div
								style={{ fontFamily: "monospace", fontSize: 9, color: "#888" }}
							>
								{noiseLimit} dB
							</div>
						</div>
						<div
							style={{
								display: "flex",
								gap: 4,
								alignItems: "flex-end",
								height: 50,
							}}
						>
							{NOISE_DATA.map((v, i) => (
								<div
									key={i}
									style={{
										flex: 1,
										background:
											v > 88 ? "#FF450044" : v > 78 ? "#FFD70033" : "#4CAF5033",
										borderRadius: 2,
										height: `${(v / noiseLimit) * 100}%`,
										border: `1px solid ${v > 88 ? "#FF4500" : v > 78 ? "#FFD700" : "#4CAF50"}22`,
									}}
								/>
							))}
						</div>
						<div
							style={{
								fontFamily: "monospace",
								fontSize: 8,
								color: "#888",
								marginTop: 8,
								letterSpacing: 1,
							}}
						>
							LAST 24 HOURS
						</div>
					</div>

					{/* Revenue mini chart */}
					<div
						style={{
							background: T.bgCard,
							borderRadius: 16,
							padding: "22px 22px",
							border: `1px solid ${T.border}`,
							animation: "fadeUp 0.5s 0.35s ease both",
						}}
					>
						<div
							style={{
								fontFamily: "Georgia, serif",
								fontSize: 15,
								fontWeight: 700,
								color: T.text,
								marginBottom: 16,
							}}
						>
							Revenue Trend
						</div>
						<div
							style={{
								display: "flex",
								gap: 6,
								alignItems: "flex-end",
								height: 70,
							}}
						>
							{REVENUE_DATA.map((r, i) => (
								<div
									key={r.month}
									style={{
										flex: 1,
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: 4,
									}}
								>
									<div
										style={{
											width: "100%",
											background:
												i === REVENUE_DATA.length - 1
													? T.orange
													: `${T.orange}33`,
											borderRadius: "4px 4px 0 0",
											height: `${(r.v / 8000) * 100}%`,
											transition: "height 0.5s ease",
											minHeight: 4,
										}}
									/>
									<div
										style={{
											fontFamily: "monospace",
											fontSize: 8,
											color: T.textLight,
										}}
									>
										{r.month}
									</div>
								</div>
							))}
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: 12,
								padding: "10px 0",
								borderTop: `1px solid ${T.border}`,
							}}
						>
							<div>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 8,
										color: T.textLight,
										letterSpacing: 1,
									}}
								>
									THIS MONTH
								</div>
								<div
									style={{
										fontFamily: "Georgia, serif",
										fontSize: 16,
										fontWeight: 700,
										color: T.orange,
									}}
								>
									{new Intl.NumberFormat("es-ES", {
										style: "currency",
										currency: "EUR",
										minimumFractionDigits: 0,
									}).format(7400)}
								</div>
							</div>
							<div style={{ textAlign: "right" }}>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 8,
										color: T.textLight,
										letterSpacing: 1,
									}}
								>
									VS LAST MONTH
								</div>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 11,
										color: T.green,
									}}
								>
									↑ 21.3%
								</div>
							</div>
						</div>
					</div>

					{/* Quick actions */}
					<div
						style={{
							background: T.bgCard,
							borderRadius: 16,
							padding: "22px 22px",
							border: `1px solid ${T.border}`,
							animation: "fadeUp 0.5s 0.4s ease both",
						}}
					>
						<div
							style={{
								fontFamily: "Georgia, serif",
								fontSize: 15,
								fontWeight: 700,
								color: T.text,
								marginBottom: 14,
							}}
						>
							Quick Actions
						</div>
						<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
							{[
								{
									icon: "plus",
									label: "Add availability slots",
									color: T.green,
								},
								{ icon: "lock", label: "Block dates", color: T.textMid },
								{ icon: "tag", label: "Update pricing rules", color: T.orange },
								{
									icon: "zap",
									label: "Enable EV day (no noise limit)",
									color: T.blue,
								},
							].map((a) => (
								<button
									key={a.label}
									style={{
										display: "flex",
										alignItems: "center",
										gap: 10,
										padding: "10px 12px",
										borderRadius: 10,
										border: `1px solid ${T.border}`,
										background: "none",
										cursor: "pointer",
										transition: "background 0.15s",
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.background = T.bg)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.background = "none")
									}
								>
									<Icon name={a.icon} size={14} color={a.color} />
									<span
										style={{
											fontFamily: "monospace",
											fontSize: 10,
											color: T.text,
											letterSpacing: 1,
										}}
									>
										{a.label.toUpperCase()}
									</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OverviewScreen;
