// Cross-dataset lookups so a single chemical page (/chemicals/[slug]/) can surface
// everything LibertyCES has published about that chemical — not just the one
// compatibility table it started with. Zero new URLs; pure density gain on the
// 285 pages that already exist and already rank/cite. See
// LIBERTYCES-AI-CITATION-AND-REFERRAL-MASTER-PLAN.md Part 4, Layer 2a.
import sealData from '../data/seal-material-compatibility.json';
import pumpData from '../data/pump-material-resistance.json';
import tubeData from '../data/tube-compatibility.json';
import { slugify } from './chemicals';

export interface SealRow {
  chemical: string;
  ffkm: string;
  fkm_etp: string;
  tfe_p: string;
  fkm: string;
  hnbr: string;
}
export interface PumpRow {
  chemical: string;
  flammable: boolean;
  specific_gravity: string | null;
  cpvc: string;
  glass_filled_pp: string;
  pvdf: string;
  ryton_pps: string;
  etfe: string;
  ptfe: string;
  ss316: string;
  hastelloy_c276: string;
  titanium: string;
  carbon: string;
  ceramic: string;
  silicon_carbide: string;
  epdm: string;
  fkm: string;
  fep: string;
}
export interface TubeRow {
  chemical: string;
  flex_a_prene: string;
  flex_a_chem: string;
  flex_a_thane: string;
}

// The pump and tube datasets frequently carry concentration/qualifier variants as
// distinct records (e.g. "Sulfuric Acid, 50%", "Sulfuric Acid, Fuming") rather than
// one bare entry — unlike chemical-compatibility.json and seal-material-compatibility.json,
// which both use a single base name with concentration as a separate field. Strip the
// trailing ", <qualifier>" so "Sulfuric Acid" matches all of its concentration rows.
function baseSlug(name: string): string {
  const base = name.replace(/,\s*[^,]*$/, '').trim();
  return slugify(base || name);
}

function buildExactIndex<T extends { chemical: string }>(rows: T[]): Map<string, T> {
  const map = new Map<string, T>();
  for (const r of rows) {
    const slug = slugify(r.chemical);
    if (!map.has(slug)) map.set(slug, r);
  }
  return map;
}

function buildBaseIndex<T extends { chemical: string }>(rows: T[]): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const r of rows) {
    const slug = baseSlug(r.chemical);
    if (!map.has(slug)) map.set(slug, []);
    map.get(slug)!.push(r);
  }
  return map;
}

const sealExact = buildExactIndex(sealData as SealRow[]);
const pumpExact = buildExactIndex(pumpData as PumpRow[]);
const tubeExact = buildExactIndex(tubeData as TubeRow[]);
const sealBase = buildBaseIndex(sealData as SealRow[]);
const pumpBase = buildBaseIndex(pumpData as PumpRow[]);
const tubeBase = buildBaseIndex(tubeData as TubeRow[]);

/** Single-row lookup (used for the summary "does data exist" check). */
export function getSealRow(mediaName: string): SealRow | undefined {
  return sealExact.get(slugify(mediaName)) ?? sealBase.get(slugify(mediaName))?.[0];
}
export function getPumpRow(mediaName: string): PumpRow | undefined {
  return pumpExact.get(slugify(mediaName)) ?? pumpBase.get(slugify(mediaName))?.[0];
}
export function getTubeRow(mediaName: string): TubeRow | undefined {
  return tubeExact.get(slugify(mediaName)) ?? tubeBase.get(slugify(mediaName))?.[0];
}

/** Full multi-row lookup — returns every concentration variant found, e.g. all
 * "Sulfuric Acid, N%" pump rows for a chemical page titled "Sulfuric Acid". */
export function getSealRows(mediaName: string): SealRow[] {
  const exact = sealExact.get(slugify(mediaName));
  return exact ? [exact] : (sealBase.get(slugify(mediaName)) ?? []);
}
export function getPumpRows(mediaName: string): PumpRow[] {
  const exact = pumpExact.get(slugify(mediaName));
  return exact ? [exact] : (pumpBase.get(slugify(mediaName)) ?? []);
}
export function getTubeRows(mediaName: string): TubeRow[] {
  const exact = tubeExact.get(slugify(mediaName));
  return exact ? [exact] : (tubeBase.get(slugify(mediaName)) ?? []);
}

/** How many of the 4 datasets (chemical-compatibility + seal + pump + tube) cover this chemical. */
export function coverageDepth(mediaName: string, hasChemRow: boolean): number {
  let n = hasChemRow ? 1 : 0;
  if (getSealRow(mediaName)) n++;
  if (getPumpRow(mediaName)) n++;
  if (getTubeRow(mediaName)) n++;
  return n;
}
