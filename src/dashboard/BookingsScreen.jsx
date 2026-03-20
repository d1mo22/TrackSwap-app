import { useState } from "react";
import Icon from "../components/Icon.jsx";
import Badge from "../components/Badge.jsx";
import Btn from "../components/Btn.jsx";
import TopBar from "./TopBar.jsx";
import { DASH as T } from "../constants/theme.js";
import { BOOKINGS } from "../constants/dashboard.js";
import { useLanguage } from "../i18n/index.jsx";

const BookingsScreen = () => {
	const { t } = useLanguage();
	const [filter, setFilter] = useState("all");
	const filtered =
		filter === "all" ? BOOKINGS : BOOKINGS.filter((b) => b.status === filter);
	const filterLabels = {
		all: t("filter_all"),
		confirmed: t("d_filter_confirmed"),
		pending: t("d_filter_pending"),
		cancelled: t("d_filter_cancelled"),
	};

	return (
		<div style={{ animation: "fadeIn 0.3s ease" }}>
			<TopBar
				title={t("d_bookings_mgr")}
				subtitle={t("d_all_reservations")}
				actions={
					<>
						<Btn label={t("d_export_csv")} icon="download" />
						<Btn label={t("d_new_booking")} icon="plus" primary />
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
						{(filterLabels[f] || f).toUpperCase()}
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
								t("d_col_driver"),
								t("d_col_vehicle"),
								t("d_col_datetime"),
								t("d_col_price"),
								t("d_col_insured"),
								t("d_col_status"),
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

export default BookingsScreen;
