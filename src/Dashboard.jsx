import { useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
	bg: "#F7F5F2",
	bgCard: "#FFFFFF",
	bgDark: "#0E0E0E",
	border: "#E8E4DF",
	borderStrong: "#D0C8BF",
	text: "#0E0E0E",
	textMid: "#6B6560",
	textLight: "#A8A39D",
	orange: "#E84A00",
	orangeLight: "#FFF0EA",
	orangeMid: "#FF6B2B",
	green: "#1A7A4A",
	greenLight: "#EAF5EE",
	red: "#C0392B",
	redLight: "#FDECEA",
	yellow: "#D4820A",
	yellowLight: "#FEF6E4",
	blue: "#1A4D8F",
	blueLight: "#EAF0FA",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const generateSlots = () => {
	const slots = {};
	for (let d = 1; d <= 31; d++) {
		const daySlots = [];
		["08:00", "10:00", "13:00", "15:00", "17:00"].forEach((time) => {
			const rand = Math.random();
			const status =
				rand < 0.35
					? "booked"
					: rand < 0.55
						? "reserved"
						: rand < 0.65
							? "blocked"
							: "open";
			const price = [275, 295, 320, 340, 360][Math.floor(Math.random() * 5)];
			daySlots.push({
				time,
				status,
				price,
				driver:
					status === "booked"
						? ["Alex M.", "Carlos R.", "Sergio P.", "Laura T.", "Marco V."][
								Math.floor(Math.random() * 5)
							]
						: null,
			});
		});
		slots[d] = daySlots;
	}
	return slots;
};

const SLOTS = generateSlots();

const BOOKINGS = [
	{
		id: "TS-2847",
		driver: "Alex Martín",
		vehicle: "BMW M3 GT",
		date: "Sat 1 Mar",
		time: "09:00",
		duration: "2h",
		price: 320,
		insurance: true,
		status: "confirmed",
		avatar: "AM",
	},
	{
		id: "TS-2846",
		driver: "Carlos Ruiz",
		vehicle: "Porsche 911 GT3",
		date: "Sat 1 Mar",
		time: "13:00",
		duration: "2h",
		price: 320,
		insurance: true,
		status: "confirmed",
		avatar: "CR",
	},
	{
		id: "TS-2845",
		driver: "Sergio Pérez Jr.",
		vehicle: "Audi R8",
		date: "Sun 2 Mar",
		time: "10:00",
		duration: "2h",
		price: 295,
		insurance: false,
		status: "pending",
		avatar: "SP",
	},
	{
		id: "TS-2844",
		driver: "Laura Torres",
		vehicle: "Ferrari 488",
		date: "Sun 2 Mar",
		time: "15:00",
		duration: "2h",
		price: 340,
		insurance: true,
		status: "confirmed",
		avatar: "LT",
	},
	{
		id: "TS-2843",
		driver: "Marco Vitale",
		vehicle: "Lamborghini Huracán",
		date: "Mon 3 Mar",
		time: "09:00",
		duration: "3h",
		price: 480,
		insurance: true,
		status: "confirmed",
		avatar: "MV",
	},
	{
		id: "TS-2842",
		driver: "Sophie Laurent",
		vehicle: "McLaren 720S",
		date: "Mon 3 Mar",
		time: "13:00",
		duration: "2h",
		price: 320,
		insurance: true,
		status: "cancelled",
		avatar: "SL",
	},
];

const NOISE_DATA = [
	62, 65, 68, 71, 74, 78, 82, 85, 88, 86, 83, 79, 84, 89, 91, 88, 85, 82, 79,
	75, 72, 68, 65, 62,
];
const REVENUE_DATA = [
	{ month: "Sep", v: 4200 },
	{ month: "Oct", v: 5800 },
	{ month: "Nov", v: 4900 },
	{ month: "Dec", v: 3200 },
	{ month: "Jan", v: 6100 },
	{ month: "Feb", v: 7400 },
];
const UTIL_DATA = [
	{ day: "Mon", v: 40 },
	{ day: "Tue", v: 55 },
	{ day: "Wed", v: 35 },
	{ day: "Thu", v: 65 },
	{ day: "Fri", v: 75 },
	{ day: "Sat", v: 92 },
	{ day: "Sun", v: 88 },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor", style = {} }) => {
	const p = {
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: color,
		strokeWidth: "1.8",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		style,
	};
	const icons = {
		grid: (
			<svg {...p}>
				<path d="M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zM3 14h7v7H3z" />
			</svg>
		),
		calendar: (
			<svg {...p}>
				<rect x="3" y="4" width="18" height="18" rx="2" />
				<line x1="3" y1="9" x2="21" y2="9" />
				<line x1="8" y1="2" x2="8" y2="6" />
				<line x1="16" y1="2" x2="16" y2="6" />
			</svg>
		),
		ticket: (
			<svg {...p}>
				<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
			</svg>
		),
		chart: (
			<svg {...p}>
				<path d="M18 20V10m-6 10V4M6 20v-6" />
			</svg>
		),
		volume: (
			<svg {...p}>
				<path d="M11 5 6 9H2v6h4l5 4zm8.07-.07a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
			</svg>
		),
		settings: (
			<svg {...p}>
				<circle cx="12" cy="12" r="3" />
				<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.9 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.9.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1" />
			</svg>
		),
		bell: (
			<svg {...p}>
				<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
				<path d="M13.73 21a2 2 0 0 1-3.46 0" />
			</svg>
		),
		chevron_left: (
			<svg {...p}>
				<polyline points="15 18 9 12 15 6" />
			</svg>
		),
		chevron_right: (
			<svg {...p}>
				<polyline points="9 18 15 12 9 6" />
			</svg>
		),
		plus: (
			<svg {...p}>
				<line x1="12" y1="5" x2="12" y2="19" />
				<line x1="5" y1="12" x2="19" y2="12" />
			</svg>
		),
		check: (
			<svg {...p}>
				<polyline points="20 6 9 17 4 12" />
			</svg>
		),
		x: (
			<svg {...p}>
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		),
		trending_up: (
			<svg {...p}>
				<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
				<polyline points="17 6 23 6 23 12" />
			</svg>
		),
		shield: (
			<svg {...p}>
				<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
			</svg>
		),
		zap: (
			<svg {...p} fill={color}>
				<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
			</svg>
		),
		star: (
			<svg {...p} fill={color}>
				<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
			</svg>
		),
		map: (
			<svg {...p}>
				<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
				<line x1="9" y1="3" x2="9" y2="18" />
				<line x1="15" y1="6" x2="15" y2="21" />
			</svg>
		),
		lock: (
			<svg {...p}>
				<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
				<path d="M7 11V7a5 5 0 0 1 10 0v4" />
			</svg>
		),
		eye: (
			<svg {...p}>
				<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
				<circle cx="12" cy="12" r="3" />
			</svg>
		),
		user: (
			<svg {...p}>
				<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
				<circle cx="12" cy="7" r="4" />
			</svg>
		),
		tag: (
			<svg {...p}>
				<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
				<line x1="7" y1="7" x2="7.01" y2="7" />
			</svg>
		),
		download: (
			<svg {...p}>
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
				<polyline points="7 10 12 15 17 10" />
				<line x1="12" y1="15" x2="12" y2="3" />
			</svg>
		),
		refresh: (
			<svg {...p}>
				<polyline points="23 4 23 10 17 10" />
				<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
			</svg>
		),
		menu: (
			<svg {...p}>
				<line x1="3" y1="12" x2="21" y2="12" />
				<line x1="3" y1="6" x2="21" y2="6" />
				<line x1="3" y1="18" x2="21" y2="18" />
			</svg>
		),
		mail: (
			<svg {...p}>
				<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
				<polyline points="22,6 12,13 2,6" />
			</svg>
		),
		phone: (
			<svg {...p}>
				<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
			</svg>
		),
		eye_off: (
			<svg {...p}>
				<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
				<line x1="1" y1="1" x2="23" y2="23" />
			</svg>
		),
		check_circle: (
			<svg {...p}>
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
				<polyline points="22 4 12 14.01 9 11.01" />
			</svg>
		),
		map_pin: (
			<svg {...p}>
				<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
				<circle cx="12" cy="10" r="3" />
			</svg>
		),
		ruler: (
			<svg {...p}>
				<path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4z" />
				<path d="m7.5 10.5 2 2" />
				<path d="m10.5 7.5 2 2" />
				<path d="m13.5 4.5 2 2" />
				<path d="m4.5 13.5 2 2" />
			</svg>
		),
		building: (
			<svg {...p}>
				<rect x="4" y="2" width="16" height="20" rx="2" />
				<path d="M9 22v-4h6v4" />
				<path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
			</svg>
		),
	};
	return icons[name] || null;
};

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────
const Badge = ({ status }) => {
	const map = {
		confirmed: { bg: T.greenLight, color: T.green, label: "Confirmed" },
		pending: { bg: T.yellowLight, color: T.yellow, label: "Pending" },
		cancelled: { bg: T.redLight, color: T.red, label: "Cancelled" },
		open: { bg: T.blueLight, color: T.blue, label: "Open" },
		booked: { bg: T.greenLight, color: T.green, label: "Booked" },
		reserved: { bg: T.yellowLight, color: T.yellow, label: "Reserved" },
		blocked: { bg: "#F0EDE8", color: T.textMid, label: "Blocked" },
	};
	const s = map[status] || map.open;
	return (
		<span
			style={{
				background: s.bg,
				color: s.color,
				fontFamily: "monospace",
				fontSize: 10,
				letterSpacing: 1,
				padding: "3px 8px",
				borderRadius: 4,
				fontWeight: 600,
			}}
		>
			{s.label.toUpperCase()}
		</span>
	);
};

const StatCard = ({ label, value, sub, icon, accent, delta, delay = 0 }) => (
	<div
		style={{
			background: T.bgCard,
			borderRadius: 16,
			padding: "22px 24px",
			border: `1px solid ${T.border}`,
			animation: `fadeUp 0.5s ${delay}s ease both`,
			position: "relative",
			overflow: "hidden",
		}}
	>
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: 3,
				height: "100%",
				background: accent,
				borderRadius: "4px 0 0 4px",
			}}
		/>
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "flex-start",
				marginBottom: 12,
			}}
		>
			<div
				style={{
					fontFamily: "monospace",
					fontSize: 10,
					color: T.textLight,
					letterSpacing: 2,
				}}
			>
				{label.toUpperCase()}
			</div>
			<div
				style={{
					width: 32,
					height: 32,
					borderRadius: 8,
					background: `${accent}15`,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Icon name={icon} size={15} color={accent} />
			</div>
		</div>
		<div
			style={{
				fontFamily: "'Georgia', serif",
				fontSize: 30,
				fontWeight: 700,
				color: T.text,
				lineHeight: 1,
				marginBottom: 6,
			}}
		>
			{value}
		</div>
		<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
			{delta && (
				<span
					style={{
						fontFamily: "monospace",
						fontSize: 10,
						color: delta > 0 ? T.green : T.red,
					}}
				>
					{delta > 0 ? "↑" : "↓"} {Math.abs(delta)}%
				</span>
			)}
			<span
				style={{ fontFamily: "monospace", fontSize: 10, color: T.textLight }}
			>
				{sub}
			</span>
		</div>
	</div>
);

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
const Sidebar = ({ active, setActive, collapsed, setCollapsed }) => {
	const nav = [
		{ id: "overview", icon: "grid", label: "Overview" },
		{ id: "calendar", icon: "calendar", label: "Calendar" },
		{ id: "bookings", icon: "ticket", label: "Bookings" },
		{ id: "analytics", icon: "chart", label: "Analytics" },
		{ id: "noise", icon: "volume", label: "Noise Monitor" },
		{ id: "pricing", icon: "tag", label: "Dynamic Pricing" },
		{ id: "settings", icon: "settings", label: "Settings" },
	];

	return (
		<div
			style={{
				width: collapsed ? 64 : 220,
				flexShrink: 0,
				background: T.bgDark,
				display: "flex",
				flexDirection: "column",
				transition: "width 0.25s ease",
				overflow: "hidden",
				position: "relative",
			}}
		>
			{/* Logo */}
			<div
				style={{
					padding: collapsed ? "28px 0 24px" : "28px 24px 24px",
					display: "flex",
					alignItems: "center",
					gap: 12,
					borderBottom: "1px solid #1e1e1e",
				}}
			>
				{collapsed ? (
					<div style={{ width: 64, display: "flex", justifyContent: "center" }}>
						<div
							style={{
								width: 32,
								height: 32,
								background: T.orange,
								borderRadius: 8,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontFamily: "Georgia, serif",
								fontSize: 14,
								fontWeight: 900,
								color: "white",
								flexShrink: 0,
							}}
						>
							T
						</div>
					</div>
				) : (
					<>
						<div
							style={{
								width: 32,
								height: 32,
								background: T.orange,
								borderRadius: 8,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontFamily: "Georgia, serif",
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
									fontFamily: "Georgia, serif",
									fontSize: 15,
									fontWeight: 700,
									color: "white",
									whiteSpace: "nowrap",
								}}
							>
								Track<span style={{ color: T.orange }}>Swap</span>
							</div>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 9,
									color: "#888",
									letterSpacing: 2,
								}}
							>
								OWNER PORTAL
							</div>
						</div>
					</>
				)}
			</div>

			{/* Venue selector */}
			{!collapsed && (
				<div
					style={{ padding: "14px 16px", borderBottom: "1px solid #1e1e1e" }}
				>
					<div
						style={{
							background: "#1a1a1a",
							borderRadius: 10,
							padding: "10px 12px",
							cursor: "pointer",
						}}
					>
						<div
							style={{
								fontFamily: "monospace",
								fontSize: 8,
								color: "#888",
								letterSpacing: 2,
								marginBottom: 3,
							}}
						>
							ACTIVE VENUE
						</div>
						<div
							style={{
								fontFamily: "Georgia, serif",
								fontSize: 13,
								fontWeight: 700,
								color: "white",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							Circuito de Jerez
						</div>
					</div>
				</div>
			)}

			{/* Nav */}
			<nav
				style={{
					flex: 1,
					padding: collapsed ? "12px 0" : "12px 10px",
					display: "flex",
					flexDirection: "column",
					gap: 2,
				}}
			>
				{nav.map((item) => (
					<button
						type="button"
						key={item.id}
						onClick={() => setActive(item.id)}
						aria-label={item.label}
						aria-current={active === item.id ? "page" : undefined}
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
							padding: collapsed ? "11px 0" : "11px 14px",
							borderRadius: collapsed ? 0 : 10,
							border: "none",
							cursor: "pointer",
							background:
								active === item.id
									? collapsed
										? "transparent"
										: "#1e1e1e"
									: "transparent",
							color: active === item.id ? T.orange : "#888",
							transition: "background 0.15s, color 0.15s",
							justifyContent: collapsed ? "center" : "flex-start",
							position: "relative",
							width: "100%",
						}}
					>
						{active === item.id && collapsed && (
							<div
								style={{
									position: "absolute",
									left: 0,
									top: "50%",
									transform: "translateY(-50%)",
									width: 3,
									height: 20,
									background: T.orange,
									borderRadius: "0 2px 2px 0",
								}}
							/>
						)}
						<Icon
							name={item.icon}
							size={17}
							color={active === item.id ? T.orange : "#888"}
						/>
						{!collapsed && (
							<span
								style={{
									fontFamily: "monospace",
									fontSize: 11,
									letterSpacing: 1,
									whiteSpace: "nowrap",
								}}
							>
								{item.label.toUpperCase()}
							</span>
						)}
					</button>
				))}
			</nav>

			{/* User */}
			<div
				style={{
					padding: collapsed ? "14px 0" : "14px 16px",
					borderTop: "1px solid #1e1e1e",
					display: "flex",
					alignItems: "center",
					gap: 10,
					justifyContent: collapsed ? "center" : "flex-start",
				}}
			>
				<div
					style={{
						width: 32,
						height: 32,
						borderRadius: "50%",
						background: `linear-gradient(135deg, ${T.orange}, #FF8C00)`,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontFamily: "monospace",
						fontSize: 11,
						color: "white",
						fontWeight: 700,
						flexShrink: 0,
					}}
				>
					JM
				</div>
				{!collapsed && (
					<div style={{ minWidth: 0 }}>
						<div
							style={{
								fontFamily: "Georgia, serif",
								fontSize: 12,
								fontWeight: 700,
								color: "white",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							José Moreno
						</div>
						<div
							style={{ fontFamily: "monospace", fontSize: 9, color: "#888" }}
						>
							Venue Owner
						</div>
					</div>
				)}
			</div>

			{/* Collapse toggle */}
			<button
				onClick={() => setCollapsed(!collapsed)}
				aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
				style={{
					position: "absolute",
					top: "50%",
					right: -22,
					transform: "translateY(-50%)",
					width: 44,
					height: 44,
					borderRadius: "50%",
					background: "transparent",
					border: "none",
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					zIndex: 10,
				}}
			>
				<div
					style={{
						width: 24,
						height: 24,
						borderRadius: "50%",
						background: T.bgDark,
						border: "1px solid #333",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Icon
						name={collapsed ? "chevron_right" : "chevron_left"}
						size={12}
						color="#888"
					/>
				</div>
			</button>
		</div>
	);
};

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
const TopBar = ({ title, subtitle, actions }) => (
	<div
		style={{
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 28,
			flexWrap: "wrap",
			gap: 12,
		}}
	>
		<div>
			<div
				style={{
					fontFamily: "monospace",
					fontSize: 10,
					color: T.textLight,
					letterSpacing: 3,
					marginBottom: 4,
				}}
			>
				{subtitle}
			</div>
			<h1
				style={{
					fontFamily: "'Georgia', serif",
					fontSize: 26,
					fontWeight: 700,
					color: T.text,
					margin: 0,
				}}
			>
				{title}
			</h1>
		</div>
		{actions && <div style={{ display: "flex", gap: 10 }}>{actions}</div>}
	</div>
);

const Btn = ({ label, icon, primary, onClick, small }) => (
	<button
		onClick={onClick}
		style={{
			display: "flex",
			alignItems: "center",
			gap: 7,
			padding: small ? "8px 14px" : "10px 18px",
			borderRadius: 10,
			border: primary ? "none" : `1px solid ${T.borderStrong}`,
			background: primary ? T.orange : T.bgCard,
			color: primary ? "white" : T.text,
			fontFamily: "monospace",
			fontSize: 10,
			letterSpacing: 1,
			cursor: "pointer",
			fontWeight: 600,
			transition: "background 0.15s, box-shadow 0.15s, border-color 0.15s",
			whiteSpace: "nowrap",
		}}
	>
		{icon && (
			<Icon name={icon} size={13} color={primary ? "white" : T.textMid} />
		)}
		{label}
	</button>
);

// ─── OVERVIEW SCREEN ──────────────────────────────────────────────────────────
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

// ─── CALENDAR SCREEN ──────────────────────────────────────────────────────────
const CalendarScreen = () => {
	const [selectedDay, setSelectedDay] = useState(1);
	const [currentMonth, setCurrentMonth] = useState(2);
	const daySlots = SLOTS[selectedDay] || [];

	return (
		<div style={{ animation: "fadeIn 0.3s ease" }}>
			<TopBar
				title="Availability Calendar"
				subtitle="SLOT MANAGEMENT"
				actions={
					<>
						<Btn label="BULK EDIT" icon="refresh" />
						<Btn label="ADD SLOTS" icon="plus" primary />
					</>
				}
			/>

			<div
				style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}
			>
				{/* Calendar */}
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
							alignItems: "center",
							marginBottom: 20,
						}}
					>
						<button
							onClick={() => setCurrentMonth((m) => Math.max(0, m - 1))}
							style={{
								background: "none",
								border: `1px solid ${T.border}`,
								borderRadius: 8,
								width: 32,
								height: 32,
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Icon name="chevron_left" size={15} color={T.textMid} />
						</button>
						<div
							style={{
								fontFamily: "Georgia, serif",
								fontSize: 20,
								fontWeight: 700,
								color: T.text,
							}}
						>
							{MONTHS[currentMonth]} 2026
						</div>
						<button
							onClick={() => setCurrentMonth((m) => Math.min(11, m + 1))}
							style={{
								background: "none",
								border: `1px solid ${T.border}`,
								borderRadius: 8,
								width: 32,
								height: 32,
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Icon name="chevron_right" size={15} color={T.textMid} />
						</button>
					</div>

					{/* Legend */}
					<div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
						{[
							{ color: T.green, label: "Booked" },
							{ color: T.yellow, label: "Reserved" },
							{ color: T.borderStrong, label: "Blocked" },
							{ color: T.blue, label: "Open" },
						].map((l) => (
							<div
								key={l.label}
								style={{ display: "flex", alignItems: "center", gap: 5 }}
							>
								<div
									style={{
										width: 10,
										height: 10,
										borderRadius: 3,
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

					{/* Day headers */}
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(7, 1fr)",
							gap: 6,
							marginBottom: 6,
						}}
					>
						{DAYS.map((d) => (
							<div
								key={d}
								style={{
									fontFamily: "monospace",
									fontSize: 9,
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
					</div>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(7, 1fr)",
							gap: 6,
						}}
					>
						{[...Array(31)].map((_, i) => {
							const d = i + 1;
							const slots = SLOTS[d];
							const booked = slots.filter((s) => s.status === "booked").length;
							const total = slots.length;
							const hasReserved = slots.some((s) => s.status === "reserved");
							const allBlocked = slots.every((s) => s.status === "blocked");
							const isSelected = d === selectedDay;

							const bgColor = allBlocked
								? "#F0EDE8"
								: booked === total
									? T.greenLight
									: booked > 0
										? `${T.greenLight}`
										: hasReserved
											? T.yellowLight
											: T.blueLight;
							const textColor = allBlocked
								? T.textMid
								: booked >= 3
									? T.green
									: booked > 0
										? T.green
										: hasReserved
											? T.yellow
											: T.blue;

							return (
								<div
									key={d}
									onClick={() => setSelectedDay(d)}
									role="button"
									tabIndex={0}
									onKeyDown={(e) => e.key === "Enter" && setSelectedDay(d)}
									aria-label={`Day ${d}, ${booked} booked`}
									aria-pressed={isSelected}
									style={{
										borderRadius: 10,
										border: isSelected
											? `2px solid ${T.orange}`
											: `1px solid ${T.border}`,
										background: isSelected ? T.orangeLight : bgColor,
										cursor: "pointer",
										padding: "8px 6px",
										transition:
											"background 0.15s, border-color 0.15s, transform 0.15s",
										position: "relative",
									}}
									onMouseEnter={(e) => {
										if (!isSelected)
											e.currentTarget.style.transform = "scale(1.04)";
									}}
									onMouseLeave={(e) =>
										(e.currentTarget.style.transform = "scale(1)")
									}
								>
									<div
										style={{
											fontFamily: "monospace",
											fontSize: 12,
											fontWeight: 700,
											color: isSelected ? T.orange : textColor,
											textAlign: "center",
											marginBottom: 4,
										}}
									>
										{d}
									</div>
									<div
										style={{
											display: "flex",
											gap: 2,
											justifyContent: "center",
											flexWrap: "wrap",
										}}
									>
										{slots.map((s, j) => (
											<div
												key={j}
												style={{
													width: 5,
													height: 5,
													borderRadius: 1,
													background:
														s.status === "booked"
															? T.green
															: s.status === "reserved"
																? T.yellow
																: s.status === "blocked"
																	? T.borderStrong
																	: T.blue,
												}}
											/>
										))}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Day detail */}
				<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
					<div
						style={{
							background: T.bgCard,
							borderRadius: 16,
							padding: "22px 22px",
							border: `1px solid ${T.border}`,
						}}
					>
						<div
							style={{
								fontFamily: "monospace",
								fontSize: 9,
								color: T.textLight,
								letterSpacing: 2,
								marginBottom: 4,
							}}
						>
							SELECTED DAY
						</div>
						<div
							style={{
								fontFamily: "Georgia, serif",
								fontSize: 22,
								fontWeight: 700,
								color: T.text,
								marginBottom: 18,
							}}
						>
							{new Intl.DateTimeFormat("en-GB", {
								day: "numeric",
								month: "long",
								year: "numeric",
							}).format(new Date(2026, 2, selectedDay))}
						</div>
						<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
							{daySlots.map((slot, i) => (
								<div
									key={i}
									style={{
										background: T.bg,
										borderRadius: 12,
										padding: "14px 16px",
										border: `1px solid ${T.border}`,
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<div>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: 8,
												marginBottom: 4,
											}}
										>
											<Icon name="clock" size={13} color={T.textMid} />
											<span
												style={{
													fontFamily: "monospace",
													fontSize: 12,
													fontWeight: 700,
													color: T.text,
												}}
											>
												{slot.time}
											</span>
										</div>
										{slot.driver ? (
											<div
												style={{
													fontFamily: "Georgia, serif",
													fontSize: 11,
													color: T.textMid,
												}}
											>
												{slot.driver}
											</div>
										) : (
											<div
												style={{
													fontFamily: "monospace",
													fontSize: 9,
													color: T.textLight,
													letterSpacing: 1,
												}}
											>
												NO DRIVER ASSIGNED
											</div>
										)}
									</div>
									<div style={{ textAlign: "right" }}>
										<Badge status={slot.status} />
										<div
											style={{
												fontFamily: "Georgia, serif",
												fontSize: 13,
												fontWeight: 700,
												color: T.orange,
												marginTop: 4,
											}}
										>
											€{slot.price}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div
						style={{
							background: T.bgCard,
							borderRadius: 14,
							padding: "16px 18px",
							border: `1px solid ${T.border}`,
						}}
					>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: 12,
							}}
						>
							{[
								{
									label: "BOOKED",
									v: daySlots.filter((s) => s.status === "booked").length,
									color: T.green,
								},
								{
									label: "OPEN",
									v: daySlots.filter((s) => s.status === "open").length,
									color: T.blue,
								},
								{
									label: "RESERVED",
									v: daySlots.filter((s) => s.status === "reserved").length,
									color: T.yellow,
								},
								{
									label: "BLOCKED",
									v: daySlots.filter((s) => s.status === "blocked").length,
									color: T.textMid,
								},
							].map((s) => (
								<div
									key={s.label}
									style={{
										textAlign: "center",
										padding: "10px",
										background: T.bg,
										borderRadius: 10,
									}}
								>
									<div
										style={{
											fontFamily: "Georgia, serif",
											fontSize: 22,
											fontWeight: 700,
											color: s.color,
										}}
									>
										{s.v}
									</div>
									<div
										style={{
											fontFamily: "monospace",
											fontSize: 8,
											color: T.textLight,
											letterSpacing: 1,
										}}
									>
										{s.label}
									</div>
								</div>
							))}
						</div>
					</div>
					<Btn label="ADD SLOT FOR THIS DAY" icon="plus" primary />
					<Btn label="BLOCK ENTIRE DAY" icon="lock" />
				</div>
			</div>
		</div>
	);
};

// ─── BOOKINGS SCREEN ──────────────────────────────────────────────────────────
const BookingsScreen = () => {
	const [filter, setFilter] = useState("all");
	const filtered =
		filter === "all" ? BOOKINGS : BOOKINGS.filter((b) => b.status === filter);

	return (
		<div style={{ animation: "fadeIn 0.3s ease" }}>
			<TopBar
				title="Bookings Manager"
				subtitle="ALL RESERVATIONS"
				actions={
					<>
						<Btn label="EXPORT CSV" icon="download" />
						<Btn label="NEW BOOKING" icon="plus" primary />
					</>
				}
			/>

			{/* Filters */}
			<div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
				{["all", "confirmed", "pending", "cancelled"].map((f) => (
					<button
						key={f}
						onClick={() => setFilter(f)}
						style={{
							padding: "8px 16px",
							borderRadius: 8,
							border: `1px solid ${filter === f ? T.orange : T.border}`,
							background: filter === f ? T.orangeLight : T.bgCard,
							color: filter === f ? T.orange : T.textMid,
							fontFamily: "monospace",
							fontSize: 10,
							letterSpacing: 1,
							cursor: "pointer",
							transition: "background 0.15s, border-color 0.15s, color 0.15s",
						}}
					>
						{f.toUpperCase()}
					</button>
				))}
				<div
					style={{
						marginLeft: "auto",
						fontFamily: "monospace",
						fontSize: 10,
						color: T.textLight,
						display: "flex",
						alignItems: "center",
					}}
				>
					{filtered.length} RESULT{filtered.length !== 1 ? "S" : ""}
				</div>
			</div>

			{/* Table */}
			<div
				style={{
					background: T.bgCard,
					borderRadius: 16,
					border: `1px solid ${T.border}`,
					overflow: "hidden",
				}}
			>
				<table style={{ width: "100%", borderCollapse: "collapse" }}>
					<thead>
						<tr
							style={{
								background: T.bg,
								borderBottom: `1px solid ${T.border}`,
							}}
						>
							{[
								"ID",
								"Driver",
								"Vehicle",
								"Date & Time",
								"Price",
								"Insured",
								"Status",
							].map((h) => (
								<th
									key={h}
									scope="col"
									style={{
										fontFamily: "monospace",
										fontSize: 9,
										color: T.textLight,
										letterSpacing: 2,
										padding: "12px 20px",
										textAlign: "left",
										fontWeight: 600,
									}}
								>
									{h.toUpperCase()}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filtered.map((b, i) => (
							<tr
								key={b.id}
								style={{
									borderBottom:
										i < filtered.length - 1 ? `1px solid ${T.border}` : "none",
									transition: "background 0.1s",
								}}
								onMouseEnter={(e) => (e.currentTarget.style.background = T.bg)}
								onMouseLeave={(e) =>
									(e.currentTarget.style.background = "transparent")
								}
							>
								<td
									style={{
										padding: "16px 20px",
										fontFamily: "monospace",
										fontSize: 10,
										color: T.orange,
										verticalAlign: "middle",
									}}
								>
									{b.id}
								</td>
								<td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
									<div
										style={{ display: "flex", alignItems: "center", gap: 10 }}
									>
										<div
											aria-hidden="true"
											style={{
												width: 32,
												height: 32,
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
										<span
											style={{
												fontFamily: "Georgia, serif",
												fontSize: 13,
												fontWeight: 700,
												color: T.text,
											}}
										>
											{b.driver}
										</span>
									</div>
								</td>
								<td
									style={{
										padding: "16px 20px",
										fontFamily: "Georgia, serif",
										fontSize: 12,
										color: T.textMid,
										verticalAlign: "middle",
									}}
								>
									{b.vehicle}
								</td>
								<td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
									<div
										style={{
											fontFamily: "monospace",
											fontSize: 10,
											color: T.text,
										}}
									>
										{b.date}
									</div>
									<div
										style={{
											fontFamily: "monospace",
											fontSize: 9,
											color: T.textLight,
										}}
									>
										{b.time} · {b.duration}
									</div>
								</td>
								<td
									style={{
										padding: "16px 20px",
										fontFamily: "Georgia, serif",
										fontSize: 14,
										fontWeight: 700,
										color: T.orange,
										verticalAlign: "middle",
									}}
								>
									€{b.price}
								</td>
								<td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
									{b.insurance ? (
										<div
											style={{ display: "flex", alignItems: "center", gap: 4 }}
										>
											<Icon name="shield" size={12} color={T.green} />
											<span
												style={{
													fontFamily: "monospace",
													fontSize: 9,
													color: T.green,
													letterSpacing: 1,
												}}
											>
												YES
											</span>
										</div>
									) : (
										<span
											style={{
												fontFamily: "monospace",
												fontSize: 9,
												color: T.textLight,
												letterSpacing: 1,
											}}
										>
											—
										</span>
									)}
								</td>
								<td style={{ padding: "16px 20px", verticalAlign: "middle" }}>
									<Badge status={b.status} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

// ─── ANALYTICS SCREEN ─────────────────────────────────────────────────────────
const AnalyticsScreen = () => {
	const maxRevenue = Math.max(...REVENUE_DATA.map((r) => r.v));
	const maxUtil = Math.max(...UTIL_DATA.map((u) => u.v));

	return (
		<div style={{ animation: "fadeIn 0.3s ease" }}>
			<TopBar
				title="Analytics"
				subtitle="PERFORMANCE INSIGHTS"
				actions={
					<>
						<Btn label="LAST 6 MONTHS" />
						<Btn label="EXPORT" icon="download" primary />
					</>
				}
			/>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gap: 14,
					marginBottom: 20,
				}}
			>
				<StatCard
					label="Total Revenue"
					value="€31,080"
					sub="last 6 months"
					icon="trending_up"
					accent={T.orange}
					delta={24}
				/>
				<StatCard
					label="Total Sessions"
					value="118"
					sub="sessions completed"
					icon="ticket"
					accent={T.green}
					delta={18}
				/>
				<StatCard
					label="Avg Utilisation"
					value="68%"
					sub="across all days"
					icon="chart"
					accent={T.blue}
				/>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 14,
					marginBottom: 14,
				}}
			>
				{/* Revenue chart */}
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
						Monthly Revenue
					</div>
					<div
						role="img"
						aria-label="Monthly revenue bar chart"
						style={{
							display: "flex",
							gap: 10,
							alignItems: "flex-end",
							height: 140,
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
									gap: 8,
								}}
							>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 9,
										color: T.orange,
									}}
								>
									€{(r.v / 1000).toFixed(1)}k
								</div>
								<div
									aria-label={`${r.month}: €${(r.v / 1000).toFixed(1)}k`}
									style={{
										width: "100%",
										background:
											i === REVENUE_DATA.length - 1
												? T.orange
												: `${T.orange}33`,
										borderRadius: "6px 6px 0 0",
										height: `${(r.v / maxRevenue) * 100}%`,
										minHeight: 8,
										transition: "height 0.5s ease",
										position: "relative",
									}}
								>
									{i === REVENUE_DATA.length - 1 && (
										<div
											style={{
												position: "absolute",
												top: -1,
												left: 0,
												right: 0,
												height: 3,
												background: T.orange,
												borderRadius: 2,
											}}
										/>
									)}
								</div>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 9,
										color: T.textLight,
									}}
								>
									{r.month}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Utilisation by day */}
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
						Utilisation by Day of Week
					</div>
					<div
						role="img"
						aria-label="Utilisation by day of week"
						style={{ display: "flex", flexDirection: "column", gap: 10 }}
					>
						{UTIL_DATA.map((u) => (
							<div
								key={u.day}
								style={{ display: "flex", alignItems: "center", gap: 12 }}
							>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 10,
										color: T.textLight,
										width: 30,
										letterSpacing: 1,
									}}
								>
									{u.day}
								</div>
								<div
									style={{
										flex: 1,
										background: T.bg,
										borderRadius: 4,
										height: 10,
										overflow: "hidden",
									}}
								>
									<div
										aria-label={`${u.day}: ${u.v}% utilisation`}
										style={{
											height: "100%",
											width: "100%",
											background:
												u.v > 80
													? T.orange
													: u.v > 60
														? `${T.orange}88`
														: `${T.orange}44`,
											borderRadius: 4,
											transform: `scaleX(${u.v / 100})`,
											transformOrigin: "left",
											transition: "transform 0.6s ease",
										}}
									/>
								</div>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 10,
										fontWeight: 700,
										color: u.v > 80 ? T.orange : T.text,
										width: 32,
										textAlign: "right",
									}}
								>
									{u.v}%
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Revenue breakdown */}
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
						marginBottom: 18,
					}}
				>
					Revenue Breakdown by Stream
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(4, 1fr)",
						gap: 14,
					}}
				>
					{[
						{
							label: "Session Commissions",
							amount: "€22,400",
							pct: 72,
							color: T.orange,
						},
						{
							label: "Insurance Referrals",
							amount: "€4,480",
							pct: 14,
							color: T.green,
						},
						{
							label: "Premium Listing Fee",
							amount: "€2,800",
							pct: 9,
							color: T.blue,
						},
						{
							label: "Noise Hardware",
							amount: "€1,400",
							pct: 5,
							color: T.yellow,
						},
					].map((s) => (
						<div
							key={s.label}
							style={{
								background: T.bg,
								borderRadius: 12,
								padding: "16px",
								border: `1px solid ${T.border}`,
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 8,
									marginBottom: 10,
								}}
							>
								<div
									style={{
										width: 10,
										height: 10,
										borderRadius: 2,
										background: s.color,
									}}
								/>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 9,
										color: T.textLight,
										letterSpacing: 1,
									}}
								>
									{s.pct}% OF TOTAL
								</div>
							</div>
							<div
								style={{
									fontFamily: "Georgia, serif",
									fontSize: 20,
									fontWeight: 700,
									color: T.text,
									marginBottom: 4,
								}}
							>
								{s.amount}
							</div>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 9,
									color: T.textMid,
									lineHeight: 1.4,
								}}
							>
								{s.label}
							</div>
							<div
								style={{
									background: T.border,
									borderRadius: 3,
									height: 4,
									marginTop: 10,
									overflow: "hidden",
								}}
							>
								<div
									style={{
										height: "100%",
										width: `${s.pct}%`,
										background: s.color,
										borderRadius: 3,
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

// ─── NOISE MONITOR SCREEN ────────────────────────────────────────────────────
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

// ─── PRICING SCREEN ───────────────────────────────────────────────────────────
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

// ─── SETTINGS SCREEN ──────────────────────────────────────────────────────────
const SettingsScreen = () => (
	<div style={{ animation: "fadeIn 0.3s ease" }}>
		<TopBar title="Venue Settings" subtitle="CIRCUITO DE JEREZ" />
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
			{[
				{
					title: "Venue Profile",
					items: [
						"Name & description",
						"Photos gallery",
						"Facilities checklist",
						"Surface type & dimensions",
					],
				},
				{
					title: "Safety & Compliance",
					items: [
						"Safety briefing video",
						"Noise limit configuration",
						"Digital waiver template",
						"Insurance risk tier",
					],
				},
				{
					title: "Notification Preferences",
					items: [
						"New booking alerts",
						"Cancellation alerts",
						"Daily summary report",
						"Noise threshold SMS",
					],
				},
				{
					title: "Payout & Billing",
					items: [
						"Bank account details",
						"Payout schedule",
						"Invoice history",
						"Tax documentation",
					],
				},
			].map((section) => (
				<div
					key={section.title}
					style={{
						background: T.bgCard,
						borderRadius: 16,
						padding: "22px 24px",
						border: `1px solid ${T.border}`,
					}}
				>
					<h2
						style={{
							fontFamily: "Georgia, serif",
							fontSize: 15,
							fontWeight: 700,
							color: T.text,
							margin: "0 0 14px",
						}}
					>
						{section.title}
					</h2>
					{section.items.map((item, i) => (
						<div
							key={i}
							role="button"
							tabIndex={0}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								padding: "11px 0",
								borderBottom:
									i < section.items.length - 1
										? `1px solid ${T.border}`
										: "none",
								cursor: "pointer",
							}}
							onMouseEnter={(e) => (e.currentTarget.style.color = T.orange)}
							onMouseLeave={(e) => (e.currentTarget.style.color = T.text)}
							onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
						>
							<span
								style={{
									fontFamily: "Georgia, serif",
									fontSize: 13,
									color: "inherit",
								}}
							>
								{item}
							</span>
							<Icon name="chevron_right" size={14} color={T.textLight} />
						</div>
					))}
				</div>
			))}
		</div>
	</div>
);

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
