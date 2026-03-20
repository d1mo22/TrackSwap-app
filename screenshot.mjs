import { chromium } from "playwright";
import path from "path";
import { mkdirSync, copyFileSync, existsSync } from "fs";

const BASE_DIR = "/mnt/c/Users/david/iCloudDrive/TrackSwap/Web/survey/img";
const APP_URL = "https://trackswap-app.vercel.app";
const VIEWPORT = { width: 396, height: 847 };
const LANGS = ["es", "en", "pt"];

// Create language subfolders
for (const lang of LANGS) {
  mkdirSync(path.join(BASE_DIR, lang), { recursive: true });
}

const browser = await chromium.launch();

async function newPage() {
  const page = await browser.newPage();
  await page.setViewportSize(VIEWPORT);
  return page;
}

async function passSplash(page, lang) {
  await page.goto(APP_URL, { waitUntil: "networkidle" });
  // Wait for splash animation (buttons fade in after 0.7s delay)
  await page.waitForTimeout(1500);
  // Select language
  const langBtn = page.getByRole("button", { name: lang.toUpperCase() });
  await langBtn.waitFor({ timeout: 5000 });
  await langBtn.click();
  await page.waitForTimeout(200);
  // Click continue
  const continueBtn = page.getByRole("button", { name: /continuar|continue/i });
  await continueBtn.click();
  await page.waitForTimeout(700);
}

async function shot(page, outDir, filename) {
  await page.screenshot({ path: path.join(outDir, filename), type: "jpeg", quality: 90 });
  console.log(`✓ ${path.basename(outDir)}/${filename}`);
}

for (const lang of LANGS) {
  const OUT = path.join(BASE_DIR, lang);

  // ── disponibilidad.jpg ─────────────────────────────────────────────────────
  // Home screen showing venue cards with OPEN/FULL availability
  {
    const page = await newPage();
    await passSplash(page, lang);
    // Home tab is default — wait for venue cards to render
    await page.locator("button.ts-card").first().waitFor({ timeout: 8000 });
    await page.waitForTimeout(300);
    await shot(page, OUT, "disponibilidad.jpg");
    await page.close();
  }

  // ── seguro.jpg ────────────────────────────────────────────────────────────
  // Insurance selection screen (use Karting venue — no car required)
  {
    const page = await newPage();
    await passSplash(page, lang);
    // Click Karting Lloret card (Karting type → no car needed for insurance)
    const kartingCard = page.locator("button.ts-card").filter({ hasText: /karting/i });
    await kartingCard.first().waitFor({ timeout: 8000 });
    await kartingCard.first().click();
    await page.waitForTimeout(700);
    // Click the "sessions" tab
    const sessionsTab = page.locator("button").filter({ hasText: /^sessions$/i });
    await sessionsTab.first().waitFor({ timeout: 5000 });
    await sessionsTab.first().click();
    await page.waitForTimeout(400);
    // Select first session slot
    const sessionSlots = page.locator("button.sess-btn");
    await sessionSlots.first().waitFor({ timeout: 5000 });
    await sessionSlots.first().click();
    await page.waitForTimeout(300);
    // Click the book button
    const bookBtn = page.locator("button").filter({ hasText: /reservar|book session/i }).last();
    await bookBtn.waitFor({ timeout: 5000 });
    await bookBtn.click();
    await page.waitForTimeout(700);
    await shot(page, OUT, "seguro.jpg");
    await page.close();
  }

  // ── reservar-pagar.jpg ────────────────────────────────────────────────────
  // Booking confirmation screen (Karting → insurance → continue to checkout)
  {
    const page = await newPage();
    await passSplash(page, lang);
    const kartingCard = page.locator("button.ts-card").filter({ hasText: /karting/i });
    await kartingCard.first().waitFor({ timeout: 8000 });
    await kartingCard.first().click();
    await page.waitForTimeout(700);
    const sessionsTab = page.locator("button").filter({ hasText: /^sessions$/i });
    await sessionsTab.first().waitFor({ timeout: 5000 });
    await sessionsTab.first().click();
    await page.waitForTimeout(400);
    const sessionSlots = page.locator("button.sess-btn");
    await sessionSlots.first().waitFor({ timeout: 5000 });
    await sessionSlots.first().click();
    await page.waitForTimeout(300);
    const bookBtn = page.locator("button").filter({ hasText: /reservar|book session/i }).last();
    await bookBtn.waitFor({ timeout: 5000 });
    await bookBtn.click();
    await page.waitForTimeout(700);
    // Select PRO DRIVER insurance
    const proInsurance = page.locator("button").filter({ hasText: /PRO DRIVER/ });
    if (await proInsurance.count() > 0) {
      await proInsurance.first().click();
      await page.waitForTimeout(300);
    }
    // Continue to checkout → booking confirmation screen
    const confirmBtn = page.locator("button").filter({ hasText: /continue to checkout/i });
    await confirmBtn.waitFor({ timeout: 5000 });
    await confirmBtn.click();
    await page.waitForTimeout(700);
    await shot(page, OUT, "reservar-pagar.jpg");
    await page.close();
  }

  // ── ranking-tiempos.jpg ───────────────────────────────────────────────────
  // Group leaderboard (Community → Groups → first group)
  {
    const page = await newPage();
    await passSplash(page, lang);
    // Community tab
    const communityTab = page.locator("button").filter({ hasText: /^(comunidad|community|comunidade)$/i });
    await communityTab.first().waitFor({ timeout: 5000 });
    await communityTab.first().click();
    await page.waitForTimeout(400);
    // Groups tab
    const groupsTab = page.locator("button").filter({ hasText: /^(grupos|groups)$/i });
    await groupsTab.first().waitFor({ timeout: 3000 });
    await groupsTab.first().click();
    await page.waitForTimeout(400);
    // Click first group card
    const groupCards = page.locator("button.ts-card, button[class*='card']");
    if (await groupCards.count() > 0) {
      await groupCards.first().click();
    } else {
      // Fallback: click any button containing a circuit name
      const anyGroup = page.locator("button").filter({ hasText: /jerez|navarra|spa|circuit/i });
      await anyGroup.first().waitFor({ timeout: 3000 });
      await anyGroup.first().click();
    }
    await page.waitForTimeout(700);
    // Leaderboard tab should be default
    await shot(page, OUT, "ranking-tiempos.jpg");
    await page.close();
  }

  // ── licencia.jpg ──────────────────────────────────────────────────────────
  {
    const page = await newPage();
    await passSplash(page, lang);
    // Profile tab
    const profileTab = page.locator("button").filter({ hasText: /^(perfil|profile)$/i });
    await profileTab.first().waitFor({ timeout: 5000 });
    await profileTab.first().click();
    await page.waitForTimeout(400);
    // Licence button
    const licBtn = page.locator("button").filter({ hasText: /licen/i }).first();
    await licBtn.waitFor({ timeout: 5000 });
    await licBtn.click();
    await page.waitForTimeout(600);
    await shot(page, OUT, "licencia.jpg");
    await page.close();
  }

  // ── resenyas.jpg ──────────────────────────────────────────────────────────
  {
    const page = await newPage();
    await passSplash(page, lang);
    // Click first venue card → detail with reviews
    await page.locator("button.ts-card").first().waitFor({ timeout: 8000 });
    await page.locator("button.ts-card").first().click();
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollBy(0, 120));
    await page.waitForTimeout(400);
    await shot(page, OUT, "resenyas.jpg");
    await page.close();
  }
}

// ── Dashboard screenshots (language-agnostic) ─────────────────────────────
// Copy existing dashboard images to all language folders
const DASH_IMAGES = ["calendario.jpg", "analiticas.jpg", "monitor-ruido.jpg", "precios-dinamicos.jpg"];
for (const filename of DASH_IMAGES) {
  const src = path.join(BASE_DIR, filename);
  if (existsSync(src)) {
    for (const lang of LANGS) {
      copyFileSync(src, path.join(BASE_DIR, lang, filename));
      console.log(`✓ ${lang}/${filename} (copied)`);
    }
  } else {
    console.warn(`⚠ ${filename} not found in root img/ — skipping`);
  }
}

await browser.close();
console.log("\nDone. All screenshots saved to", BASE_DIR);
