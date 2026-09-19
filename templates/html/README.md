# Reusable HTML Starters

Two shared shells provide presentation and specification behavior. Five semantic content outlines supply the role-specific starting points. The generated starters are editable examples with placeholders, not approved product requirements or designs.

## Choose a Starter

| Starter in `starters/` | Author | Product output |
|---|---|---|
| `ceo-presentation.html` | BA, reviewed by PM | `planning/ceo-presentation.html` |
| `functional-spec.html` | BA, reviewed by PM | `planning/functional-spec.html` |
| `ceo-tech-presentation.html` | Solution Architect | `architecture/ceo-tech-presentation.html` |
| `architecture-technical-spec.html` | Solution Architect | `architecture/technical-spec.html` |
| `implementation-technical-spec.html` | Tech Lead | `implementation/technical-spec.html` |

Open any generated starter directly in a browser. Each output is an independent HTML file containing its content, styles, controls, and PlantUML source. The only external runtime assets are pinned JavaScript libraries. Internet access is needed to load those libraries; prose remains readable without them.

## Build

From the repository root, rebuild all five starters with Python's standard library:

```sh
python3 templates/html/build.py
```

Rebuild only one starter with `--type functional-spec` (the type names match the starter filenames without `.html`). To assemble a product-owned article at its actual deliverable location:

```sh
python3 templates/html/build.py --type functional-spec \
  --content products/example-product/planning/functional-spec.content.html \
  --output products/example-product/planning/functional-spec.html
```

Replace the example product path with the actual product. For an architecture or implementation specification, select its corresponding type and use its phase's `technical-spec.html` output path. The builder does not contact Cloudflare or publish anything.

Shared files:

- `shells/presentation.html` and `shells/specification.html`: the two document shells.
- `style.css` and `runtime.js`: shared embedded styling and behavior.
- `outlines/`: authoritative starter article content; use these as product authoring starting points.
- `plantuml-license.txt`: dependency notices embedded by the builder.
- `starters/`: generated standalone HTML previews; rebuild after changing shared sources.

## Authoring Contract

Copy the relevant outline into the product's phase folder and replace placeholders with confirmed content or explicit unknowns. Keep authoring inputs within that product. Retain document type, version, owner, status, and upstream baseline metadata; never mark a new starter as approved.

Use one `article#document-content` as the authoritative semantic content. Keep titles, paragraphs, lists, tables, and requirement/decision IDs as native HTML. Presentation sections are slides; specification sections form a flowing document. The reading order must match the intended extraction and print order. Navigation and controls belong outside the article.

Diagrams are figures containing a caption, description, embedded inert PlantUML script, and generated output area. Edit the PlantUML script and rebuild/reload; do not edit generated SVG. Use self-contained diagrams without remote includes. The starters demonstrate the supported diagram syntax; test new diagram types and larger diagrams before delivery.

Prefer editing product-owned outline content and rebuilding with the shared mechanics. A directly edited standalone output also works, but choose one authoritative editing workflow per document to avoid overwriting changes during a later build. Retained approval snapshots remain immutable under the product-tracking rules.

## Review and Delivery

Use the shared [document standards](../../playbooks/document-standards.md) as the content and delivery contract. Follow the [presentation style](../default-presentation-style.md) and existing CEO approval gates. A populated starter is not automatically a reviewed deliverable.

Check every changed document's text, diagrams, navigation, content extraction, narrow-screen layout, and printed PDF. The print control waits for diagram rendering. If dependencies fail, restore connectivity and reload before expecting diagrams in the PDF. Browser-menu printing uses the same stylesheet but requires rendering to finish first.

Keep the final presentation or specification as a single HTML file at the product output path above. PDF files created for verification are optional deliverables; the HTML remains the editable source of the delivered content.

## Repeatable Verification

With Node.js, `playwright`, `pdfjs-dist`, and Google Chrome available, run:

```sh
node templates/html/verify.cjs
```

`NODE_PATH` can point to an existing dependency directory. The checker installs nothing. It opens each generated file in an isolated browser context, tests the two pinned CDN requests and actual diagram output, exercises navigation and print readiness, checks 390px layouts, extracts semantic content with JavaScript disabled, and verifies the blocked-CDN fallback. It also saves PDFs and checks page orientation, selectable text, section coverage, and one page per slide.

Evidence goes to `/tmp/html-starter-qa` by default; override with `HTML_QA_OUTPUT`. Use `HTML_QA_TYPES=functional-spec` to check one starter, or provide a comma-separated list. Inspect the generated PDFs visually as well: automated checks cannot establish that changed content is well composed. A failed CDN request is a failed live-render check, not a reason to bypass it; restore connectivity and rerun the affected file.

## Renderer Provenance

The runtime uses official [PlantUML `@plantuml/core`](https://www.npmjs.com/package/%40plantuml/core), compiled with TeaVM, and its bundled Viz.js distribution. Follow the pinned versions in the shared runtime when maintaining dependencies. See the upstream [browser integration guidance](https://github.com/plantuml/plantuml/blob/master/src/main/resources/teavm/GITHUB_INTEGRATION.md) for its asynchronous rendering API. Review and retain upstream license notices when updating either dependency.
