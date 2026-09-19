# Delivery Lifecycle

PM maintains current phase and next action in `STATUS.md`. Use `product-tracking.md` for status updates, version-specific approval records, and changes after approval; use `decision-rules.md` for authority.

## Stage 1: CEO Brief

CEO provides:
- business objective
- target users
- success definition
- constraints
- urgency

Repository action:
- create or confirm `products/<product-slug>/`
- add the initial product `README.md` with a link to `STATUS.md`
- initialize `STATUS.md` from `templates/product-status-template.md` per `product-tracking.md`
- store CEO brief material under `context/` or `planning/`

## Stage 2: PM Intake → BA Analysis → PM Review

PM receives the CEO brief, frames the objective and scope, and assigns requirements analysis to a BA agent. BA produces two concise documents under `products/<product-slug>/planning/`:

- `ceo-presentation.html`: management slides with a suitable business canvas, value, scope, success measures, risks, and decisions needed.
- `functional-spec.html`: functional and non-functional requirements, business rules, user flows, data/interface needs, and testable acceptance criteria.

BA may ask clarification questions through PM and records assumptions/unknown details in the functional specification. PM reviews consistency and priorities and submits both documents to the CEO. Only after CEO approval of both does PM record the approved versions and hand those files and decisions to the Architect. Follow `playbooks/document-standards.md` for content and review. Each output is one self-contained HTML file with embedded styling and editable PlantUML source rendered client-side; only external JavaScript libraries may load from a CDN. Use semantic HTML for content extraction and verify browser Print / Save as PDF for both outputs.

## Stage 3: Solution Design

Entry gate: CEO approval of both requirements HTML files, recorded in the PM handoff. Architect analyzes those approved deliverables and produces `architecture/technical-spec.html` plus a high-level, diagram-led `architecture/ceo-tech-presentation.html` for CEO design approval, following `playbooks/document-standards.md`. Use the same semantic single-file HTML, extractable content, client-side PlantUML, and Print / PDF approach as the functional specification. Include architecture, sequence, and use-case diagrams, with other diagrams as useful. Architect may ask clarification questions through PM and records assumptions/unknown details in the technical specification.

The technical specification covers:
- component model
- API direction
- integration design
- data flow
- non-functional considerations
- authentication and session continuity approach
- origin and CORS strategy for local and delivered environments
- deployment choice from `playbooks/deployment-rules.md`: static assets on Cloudflare Workers, or Docker through Cloudflare Tunnel for products requiring a backend or database

Repository action:
- store `technical-spec.html` and `ceo-tech-presentation.html` under `products/<product-slug>/architecture/`
- PM submits the design package to the CEO and records design approval and document versions before the Tech Lead handoff

## Stage 4: Technical Planning

Entry gate: CEO design approval recorded by PM. PM hands the approved technical presentation, technical specification, and accepted open items to the Tech Lead.

Tech Lead reviews the approved package and asks for missing implementation details. Architecture questions go to the Architect; business questions go to BA/PM, with CEO decisions through PM. Confirmed answers are captured in `implementation/technical-spec.html`, separate from the architecture specification. Follow `playbooks/document-standards.md` for semantic HTML, diagrams, extraction, and PDF verification. Resolve material questions before assigning dependent development; independent confirmed work may proceed.

Tech Lead produces:
- shared `implementation/technical-spec.html` with confirmed contracts and a clarification/decision log for frontend and backend
- implementation breakdown
- developer assignments
- dependency ordering
- review checkpoints

Repository action:
- store outputs under `products/<product-slug>/implementation/`
- place handoff records under `products/<product-slug>/handoffs/`

## Stage 5: Build

Backend and Frontend developers use the current Tech Lead `implementation/technical-spec.html` and approved upstream requirements/design as their shared reference. Tech Lead resolves contract changes and updates the specification and both developer handoffs.

Backend and Frontend developers produce:
- code
- tests
- integration notes
- implementation ready for the selected deployment path: static assets for Cloudflare Workers, or a Docker application image for Cloudflare Tunnel
- subsequent change requests implemented, validated, and built locally; publication waits for a CEO deployment request
- session restoration behavior that keeps users signed in across page refresh when refresh-token or cookie-based auth is part of the design
- origin-aware integration behavior so the delivered app does not fail due to incorrect CORS defaults

Repository action:
- keep product-specific implementation notes under `products/<product-slug>/implementation/`

## Stage 6: Validate

QA produces:
- test execution
- defect findings
- release readiness opinion

Repository action:
- store outputs under `products/<product-slug>/qa/`

## Stage 7: Prepare Deployment and Deploy on Request

DevOps produces:
- build pipeline
- static asset packaging for Cloudflare Workers, or a single Docker application image exposed through Cloudflare Tunnel
- standard startup script such as `run.sh` for Docker products
- first-deployment setup and reusable deployment instructions under `ops/`
- deployment only when requested by the CEO, including "deploy" or "redeploy"; verify the public Cloudflare URL after publication
- deployment plan
- environment config
- release readiness checks

Repository action:
- store outputs under `products/<product-slug>/ops/`

## Stage 8: CEO Review

CEO decides:
- approve release
- request revision
- reduce scope
- continue next iteration

Repository action:
- retain final review decisions/evidence under `handoffs/` and update `STATUS.md`; follow `product-tracking.md` for approval records
