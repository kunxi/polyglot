# Polyglot

A side-by-side reference for comparing programming languages. Pick two languages on the home page and browse the same concepts rendered from a shared template.
[See it live](https://polyglot.kunxi.org/).

## Getting Started

Requires [Node.js](https://nodejs.org) >= 22.12.0.

```sh
npm install
npm run dev
```

Open http://localhost:4321.

## Development

| Command           | Action                                    |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the dev server at `localhost:4321`  |
| `npm run build`   | Build the static site into `./dist`       |
| `npm run preview` | Preview the production build locally      |
| `npm test`        | Run the unit tests (Vitest)               |

## How content works

- `src/content/meta.md` is the canonical template. It defines every section as `h2` (category) → `h3` (topic) → `h4` (group) → `h5` (leaf).
- Each language lives in `src/content/<lang>.md` and must only use sections that exist in `meta.md`. The build throws if a language defines an unknown section.
- The comparison page (`/[lang1]/vs/[lang2]`) renders the whole template and pulls the matching content from both languages.

## Project structure

```text
.
├── docs/adrs/                        # Architecture decision records
├── public/
│   ├── logos/                        # Language logos (SVG)
│   └── index.css                     # Global styles
├── src/
│   ├── content/                      # meta.md + one markdown file per language
│   ├── layouts/                      # Layout.astro
│   ├── lib/compare.ts                # Markdown parsing, validation, rendering
│   └── pages/
│       ├── index.astro               # Home (language picker)
│       └── [lang1]/vs/[lang2]/index.astro
└── tests/                            # Vitest tests + fixtures
```

## Adding a language

1. Create `src/content/<lang>.md` following the sections in `meta.md`.
2. Add its logo to `public/logos/<lang>.svg`.
