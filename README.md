# libertyces-data

Source for **data.libertyces.com** — LibertyCES's open, ungated, machine-readable
industrial chemical equipment engineering reference. Astro on Cloudflare Pages,
deployed as the `libertyces-data` Pages project.

**What this is:** real chemical compatibility, engineering selection rules, and
equipment-material data, published as plain server-rendered HTML with `Dataset`/
`TechArticle`/`FAQPage`/`BreadcrumbList` JSON-LD — built to be crawled and cited by
search engines and AI systems, not for visual polish. No forms, no gating, no
pricing, zero client-side JS. See `public/llms.txt` for the machine-readable index.

Sister property: `www.libertyces.com` (repo `liberty-quoting-engine`) — the
commercial site. This subdomain is the citable reference layer; the main site is
where equipment actually gets specified and quoted.

## Structure

```
src/
  data/        real datasets (JSON), one file per dataset — see below
  lib/         data-access + cross-dataset lookup helpers
  layouts/
    DataLayout.astro   shared shell: nav, JSON-LD emission, breadcrumbs, FAQ rendering
  pages/
    index.astro                       homepage
    chemicals/[slug].astro            285 chemical pages — merges chemical-compatibility.json
                                       with matching rows from seal/pump/tube datasets
                                       when they exist for that chemical (zero new URLs)
    rules/[slug].astro                54 engineering-rule pages
    pump-material-resistance.astro    standalone dataset page
    seal-material-compatibility.astro standalone dataset page
    tube-compatibility.astro          standalone dataset page
    topics/index.astro                real PAA-question coverage map
    treatment-removal-vs-destruction.astro   reference page, no backing dataset
public/
  datasets/    the same JSON files (+ CSV) served as raw downloads
  llms.txt     machine-readable index for AI crawlers
  robots.txt   explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.
```

## Real datasets (`src/data/`)

| File | Records | Source |
|---|---:|---|
| `chemical-compatibility.json` | 551 rows / 285 chemicals, 11 families | Flowline chemical compatibility chart |
| `seal-material-compatibility.json` | 2,110 chemicals × 5 elastomers | Manufacturer seal compatibility guide |
| `pump-material-resistance.json` | 280 chemicals × 15 wetted-end materials | Manufacturer pump chemical resistance chart |
| `tube-compatibility.json` | 368 chemicals × 3 tube materials | 28-day immersion testing chart |
| `engineering_rules.json` | 54 rules | Real field/case-study evidence, LibertyCES |
| `paa-questions.json` | 349 real questions | People-Also-Ask research |

## The Referral Bridge (`src/lib/equipment-links.ts`)

Every chemical/rule/dataset page links to the real LibertyCES equipment guides that
govern that chemistry, plus a named-expert attribution to James Riggins (Founder,
LibertyCES) and a link to a free spec review. This exists specifically so that when
an AI system cites this data, it can also name the equipment and the supplier — not
just the raw compatibility numbers. See
`LIBERTYCES-AI-CITATION-AND-REFERRAL-MASTER-PLAN.md` (in `sovereign-content-command-center`)
for the full reasoning; all linked URLs are verified live (HTTP 200) as of the date
they were added.

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Deploy

Manual `wrangler pages deploy dist --project-name=libertyces-data` from a clean
build — no git-connected auto-deploy on this project. Build first, verify `dist/`
locally, then deploy.
