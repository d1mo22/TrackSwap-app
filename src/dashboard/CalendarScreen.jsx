import { useState } from "react";
import Icon from "../components/Icon.jsx";
import Badge from "../components/Badge.jsx";
import Btn from "../components/Btn.jsx";
import TopBar from "./TopBar.jsx";
import { DASH as T } from "../constants/theme.js";
import { SLOTS, DAYS, MONTHS } from "../constants/dashboard.js";
import { useLanguage } from "../i18n/index.jsx";

const CalendarScreen = () => {
	const { t } = useLanguage();
	const [selectedDay, setSelectedDay] = useState(1);
	const [currentMonth, setCurrentMonth] = useState(2);
	const daySlots = SLOTS[selectedDay] || [];

	return (
		<div style={{ animation: "fadeIn 0.3s ease" }}>
			<TopBar
				title={t("d_avail_calendar")}
				subtitle={t("d_slot_mgmt")}
				actions={
					<>
						<Btn label={t("d_bulk_edit")} icon="refresh" />
						<Btn label={t("d_add_slots")} icon="plus" primary />
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
							{ color: T.green, label: t("d_cal_booked") },
							{ color: T.yellow, label: t("d_cal_reserved") },
							{ color: T.borderStrong, label: t("d_cal_blocked") },
							{ color: T.blue, label: t("d_cal_open") },
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
							{t("d_selected_day")}
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
												{t("d_no_driver")}
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
									label: t("d_cal_booked"),
									v: daySlots.filter((s) => s.status === "booked").length,
									color: T.green,
								},
								{
									label: t("d_cal_open"),
									v: daySlots.filter((s) => s.status === "open").length,
									color: T.blue,
								},
								{
									label: t("d_cal_reserved"),
									v: daySlots.filter((s) => s.status === "reserved").length,
									color: T.yellow,
								},
								{
									label: t("d_cal_blocked"),
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
					<Btn label={t("d_add_slot_day")} icon="plus" primary />
					<Btn label={t("d_block_day")} icon="lock" />
				</div>
			</div>
		</div>
	);
};

export default CalendarScreen;
