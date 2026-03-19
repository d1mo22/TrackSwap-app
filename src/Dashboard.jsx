import { useState } from "react";
import Icon from "./components/Icon.jsx";
import Btn from "./components/Btn.jsx";
import Sidebar from "./dashboard/Sidebar.jsx";
import OverviewScreen from "./dashboard/OverviewScreen.jsx";
import CalendarScreen from "./dashboard/CalendarScreen.jsx";
import BookingsScreen from "./dashboard/BookingsScreen.jsx";
import AnalyticsScreen from "./dashboard/AnalyticsScreen.jsx";
import NoiseScreen from "./dashboard/NoiseScreen.jsx";
import PricingScreen from "./dashboard/PricingScreen.jsx";
import SettingsScreen from "./dashboard/SettingsScreen.jsx";
import { DASH as T } from "./constants/theme.js";

// ─── REGISTER FLOW DATA ──────────────────────────────────────────────────────
const CIRCUIT_TYPES = [
	"Permanent Circuit",
	"Karting",
	"Airfield",
	"Parking / Autocross",
	"Other",
];
const COUNTRIES_DB = [
	"Spain",
	"Germany",
	"France",
	"Italy",
	"Portugal",
	"United Kingdom",
	"Netherlands",
	"Belgium",
	"Switzerland",
	"Austria",
	"Poland",
	"Sweden",
	"Other",
];
const FACILITIES_LIST = [
	{ id: "pit_boxes", label: "Pit boxes" },
	{ id: "garages", label: "Covered garages" },
	{ id: "paddock", label: "Paddock" },
	{ id: "medical", label: "Medical staff" },
	{ id: "timing", label: "Timing system" },
	{ id: "cctv", label: "CCTV" },
	{ id: "catering", label: "Catering" },
	{ id: "recovery", label: "Recovery vehicle" },
	{ id: "instructor", label: "Instructor available" },
	{ id: "toilets", label: "Toilets" },
	{ id: "wifi", label: "Wi-Fi" },
	{ id: "night", label: "Night lighting" },
	{ id: "fuel", label: "Fuel supply" },
	{ id: "hotel", label: "Nearby hotel" },
];
const DAYS_LIST = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SESSION_TYPES = [
	{ id: "half_day", label: "Half day", sub: "4 hours" },
	{ id: "full_day", label: "Full day", sub: "8 hours" },
	{ id: "custom", label: "Custom session", sub: "Tailored" },
];
const FIA_GRADES = ["No rating", "Grade 3", "Grade 2", "Grade 1"];
const INSURANCE_OPT = ["Mandatory", "Recommended", "Not required"];
const REG_STEPS = [
	{
		n: 1,
		title: "Your account",
		desc: "Create your credentials to access the owner portal.",
	},
	{
		n: 2,
		title: "The circuit",
		desc: "Basic information about your facility.",
	},
	{ n: 3, title: "Facilities", desc: "What equipment does your circuit have?" },
	{ n: 4, title: "Operations", desc: "Availability, sessions and pricing." },
	{ n: 5, title: "Review", desc: "Check the details before submitting." },
];

// ─── REGISTER FORM PRIMITIVES ────────────────────────────────────────────────
const RField = ({ label, hint, id, children }) => (
	<div style={{ marginBottom: 18 }}>
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "baseline",
				marginBottom: 7,
			}}
		>
			<label
				htmlFor={id}
				style={{
					fontFamily: "monospace",
					fontSize: 9,
					color: T.textMid,
					letterSpacing: 2,
				}}
			>
				{label.toUpperCase()}
			</label>
			{hint && (
				<span
					style={{ fontFamily: "monospace", fontSize: 10, color: T.textLight }}
				>
					{hint}
				</span>
			)}
		</div>
		{children}
	</div>
);

const RInput = ({
	id,
	value,
	onChange,
	placeholder,
	type = "text",
	suffix,
	right,
}) => (
	<div
		style={{
			background: T.bgCard,
			border: `1.5px solid ${T.border}`,
			borderRadius: 10,
			padding: "12px 14px",
			display: "flex",
			alignItems: "center",
			gap: 10,
			transition: "border-color 0.2s",
		}}
		onFocusCapture={(e) => (e.currentTarget.style.borderColor = T.orange)}
		onBlurCapture={(e) => (e.currentTarget.style.borderColor = T.border)}
	>
		<input
			id={id}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			type={type}
			style={{
				background: "none",
				border: "none",
				outline: "none",
				flex: 1,
				fontFamily: "Georgia,serif",
				fontSize: 14,
				color: T.text,
				width: "100%",
			}}
		/>
		{suffix && (
			<span
				style={{
					fontFamily: "monospace",
					fontSize: 10,
					color: T.textLight,
					flexShrink: 0,
				}}
			>
				{suffix}
			</span>
		)}
		{right}
	</div>
);

const RSelect = ({ value, onChange, options }) => (
	<div
		style={{
			background: T.bgCard,
			border: `1.5px solid ${T.border}`,
			borderRadius: 10,
			padding: "12px 14px",
			display: "flex",
			alignItems: "center",
		}}
		onFocusCapture={(e) => (e.currentTarget.style.borderColor = T.orange)}
		onBlurCapture={(e) => (e.currentTarget.style.borderColor = T.border)}
	>
		<select
			value={value}
			onChange={onChange}
			style={{
				background: "none",
				border: "none",
				outline: "none",
				flex: 1,
				fontFamily: "Georgia,serif",
				fontSize: 14,
				color: T.text,
				appearance: "none",
				cursor: "pointer",
				width: "100%",
			}}
		>
			{options.map((o) => (
				<option key={o} value={o}>
					{o}
				</option>
			))}
		</select>
		<Icon
			name="chevron_right"
			size={14}
			color={T.textLight}
			style={{ flexShrink: 0 }}
		/>
	</div>
);

// ─── REGISTER FLOW ────────────────────────────────────────────────────────────
const RegisterFlow = ({ onComplete }) => {
	const [step, setStep] = useState(1);
	const [showPass, setShowPass] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);

	const [d, setD] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		circuitName: "",
		circuitType: "Permanent Circuit",
		country: "Spain",
		city: "",
		address: "",
		length: "",
		turns: "",
		facilities: new Set(["pit_boxes", "timing", "toilets", "paddock"]),
		days: new Set(["Sat", "Sun"]),
		sessionTypes: new Set(["full_day"]),
		basePrice: "320",
		maxVehicles: "15",
		noiseLimit: "98",
		fiaGrade: "No rating",
		insurance: "Mandatory",
		minAge: "18",
	});

	const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
	const toggleSet = (k, v) =>
		setD((p) => {
			const s = new Set(p[k]);
			s.has(v) ? s.delete(v) : s.add(v);
			return { ...p, [k]: s };
		});

	const handleSubmit = () => {
		setSubmitting(true);
		setTimeout(() => {
			setSubmitting(false);
			setDone(true);
		}, 2000);
		setTimeout(() => onComplete(), 3400);
	};

	// ── Transition screens ──────────────────────────────────────────────────────
	if (submitting || done)
		return (
			<div
				style={{
					minHeight: "100vh",
					background: "#E8E4DF",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontFamily: "Georgia,serif",
				}}
			>
				<style>{`*{box-sizing:border-box;margin:0;padding:0;} @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @keyframes scaleIn{0%{transform:scale(0);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}} @keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
				<div style={{ textAlign: "center", animation: "fadeIn 0.35s ease" }}>
					{submitting ? (
						<>
							<div
								style={{
									width: 52,
									height: 52,
									border: `4px solid ${T.border}`,
									borderTopColor: T.orange,
									borderRadius: "50%",
									animation: "spin 0.7s linear infinite",
									margin: "0 auto 22px",
								}}
							/>
							<div
								style={{
									fontFamily: "Georgia,serif",
									fontSize: 20,
									color: T.text,
									marginBottom: 8,
								}}
							>
								Submitting request…
							</div>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 9,
									color: T.textLight,
									letterSpacing: 2,
								}}
							>
								VERIFYING CIRCUIT DATA
							</div>
						</>
					) : (
						<>
							<div
								style={{
									width: 72,
									height: 72,
									borderRadius: "50%",
									background: T.greenLight,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									margin: "0 auto 22px",
									animation: "scaleIn 0.45s ease",
								}}
							>
								<Icon name="check_circle" size={34} color={T.green} />
							</div>
							<div
								style={{
									fontFamily: "Georgia,serif",
									fontSize: 24,
									fontWeight: 700,
									color: T.text,
									marginBottom: 8,
								}}
							>
								Request submitted!
							</div>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 9,
									color: T.textLight,
									letterSpacing: 2,
									marginBottom: 16,
								}}
							>
								REVIEW IN 2–3 BUSINESS DAYS
							</div>
							<div
								style={{
									fontFamily: "Georgia,serif",
									fontSize: 13,
									color: T.textMid,
								}}
							>
								Accessing dashboard…
							</div>
						</>
					)}
				</div>
			</div>
		);

	// ── Step content ──────────────────────────────────────────────────────────
	const renderStep = () => {
		// STEP 1 — Account
		if (step === 1)
			return (
				<>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
					>
						<RField label="Full name" id="reg-name">
							<RInput
								id="reg-name"
								value={d.name}
								onChange={(e) => set("name", e.target.value)}
								placeholder="John Smith"
							/>
						</RField>
						<RField label="Phone" id="reg-phone">
							<RInput
								id="reg-phone"
								value={d.phone}
								onChange={(e) => set("phone", e.target.value)}
								placeholder="+44 7700 000000"
							/>
						</RField>
					</div>
					<RField label="Work email" id="reg-email">
						<RInput
							id="reg-email"
							value={d.email}
							onChange={(e) => set("email", e.target.value)}
							placeholder="john@circuitpark.com"
							type="email"
						/>
					</RField>
					<RField
						label="Password"
						hint="Minimum 8 characters"
						id="reg-password"
					>
						<RInput
							id="reg-password"
							value={d.password}
							onChange={(e) => set("password", e.target.value)}
							placeholder="••••••••"
							type={showPass ? "text" : "password"}
							right={
								<button
									onClick={() => setShowPass(!showPass)}
									aria-label={showPass ? "Hide password" : "Show password"}
									style={{
										background: "none",
										border: "none",
										cursor: "pointer",
										padding: 0,
										display: "flex",
										flexShrink: 0,
									}}
								>
									<Icon
										name={showPass ? "eye_off" : "eye"}
										size={16}
										color={T.textLight}
									/>
								</button>
							}
						/>
					</RField>
					<div
						style={{
							background: T.orangeLight,
							border: `1px solid ${T.orange}33`,
							borderRadius: 10,
							padding: "13px 16px",
							display: "flex",
							gap: 10,
							alignItems: "flex-start",
						}}
					>
						<Icon name="shield" size={14} color={T.orange} />
						<span
							style={{
								fontFamily: "monospace",
								fontSize: 9,
								color: T.textMid,
								letterSpacing: 0.5,
								lineHeight: 1.65,
							}}
						>
							YOUR DATA IS USED EXCLUSIVELY TO MANAGE YOUR CIRCUIT ON TRACKSWAP.
							IT IS NEVER SHARED WITH THIRD PARTIES.
						</span>
					</div>
				</>
			);

		// STEP 2 — Circuit info
		if (step === 2)
			return (
				<>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
					>
						<RField
							label="Circuit name"
							hint="Public name in the app"
							id="reg-circuit-name"
						>
							<RInput
								id="reg-circuit-name"
								value={d.circuitName}
								onChange={(e) => set("circuitName", e.target.value)}
								placeholder="Silverstone Circuit"
							/>
						</RField>
						<RField label="Facility type" id="reg-circuit-type">
							<RSelect
								value={d.circuitType}
								onChange={(e) => set("circuitType", e.target.value)}
								options={CIRCUIT_TYPES}
							/>
						</RField>
						<RField label="Country" id="reg-country">
							<RSelect
								value={d.country}
								onChange={(e) => set("country", e.target.value)}
								options={COUNTRIES_DB}
							/>
						</RField>
						<RField label="City / Town" id="reg-city">
							<RInput
								id="reg-city"
								value={d.city}
								onChange={(e) => set("city", e.target.value)}
								placeholder="Towcester"
							/>
						</RField>
					</div>
					<RField label="Full address" id="reg-address">
						<RInput
							id="reg-address"
							value={d.address}
							onChange={(e) => set("address", e.target.value)}
							placeholder="Silverstone Circuit, Silverstone, NN12 8TN"
						/>
					</RField>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr",
							gap: 14,
						}}
					>
						<RField label="Track length" id="reg-length">
							<RInput
								id="reg-length"
								value={d.length}
								onChange={(e) => set("length", e.target.value)}
								placeholder="5.891"
								suffix="km"
							/>
						</RField>
						<RField label="Number of turns" id="reg-turns">
							<RInput
								id="reg-turns"
								value={d.turns}
								onChange={(e) => set("turns", e.target.value)}
								placeholder="18"
							/>
						</RField>
						<RField label="FIA grade" id="reg-fia">
							<RSelect
								value={d.fiaGrade}
								onChange={(e) => set("fiaGrade", e.target.value)}
								options={FIA_GRADES}
							/>
						</RField>
					</div>
				</>
			);

		// STEP 3 — Facilities
		if (step === 3)
			return (
				<>
					<div
						style={{
							fontFamily: "monospace",
							fontSize: 9,
							color: T.textLight,
							letterSpacing: 2,
							marginBottom: 16,
						}}
					>
						SELECT THE FACILITIES AVAILABLE AT YOUR CIRCUIT
					</div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(2, 1fr)",
							gap: 8,
							marginBottom: 18,
						}}
					>
						{FACILITIES_LIST.map((f) => {
							const on = d.facilities.has(f.id);
							return (
								<button
									key={f.id}
									onClick={() => toggleSet("facilities", f.id)}
									style={{
										display: "flex",
										alignItems: "center",
										gap: 10,
										padding: "12px 14px",
										borderRadius: 10,
										border: `1.5px solid ${on ? T.orange : T.border}`,
										background: on ? T.orangeLight : T.bgCard,
										cursor: "pointer",
										transition: "background 0.15s, border-color 0.15s",
										textAlign: "left",
									}}
								>
									<div
										style={{
											width: 18,
											height: 18,
											borderRadius: 5,
											border: `1.5px solid ${on ? T.orange : T.borderStrong}`,
											background: on ? T.orange : "transparent",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											flexShrink: 0,
										}}
									>
										{on && <Icon name="check" size={11} color="white" />}
									</div>
									<span
										style={{
											fontFamily: "Georgia,serif",
											fontSize: 12,
											color: on ? T.orange : T.text,
										}}
									>
										{f.label}
									</span>
								</button>
							);
						})}
					</div>
					<div
						style={{
							background: T.bg,
							borderRadius: 10,
							padding: "11px 16px",
							fontFamily: "monospace",
							fontSize: 9,
							color: T.textMid,
							letterSpacing: 1,
							border: `1px solid ${T.border}`,
						}}
					>
						{d.facilities.size} FACILIT{d.facilities.size !== 1 ? "IES" : "Y"}{" "}
						SELECTED
					</div>
				</>
			);

		// STEP 4 — Operations
		if (step === 4)
			return (
				<>
					<RField label="Operating days">
						<div style={{ display: "flex", gap: 6 }}>
							{DAYS_LIST.map((day) => {
								const on = d.days.has(day);
								return (
									<button
										key={day}
										onClick={() => toggleSet("days", day)}
										style={{
											flex: 1,
											padding: "10px 0",
											borderRadius: 8,
											border: `1.5px solid ${on ? T.orange : T.border}`,
											background: on ? T.orange : T.bgCard,
											color: on ? "white" : T.textMid,
											fontFamily: "monospace",
											fontSize: 9,
											cursor: "pointer",
											transition:
												"background 0.15s, border-color 0.15s, color 0.15s",
											letterSpacing: 0.5,
										}}
									>
										{day}
									</button>
								);
							})}
						</div>
					</RField>

					<RField label="Session types offered">
						<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
							{SESSION_TYPES.map((s) => {
								const on = d.sessionTypes.has(s.id);
								return (
									<button
										key={s.id}
										onClick={() => toggleSet("sessionTypes", s.id)}
										style={{
											display: "flex",
											alignItems: "center",
											gap: 14,
											padding: "13px 16px",
											borderRadius: 10,
											border: `1.5px solid ${on ? T.orange : T.border}`,
											background: on ? T.orangeLight : T.bgCard,
											cursor: "pointer",
											transition: "background 0.15s, border-color 0.15s",
											textAlign: "left",
										}}
									>
										<div
											style={{
												width: 20,
												height: 20,
												borderRadius: "50%",
												border: `1.5px solid ${on ? T.orange : T.borderStrong}`,
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												flexShrink: 0,
											}}
										>
											{on && (
												<div
													style={{
														width: 10,
														height: 10,
														borderRadius: "50%",
														background: T.orange,
													}}
												/>
											)}
										</div>
										<div>
											<div
												style={{
													fontFamily: "Georgia,serif",
													fontSize: 13,
													fontWeight: 700,
													color: on ? T.orange : T.text,
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
									</button>
								);
							})}
						</div>
					</RField>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr",
							gap: 14,
						}}
					>
						<RField label="Base price" hint="per session" id="reg-base-price">
							<RInput
								id="reg-base-price"
								value={d.basePrice}
								onChange={(e) => set("basePrice", e.target.value)}
								placeholder="320"
								suffix="€"
							/>
						</RField>
						<RField
							label="Max. vehicles"
							hint="per session"
							id="reg-max-vehicles"
						>
							<RInput
								id="reg-max-vehicles"
								value={d.maxVehicles}
								onChange={(e) => set("maxVehicles", e.target.value)}
								placeholder="15"
							/>
						</RField>
						<RField label="Noise limit" id="reg-noise-limit">
							<RInput
								id="reg-noise-limit"
								value={d.noiseLimit}
								onChange={(e) => set("noiseLimit", e.target.value)}
								placeholder="98"
								suffix="dB"
							/>
						</RField>
					</div>

					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
					>
						<RField label="Driver insurance" id="reg-insurance">
							<RSelect
								value={d.insurance}
								onChange={(e) => set("insurance", e.target.value)}
								options={INSURANCE_OPT}
							/>
						</RField>
						<RField label="Minimum driver age" id="reg-min-age">
							<RInput
								id="reg-min-age"
								value={d.minAge}
								onChange={(e) => set("minAge", e.target.value)}
								placeholder="18"
								suffix="yrs"
							/>
						</RField>
					</div>
				</>
			);

		// STEP 5 — Review
		const summaryRows = [
			{
				section: "ACCOUNT",
				items: [
					{ k: "Name", v: d.name || "—" },
					{ k: "Email", v: d.email || "—" },
					{ k: "Phone", v: d.phone || "—" },
				],
			},
			{
				section: "CIRCUIT",
				items: [
					{ k: "Name", v: d.circuitName || "—" },
					{ k: "Type", v: d.circuitType },
					{
						k: "Location",
						v: [d.city, d.country].filter(Boolean).join(", ") || "—",
					},
					{ k: "Address", v: d.address || "—" },
					{ k: "Length", v: d.length ? `${d.length} km` : "—" },
					{ k: "Turns", v: d.turns || "—" },
					{ k: "FIA grade", v: d.fiaGrade },
				],
			},
			{
				section: "OPERATIONS",
				items: [
					{ k: "Days", v: Array.from(d.days).join(", ") || "—" },
					{
						k: "Sessions",
						v:
							Array.from(d.sessionTypes)
								.map((s) => SESSION_TYPES.find((x) => x.id === s)?.label)
								.join(", ") || "—",
					},
					{
						k: "Base price",
						v: d.basePrice
							? `${new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(Number(d.basePrice))}/session`
							: "—",
					},
					{ k: "Max vehicles", v: d.maxVehicles || "—" },
					{ k: "Noise limit", v: `${d.noiseLimit} dB` },
					{ k: "Driver insurance", v: d.insurance },
					{ k: "Min. age", v: d.minAge ? `${d.minAge} yrs` : "—" },
				],
			},
			{
				section: `FACILITIES (${d.facilities.size})`,
				items: Array.from(d.facilities).map((id) => ({
					k: FACILITIES_LIST.find((f) => f.id === id)?.label || id,
					v: "✓",
				})),
			},
		];
		return (
			<>
				{summaryRows.map((sec) => (
					<div
						key={sec.section}
						style={{
							background: T.bgCard,
							border: `1px solid ${T.border}`,
							borderRadius: 14,
							overflow: "hidden",
							marginBottom: 14,
						}}
					>
						<div
							style={{
								padding: "12px 18px",
								background: T.bg,
								borderBottom: `1px solid ${T.border}`,
							}}
						>
							<span
								style={{
									fontFamily: "monospace",
									fontSize: 9,
									color: T.textLight,
									letterSpacing: 2,
								}}
							>
								{sec.section}
							</span>
						</div>
						<div>
							{sec.items.map((r, i) => (
								<div
									key={i}
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										padding: "10px 18px",
										borderBottom:
											i < sec.items.length - 1
												? `1px solid ${T.border}`
												: "none",
									}}
								>
									<span
										style={{
											fontFamily: "monospace",
											fontSize: 9,
											color: T.textLight,
											letterSpacing: 1,
										}}
									>
										{r.k.toUpperCase()}
									</span>
									<span
										style={{
											fontFamily: "Georgia,serif",
											fontSize: 13,
											color: T.text,
											maxWidth: "60%",
											textAlign: "right",
										}}
									>
										{r.v}
									</span>
								</div>
							))}
						</div>
					</div>
				))}
				<div
					style={{
						background: T.blueLight,
						border: `1px solid ${T.blue}33`,
						borderRadius: 10,
						padding: "14px 16px",
						display: "flex",
						gap: 10,
						alignItems: "flex-start",
					}}
				>
					<Icon name="shield" size={15} color={T.blue} />
					<div
						style={{
							fontFamily: "monospace",
							fontSize: 9,
							color: T.blue,
							letterSpacing: 0.5,
							lineHeight: 1.7,
						}}
					>
						ON SUBMISSION, OUR TEAM WILL REVIEW YOUR REQUEST WITHIN 2–3 BUSINESS
						DAYS. YOU WILL RECEIVE A CONFIRMATION EMAIL AND GAIN FULL DASHBOARD
						ACCESS ONCE APPROVED.
					</div>
				</div>
			</>
		);
	};

	const curStep = REG_STEPS[step - 1];
	const progress = Math.round((step / REG_STEPS.length) * 100);

	// ── Register UI wrapper ───────────────────────────────────────────────────
	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#E8E4DF",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "24px",
				fontFamily: "Georgia,serif",
			}}
		>
			<style>{`*{box-sizing:border-box;margin:0;padding:0;} @keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} button:hover{opacity:0.85;} select option{background:white;color:#0E0E0E;} ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#D0C8BF;border-radius:2px;} input::placeholder{color:#A8A39D;} @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important;}}`}</style>

			{/* Browser chrome */}
			<div
				style={{
					width: "100%",
					maxWidth: 960,
					background: T.bgCard,
					borderRadius: 20,
					overflow: "hidden",
					boxShadow:
						"0 40px 120px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
					animation: "fadeIn 0.4s ease",
				}}
			>
				{/* Browser bar */}
				<div
					style={{
						background: "#F0EDE8",
						padding: "10px 16px",
						display: "flex",
						alignItems: "center",
						gap: 12,
						borderBottom: `1px solid ${T.border}`,
					}}
				>
					<div style={{ display: "flex", gap: 6 }}>
						{["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
							<div
								key={c}
								style={{
									width: 12,
									height: 12,
									borderRadius: "50%",
									background: c,
								}}
							/>
						))}
					</div>
					<div
						style={{
							flex: 1,
							background: T.bgCard,
							borderRadius: 6,
							padding: "5px 12px",
							display: "flex",
							alignItems: "center",
							gap: 8,
							border: `1px solid ${T.border}`,
						}}
					>
						<Icon name="lock" size={10} color={T.textLight} />
						<span
							style={{
								fontFamily: "monospace",
								fontSize: 10,
								color: T.textMid,
							}}
						>
							app.trackswap.io/owner/register
						</span>
					</div>
					<div
						style={{
							fontFamily: "monospace",
							fontSize: 9,
							color: T.textLight,
							letterSpacing: 2,
						}}
					>
						OWNER REGISTRATION · PITCH DEMO
					</div>
				</div>

				{/* Content */}
				<div style={{ display: "flex", minHeight: 660 }}>
					{/* ── Left panel — stepper ── */}
					<div
						style={{
							width: 260,
							background: T.bgDark,
							flexShrink: 0,
							padding: "32px 24px",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 10,
								marginBottom: 38,
							}}
						>
							<div
								style={{
									width: 32,
									height: 32,
									background: T.orange,
									borderRadius: 8,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontFamily: "Georgia,serif",
									fontSize: 14,
									fontWeight: 900,
									color: "white",
									flexShrink: 0,
								}}
							>
								T
							</div>
							<div>
								<div
									style={{
										fontFamily: "Georgia,serif",
										fontSize: 15,
										fontWeight: 700,
										color: "white",
									}}
								>
									Track<span style={{ color: T.orange }}>Swap</span>
								</div>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 8,
										color: "#888",
										letterSpacing: 2,
									}}
								>
									OWNER PORTAL
								</div>
							</div>
						</div>

						{/* Steps list */}
						<div
							style={{
								flex: 1,
								display: "flex",
								flexDirection: "column",
								gap: 2,
							}}
						>
							{REG_STEPS.map((s) => {
								const isDone = step > s.n;
								const isCurrent = step === s.n;
								return (
									<div
										key={s.n}
										style={{
											display: "flex",
											gap: 14,
											alignItems: "flex-start",
											padding: "11px 0",
											opacity: step < s.n ? 0.3 : 1,
											transition: "opacity 0.25s",
										}}
									>
										{/* Circle */}
										<div
											style={{
												width: 28,
												height: 28,
												borderRadius: "50%",
												background: isDone
													? T.green
													: isCurrent
														? T.orange
														: "#1e1e1e",
												border: `2px solid ${isDone ? T.green : isCurrent ? T.orange : "#2a2a2a"}`,
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												flexShrink: 0,
												marginTop: 1,
												transition: "background 0.25s, border-color 0.25s",
											}}
										>
											{isDone ? (
												<Icon name="check" size={13} color="white" />
											) : (
												<span
													style={{
														fontFamily: "monospace",
														fontSize: 10,
														color: isCurrent ? "white" : "#888",
														fontWeight: 700,
													}}
												>
													{s.n}
												</span>
											)}
										</div>
										<div>
											<div
												style={{
													fontFamily: "Georgia,serif",
													fontSize: 13,
													fontWeight: 700,
													color: isCurrent ? "white" : isDone ? "#aaa" : "#888",
													transition: "color 0.25s",
												}}
											>
												{s.title}
											</div>
											{isCurrent && (
												<div
													style={{
														fontFamily: "monospace",
														fontSize: 8,
														color: "#888",
														letterSpacing: 0.5,
														marginTop: 4,
														lineHeight: 1.55,
														maxWidth: 160,
													}}
												>
													{s.desc}
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>

						{/* Help */}
						<div
							style={{
								borderTop: "1px solid #1e1e1e",
								paddingTop: 18,
								marginTop: 8,
							}}
						>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 8,
									color: "#888",
									letterSpacing: 1,
									marginBottom: 5,
								}}
							>
								NEED HELP?
							</div>
							<div
								style={{
									fontFamily: "Georgia,serif",
									fontSize: 12,
									color: "#888",
								}}
							>
								soporte@trackswap.io
							</div>
						</div>
					</div>

					{/* ── Right panel — form ── */}
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							minWidth: 0,
						}}
					>
						{/* Progress bar */}
						<div style={{ height: 3, background: T.border }}>
							<div
								style={{
									height: "100%",
									background: T.orange,
									width: "100%",
									transform: `scaleX(${progress / 100})`,
									transformOrigin: "left",
									transition: "transform 0.4s ease",
								}}
							/>
						</div>

						{/* Header */}
						<div
							style={{
								padding: "28px 36px 20px",
								borderBottom: `1px solid ${T.border}`,
								flexShrink: 0,
							}}
						>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 9,
									color: T.textLight,
									letterSpacing: 3,
									marginBottom: 6,
								}}
							>
								STEP {step} OF {REG_STEPS.length}
							</div>
							<h2
								style={{
									fontFamily: "Georgia,serif",
									fontSize: 22,
									fontWeight: 700,
									color: T.text,
									margin: 0,
								}}
							>
								{curStep.title}
							</h2>
						</div>

						{/* Form content */}
						<div
							key={step}
							style={{
								flex: 1,
								overflowY: "auto",
								padding: "26px 36px",
								animation: "fadeUp 0.3s ease",
							}}
						>
							{renderStep()}
						</div>

						{/* Footer */}
						<div
							style={{
								padding: "18px 36px",
								borderTop: `1px solid ${T.border}`,
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								background: T.bg,
								flexShrink: 0,
							}}
						>
							<div>
								{step > 1 && (
									<Btn label="← BACK" onClick={() => setStep((s) => s - 1)} />
								)}
							</div>
							<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
								<span
									style={{
										fontFamily: "monospace",
										fontSize: 9,
										color: T.textLight,
										letterSpacing: 1,
									}}
								>
									{step < REG_STEPS.length
										? `${REG_STEPS.length - step} STEP${REG_STEPS.length - step !== 1 ? "S" : ""} LEFT`
										: "LAST STEP"}
								</span>
								{step < REG_STEPS.length ? (
									<Btn
										label="NEXT →"
										primary
										onClick={() => setStep((s) => s + 1)}
									/>
								) : (
									<Btn
										label="SUBMIT REQUEST →"
										primary
										onClick={handleSubmit}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
	const [registered, setRegistered] = useState(false);
	const [active, setActive] = useState("overview");
	const [collapsed, setCollapsed] = useState(false);

	if (!registered)
		return <RegisterFlow onComplete={() => setRegistered(true)} />;

	const screens = {
		overview: <OverviewScreen setActive={setActive} />,
		calendar: <CalendarScreen />,
		bookings: <BookingsScreen />,
		analytics: <AnalyticsScreen />,
		noise: <NoiseScreen />,
		pricing: <PricingScreen />,
		settings: <SettingsScreen />,
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#E8E4DF",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "24px",
				fontFamily: "Georgia, serif",
			}}
		>
			<style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D0C8BF; border-radius: 2px; }
        button:hover { opacity: 0.85; }
        input[type=range] { accent-color: #E84A00; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

			{/* Browser chrome */}
			<div
				style={{
					width: "100%",
					maxWidth: 1280,
					background: T.bgCard,
					borderRadius: 16,
					overflow: "hidden",
					boxShadow: "0 40px 120px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)",
				}}
			>
				{/* Browser bar */}
				<div
					style={{
						background: "#F0EDE8",
						padding: "10px 16px",
						display: "flex",
						alignItems: "center",
						gap: 12,
						borderBottom: `1px solid ${T.border}`,
					}}
				>
					<div style={{ display: "flex", gap: 6 }}>
						<div
							style={{
								width: 12,
								height: 12,
								borderRadius: "50%",
								background: "#FF5F57",
							}}
						/>
						<div
							style={{
								width: 12,
								height: 12,
								borderRadius: "50%",
								background: "#FFBD2E",
							}}
						/>
						<div
							style={{
								width: 12,
								height: 12,
								borderRadius: "50%",
								background: "#28CA41",
							}}
						/>
					</div>
					<div
						style={{
							flex: 1,
							background: T.bgCard,
							borderRadius: 6,
							padding: "5px 12px",
							display: "flex",
							alignItems: "center",
							gap: 8,
							border: `1px solid ${T.border}`,
						}}
					>
						<Icon name="lock" size={10} color={T.textLight} />
						<span
							style={{
								fontFamily: "monospace",
								fontSize: 10,
								color: T.textMid,
							}}
						>
							app.trackswap.io/owner/dashboard
						</span>
					</div>
					<div
						style={{
							fontFamily: "monospace",
							fontSize: 9,
							color: T.textLight,
							letterSpacing: 2,
						}}
					>
						OWNER DASHBOARD · PITCH DEMO
					</div>
				</div>

				{/* App */}
				<div
					style={{
						display: "flex",
						height: 750,
						overflow: "hidden",
						colorScheme: "dark",
					}}
				>
					<Sidebar
						active={active}
						setActive={setActive}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
					<div
						style={{
							flex: 1,
							overflowY: "auto",
							padding: "28px 32px",
							background: T.bg,
						}}
					>
						{screens[active]}
					</div>
				</div>
			</div>
		</div>
	);
}
