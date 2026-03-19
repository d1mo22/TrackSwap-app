import { useState } from "react";
import Btn from "../components/Btn.jsx";
import TopBar from "./TopBar.jsx";
import { DASH as T } from "../constants/theme.js";
import { NOISE_DATA } from "../constants/dashboard.js";

const NoiseScreen = () => {
	const [alertsEnabled, setAlertsEnabled] = useState(true);
	const [hardwareConnected] = useState(true);
	const current = 84;
	const limit = 98;

	return (
		<div style={{ animation: "fadeIn 0.3s ease" }}>
			<TopBar
				title="Noise Monitor"
				subtitle="IoT BOUNDARY SENSOR"
				actions={<Btn label="CONFIGURE SENSOR" icon="settings" />}
			/>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 14,
					marginBottom: 14,
				}}
			>
				{/* Live gauge */}
				<div
					style={{
						background: T.bgDark,
						borderRadius: 16,
						padding: "32px",
						border: "1px solid #1e1e1e",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: 24,
						}}
					>
						<div>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 9,
									color: "#888",
									letterSpacing: 3,
									marginBottom: 4,
								}}
							>
								LIVE READING
							</div>
							<div
								style={{
									fontFamily: "Georgia, serif",
									fontSize: 13,
									fontWeight: 700,
									color: "white",
								}}
							>
								Boundary Sensor · Zone A
							</div>
						</div>
						<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
							<div
								style={{
									width: 8,
									height: 8,
									borderRadius: "50%",
									background: hardwareConnected ? "#4CAF50" : "#F44336",
									boxShadow: `0 0 8px ${hardwareConnected ? "#4CAF50" : "#F44336"}`,
								}}
							/>
							<span
								style={{
									fontFamily: "monospace",
									fontSize: 9,
									color: hardwareConnected ? "#4CAF50" : "#F44336",
									letterSpacing: 1,
								}}
							>
								{hardwareConnected ? "CONNECTED" : "OFFLINE"}
							</span>
						</div>
					</div>
					<div style={{ textAlign: "center", marginBottom: 24 }}>
						<div
							style={{
								fontFamily: "Georgia, serif",
								fontSize: 72,
								fontWeight: 900,
								color:
									current > 92
										? "#FF4500"
										: current > 82
											? "#FFD700"
											: "#4CAF50",
								lineHeight: 1,
							}}
						>
							{current}
						</div>
						<div
							style={{
								fontFamily: "monospace",
								fontSize: 14,
								color: "#888",
								letterSpacing: 4,
								marginTop: 4,
							}}
						>
							dB SPL
						</div>
					</div>
					<div
						style={{
							background: "#1a1a1a",
							borderRadius: 8,
							height: 12,
							marginBottom: 8,
							overflow: "hidden",
							position: "relative",
						}}
					>
						<div
							style={{
								height: "100%",
								width: "100%",
								background:
									current > 92
										? "linear-gradient(90deg,#FFD700,#FF4500)"
										: current > 82
											? "#FFD700"
											: "#4CAF50",
								borderRadius: 8,
								transform: `scaleX(${current / limit})`,
								transformOrigin: "left",
								transition: "transform 1s",
							}}
						/>
						<div
							style={{
								position: "absolute",
								top: 0,
								left: `${(90 / limit) * 100}%`,
								width: 2,
								height: "100%",
								background: "#FF4500",
								opacity: 0.5,
							}}
						/>
					</div>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<span
							style={{ fontFamily: "monospace", fontSize: 9, color: "#888" }}
						>
							0 dB
						</span>
						<span
							style={{ fontFamily: "monospace", fontSize: 9, color: "#FF4500" }}
						>
							WARN 90dB
						</span>
						<span
							style={{ fontFamily: "monospace", fontSize: 9, color: "#888" }}
						>
							LIMIT {limit}dB
						</span>
					</div>
				</div>

				{/* Settings */}
				<div
					style={{
						background: T.bgCard,
						borderRadius: 16,
						padding: "24px",
						border: `1px solid ${T.border}`,
					}}
				>
					<div
						style={{
							fontFamily: "Georgia, serif",
							fontSize: 16,
							fontWeight: 700,
							color: T.text,
							marginBottom: 20,
						}}
					>
						Alert Configuration
					</div>
					<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
						{[
							{
								label: "SMS alerts to owner",
								sub: "Send SMS when approaching limit",
								on: alertsEnabled,
								toggle: () => setAlertsEnabled(!alertsEnabled),
							},
							{
								label: "Auto-notify drivers",
								sub: "Ping drivers in session when >85 dB",
								on: true,
								toggle: () => {},
							},
							{
								label: "Pause bookings at limit",
								sub: "Block new arrivals when dB limit hit",
								on: false,
								toggle: () => {},
							},
							{
								label: "Daily noise report",
								sub: "Email summary every evening",
								on: true,
								toggle: () => {},
							},
						].map((s, i) => (
							<div
								key={i}
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "14px 0",
									borderBottom: i < 3 ? `1px solid ${T.border}` : "none",
								}}
							>
								<div>
									<div
										style={{
											fontFamily: "Georgia, serif",
											fontSize: 13,
											fontWeight: 700,
											color: T.text,
											marginBottom: 2,
										}}
									>
										{s.label}
									</div>
									<div
										style={{
											fontFamily: "monospace",
											fontSize: 9,
											color: T.textLight,
										}}
									>
										{s.sub}
									</div>
								</div>
								<button
									role="switch"
									aria-checked={s.on}
									aria-label={s.label}
									onClick={s.toggle}
									onKeyDown={(e) => e.key === "Enter" && s.toggle()}
									style={{
										width: 44,
										height: 24,
										borderRadius: 12,
										background: s.on ? T.orange : T.border,
										cursor: "pointer",
										position: "relative",
										transition: "background 0.2s",
										flexShrink: 0,
										border: "none",
										padding: 0,
									}}
								>
									<div
										style={{
											position: "absolute",
											top: 3,
											left: s.on ? 23 : 3,
											width: 18,
											height: 18,
											borderRadius: "50%",
											background: "white",
											transition: "left 0.2s",
											boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
										}}
									/>
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* 24h chart */}
			<div
				style={{
					background: T.bgCard,
					borderRadius: 16,
					padding: "24px",
					border: `1px solid ${T.border}`,
				}}
			>
				<div
					style={{
						fontFamily: "Georgia, serif",
						fontSize: 16,
						fontWeight: 700,
						color: T.text,
						marginBottom: 20,
					}}
				>
					24-Hour Noise History
				</div>
				<div
					style={{
						display: "flex",
						gap: 4,
						alignItems: "flex-end",
						height: 100,
						marginBottom: 8,
					}}
				>
					{NOISE_DATA.map((v, i) => (
						<div
							key={i}
							style={{
								flex: 1,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: 3,
								height: "100%",
								justifyContent: "flex-end",
							}}
						>
							<div
								style={{
									width: "100%",
									background:
										v > 90
											? `${T.red}22`
											: v > 80
												? `${T.yellow}22`
												: `${T.green}22`,
									borderRadius: "3px 3px 0 0",
									height: `${(v / limit) * 100}%`,
									border: `1px solid ${v > 90 ? T.red : v > 80 ? T.yellow : T.green}44`,
									transition: "height 0.5s",
									position: "relative",
								}}
							>
								{v > 90 && (
									<div
										style={{
											position: "absolute",
											top: 0,
											left: 0,
											right: 0,
											height: 2,
											background: T.red,
											borderRadius: 2,
										}}
									/>
								)}
							</div>
						</div>
					))}
				</div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<span
						style={{ fontFamily: "monospace", fontSize: 8, color: T.textLight }}
					>
						00:00
					</span>
					<span
						style={{ fontFamily: "monospace", fontSize: 8, color: T.textLight }}
					>
						06:00
					</span>
					<span
						style={{ fontFamily: "monospace", fontSize: 8, color: T.textLight }}
					>
						12:00
					</span>
					<span
						style={{ fontFamily: "monospace", fontSize: 8, color: T.textLight }}
					>
						18:00
					</span>
					<span
						style={{ fontFamily: "monospace", fontSize: 8, color: T.textLight }}
					>
						23:59
					</span>
				</div>
				<div style={{ display: "flex", gap: 16, marginTop: 16 }}>
					{[
						{ color: T.green, label: "SAFE (<80dB)" },
						{ color: T.yellow, label: "WARNING (80-90dB)" },
						{ color: T.red, label: "CRITICAL (>90dB)" },
					].map((l) => (
						<div
							key={l.label}
							style={{ display: "flex", alignItems: "center", gap: 6 }}
						>
							<div
								style={{
									width: 10,
									height: 10,
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
								{l.label}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default NoiseScreen;
