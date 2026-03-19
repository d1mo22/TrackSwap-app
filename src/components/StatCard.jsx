import Icon from "./Icon.jsx";
import { DASH as T } from "../constants/theme.js";

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

export default StatCard;
