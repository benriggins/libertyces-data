import data from '../data/engineering_rules.json';

export interface Rule {
  id: string;
  confidence: string;
  trigger_keywords: string[];
  avoid?: { category?: string; subtype_keywords?: string[] };
  recommend?: { manufacturer?: string; product_line?: string; category?: string };
  rationale: string;
  source: string;
}

export function getRules(): Rule[] {
  return (data as any).rules as Rule[];
}
