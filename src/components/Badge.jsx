import { DASH as T } from "../constants/theme.js";

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

export default Badge;
