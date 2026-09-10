// The Referral Bridge. Real, verified (200-checked 2026-09-10) links from
// www.libertyces.com — the piece missing from every one of the 285 chemical pages,
// which previously ended at a chart/index/CSV/JSON and named no equipment, no
// supplier, no person. See LIBERTYCES-AI-CITATION-AND-REFERRAL-MASTER-PLAN.md
// Part 2 ("citation without referral") and Part 4, Layer 1d.
//
// Equipment-only positioning throughout (standing rule): never "chemical supplier,"
// always the equipment that stores/transfers/pumps/meters/controls/contains it.

export interface EquipLink {
  label: string;
  href: string;
}

const SITE = 'https://www.libertyces.com';

// One real link per chemical family — LibertyCES's own main-site guides, chosen for
// direct topical relevance to that family's chemistry, not generic filler.
export const FAMILY_EQUIPMENT_LINKS: Record<string, EquipLink[]> = {
  'acids': [
    { label: 'Sulfuric Acid (93–98%) Tank & Piping Material Selection', href: `${SITE}/guides/sulfuric-acid-93-98-percent-tank-piping-material-selection` },
    { label: 'Chemical Acid Transfer Hoses — Suction & Discharge', href: `${SITE}/guides/chemical-acid-transfer-hoses-suction-discharge` },
    { label: 'CPVC Injection Point Failure in Concentrated Sulfuric Acid', href: `${SITE}/guides/cpvc-injection-point-failure-concentrated-sulfuric-acid` },
    { label: 'Hydrofluoric Acid pH Sensor Selection Guide', href: `${SITE}/guides/hydrofluoric-acid-ph-sensor-selection-guide` },
  ],
  'caustics-bases': [
    { label: 'Industrial Wastewater pH Control Equipment', href: `${SITE}/guides/industrial-wastewater-ph-control` },
    { label: 'Wastewater pH System Specification Checklist', href: `${SITE}/guides/wastewater-ph-system-specification-checklist` },
  ],
  'salts-brines': [
    { label: 'FRP Chemical Storage Tanks', href: `${SITE}/guides/frp-tanks` },
    { label: 'HDPE Chemical Storage Tanks', href: `${SITE}/guides/hdpe-tanks` },
    { label: '316 Stainless Steel Corrosion in Common Chemicals', href: `${SITE}/guides/316-stainless-steel-corrosion-common-chemicals` },
  ],
  'specialty-and-uncommon-media': [
    { label: 'Environmental Stress Cracking vs. Chemical Resistance', href: `${SITE}/guides/environmental-stress-cracking-vs-chemical-resistance` },
    { label: 'Industrial Process Piping Systems', href: `${SITE}/guides/industrial-process-piping-systems` },
  ],
  'hydrocarbons-fuels-and-oils': [
    { label: 'Industrial Fluid Sealing & Tubing', href: `${SITE}/guides/industrial-fluid-sealing-tubing` },
    { label: 'Buna-N vs. EPDM vs. FKM vs. PTFE', href: `${SITE}/guides/buna-n-vs-epdm-vs-fkm-vs-ptfe` },
  ],
  'solvents-and-organics': [
    { label: 'Buna-N vs. EPDM vs. FKM vs. PTFE', href: `${SITE}/guides/buna-n-vs-epdm-vs-fkm-vs-ptfe` },
    { label: 'Environmental Stress Cracking vs. Chemical Resistance', href: `${SITE}/guides/environmental-stress-cracking-vs-chemical-resistance` },
  ],
  'oxidizers-disinfectants': [
    { label: 'Hydrogen Peroxide Equipment Selection Guide', href: `${SITE}/guides/hydrogen-peroxide-equipment-selection-guide` },
    { label: 'Chlorine Dioxide Generator Selection Guide', href: `${SITE}/guides/chlorine-dioxide-generator-selection-guide` },
    { label: 'Peracetic Acid Equipment Selection Guide', href: `${SITE}/guides/peracetic-acid-equipment-selection-guide` },
    { label: 'Sodium Hypochlorite Valve Material Selection', href: `${SITE}/guides/sodium-hypochlorite-valve-material-selection` },
  ],
  'metal-plating-and-photographic-solutions': [
    { label: 'Chrome Reduction & Cyanide Destruction pH/ORP Control', href: `${SITE}/guides/chrome-reduction-cyanide-destruction-ph-orp-control` },
  ],
  'food-beverage-and-biological-process-fluids': [
    { label: 'Food & Beverage Process Water Filtration (NSF/FDA)', href: `${SITE}/guides/food-beverage-process-water-filtration-nsf-fda` },
  ],
  'gases-and-elemental-inorganic-misc': [
    { label: 'Chlorine Gas Valve Selection (Monel/Hastelloy)', href: `${SITE}/guides/chlorine-gas-valve-selection-monel-hastelloy` },
    { label: 'Semiconductor Fume Scrubber & Exhaust', href: `${SITE}/guides/semiconductor-fume-scrubber-exhaust` },
  ],
  'water-aqueous': [
    { label: 'Industrial Process Piping Systems', href: `${SITE}/guides/industrial-process-piping-systems` },
  ],
};

// Links for the 3 standalone material-dataset pages (seal, pump, tube) — same idea,
// scoped to the equipment class the material serves.
export const SEAL_EQUIPMENT_LINKS: EquipLink[] = [
  { label: 'Buna-N vs. EPDM vs. FKM vs. PTFE', href: `${SITE}/guides/buna-n-vs-epdm-vs-fkm-vs-ptfe` },
  { label: 'EPDM Chemical Compatibility Guide', href: `${SITE}/guides/epdm-compatibility-guide` },
  { label: 'Industrial Valves, Actuators & SCADA', href: `${SITE}/guides/industrial-valves-actuators-scada` },
];
export const PUMP_EQUIPMENT_LINKS: EquipLink[] = [
  { label: 'Chemical Pumps Failure Guide', href: `${SITE}/guides/chemical-pumps-failure-guide` },
  { label: 'Chemical Transfer Pumps', href: `${SITE}/guides/chemical-transfer-pumps` },
];
export const TUBE_EQUIPMENT_LINKS: EquipLink[] = [
  { label: 'Industrial Fluid Sealing & Tubing', href: `${SITE}/guides/industrial-fluid-sealing-tubing` },
  { label: 'Chemical Transfer Pumps', href: `${SITE}/guides/chemical-transfer-pumps` },
];
export const PIPING_EQUIPMENT_LINKS: EquipLink[] = [
  { label: 'Industrial Pipe Fittings & Flanges', href: `${SITE}/guides/industrial-pipe-fittings-flanges-supply` },
  { label: 'Industrial Process Piping Systems', href: `${SITE}/guides/industrial-process-piping-systems` },
];

// The 13 chemicals that also have their own dedicated page on the main commercial
// site (verified 2026-09-10, same slug on both properties) — these get a direct,
// named cross-link instead of only the family-level guide list.
export const MAIN_SITE_CHEMICAL_SLUGS = new Set([
  'abrasive-mining-slurry', 'chlorine-gas', 'cyanide', 'ferric-chloride',
  'hydrochloric-acid', 'hydrofluoric-acid', 'hydrogen-peroxide', 'lime-slurry',
  'nitric-acid', 'sodium-hydroxide', 'sodium-hypochlorite', 'sulfuric-acid',
  'uranium-radionuclide',
]);

export const JAMES_BIO_URL = `${SITE}/james-riggins-treatment-water-expert`;
export const SPEC_REVIEW_URL = (from: string) => `${SITE}/contact-expert-guidance?from=${encodeURIComponent(from)}`;
