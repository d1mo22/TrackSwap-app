import Btn from "../components/Btn.jsx";
import StatCard from "../components/StatCard.jsx";
import TopBar from "./TopBar.jsx";
import { DASH as T } from "../constants/theme.js";
import { REVENUE_DATA, UTIL_DATA } from "../constants/dashboard.js";
import { useLanguage } from "../i18n/index.jsx";

const AnalyticsScreen = () => {
	const { t } = useLanguage();
	const maxRevenue = Math.max(...REVENUE_DATA.map((r) => r.v));
	const maxUtil = Math.max(...UTIL_DATA.map((u) => u.v));

	return (
		<div style={{ animation: "fadeIn 0.3s ease" }}>
			<TopBar
				title={t("d_analytics")}
				subtitle={t("d_perf_insights")}
				actions={
					<>
						<Btn label={t("d_last_6m")} />
						<Btn label={t("d_export")} icon="download" primary />
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
					label={t("d_total_revenue")}
					value="€31,080"
					sub={t("d_last_6m_sub")}
					icon="trending_up"
					accent={T.orange}
					delta={24}
				/>
				<StatCard
					label={t("d_total_sessions")}
					value="118"
					sub={t("d_sessions_completed")}
					icon="ticket"
					accent={T.green}
					delta={18}
				/>
				<StatCard
					label={t("d_avg_util")}
					value="68%"
					sub={t("d_across_all_days")}
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
						{t("d_monthly_revenue")}
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
						{t("d_util_by_day")}
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
					{t("d_rev_breakdown")}
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
							label: t("d_stream_sessions"),
							amount: "€22,400",
							pct: 72,
							color: T.orange,
						},
						{
							label: t("d_stream_insurance"),
							amount: "€4,480",
							pct: 14,
							color: T.green,
						},
						{
							label: t("d_stream_listing"),
							amount: "€2,800",
							pct: 9,
							color: T.blue,
						},
						{
							label: t("d_stream_hardware"),
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
									{s.pct}% {t("d_of_total")}
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

export default AnalyticsScreen;
