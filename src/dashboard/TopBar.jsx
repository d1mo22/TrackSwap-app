import { DASH as T } from "../constants/theme.js";

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

export default TopBar;
