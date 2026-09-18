# AgriGen Matcher — Landing Page

One-Page-Produktseite mit **Live-Demo des echten Kernels im Browser**.
Ein Produkt von **Adaptive AI Solutions**. Stil: Corporate Agriscience
(Design-Vertrag: [`DESIGN.md`](DESIGN.md) — Tokens sind kanonisch).

## Struktur

```
index.html          One-Pager (Hero, Herausforderung, Verfahren, Demo, Belege, CTA, Footer)
assets/styles.css   Design-System-Umsetzung (Tokens aus DESIGN.md)
assets/app.js       Demo-UI-Logik (vanilla, kein Framework)
assets/demo.js      Kernel-Bundle (BUILD-ARTEFAKT, wird committet für hosten-ohne-Build)
demo/entry.ts       Browser-Entry — importiert den UNVERÄNDERTEN Kernel aus ../../agrigen-matcher
screenshots/        Verifikations-Stände (Hero, Fullpage, Mobile)
```

## Live-Demo rebuilden

Voraussetzung: Nachbar-Checkout des Matcher-Repos unter `~/projects/agrigen-matcher`
(derselbe Stand, der auf GitHub public ist).

```bash
cd ~/projects/adaptive-ai-solutions/agrigen-landing
npx -y esbuild demo/entry.ts --bundle --format=iife --outfile=assets/demo.js --minify --legal-comments=none
```

Das Bundle (~63 KB) enthält Kernel + EURISCO-150-Daten. Lokal ansehen:

```bash
python3 -m http.server 8811
# http://localhost:8811
```

## Deployment (geplant)

Statisch auf **agrigenmatch.de** (Cloudflare Pages oder CF-DNS + statisches Hosting).
DNS-frei laut Schnellcheck vom 18.09. — Kauf steht noch aus (Sonny).

## Vor Livegang erledigen (Checkliste)

- [ ] Domain agrigenmatch.de kaufen (Cloudflare Registrar; falls .de dort nicht
      buchbar: beliebiger Registrar + Zone im bestehenden CF-Konto anbinden)
- [ ] Impressum vervollständigen (Anschrift) + Datenschutzerklärung-Seite
- [ ] Fonts self-hosten (aktuell Google Fonts CDN — DSGVO-freundlicher lokal)
- [ ] DPMA-Wortmarken-Check „AgriGen"/„AgriGen Matcher" vor Vermarktungsstart
- [ ] Kernel-Stand nach PR #2 (AGPL) rebasen — Quellcode-Link zeigt dann auf
      die AGPL-Version

## Lizenz

Code (inkl. Kernel-Bundle): **GNU AGPL-3.0-or-later** — konsistent mit dem
Matcher-Repo (PR ShadowsInThe-Space/agrigen-matcher#2).
Copyright (C) 2026 Marc-Dennis Haberland (Adaptive AI Solutions).
Kommerzielle Lizenz ohne Copyleft: hallo@adaptive-ai-solutions.de.
