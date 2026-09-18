# DESIGN.md — AgriGen Matcher Landing Page

**Produkt:** AgriGen Matcher (Ein Produkt von Adaptive AI Solutions)
**Zweck:** One-Page-Landingpage mit Live-Demo des Kernel-Matchings im Browser
**Zielgruppe:** Pflanzenzüchter, Saatgut-Beratung, Agrar-Forschung (DACH)
**Stil-Referenz:** Corporate Agriscience (Anmutung großer Agri-Science-Marken wie Bayer Crop Science — Anmutung ONLY, keine Marken-Elemente, -Farben im Verbund oder -Wortbilder)

## Tokens (kanonisch)

```yaml
colors:
  field_night: "#0E3B2E"      # Primär: tiefes Feld-Grün,authority background (Hero, Footer)
  leaf_signal: "#2F9E44"      # Akzent: Blattgrün für CTAs, aktive Zustände, Fortschritt
  paper_warm: "#F7F5EF"       # Fläche: warmes Papier-Weiß (Sektions-Hintergrund)
  ink_forest: "#13271E"       # Text: fast-schwarz mit Grünstich auf hell
  mist_line: "#D8D4C6"        # Hairlines, Trennlinien, Kartenumrandungen
  ear_gold: "#C99A2C"         # Zweit-Akzent, SPARSAM: Zahlen-Highlights, Score-Balken
  cloud_white: "#FFFFFF"      # Karten auf paper_warm
  on_dark_muted: "#9DBFAF"    # Sekundärtext auf field_night
fonts:
  display: "Fraunces, Georgia, serif"          # Headlines: editorial-wissenschaftliche Serif
  body: "'IBM Plex Sans', 'Helvetica Neue', sans-serif"
  mono: "'IBM Plex Mono', 'Courier New', monospace"  # Scores, IDs, Daten-Labels
font_sizes:
  hero_display: "clamp(2.6rem, 6vw, 4.6rem)"
  h2: "clamp(1.8rem, 3.5vw, 2.6rem)"
  body: "1.0625rem"
  small: "0.875rem"
  micro_label: "0.75rem"      # Uppercase-Labels mit Tracking
radii:
  card: "6px"                 # kontrolliert-eckig, seriös
  button: "4px"               # fast kantig — Präzision
  pill: "999px"               # nur für Tag-Chips
spacing:
  section: "clamp(4rem, 9vw, 7.5rem)"
  gutters: "clamp(1.25rem, 4vw, 4rem)"
max_width: "1160px"
```

## 1. Visuelles Thema & Atmosphäre

„Feldwissenschaft": die Ruhe und Präzision eines Versuchsfelds trifft Labor-Klarheit. Ruhig, bodenhaft, glaubwürdig — keine Start-up-Verspieltheit, kein Tech-Neon. Großeeditoriale Headlines (Fraunces) stehen neben nüchternen Daten-Zeilen (IBM Plex Mono). Die Seite atmet: großzügiger Weißraum, klare vertikale Rhythmik, Hairlines statt Schatten-Spiele. Das unvergessliche Element ist die **Live-Demo als „Instrument"** — sie fühlt sich an wie ein Messgerät, nicht wie ein Formular.

## 2. Farbpalette & Rollen

- **Feldnacht-Grün (#0E3B2E):** Authoritäts-Fläche. Hero- und Footer-Hintergrund, Demo-Panel-Rahmen. Nie für Fließtext auf sich selbst verwenden.
- **Blatt-Signalgrün (#2F9E44):** Der einzige „lebendige" Ton. Primäre CTAs, aktive Wizard-Zustände, positive Scores. Bewusst sparsam — es steht für Wachstum und Entscheidung.
- **Warmes Papier (#F7F5EF):** Grundfläche aller Inhaltssektionen; nimmt die Feld-/Papier-Anmutung auf und verhindert Steril-Weiß.
- **Tinten-Wald (#13271E):** Fließtext und Headlines auf hell.
- **Nebel-Linie (#D8D4C6):** 1px-Hairlines, Kartenrahmen, Tabellen-Separatoren. Ersetzt Schatten fast vollständig.
- **Ähren-Gold (#C99A2C):** Nur für Zahlen-Akzente und den Score-Balken der Demo. Ein Hauch Ernte im datenlastigen Kontext.
- **Wolkenweiß (#FFFFFF):** Karten und das Demo-Instrument auf Papier.

## 3. Typografie-Regeln

- **Fraunces** (optical size, Weight 500–600) für Hero und Sektions-Headlines — editorial, warm, unverwechselbar. Kein Tracking, leicht negativ bei Very Large.
- **IBM Plex Sans** (400/500/600) für Body, Navigation, UI. Nüchtern, wissenschaftlich geerdet.
- **IBM Plex Mono** für alle Zahlen mit Beweis-Charakter: Scores, Accession-IDs („EUR-116"), Kennzahlen-Band. Kleine Sizes, Uppercase-Labels in 0.75rem mit +0.08em Tracking („LIVE-DEMO", „SCHritt 01").
- Zeilenlänge Body max ~68ch; Absätze 0.95–1.05 line-height je Größe.

## 4. Komponenten-Stile

- **Buttons:** Rechteckig mit 4px-Radius. Primär: Blattgrün-Fläche, weiße Schrift, kein Gradient. Hover: 8% Verdunkelung + 2px Translate-Y. Sekundär: 1.5px Rahmen in Tinten-Wald, transparent.
- **Karten (Problem/Evidence):** Weiß auf Papier, 1px Nebel-Linie-Rahmen, 6px-Radius, KEIN Schatten (flach, seriös). Hover optional: Rahmen wird Feldnacht.
- **Demo-Instrument:** Weiße Karte mit 2px Feldnacht-Rahmen als „Gerät". Intern: Selects mit Mono-Labels, Ergebnisliste als Zeilen mit Score-Balken (Ähren-Gold), Rank-Nummern in Serif.
- **Inputs/Selects:** 1px Nebel-Linie-Rahmen, 4px-Radius, Fokus: 2px Blattgrün-Rahmen. Labels darüber in Micro-Label-Form.
- **Tag-Chips (Kulturen):** Pill, Papier-Hintergrund, Hairline-Rahmen.

## 5. Layout-Prinzipien

- Einspaltige Erzählung mit klaren Sektionsmarken (Micro-Label + Nummerierung 01–05).
- Hero: zweispaltig asymmetrisch (7/5) — Headline links, rechts ein statisches „Score-Panel"-Mockup mit echten Kernel-Zahlen; Hintergrund: feine SVG-Feldlinien (Pflugfurchen-Konturen) in 6% Deckkraft.
- Kennzahlen-Band: 4 Spalten, Mono-Zahlen groß, Hairline-Separatoren vertikal.
- Demo: volle Breite des Contents, das Instrument bleibt auch mobil ohne horizontalen Scroll (Selects stapeln).
- Footer: Feldnacht, 3 Spalten (Produkt / Adaptive AI Solutions / Rechtliches), on_dark_muted Sekundärtext.

## 6. Bewegung

Zurückhaltend und präzise: Einmalige Stagger-Fade-ups beim Laden (Hero-Elemente, 60ms Versatz), Zahlen im Kennzahlen-Band zählen hoch (800ms, ease-out). Demo-Ergebnisse erscheinen als 120ms-Stagger. Kein Parallax, kein Floaten. `prefers-reduced-motion` respektiert (Alles auf instant).

## 7. Right-Now-Realität (Inhalts-Wahrheitspflicht)

Alle angegebenen Zahlen stammen aus dem echten selftest/Kernel-Lauf (Identity-Retrieval 100 % auf 150 EURISCO-Accessions, 452 BSA-Sorten, 13 Fruchtarten) und sind im GitHub-Repo nachvollziehbar. Die Demo läuft mit dem unveränderten Kernel-Code aus `agrigen-matcher/mvp/` — keine Mock-Rankings.
