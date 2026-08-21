import data from '../data/chemical-compatibility.json';

export interface ChemRow {
  media: string;
  concentration: string | null;
  temp_f: string | null;
  temp_c: string | null;
  pvc: string | null;
  pp: string | null;
  pvdf: string | null;
  pfa: string | null;
  ptfe: string | null;
  ss316: string | null;
  family: string;
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getAllRows(): ChemRow[] {
  const rows: ChemRow[] = [];
  for (const fam of (data as any).families) {
    for (const r of fam.rows) {
      rows.push({ ...r, family: fam.name });
    }
  }
  return rows;
}

export interface ChemGroup {
  media: string;
  slug: string;
  family: string;
  rows: ChemRow[];
}

export function getChemicalGroups(): ChemGroup[] {
  const rows = getAllRows();
  const map = new Map<string, ChemGroup>();
  for (const r of rows) {
    const slug = slugify(r.media);
    if (!map.has(slug)) {
      map.set(slug, { media: r.media, slug, family: r.family, rows: [] });
    }
    map.get(slug)!.rows.push(r);
  }
  return Array.from(map.values()).sort((a, b) => a.media.localeCompare(b.media));
}

export const legend: Record<string, string> = (data as any).legend;
export const MATERIALS = ['pvc', 'pp', 'pvdf', 'pfa', 'ptfe', 'ss316'] as const;
export const MATERIAL_NAMES: Record<string, string> = {
  pvc: 'PVC',
  pp: 'Polypropylene (PP)',
  pvdf: 'PVDF',
  pfa: 'PFA',
  ptfe: 'PTFE',
  ss316: 'Stainless Steel 316',
};
export function ratingLabel(code: string | null | undefined): string {
  if (!code) return 'No rating published';
  const map: Record<string, string> = { E: 'Excellent', G: 'Good', F: 'Fair', C: 'Corroded' };
  return map[code] || code;
}
