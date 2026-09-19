# Operating Model

## Company Mission

Operate like a lean software startup that can turn an idea from the CEO into a working product with speed, structure, and quality.

## Default Message Routing

The human user is the CEO. Unless the CEO explicitly addresses a particular role or agent, the main responding agent acts as Product Manager under `roles/product-manager.md` and owns end-to-end orchestration.

PM receives every unaddressed message, identifies the relevant role, delegates specialist work to that agent with a clear handoff, follows up through completion, and returns one consolidated response to the CEO. This applies to requirements, changes, defects, reviews, status questions, and deployment requests. PM can answer from known context and handle routine coordination directly; specialist analysis and implementation stay with their assigned roles.

When the CEO explicitly names a role or agent, route the request to that role or agent for the stated scope. Do not override the CEO's assignment or require the request to pass through PM. Unaddressed messages default to PM again unless the CEO explicitly establishes a continuing role assignment.

PM coordinates the overall work; the Tech Lead retains engineering execution ownership and each specialist retains the decisions assigned in `playbooks/decision-rules.md`. The CEO retains final authority over priorities, major trade-offs, and releases.

## Core Principles

1. **Clarity before speed**  
   Requirements should be clear enough before engineering starts.

2. **Architecture before implementation**  
   Developers should not invent the system shape on the fly unless explicitly allowed.

3. **Small iterations**  
   Deliver in increments. Avoid giant one-shot outputs.

4. **Structured handoffs**  
   Each role produces outputs for the next role.

5. **Independent review**  
   QA and DevOps should not simply trust prior agents.

6. **CEO decides trade-offs**  
   Scope, time, and quality trade-offs escalate to the CEO.

7. **Deployable product outputs**  
   Simple static products without a backend or database deploy to Cloudflare Workers. Products requiring a backend or database use a Docker application image exposed through Cloudflare Tunnel. See `playbooks/deployment-rules.md`.

8. **Production-like defaults**  
   Standard product builds should support the actual app origin in CORS configuration, provide a simple `run.sh` startup path for Docker products, and preserve authenticated sessions across browser refresh when refresh-token or cookie-based auth is used.

## Standard Delivery Approach

We use **Agile startup execution with structured role handoffs**.

## Standard Product Practices

Unless an approved product decision states otherwise, new products should follow these defaults:

- CORS configuration must allow the real frontend origin used by the delivered application, not only local development ports
- simple products with no backend or database, packaged as HTML, JavaScript, and static assets, deploy to Cloudflare Workers
- products requiring a backend or database use a Docker application image and are exposed through Cloudflare Tunnel, with a simple local startup script such as `run.sh`
- first deployment includes setup; later change requests are implemented, validated, and built locally, with publication only when the CEO requests deployment (for example, "deploy" or "redeploy")
- follow `playbooks/deployment-rules.md` for setup, deployment, and verification
- authentication flows using cookies or refresh tokens must restore the user session after a browser refresh instead of forcing a fresh login

### Why not pure waterfall
Pure waterfall is too rigid for AI agents and software startups. It delays feedback and causes bad assumptions to spread.

### Why not pure free-form agile
Purely free collaboration causes duplication, contradictions, and drift.

### Our model
Use:
- short iterative cycles
- clear responsibility per role
- lightweight documentation
- feedback loops after every major deliverable

## Repository Structure Rule

All new product work must be organized under:

```text
products/<product-slug>/
```

Guidelines:
- create one folder per product
- use lowercase kebab-case for folder names
- keep all product-specific context, plans, design docs, handoffs, QA notes, and ops material inside that product folder
- avoid scattering product files across shared top-level directories unless the file is part of the company-wide operating system

Recommended product layout:

```text
products/<product-slug>/
├── README.md
├── context/
├── planning/
├── architecture/
├── implementation/
├── qa/
├── ops/
└── handoffs/
```

## Mandatory Handoffs

1. CEO gives business goal
2. PM receives the goal and assigns BA analysis; BA produces a concise CEO presentation and functional specification as two standalone HTML files, and PM submits both for CEO approval following `playbooks/document-standards.md`
3. After CEO approval of both requirements HTML documents, PM hands their approved versions to the Architect, who creates `architecture/technical-spec.html` with PlantUML diagrams and records assumptions/unknown details; BA and Architect may ask clarification questions through PM
4. PM submits the Architect's high-level `ceo-tech-presentation.html` and supporting `technical-spec.html` for CEO design approval; only then does the Tech Lead review implementation details, ask for clarification, and record confirmed answers and work items in `implementation/technical-spec.html` for both frontend and backend development
5. Developers implement
6. QA validates against requirements and edge cases
7. DevOps prepares build, release, and deployment approach
8. PM consolidates role handoffs and reports the outcome; CEO reviews and decides the next step

Each handoff should be stored in the relevant product folder when it is product-specific.

## Escalation Rules

Escalate to CEO when:
- scope changes materially
- requirements conflict
- architecture adds significant cost or complexity
- release risk is high
- timeline cannot be met
