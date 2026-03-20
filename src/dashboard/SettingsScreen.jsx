import Icon from "../components/Icon.jsx";
import TopBar from "./TopBar.jsx";
import { DASH as T } from "../constants/theme.js";
import { useLanguage } from "../i18n/index.jsx";

const SettingsScreen = () => {
  const { lang, setLang, t } = useLanguage();
  return (
	<div style={{ animation: "fadeIn 0.3s ease" }}>
		<TopBar title={t("d_settings_title")} subtitle="CIRCUITO DE JEREZ" />
		<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
			{[
				{
					title: t("d_set_profile"),
					items: [
						t("d_set_name_desc"),
						t("d_set_photos"),
						t("d_set_facilities"),
						t("d_set_surface"),
					],
				},
				{
					title: t("d_set_safety"),
					items: [
						t("d_set_briefing"),
						t("d_set_noise_config"),
						t("d_set_waiver"),
						t("d_set_ins_tier"),
					],
				},
				{
					title: t("d_set_notifications"),
					items: [
						t("d_set_new_booking"),
						t("d_set_cancel_alerts"),
						t("d_set_daily_summary"),
						t("d_set_noise_sms"),
					],
				},
				{
					title: t("d_set_payout"),
					items: [
						t("d_set_bank"),
						t("d_set_payout_schedule"),
						t("d_set_invoices"),
						t("d_set_tax"),
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

		<div style={{ marginTop: 20, background: T.bgCard, borderRadius: 16, padding: "22px 24px", border: `1px solid ${T.border}` }}>
			<h2 style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: T.text, margin: "0 0 14px" }}>{t("d_settings_language")}</h2>
			<div style={{ display: "flex", gap: 10 }}>
				{["es", "en", "pt"].map((code) => (
					<button
						key={code}
						onClick={() => setLang(code)}
						style={{
							padding: "8px 20px",
							borderRadius: 10,
							border: `1.5px solid ${lang === code ? T.orange : T.border}`,
							background: lang === code ? `${T.orange}18` : "transparent",
							fontFamily: "monospace",
							fontSize: 12,
							fontWeight: 700,
							color: lang === code ? T.orange : T.textLight,
							cursor: "pointer",
							letterSpacing: 1,
						}}
					>
						{code.toUpperCase()}
					</button>
				))}
			</div>
		</div>
	</div>
  );
};

export default SettingsScreen;
