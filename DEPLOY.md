# Deployment — agrigen-landing → agrigenmatch.de

Stand: 18.09.2026 · CF-Pages-Projekt **`agrigen-landing`** ist im Cloudflare-Konto
vorbelegt (production branch: `main`). Repo: `ShadowsInThe-Space/agrigen-landing` (privat).

## Weg A — Git-Connect (empfohlen, ~5 Minuten, einmalig)

1. Cloudflare-Dashboard → **Workers & Pages → Create → Pages → Connect to Git**
2. GitHub-App: `ShadowsInThe-Space/agrigen-landing` autorisieren/auswählen
   (Projektname `agrigen-landing` sollte das vorangelegte Projekt erkennen —
   sonst bestehendes Projekt in den Einstellungen mit Git verbinden)
3. Build settings: **Framework preset: None** · Build command: *leer* ·
   Output directory: `/` (Root — die Seite ist statisch, `index.html` liegt oben)
4. Save & Deploy → Deployment läuft auf `agrigen-landing.pages.dev`
5. **Custom Domain:** Project → Custom domains → `agrigenmatch.de` hinzufügen
   (Domain muss vorher im selben CF-Konto liegen — s. u. Domain-Kauf)

Jeder `git push` auf `main` deployt danach automatisch.

## Weg B — wrangler CLI (für Agent/Skript)

```bash
cd ~/projects/adaptive-ai-solutions/agrigen-landing
CLOUDFLARE_API_TOKEN=<token-mit-Pages:Edit> npx -y wrangler pages deploy . --project-name=agrigen-landing
```

## Voraussetzungen, die nur Sonny erledigen kann

- [ ] **ZUERST Namen klären:** Marken-Screening 18.09. warnt vor BASF-EUMarke
      „AGRIGENIUS" (aktiv, Klassen-Profil wie unseres) → vor Domain-Kauf und
      Vermarktung entscheiden: Name behalten (BASF-Freigabe/Kontakt) oder ändern.
      Bis dahin: Domainkauf pausiert (Beschluss der Parallelsession).
- [ ] **Domain kaufen** (nach Namensentscheidung) — CF Registrar (falls .de dort
      nicht buchbar: beliebiger Registrar, dann Zone ins bestehende CF-Konto
      anbinden; CF übernimmt DNS für die Pages-Domain).
      `robots.txt`/`sitemap.xml`/`canonical`/OG-URLs sind auf `agrigenmatch.de`
      konfiguriert — bei abweichender Domain 4 Stellen anpassen
      (`index.html` canonical/og:url/og:image, `sitemap.xml`, `robots.txt`).
- [ ] **Impressum-Anschrift** in `impressum.html` (Platzhalter `[…]` ersetzen),
      analog `datenschutz.html` (Verantwortlicher).
- [ ] **Cloudflare Web Analytics aktivieren** (Domain → Speed/Optimization →
      Web Analytics oder Pages-Projekt → Settings → Web Analytics) — cookiefrei,
      in `datenschutz.html` bereits angekündigt. Kein Snippet nötig, wenn über
      Pages/CNAMES ausgeliefert (automatic beacon); sonst Beacon-Script einbauen.
- [ ] **Google Search Console**: `agrigenmatch.de` als Property anlegen,
      `sitemap.xml` einreichen (Indexierung braucht Tage–Wochen).

## Nach dem Livegang

- Repo von private auf public stellen (optional, Portfolio) — vorher Impressum-Platzhalter prüfen
- Kernel-Bundle-Rebuild gegen main (AGPL-Stand) ist **nicht funktional nötig**
  (Diff 18.09. nur SPDX-/Kommentarzeilen; Bundle ist minifiziert) — optional nachholen:
  `npx -y esbuild demo/entry.ts --bundle --format=iife --outfile=assets/demo.js --minify --legal-comments=none`
