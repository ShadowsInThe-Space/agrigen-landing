/**
 * Browser-Entry für die AgriGen-Matcher-Live-Demo.
 *
 * Importiert den UNVERÄNDERTEN Kernel-Code aus dem öffentlichen
 * agrigen-matcher-Repository (mvp/) und den EURISCO-150-Beispielkatalog.
 * Keine Kopien, keine Mock-Rankings — was hier läuft, ist derselbe Code,
 * der im Selbsttest des Repos gegen Echtdaten gepinnt ist.
 *
 * Build: npx -y esbuild demo/entry.ts --bundle --format=iife --outfile=assets/demo.js
 */
import { buildCatalog, extractRequirements, WIZARD_TOLERANCE, type AccessionRecord, type FarmingRequirements } from '../../../agrigen-matcher/mvp/traits.ts'
import { queryGamma, rankCandidates } from '../../../agrigen-matcher/mvp/scoring.ts'
import records from '../../../agrigen-matcher/data/eurisco_150.json'

export interface DemoMatch {
  id: string
  cultivar: string
  species: string
  origin: string
  score: number
  similarity: number
}

const typedRecords = records as unknown as AccessionRecord[]

/** Katalog je Kultur vorbauen — die Normierung ist katalogrelativ (Demo-Note). */
const recordsByGenus = new Map<string, AccessionRecord[]>()
for (const record of typedRecords) {
  const list = recordsByGenus.get(record.genus) ?? []
  list.push(record)
  recordsByGenus.set(record.genus, list)
}
const catalogsByGenus = new Map<string, { ids: string[], rows: number[][] }>()
for (const [genus, list] of recordsByGenus) {
  const catalog = buildCatalog(list)
  catalogsByGenus.set(genus, { ids: catalog.ids, rows: catalog.rows })
}

function run(genus: string, requirements: FarmingRequirements, limit = 5): DemoMatch[] {
  const catalog = catalogsByGenus.get(genus)
  if (!catalog) return []
  const { vector, mask, directions } = extractRequirements(requirements)
  const gamma = queryGamma(catalog.rows, mask)
  const ranked = rankCandidates(catalog.rows, vector, mask, gamma, directions, WIZARD_TOLERANCE)
  return ranked.slice(0, limit).map(match => {
    const id = catalog.ids[match.index] ?? ''
    const record = recordsByGenus.get(genus)?.find(entry => entry.accession_id === id)
    return {
      id,
      cultivar: record?.cultivar ?? id,
      species: record?.species ?? '',
      origin: record?.origin_country ?? '',
      score: match.score,
      similarity: match.similarity,
    }
  })
}

const genera = [...recordsByGenus.keys()].sort()

;(window as unknown as { AGRIGEN: unknown }).AGRIGEN = { run, genera, count: typedRecords.length }
