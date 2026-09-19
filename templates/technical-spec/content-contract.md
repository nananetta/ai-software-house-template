# Semantic technical specification contract

The deliverable is `technical-specification.html`. It contains the complete document, inline SVG figures, embedded PlantUML sources, presentation CSS/JavaScript and a DOCX style mapping. Its only automatic external resources are two version-pinned JavaScript files from UNPKG: official `@plantuml/core@1.2026.6/plantuml.js` and `viz-global.js`. Diagram text stays in the browser. There are no external stylesheets, font files, images, WASM URLs, includes or diagram-server requests. Reference hyperlinks do not load until the reader follows them.

## Authoring separation

- `technical-specification.content.html` is the canonical semantic article. Edit content here, not in the assembled deliverable. It uses `article`, `section`, headings, paragraphs, lists, tables with captions/column headers, `figure` and `figcaption`. It contains no page-navigation controls or page CSS.
- `presentation/technical-specification.css` owns visual layout and print styling.
- `presentation/technical-specification.js` owns navigation, table scrolling, content export and sequential client-side PlantUML rendering.
- `presentation/docx-style-map.json` maps semantic document roles to DOCX style names. Bind these roles to the actual approved template when creating a DOCX. No DOCX template was supplied, so this is a mapping contract rather than a generated Word document or a claim of exact template fidelity.
- `presentation/diagram-snapshots.json` stores derived SVG fallback graphics with source/theme hashes. A stale snapshot is never embedded by the builder.
- `../qa/build-technical-spec.cjs` assembles all the above into one distributable HTML file. The assembly does not need to fetch the CDN. Change the source or theme, render/verify in the browser, capture updated snapshots and assemble again.

The deliverable remains self-contained for prose and embedded graphics if the CDN is unavailable. When available, the official renderer re-renders the sequence diagrams in the client. A status message distinguishes live rendering from the embedded fallback. No PlantUML source is displayed as prose. The static architecture/data/state SVGs are already embedded; their Graphviz sources are retained for authoring.

## Semantic extraction for a DOCX template

Read only `article#document-content`. The page chrome is outside it and carries `data-presentation-only`. Runtime table wrappers carry `data-presentation-only="wrapper"`; unwrap them rather than deleting their table children. Other presentation-only nodes are discarded. The built-in **Export content** action does this by using the original semantic article and adding the latest derived figure graphics.

| Content selector | DOCX role |
|---|---|
| `[data-docx-style="Title"]` | Template Title |
| `[data-docx-style="Subtitle"]` | Template Subtitle |
| `[data-docx-style="Heading1"]` | Template Heading 1 |
| `[data-docx-style="Heading2"]` | Template Heading 2 |
| `p`, `ol`, `ul`, `strong`, `em`, `a`, inline `code` | Native paragraphs, lists, text formatting and links using template definitions |
| `table`, `caption`, `thead`, scoped `th`, `tbody` | Native table with repeated header and template table/caption styles |
| `figure[data-role="diagram"]` | Figure graphic with caption and descriptive paragraph |
| `pre code` outside diagram-source | Code paragraph style defined by the template |

For each PlantUML figure, read `[data-role="diagram-source"] code` as the unmodified source and `[data-role="diagram-render"] svg` as its derived graphic. Keep the source for regeneration or optional appendix/metadata. Insert the graphic into Word, converting SVG to a print-resolution PNG if the document toolchain requires it. Do not copy PlantUML into the visible document body in place of the diagram. Place `figcaption` in the template's Caption style and preserve `data-role="diagram-description"` as explanatory text.

A converter should resolve actual template style IDs, numbering, page dimensions, header/footer, table rules and image sizing. Validate the resulting DOCX by rendering all pages; this HTML task does not perform or certify a future DOCX conversion.

## Single-file and integrity checks

The document carries an embedded `script#docx-style-map[type="application/json"]`. `script#diagram-config` and `style#presentation-styles` belong to the presentation layer. The content has stable section/table/figure identifiers for traceability. Only recognized local diagrams without external includes are rendered; render requests run serially because the PlantUML engine shares state. The sequence source has no skin/theme settings; the visual theme is injected by the presentation layer.

After editing content, check heading order, table header semantics, links, hidden diagram source preservation, both graphic outputs, browser script errors, mobile overflow and print output. With all network blocked, verified embedded diagrams should remain visible. With networking enabled, request logs must contain only the two pinned `.js` CDN dependencies.
