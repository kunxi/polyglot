# 001. meta.md as the canonical section template

- Status: Accepted
- Date: 2025-09-05

## Context

Each language currently has one Markdown file per topic (e.g. `types.md`,
`control-flow.md`, ...). Topic pages are generated per slug, and the table of
contents is assembled per language pair. This spreads the "what sections exist"
knowledge across many files and makes ordering/section drift hard to catch.

## Decision

1. Introduce a `meta.md` that lists **all** sections for a language. It is the
   superset of sections.
   - If a section in a concrete language is missing from `meta.md`, the build
     throws an exception.
2. The build uses `meta.md` as the **template** for rendering (section order and
   completeness come from `meta.md`).
3. Content side:
   - Consolidate the per-topic Markdown files into a single `kotlin.md` (and,
     by the same pattern, one file per language) using this section order:
     `["types", "control-flow", "function", "class", "collection", "iterator"]`.
   - Clean up each consolidated file so it has exactly **one** `h1` (e.g.
     `# Kotlin`), with each topic as an `h2` (`## Types`, `## Control Flow`,
     ...).
   - Update `src/pages/[lang1]/vs/[lang2]/index.astro` to render the whole
     consolidated content.
4. Drop `src/pages/[lang1]/vs/[lang2]/[slug].astro` — content is rendered in
   whole, so per-topic pages are no longer needed.

## Consequences

- Single source of truth for section order/superset (`meta.md`).
- Build fails loudly on missing/mismatched sections.
- Fewer generated routes (only `/lang1/vs/lang2`), no `/.../slug` pages.
- Consolidated content files are simpler (one `h1`, topics as `h2`).
