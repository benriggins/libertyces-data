// Process-chemistry equipment guides: /chemicals/<slug>/ pages for fluids that the main
// site (www.libertyces.com/chemicals/<slug>) links to but that are not rows in the
// Flowline compatibility chart under that name (lime slurry, cyanide, ferric chloride,
// chlorine gas, abrasive mining slurry).
//
// Rule for this file: NOTHING is written by hand except the row selectors below. Every
// number, rating, and sentence rendered on a guide page is pulled verbatim from the
// published datasets in src/data/ (compat chart, seal, pump, tube, hydromet, leach-stage,
// engineering rules). A selector names rows by exact dataset name; if the name is not in
// the dataset the build throws, so a guide can never silently reference missing data.
// LibertyCES supplies EQUIPMENT for handling these fluids, never the fluids themselves.
import sealData from '../data/seal-material-compatibility.json';
import pumpData from '../data/pump-material-resistance.json';
import tubeData from '../data/tube-compatibility.json';
import hydromet from '../data/hydromet-material-selection.json';
import stages from '../data/leach-circuit-equipment-by-stage.json';
import { getChemicalGroups, type ChemGroup } from './chemicals';
import { getRules, type Rule } from './rules';
import type { SealRow, PumpRow, TubeRow } from './related-data';

export interface GuideSpec {
  slug: string;
  name: string;
  /** Main-site equipment guide exists at www.libertyces.com/chemicals/<slug> for every spec here. */
  compat: string[];   // chemical-compatibility.json group slugs
  seal: string[];     // exact seal dataset chemical names
  pump: string[];     // exact pump dataset chemical names
  tube: string[];     // exact tube dataset chemical names
  hydromet: string[]; // exact hydromet "chemical" values
  stages: string[];   // exact process_stage values
  rules: string[];    // engineering_rules ids
  related: { href: string; label: string }[];
  scopeNote: string;  // factual statement about what the page does / does not contain
}

export const GUIDES: GuideSpec[] = [
  {
    slug: 'ferric-chloride',
    name: 'Ferric Chloride',
    compat: [],
    seal: ['FERRIC CHLORIDE'],
    pump: ['Ferric Chloride'],
    tube: ['Ferric Chloride, 43% in w'],
    hydromet: [],
    stages: [],
    rules: ['ferric-chloride-sulfate-frp-incompatible', 'ferrics-alums-polymers-need-heat-mixing-scrubber'],
    related: [
      { href: '/chemicals/ferrous-chloride/', label: 'Ferrous Chloride (Flowline chart)' },
      { href: '/chemicals/ferric-hydroxide/', label: 'Ferric Hydroxide (Flowline chart)' },
    ],
    scopeNote: 'The Flowline compatibility chart used for the PVC/PP/PVDF/PFA/PTFE/316 SS table elsewhere on this site does not list ferric chloride, so no such table is shown here. Ratings below come from the seal, pump, and peristaltic-tube datasets, which do.',
  },
  {
    slug: 'chlorine-gas',
    name: 'Chlorine Gas',
    compat: [],
    seal: ['CHLORINE', 'CHLORINE, DRY GAS', 'CHLORINE, WET', 'CHLORINE, WET GAS'],
    pump: ['Chlorine, Liquid'],
    tube: [],
    hydromet: ['Chlorine Gas / Chlorine Dioxide'],
    stages: [],
    rules: ['chlorine-gas-monel-hastelloy-vented-ball-valve', 'ald-diaphragm-chlorine-nitric-acid-limits-heap-leaching'],
    related: [
      { href: '/chemicals/sodium-hypochlorite/', label: 'Sodium Hypochlorite' },
      { href: '/chemicals/hypochlorous-acid/', label: 'Hypochlorous Acid (Flowline chart)' },
      { href: '/chemicals/bromine-vapor/', label: 'Bromine Vapor (Flowline chart)' },
    ],
    scopeNote: 'The Flowline compatibility chart does not list chlorine, and the peristaltic-tube dataset has no chlorine entry. The pump dataset publishes liquid chlorine only (no gas-phase row), so that row is shown labeled as liquid for reference. Seal rows are the dataset\'s own chlorine entries, listed by their exact names.',
  },
  {
    slug: 'cyanide',
    name: 'Cyanide',
    compat: ['sodium-cyanide-solution', 'potassium-cyanide', 'copper-cyanide'],
    seal: ['SODIUM CYANIDE', 'POTASSIUM CYANIDE', 'CALCIUM CYANIDE', 'COPPER CYANIDE'],
    pump: ['Sodium Cyanide NaCN', 'Potassium Cyanide KCN'],
    tube: ['Sodium Cyanide, 30% in w', 'Potassium Cyanide, 33% in w'],
    hydromet: ['Barren Cyanide Solution'],
    stages: ['Cyanide Destruction / Precipitation (gold/silver route)'],
    rules: ['cyanide-destruction-ph-orp-setpoints', 'ph-orp-electrode-poisoning-ion-selection'],
    related: [
      { href: '/chemicals/hydrocyanic-acid/', label: 'Hydrocyanic Acid (Flowline chart)' },
      { href: '/chemicals/mercuric-cyanide/', label: 'Mercuric Cyanide (Flowline chart)' },
      { href: '/chemicals/plating-solutions-gold/', label: 'Plating Solutions (Gold) (Flowline chart)' },
      { href: '/hydromet-material-selection/', label: 'Hydrometallurgical Duty-Class Material Selection' },
      { href: '/leach-circuit-equipment-by-stage/', label: 'Leach-Circuit Equipment by Process Stage' },
    ],
    scopeNote: 'This page collects the sodium, potassium, calcium and copper cyanide entries from each dataset. Other cyanide compounds in those datasets (for example barium, cadmium, nickel, silver, zinc, mercuric) are not repeated here; see the related links and the full dataset pages.',
  },
  {
    slug: 'lime-slurry',
    name: 'Lime Slurry',
    compat: ['calcium-hydroxide'],
    seal: ['CALCIUM HYDROXIDE', 'MILK OF LIME'],
    pump: ['Calcium Hydroxide'],
    tube: ['Lime Slurry (Calcium Hydroxide)', 'Calcium Hydroxide, 20% in water'],
    hydromet: [],
    stages: [],
    rules: ['crystallizing-slurry-no-valves-seals', 'peristaltic-for-abrasive-leach-streams'],
    related: [
      { href: '/chemicals/calcium-hydroxide/', label: 'Calcium Hydroxide (Flowline chart)' },
      { href: '/chemicals/barium-hydroxide/', label: 'Barium Hydroxide (Flowline chart)' },
    ],
    scopeNote: 'Rows are listed under the dataset\'s own names (calcium hydroxide, milk of lime, lime slurry). The datasets rate these as chemicals; solids loading and slurry abrasion are covered by the engineering rules below, not by the compatibility ratings.',
  },
  {
    slug: 'abrasive-mining-slurry',
    name: 'Abrasive Mining Slurry',
    compat: [],
    seal: [],
    pump: [],
    tube: [],
    hydromet: ['Abrasive Leach Slurry', 'Leach Solution (acid or cyanide)', 'Light Slurry', 'Leach Circuit Brine Slurry'],
    stages: ['Thickening / Dewatering / Tailings'],
    rules: [
      'abrasive-slurry-no-centrifugal',
      'peristaltic-for-abrasive-leach-streams',
      'knife-gate-for-slurry-isolation',
      'schurco-p-series-light-slurry-only',
      'combined-corrosion-abrasion-glass-ceramic-strainer',
    ],
    related: [
      { href: '/hydromet-material-selection/', label: 'Hydrometallurgical Duty-Class Material Selection' },
      { href: '/leach-circuit-equipment-by-stage/', label: 'Leach-Circuit Equipment by Process Stage' },
      { href: '/chemicals/lime-slurry/', label: 'Lime Slurry' },
    ],
    scopeNote: 'Abrasive slurry is a duty class, not a single chemical, so there is no chemical-compatibility chart for it. Everything below is equipment-selection data: vendor-sourced duty-class verdicts and the engineering rules fired on this duty.',
  },
];

export const GUIDE_BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));

function pick<T extends { chemical: string }>(rows: T[], names: string[], label: string): T[] {
  return names.map((n) => {
    const r = rows.find((x) => x.chemical.toLowerCase() === n.toLowerCase());
    if (!r) throw new Error(`chemical-guides: "${n}" not found in ${label} dataset`);
    return r;
  });
}

export interface GuideData {
  spec: GuideSpec;
  compat: ChemGroup[];
  seal: SealRow[];
  pump: PumpRow[];
  tube: TubeRow[];
  hydromet: any[];
  stages: any[];
  rules: Rule[];
}

export function loadGuide(slug: string): GuideData {
  const spec = GUIDE_BY_SLUG.get(slug);
  if (!spec) throw new Error(`chemical-guides: unknown guide ${slug}`);
  const groups = getChemicalGroups();
  const compat = spec.compat.map((s) => {
    const g = groups.find((x) => x.slug === s);
    if (!g) throw new Error(`chemical-guides: compat group ${s} not found`);
    return g;
  });
  const hrows = (hydromet as any).rows as any[];
  const hsel = spec.hydromet.flatMap((c) => {
    const m = hrows.filter((r) => r.chemical === c);
    if (m.length === 0) throw new Error(`chemical-guides: hydromet chemical ${c} not found`);
    return m;
  });
  const srows = (stages as any).rows as any[];
  const ssel = spec.stages.map((p) => {
    const r = srows.find((x) => x.process_stage === p);
    if (!r) throw new Error(`chemical-guides: stage ${p} not found`);
    return r;
  });
  const allRules = getRules();
  const rules = spec.rules.map((id) => {
    const r = allRules.find((x) => x.id === id);
    if (!r) throw new Error(`chemical-guides: rule ${id} not found`);
    return r;
  });
  return {
    spec,
    compat,
    seal: pick(sealData as SealRow[], spec.seal, 'seal'),
    pump: pick(pumpData as PumpRow[], spec.pump, 'pump'),
    tube: pick(tubeData as TubeRow[], spec.tube, 'tube'),
    hydromet: hsel,
    stages: ssel,
    rules,
  };
}
