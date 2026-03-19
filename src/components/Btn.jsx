import Icon from "./Icon.jsx";
import { DASH as T } from "../constants/theme.js";

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

export default Btn;
