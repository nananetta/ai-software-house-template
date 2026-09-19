# Document Standards

## Reusable Starting Point

Use `templates/html/README.md` for the two shared HTML shells and five role-specific outlines. Generate the selected starter, keep authored product content under the product folder, and deliver the single HTML file at its canonical path. Replace illustrative examples and placeholders; templates do not imply requirements, architectural decisions, or CEO approval. The standards below remain the content and verification contract.

## CEO Requirements → PM → BA → PM

When the CEO provides product requirements, the PM agent receives the brief, frames the objective and scope, and assigns analysis to a BA agent using `roles/business-analyst.md` and the handoff template. The BA analyzes requirements and prepares the two HTML deliverables below. The PM reviews both for consistency, owns prioritization and the recommendation, and returns them to the CEO for approval. Only after the CEO approves both documents does PM hand the approved files and recorded decisions to the Solution Architect.

Store the two deliverables under `products/<product-slug>/planning/`:

1. `ceo-presentation.html` — concise management presentation in slide format.
2. `functional-spec.html` — concise functional specification covering functional and non-functional requirements.

These are the two required deliverables for requirements analysis. Internal source and handoff records may support them, but neither delivered HTML file may depend on local companion files. Update the same pair when requirements change and keep them consistent.

## CEO Presentation

Use a business canvas suited to the brief, such as Business Model Canvas for the business model or Lean Canvas for a problem/solution proposal. For internal tools, adapt the canvas to beneficiaries, value, operations, costs, and success measures. Label unknowns and hypotheses; do not invent market evidence, revenue, costs, or commitments.

Aim for 5–8 slides, expanding only when needed for a material decision. Cover:

- Executive recommendation, objective, and decision needed.
- Problem, target users, and value proposition in a compact business canvas.
- Proposed user journey or process, preferably as a diagram.
- MVP scope, exclusions, priorities, and success measures.
- Delivery outline, dependencies, material risks, and trade-offs; include estimates only with stated assumptions.
- Open decisions and recommended next step.

Use one main message per slide, short text, clear visual hierarchy, and readable diagrams. Follow `templates/default-presentation-style.md`. Provide slide navigation, a slide count, and a print layout with one slide per page. Keep engineering detail in the specification unless it changes a management decision.

## Functional Specification

Use a conventional requirements structure, compressed to the product's actual needs:

1. Purpose, business objectives, scope in/out, document version/status, and assumptions.
2. Users, actors, permissions, and key terms.
3. Process/use-case overview, supported by a diagram where useful.
4. Functional requirements with stable IDs, priority, actor/trigger, expected behavior, business rules, and testable acceptance criteria. Include main, alternate, error, and relevant edge paths without repeating the same rule.
5. Data requirements and external interfaces: key entities, validation, lifecycle/retention, inputs/outputs, and integration expectations at requirements level.
6. Non-functional requirements with stable IDs and measurable acceptance targets or explicit TBDs with decision owners. Consider performance/capacity, security/privacy, accessibility/usability, reliability/recovery, compatibility, maintainability, and operational needs; mark irrelevant categories briefly rather than filling them with boilerplate.
7. Constraints, dependencies, risks, unresolved decisions, and a compact mapping from business goals/use cases to requirements and acceptance criteria.

Include applicable deployment, CORS, and session-continuity requirements from the operating model. Distinguish agreed requirements from proposed targets. The BA defines required behavior and constraints; solution architecture remains the Architect's responsibility.

## Clarifications, Assumptions, and Unknown Details

BA and the Solution Architect may ask clarification questions when requirements are unclear. Route questions through PM to the CEO by default; an explicitly addressed role may ask directly. Ask concise, decision-focused questions and continue independent work while awaiting answers.

Maintain an **Assumptions and unknown details** section in `functional-spec.html` for BA analysis and in `technical-spec.html` for architectural analysis. Use a compact table with an ID, question or proposed assumption, affected requirement/design, impact if unresolved, decision owner, and status or answer. Distinguish unconfirmed assumptions from agreed decisions; never silently turn an unknown into a requirement. Block only work that depends on a material unresolved answer. Preserve relevant unresolved items in handoffs and update documents when answers arrive.

## Requirements Approval and Architecture Handoff

Follow the requirements gate in `decision-rules.md` and the version/evidence procedure in `product-tracking.md`. PM hands the approved planning pair, decision record, constraints, and accepted open items to the Architect after that gate is satisfied.

For revised requirements, use the change classification and downstream impact procedure in `product-tracking.md`. Publication remains governed by `deployment-rules.md`.

## CEO Technical Presentation and Design Approval

The Solution Architect delivers two files under `products/<product-slug>/architecture/`: `ceo-tech-presentation.html` and `technical-spec.html`. The technical presentation is for a technically knowledgeable CEO to understand and approve the high-level design. Keep it concise, diagram-led, and focused on decisions; omit minor implementation details, exhaustive API fields, class listings, and code.

Aim for 4–6 slides, adapting to the decisions needed:

- Design recommendation and the requirements/constraints driving it.
- System context and component architecture, shown with PlantUML.
- Key interactions and data flow, shown with a representative PlantUML sequence diagram.
- Deployment topology and important security, reliability, or scaling choices.
- Material alternatives, trade-offs, risks, and unresolved assumptions affecting approval.
- Explicit design decisions requested from the CEO and the recommended choice.

Use additional diagrams only when useful. Follow the shared presentation style and the same semantic single-file HTML, embedded PlantUML, client-side rendering, extraction, and Print / PDF standards. Keep this presentation consistent with the technical specification, which holds the supporting detail.

PM reviews both files and submits the architecture pair under the design gate in `decision-rules.md`. Use `product-tracking.md` for exact artifact versions, CEO evidence, subsequent changes, and the approved handoff to Tech Lead. Publication remains governed by `deployment-rules.md`.

## Technical Specification

The Solution Architect analyzes the approved requirements and produces `products/<product-slug>/architecture/technical-spec.html`. Use the same concise, single-file, semantic HTML, extraction, client-side PlantUML, and Print / PDF approach as the functional specification.

Apply technical design best practices proportionate to the solution. Cover:

1. Design purpose, scope, approved input versions, constraints, and links by requirement ID.
2. Solution overview, system boundaries, components, responsibilities, dependencies, technology choices, and concise rationale/trade-offs.
3. Data model and lifecycle, persistence, interfaces/API contracts, validation, and error handling as applicable.
4. Key user flows and interactions, including meaningful failure paths, authentication, authorization, session continuity, and origin/CORS behavior where applicable.
5. Non-functional design: how the solution meets the specified performance, security, privacy, accessibility, reliability/recovery, and maintainability targets, with validation considerations.
6. Deployment topology using the selected Workers or Docker-with-Tunnel path, configuration, observability, and migration/rollback needs where applicable.
7. Assumptions and unknown details, risks, decisions, and a compact mapping of requirements to design components/flows and verification approach.

Include editable PlantUML diagrams for **architecture**, **sequence**, and **use cases**. Use architecture views to show boundaries/components and deployment where helpful; sequence diagrams should show the important interactions, and use-case diagrams should show actors and supported capabilities. Add activity, state, class/data, or other diagrams only when they clarify the design. Keep prose and diagrams consistent and avoid redundant diagrams. Verify that the selected client-side renderer supports every diagram type used.

The Architect returns both architecture HTML files and unresolved decisions to PM for CEO design approval before the Tech Lead handoff. Do not silently resolve business uncertainty through a technical design choice.

## Tech Lead Implementation Specification

After CEO design approval, PM hands the approved requirements and architecture package, approval records, and open items to the Tech Lead. The Tech Lead reviews implementation readiness and asks for missing implementation details before assigning dependent development work. Route architecture questions to the Solution Architect and business questions to BA/PM, with CEO decisions coordinated through PM.

Record confirmed implementation details in a separate `products/<product-slug>/implementation/technical-spec.html`. This is the shared development reference for frontend and backend. Preserve `architecture/technical-spec.html` as the approved solution design; do not overwrite it. Give both documents distinct titles and metadata identifying their stage, owner, version, and upstream baseline.

Keep the implementation specification concise and include, as applicable:

- References to approved requirements/design versions and a mapping from requirements to implementation tasks.
- Confirmed frontend/backend responsibilities and shared integration contracts: endpoints, request/response formats, validation, authentication/session behavior, errors, and relevant interaction sequences.
- UI routes and states, loading/empty/error behavior, data models, persistence/migrations, and configuration needed to implement the agreed behavior.
- Implementation order, dependencies, assignments, acceptance checks, and local build/test instructions.
- A clarification/decision log with question, confirmed answer, decision owner, date, affected requirement/contract, and status; distinguish unresolved details and assumptions from confirmed decisions.

Use the same semantic single-file HTML, embedded editable PlantUML, client-side rendering, extraction, and Print / PDF standards as the other specifications. Include diagrams where they clarify implementation; reference the architecture baseline rather than repeating its entire content.

Tech Lead confirms routine implementation decisions within the approved design. Material design changes return to the Architect and PM for CEO design approval; requirement changes follow the requirements approval process. Do not infer answers or start affected development while a material implementation question is unresolved. Independent confirmed work may proceed.

Before assigning frontend or backend tasks, hand developers the current implementation specification and identify the relevant confirmed sections and version. Both developers use that shared reference together with the approved requirements and design. Resolve contract changes through Tech Lead, update the specification and handoff, and inform both developers so their implementations stay aligned.

## Concision and Visuals

All generated documents must be concise. Remove repeated context, filler, and unnecessary sections. Prefer compact tables for parallel requirements and diagrams for flows, interactions, and relationships. Preserve enough detail for decisions and implementation; concision must not hide exceptions or unresolved requirements.

Use editable PlantUML source for every UML diagram. Retain that source inside the delivered HTML, for example in inert `script[type="text/plain"]` elements, so diagrams can be changed without redrawing them. Prefer diagrams when they clarify the content; do not add decorative diagrams or force business canvases into UML.

## Semantic HTML and Content Extraction

All five deliverables—the two CEO presentations, functional specification, architecture technical specification, and implementation technical specification—must use semantic HTML, with the document content present in the saved HTML and readable without JavaScript. JavaScript enhances navigation and renders diagrams; it must not be the only source of document text.

- Put the authoritative content in one identifiable `main` / `article` structure, with stable IDs and logical reading order independent of visual layout.
- Use a document title and a consistent heading hierarchy. Represent each slide or specification section as a labeled `section`; use native paragraphs, lists, definition lists, and tables with captions and header cells as appropriate.
- Keep requirement IDs, priorities, acceptance criteria, metadata, and decisions as selectable text. Use stable IDs or meaningful `data-*` attributes for requirement records and fields when they aid extraction; do not make extraction depend on styling classes or screen coordinates.
- Keep navigation, print controls, and other application UI outside the authoritative article. Do not duplicate content for screen, print, or extraction; all views use the same semantic source.
- Associate each diagram's embedded PlantUML source, rendered output, caption, and short text description within a `figure`. Clearly distinguish source from generated output so extraction can preserve the script without duplicating SVG labels as prose.
- Do not flatten slides, requirements, tables, or document text into screenshots, canvas drawings, or outlined SVG text. Styling belongs in embedded CSS, separate from semantic content.

## Print to PDF

All five files must support the browser's Print / Save as PDF function and include a visible Print / PDF control.

- Embed `@media print` and suitable `@page` rules in each HTML file. Hide navigation and controls, remove screen-only fixed sizing, scrolling, and transforms, and show all slides/sections in document order, including content hidden by interactive navigation.
- Print both CEO presentations as one complete slide per landscape page. Print the functional, architecture, and implementation specifications as flowing portrait documents with readable margins, sensible page breaks, and repeating table headers where supported.
- Keep headings with their following content and figures/captions together where practical. Allow long tables or sections to break without clipping or shrinking text to unreadable sizes.
- Ensure diagrams have finished rendering before the Print / PDF control opens the print dialog. Clearly report rendering failures rather than silently printing empty diagram areas. Browser-menu printing should use the same print stylesheet; users must wait for rendering to finish.
- Preserve selectable/searchable document text in the PDF. Check print preview and a saved PDF for every delivered document; verify all slides/sections, tables, and diagrams are present and readable. A PDF is a verification output, not an additional required deliverable unless requested.

## Single-File HTML and Diagram Rendering

- Each presentation or specification must be independently shareable as one HTML file, openable directly in a browser.
- Embed all document content, CSS, navigation/rendering adapter code, PlantUML source, and any images/icons in that file. Inline SVG or data URLs may be used for visual assets.
- Only external JavaScript libraries may be referenced from a CDN. Pin their versions and preserve required license notices. No external stylesheets, fonts, images, local companion files, or externally fetched diagram source.
- Render PlantUML locally in the browser with a client-side `plantuml.js` implementation or a suitable newer TeaVM-based PlantUML JavaScript library. Use a browser-compatible distribution that satisfies the single-file/CDN-JavaScript constraint, including its transitive dependencies.
- Do not send diagram source to a remote PlantUML server, use a remote diagram-image URL, or replace the editable source with a screenshot. A URL encoder alone is not a renderer.
- CDN JavaScript may require internet access on first load; do not claim fully offline rendering unless it has been verified. If rendering fails, show a clear message and keep the document text and embedded diagram source readable.

## Review Before Delivery

Open each HTML file directly in a browser and check slide navigation or specification navigation, text readability, diagram rendering, and print layout. Confirm no clipped content, missing assets, or requests to remote diagram-rendering services. Check that text and diagram source remain accessible when CDN loading fails. Verify extraction from the saved HTML without executing JavaScript: headings, requirements, tables, metadata, and PlantUML source must be identifiable in the intended order, excluding navigation and controls. Inspect a saved PDF using the print checks above. PM verifies that each presentation agrees with its supporting specification on scope, assumptions, decisions, and relevant priorities or design choices before handing the pair to the CEO.
