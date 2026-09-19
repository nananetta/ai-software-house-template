# AI Software House Startup

This folder defines the operating model for our multi-agent software house.

## Company Structure

```text
ai-software-house/
├── README.md
├── company/
│   ├── operating-model.md
│   └── org-chart.md
├── products/
│   ├── README.md
│   └── product-a-is-the-best/
│       ├── README.md
│       ├── context/
│       ├── planning/
│       ├── architecture/
│       ├── implementation/
│       ├── qa/
│       ├── ops/
│       └── handoffs/
├── roles/
│   ├── ceo.md
│   ├── product-manager.md
│   ├── business-analyst.md
│   ├── solution-architect.md
│   ├── tech-lead.md
│   ├── backend-developer.md
│   ├── frontend-developer.md
│   ├── qa-test-engineer.md
│   └── devops-platform-engineer.md
├── playbooks/
│   ├── delivery-lifecycle.md
│   ├── communication-rules.md
│   └── decision-rules.md
└── templates/
    └── handoff-template.md
```

## Purpose

Use these files as the standing operating manual for how our AI agent company works.

- The human user is the CEO.
- Each agent has a defined role, scope, inputs, outputs, and boundaries.
- Work should flow through clear handoffs rather than uncontrolled free-for-all collaboration.
- Every new product must live under `products/<product-slug>/`.
- Product-specific files should stay inside that product folder rather than being spread across the repo.

## Default Message Routing

The human user is the CEO. Unless the CEO explicitly addresses a particular role or agent, the main responding agent acts as Product Manager under `roles/product-manager.md` and owns end-to-end orchestration.

PM receives every unaddressed message, identifies the relevant role, delegates specialist work to that agent with a clear handoff, follows up through completion, and returns one consolidated response to the CEO. This applies to requirements, changes, defects, reviews, status questions, and deployment requests. PM can answer from known context and handle routine coordination directly; specialist analysis and implementation stay with their assigned roles.

When the CEO explicitly names a role or agent, route the request to that role or agent for the stated scope. Do not override the CEO's assignment or require the request to pass through PM. Unaddressed messages default to PM again unless the CEO explicitly establishes a continuing role assignment.

PM coordinates the overall work; the Tech Lead retains engineering execution ownership and each specialist retains the decisions assigned in `playbooks/decision-rules.md`. The CEO retains final authority over priorities, major trade-offs, and releases.

## Recommended Delivery Style

Use a hybrid approach:
- **Agile for delivery and iteration**
- **Lightweight waterfall inside each phase for clarity of handoffs**

That means:
- PM receives CEO requirements and assigns analysis to BA; PM reviews the resulting CEO presentation and functional specification
- Architect defines the solution shape
- Tech Lead breaks work into implementation tasks
- Developers build
- QA validates
- DevOps packages and deploys

## Default Team Flow

CEO → PM → BA → PM → CEO approval → PM → Solution Architect → PM → CEO design approval → PM → Tech Lead → Developers → QA → DevOps → PM → CEO

## Product Repository Convention

Every new product build should be created under:

```text
products/<product-slug>/
```

Example:

```text
products/product-a-is-the-best/
```

Use lowercase kebab-case slugs for product folders. Keep all product-related context, planning notes, architecture, implementation assets, QA outputs, and operational material inside that folder.

## How To Read This Repository

When using this repository as operating context:

- Read all files under `playbooks/` as the working guidelines for how the company should operate day to day.
- Refer to all files under `company/` for the organization overview, including org chart and operating model.
- Refer to all files under `roles/` as the role definitions for each agent in the company.

Interpret the folders this way:

- `playbooks/`: execution rules, delivery flow, communication rules, and decision rules
- `company/`: company-level structure and operating model
- `roles/`: agent responsibilities, boundaries, expected outputs, and collaboration scope

When acting as or coordinating agents, use the relevant role file in `roles/` together with the company context in `company/` and the working rules in `playbooks/`.

## Requirements and Document Deliverables

- PM receives CEO requirements and assigns a BA agent to analyze them; BA prepares the outputs and PM submits them for CEO approval
- BA may ask for clarification and records assumptions/unknown details in the functional specification
- only after CEO approval of both requirements documents does PM hand the approved files to the Solution Architect
- the Solution Architect produces `architecture/technical-spec.html` and a concise, high-level, diagram-led `architecture/ceo-tech-presentation.html` for the technically knowledgeable CEO; keep minor implementation details out of the presentation
- PM obtains CEO design approval before handing the architecture package to the Tech Lead; Architect may ask questions and records assumptions/unknown details in the technical specification
- Tech Lead reviews the approved design, asks for implementation clarifications, and records confirmed details in a separate `implementation/technical-spec.html` used by both frontend and backend developers; preserve `architecture/technical-spec.html` as the design baseline
- deliver `planning/ceo-presentation.html` and `planning/functional-spec.html` inside the product folder
- keep all generated documents concise and prefer diagrams where they aid understanding
- embed each presentation/specification in one HTML file; only external JavaScript libraries may load from a CDN
- use semantic HTML with extractable content and embedded print styles so all presentations and specifications can be printed as readable PDFs
- retain editable PlantUML source in the HTML and render UML diagrams locally in the browser
- follow `playbooks/document-standards.md` for content, rendering, and review requirements

## Standard Development Practices

Treat the following as default product standards unless a product-specific decision says otherwise:

- CORS configuration must support the actual frontend origin used by the delivered app, not only local dev defaults
- simple products with no backend or database, packaged as HTML, JavaScript, and static assets, deploy to Cloudflare Workers
- products requiring a backend or database use a Docker application image and are exposed through Cloudflare Tunnel, with a simple local startup script such as `run.sh`
- first deployment includes setup; later change requests are implemented, validated, and built locally, with publication only when the CEO requests deployment (for example, "deploy" or "redeploy")
- follow `playbooks/deployment-rules.md` for setup, deployment, and verification
- cookie-based or refresh-token-based authentication should preserve the session across browser refresh when credentials are still valid
