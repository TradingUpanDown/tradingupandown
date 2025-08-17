# Market Clock – Project Guide

This README explains how your market clock project is structured, how it runs, how to customize it, and how to deploy it. I also generated a fixed HTML with corrected asset paths.

- **Fixed HTML**: `/mnt/data/market_clock3_fixed.html`
- **Source folder**: `/mnt/data/market_clock2_extracted`

---

## 1) Project Structure (top-level snapshot)
```
market_clock2_extracted/
├─ market_clock/
│  ├─ assets/
│  │  ├─ css/
│  │  ├─ js/
│  │  ├─ android-chrome-192x192.png
│  │  ├─ apple-touch-icon-114x114.png
│  │  ├─ apple-touch-icon-120x120.png
│  │  ├─ apple-touch-icon-144x144.png
│  │  ├─ apple-touch-icon-152x152.png
│  │  ├─ apple-touch-icon-180x180.png
│  │  ├─ apple-touch-icon-57x57.png
│  │  ├─ apple-touch-icon-60x60.png
│  │  ├─ apple-touch-icon-72x72 (1).png
│  │  ├─ apple-touch-icon-72x72.png
│  │  ├─ apple-touch-icon-76x76.png
│  │  ├─ favicon-16x16.png
│  │  ├─ favicon-32x32.png
│  │  ├─ favicon-96x96.png
│  │  ├─ favicon.ico
│  │  ├─ font-awesome.min.css
│  │  ├─ market-24h-clock-logo@2x.png
│  │  ├─ mstile-144x144.png
│  │  └─ safari-pinned-tab.svg
│  ├─ external-embedding/
│  │  ├─ embed-widget-events.js
│  │  └─ embed-widget-market-overview.js
│  ├─ fonts/
│  │  ├─ cleanvel.woff2
│  │  ├─ fontawesome-webfont.woff
│  │  └─ ultimate-social.woff
│  ├─ img/
│  │  ├─ home/
│  │  ├─ socials/
│  │  └─ market-24h-clock-logo@2x.png
│  ├─ mcl/
│  │  ├─ dark_new/
│  │  └─ light_new/
│  ├─ styles/
│  │  ├─ home.min.css
│  │  ├─ main.min.css
│  │  └─ socialsstyle.css
│  ├─ market_clock-origina.html
│  └─ set_theme=light.html
└─ market_clock2.html
```

### Key files
- HTML (top picks):
  - `market_clock2.html`
  - `market_clock/set_theme=light.html`
  - `market_clock/market_clock-origina.html`
- Styles:
  - `market_clock/styles/home.min.css`
  - `market_clock/styles/main.min.css`
  - `market_clock/styles/socialsstyle.css`
  - `market_clock/assets/font-awesome.min.css`
  - `market_clock/assets/css/font-awesome.min.css`
- Scripts:
  - `market_clock/assets/js/mngltv.js`
  - `market_clock/assets/js/mngltv-lc.js`
  - `market_clock/assets/js/min/us.native-min.js`
  - `market_clock/assets/js/min/us.script-min.js`
  - `market_clock/assets/js/cbpHorizontalMenu.min.js`
  - `market_clock/assets/js/min/jquery.cookie-min.js`
  - `market_clock/assets/js/min/jquery.sticky-min.js`
  - `market_clock/assets/js/min/jquery.fittext-min.js`
  - `market_clock/assets/js/min/jquery.tooltipster-min.js`
  - `market_clock/assets/js/min/jquery.magnific-popup-min.js`

> The `mcl/` folder contains the clock artwork (dark/light themes, hands, sectors). The `assets/` and `styles/` folders hold third‑party and project CSS/JS. `img/` contains logos and marketing images. `fonts/` holds webfonts for UI and icons.

---

## 2) How it Works

1. Open **`market_clock3_fixed.html`** (or `market_clock3.html`) in your browser.
2. The HTML loads CSS from **`styles/`** and **`assets/css/`** and JavaScript from **`assets/js/`**.
3. Custom scripts (e.g., `mngltv.js`) compute session times and rotate the clock hands, while highlighting market sessions using the images in **`mcl/`**.
4. Optional widgets under **`external-embedding/`** can embed market overviews or economic events.

**Themes**
- Dark images: `mcl/dark_new/…`
- Light images: `mcl/light_new/…`
If your HTML exposes a theme toggle, it swaps the asset paths and/or body classes to change the visual set.

---

## 3) Run Locally

### Quick open (static)
Just double‑click `market_clock3_fixed.html`. This usually works if all assets are relative paths (which I fixed).

### Local server (recommended)
```bash
cd /mnt/data/market_clock2_extracted
python -m http.server 8000
```
Open: `http://localhost:8000/market_clock3.html` or the fixed file at `http://localhost:8000/../market_clock3_fixed.html` if you copy it into the folder.

> If some browsers block local font loading or widget scripts, running a small server avoids those issues.

---

## 4) Customization

### Colors & Fonts
- Search in `styles/` for main color variables or hex values (e.g., `#191c1f`, `#FFC107`, `#bfc5ce`) and replace as needed.
- To apply **Tradingupandown** brand, update logo paths in the header/footer and ensure the font family is consistent.

### Clock Assets
- Replace artwork in `mcl/dark_new/` and `mcl/light_new/` with same filenames to keep code unchanged.
- Hands and sector overlays are separate PNGs; keep sizes consistent with backgrounds.

### Time Zone / Sessions
- Look inside `assets/js/mngltv*.js` for session definitions and timezone handling. You can:
  - Set a default timezone.
  - Adjust open/close times per market.
  - Enable/disable city labels or tooltips.

### Widgets
- Files under `external-embedding/` (e.g., `embed-widget-events.js`, `embed-widget-market-overview.js`) can be placed into the HTML inside a container div to show third‑party content. Check the top of each widget file for configurable options (symbols, theme, locale).

---

## 5) SEO & Performance Quick Wins

- Add/verify `<meta name="description">`, Open Graph (`og:title`, `og:description`, `og:image`), and Twitter Card tags.
- Use `defer` on non‑critical `<script>` tags to improve first paint.
- Inline critical CSS for the above‑the‑fold hero if needed; keep the rest external and cached.
- Compress images (PNG/JPG) and consider WebP for promos/backgrounds.
- Serve fonts via `woff2` and declare `font-display: swap;` in CSS.
- Create a `sitemap.xml` and `robots.txt` if deploying as a site.

---

## 6) Security Notes

- Avoid injecting untrusted HTML via `innerHTML`. Prefer textContent or sanitize first.
- Do not embed API keys directly in client JS. If needed, proxy through your backend.
- Use HTTPS URLs for all external scripts and images to avoid mixed content warnings.

---

## 7) Deployment

Any static host works:
- GitHub Pages / Cloudflare Pages / Netlify / Vercel (static).
- Classic hosting: upload the entire folder structure, maintain paths.

**Checklist**
- Upload: entire `market_clock2_extracted/` tree plus `market_clock3_fixed.html` (or replace original HTML).
- Test on production URL for fonts, icons, and widget scripts.
- Set correct cache headers for `/styles`, `/assets`, `/img`, `/mcl`, `/fonts`.

---

## 8) Troubleshooting

- **Broken icons or fonts** → Check relative paths in CSS (`url(...)`). They should point into `fonts/`.
- **Clock not moving** → Open DevTools Console; verify `mngltv.js` is loaded and no 404s for PNGs in `mcl/…`.
- **Theme not switching** → Ensure the theme toggle updates body class and/or swaps image directories.

---

## 9) Next Steps I Can Do For You

- Add a **theme toggle** (dark/light) with a simple UI switch.
- Add a **timezone selector** to force display in any zone.
- Convert key colors to **CSS variables** for one‑line theming.
- Create a small **config.js** to centralize session times and brand options.
- Package everything into a single **`dist/`** with minified assets.

---

If you want, I can implement any of the above immediately and give you a new build. 
