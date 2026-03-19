import { useState } from "react";
import Icon from "../components/Icon.jsx";
import Btn from "../components/Btn.jsx";
import TopBar from "./TopBar.jsx";
import { DASH as T } from "../constants/theme.js";

const PricingScreen = () => {
	const [dynamicEnabled, setDynamicEnabled] = useState(true);
	const [basePrice, setBasePrice] = useState(295);

	return (
		<div style={{ animation: "fadeIn 0.3s ease" }}>
			<TopBar title="Dynamic Pricing" subtitle="AI-POWERED PRICING ENGINE" />

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 14,
					marginBottom: 14,
				}}
			>
				{/* Toggle */}
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
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							marginBottom: 16,
						}}
					>
						<div>
							<div
								style={{
									fontFamily: "Georgia, serif",
									fontSize: 16,
									fontWeight: 700,
									color: T.text,
									marginBottom: 4,
								}}
							>
								AI Dynamic Pricing
							</div>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 10,
									color: T.textLight,
								}}
							>
								Adjust prices based on demand, weather & events
							</div>
						</div>
						<button
							role="switch"
							aria-checked={dynamicEnabled}
							aria-label="AI Dynamic Pricing"
							onClick={() => setDynamicEnabled(!dynamicEnabled)}
							onKeyDown={(e) =>
								e.key === "Enter" && setDynamicEnabled((v) => !v)
							}
							style={{
								width: 50,
								height: 27,
								borderRadius: 14,
								background: dynamicEnabled ? T.orange : T.border,
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
									left: dynamicEnabled ? 26 : 3,
									width: 21,
									height: 21,
									borderRadius: "50%",
									background: "white",
									transition: "left 0.2s",
									boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
								}}
							/>
						</button>
					</div>
					<div
						style={{
							background: dynamicEnabled ? T.orangeLight : T.bg,
							borderRadius: 10,
							padding: "14px",
							border: `1px solid ${dynamicEnabled ? T.orange + "44" : T.border}`,
						}}
					>
						<div
							style={{
								fontFamily: "monospace",
								fontSize: 10,
								color: dynamicEnabled ? T.orange : T.textLight,
								letterSpacing: 1,
							}}
						>
							{dynamicEnabled
								? "✓ AI PRICING ACTIVE — NEXT REVIEW IN 2H"
								: "MANUAL PRICING MODE ACTIVE"}
						</div>
					</div>
				</div>

				{/* Base price */}
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
							marginBottom: 16,
						}}
					>
						Base Session Price
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
							marginBottom: 10,
						}}
					>
						<button
							onClick={() => setBasePrice((p) => Math.max(50, p - 25))}
							style={{
								width: 36,
								height: 36,
								borderRadius: 8,
								border: `1px solid ${T.border}`,
								background: "none",
								cursor: "pointer",
								fontSize: 18,
								color: T.text,
							}}
						>
							−
						</button>
						<div style={{ flex: 1, textAlign: "center" }}>
							<div
								style={{
									fontFamily: "Georgia, serif",
									fontSize: 40,
									fontWeight: 700,
									color: T.orange,
								}}
							>
								€{basePrice}
							</div>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 9,
									color: T.textLight,
									letterSpacing: 2,
								}}
							>
								PER 2H SESSION
							</div>
						</div>
						<button
							onClick={() => setBasePrice((p) => Math.min(600, p + 25))}
							style={{
								width: 36,
								height: 36,
								borderRadius: 8,
								border: `1px solid ${T.border}`,
								background: "none",
								cursor: "pointer",
								fontSize: 18,
								color: T.text,
							}}
						>
							+
						</button>
					</div>
				</div>
			</div>

			{/* AI suggestions */}
			<div
				style={{
					background: T.bgCard,
					borderRadius: 16,
					padding: "24px",
					border: `1px solid ${T.border}`,
					marginBottom: 14,
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 10,
						marginBottom: 18,
					}}
				>
					<Icon name="zap" size={16} color={T.orange} />
					<div
						style={{
							fontFamily: "Georgia, serif",
							fontSize: 16,
							fontWeight: 700,
							color: T.text,
						}}
					>
						AI Price Suggestions
					</div>
					<div
						style={{
							fontFamily: "monospace",
							fontSize: 9,
							color: T.textLight,
							marginLeft: "auto",
							letterSpacing: 1,
						}}
					>
						UPDATED 30 MIN AGO
					</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
					{[
						{
							date: "Sat 1 Mar",
							reason: "Weekend peak + sunny forecast",
							suggested: 360,
							base: 295,
							change: "+22%",
							accept: true,
						},
						{
							date: "Sun 2 Mar",
							reason: "Weekend + Assen GP nearby",
							suggested: 380,
							base: 295,
							change: "+29%",
							accept: false,
						},
						{
							date: "Mon 3 Mar",
							reason: "Low demand · weekday",
							suggested: 240,
							base: 295,
							change: "−19%",
							accept: false,
						},
						{
							date: "Fri 7 Mar",
							reason: "High demand · 3 competing events",
							suggested: 340,
							base: 295,
							change: "+15%",
							accept: true,
						},
					].map((s, i) => (
						<div
							key={i}
							style={{
								display: "flex",
								alignItems: "center",
								gap: 16,
								padding: "14px 16px",
								borderRadius: 12,
								background: T.bg,
								border: `1px solid ${T.border}`,
							}}
						>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 11,
									color: T.text,
									width: 80,
									flexShrink: 0,
								}}
							>
								{s.date}
							</div>
							<div style={{ flex: 1 }}>
								<div
									style={{
										fontFamily: "Georgia, serif",
										fontSize: 12,
										color: T.text,
										marginBottom: 2,
									}}
								>
									{s.reason}
								</div>
							</div>
							<div style={{ textAlign: "right", flexShrink: 0 }}>
								<div
									style={{
										fontFamily: "Georgia, serif",
										fontSize: 18,
										fontWeight: 700,
										color: T.text,
									}}
								>
									{new Intl.NumberFormat("es-ES", {
										style: "currency",
										currency: "EUR",
										minimumFractionDigits: 0,
									}).format(s.suggested)}
								</div>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 9,
										color: s.change.startsWith("+") ? T.green : T.red,
									}}
								>
									{s.change} vs base
								</div>
							</div>
							<div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
								<button
									style={{
										width: 30,
										height: 30,
										borderRadius: 8,
										border: `1px solid ${T.border}`,
										background: s.accept ? T.greenLight : "none",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Icon name="check" size={13} color={T.green} />
								</button>
								<button
									style={{
										width: 30,
										height: 30,
										borderRadius: 8,
										border: `1px solid ${T.border}`,
										background: "none",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Icon name="x" size={13} color={T.red} />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Pricing rules */}
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
						marginBottom: 16,
					}}
				>
					Pricing Rules
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(3, 1fr)",
						gap: 10,
					}}
				>
					{[
						{
							label: "Weekend Premium",
							value: "+15%",
							icon: "trending_up",
							color: T.orange,
						},
						{
							label: "Early Bird Discount",
							value: "−10%",
							icon: "tag",
							color: T.blue,
						},
						{
							label: "Last-Minute Price",
							value: "−20%",
							icon: "refresh",
							color: T.green,
						},
						{
							label: "Min Price Floor",
							value: "€180",
							icon: "lock",
							color: T.textMid,
						},
						{
							label: "Max Price Ceiling",
							value: "€500",
							icon: "zap",
							color: T.yellow,
						},
						{
							label: "EV Day Bonus",
							value: "+0%",
							icon: "zap",
							color: T.green,
						},
					].map((r) => (
						<div
							key={r.label}
							style={{
								background: T.bg,
								borderRadius: 12,
								padding: "14px 16px",
								border: `1px solid ${T.border}`,
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 8,
									marginBottom: 8,
								}}
							>
								<Icon name={r.icon} size={13} color={r.color} />
								<span
									style={{
										fontFamily: "monospace",
										fontSize: 9,
										color: T.textLight,
										letterSpacing: 1,
									}}
								>
									{r.label.toUpperCase()}
								</span>
							</div>
							<div
								style={{
									fontFamily: "Georgia, serif",
									fontSize: 20,
									fontWeight: 700,
									color: r.color,
								}}
							>
								{r.value}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PricingScreen;
