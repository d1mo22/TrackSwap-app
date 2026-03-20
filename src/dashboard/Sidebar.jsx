import Icon from "../components/Icon.jsx";
import { DASH as T } from "../constants/theme.js";
import { useLanguage } from "../i18n/index.jsx";

const Sidebar = ({ active, setActive, collapsed, setCollapsed }) => {
	const { t } = useLanguage();
	const nav = [
		{ id: "overview", icon: "grid", label: t("d_nav_overview") },
		{ id: "calendar", icon: "calendar", label: t("d_nav_calendar") },
		{ id: "bookings", icon: "ticket", label: t("d_nav_bookings") },
		{ id: "analytics", icon: "chart", label: t("d_nav_analytics") },
		{ id: "noise", icon: "volume", label: t("d_nav_noise") },
		{ id: "pricing", icon: "tag", label: t("d_nav_pricing") },
		{ id: "settings", icon: "settings", label: t("d_nav_settings") },
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
								{t("d_owner_portal")}
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
							{t("d_active_venue")}
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
							{t("d_venue_owner")}
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

export default Sidebar;
