# Deployment — agrigen-landing → terravect.adaptive-ai-solutions.de

Stand: 18.09.2026 · CF-Pages-Projekt **`agrigen-landing`** ist im Cloudflare-Konto
vorbelegt (production branch: `main`). Zone `adaptive-ai-solutions.de` liegt im
selben Konto — die Subdomain braucht **keinen Domain-Kauf**.

> Namenskontext: Produkt heißt **Terravect** (ehem. „AgriGen Matcher", KI-Biennale-
> Einreichung behält den alten Namen). Repo-Name bleibt `agrigen-matcher` /
> `agrigen-landing`. Eigene Domain `terravect.de` ist späterer Upgrade-Pfad
> (Canonical/OG/Sitemap dann wieder auf 4 Stellen umstellen).

## Custom Domain (per API eingerichtet 18.09.)

- Pages-Projekt `agrigen-landing` → Custom Domain `terravect.adaptive-ai-solutions.de`
- DNS: CNAME in Zone `adaptive-ai-solutions.de` → `agrigen-landing.pages.dev`
  (bei CF-Zone im eigenen Konto automatisch/proxied)

## Deployment

### Weg A — Git-Connect (empfohlen, ~5 Minuten, einmalig)

1. Cloudflare-Dashboard → **Workers & Pages → agrigen-landing → Settings →
   Builds & deployments → Connect to Git** (oder neu verbinden)
2. GitHub-App: `ShadowsInThe-Space/agrigen-landing` autorisieren/auswählen
3. Build settings: Framework **None** · Build command *leer* ·
   Output directory `/` (Root — statisch)
4. Save & Deploy — jeder Push auf `main` deployt danach automatisch
5. Custom Domain in den Projekteinstellungen prüfen (sollte aktiv sein)

### Weg B — Dashboard-Direct-Upload (schnellster Einmal-Livegang)

Workers & Pages → Create → Pages → **Upload assets** → diesen Ordner hochladen
(alle Dateien außer `.git/`, `demo/` (Quelle), `screenshots/` optional) →
Projekt `agrigen-landing` wählen/erstellen.

### Weg C — wrangler CLI (für Agent/Skript)

```bash
cd ~/projects/adaptive-ai-solutions/agrigen-landing
CLOUDFLARE_API_TOKEN=<token-mit-Pages:Edit> npx -y wrangler pages deploy . --project-name=agrigen-landing
```

## Nach dem Livegang

- [ ] **Cloudflare Web Analytics** aktivieren (Pages-Projekt → Settings → Web
      Analytics) — cookiefrei, in `datenschutz.html` bereits angekündigt
- [ ] **Google Search Console**: `https://terravect.adaptive-ai-solutions.de/`
      als Property anlegen, `sitemap.xml` einreichen (Indexierung dauert Tage–Wochen)
- [ ] Repo-Status public prüfen (ist seit 18.09. public)
- Kernel-Bundle-Rebuild gegen main (AGPL-Stand) ist **nicht funktional nötig**
  (Diff 18.09. nur SPDX-/Kommentarzeilen; Bundle ist minifiziert) — optional:
  `npx -y esbuild demo/entry.ts --bundle --format=iife --outfile=assets/demo.js --minify --legal-comments=none`
