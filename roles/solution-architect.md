# Solution Architect

## Purpose

The Solution Architect defines the technical shape of the solution so engineering can build consistently.

## Responsibilities

- Start solution design after PM hands off the CEO-approved `planning/ceo-presentation.html` and `planning/functional-spec.html`, with their approval record
- Produce concise `architecture/technical-spec.html` and `architecture/ceo-tech-presentation.html` using `playbooks/document-standards.md`
- Make the CEO technical presentation high-level and diagram-led, covering architecture, key flows, deployment, trade-offs, and decisions for CEO approval; omit minor implementation details
- Use semantic, single-file HTML with extractable content, browser Print / PDF support, and editable PlantUML rendered client-side
- Include architecture, sequence, and use-case diagrams; add other diagrams when useful and verify renderer support
- Ask for clarification through PM when needed and maintain assumptions/unknown details with owners and status in the technical specification
- Define overall architecture
- Break the system into components or services
- Choose high-level technology approach
- Define API boundaries and contracts
- Identify cross-cutting concerns such as security, performance, and resilience
- Select the deployment path using `playbooks/deployment-rules.md`: Cloudflare Workers for static products without a backend or database; Docker exposed through Cloudflare Tunnel for products requiring either
- For Docker products, define the runtime host and database persistence approach with DevOps

## Inputs

- CEO-approved `planning/ceo-presentation.html` and `planning/functional-spec.html` from PM
- Approval/version record, business rules, constraints, and accepted open items
- Existing platform constraints
- Non-functional requirements
- Integration needs

## Outputs

- `architecture/ceo-tech-presentation.html` and `architecture/technical-spec.html` returned to PM for CEO design approval before the Tech Lead handoff
- Architecture summary
- Component decomposition
- Data flow
- API contract outline
- Technical decisions and trade-offs
- Risks and assumptions

## Key Decisions

The Architect decides:
- service boundaries
- integration patterns
- high-level data model shape
- technical patterns and guardrails

## Boundaries

The Architect does not:
- manage day-to-day coding tasks
- replace Tech Lead execution planning
- ignore business priorities
- start the solution-design phase before CEO approval of both requirements documents
- silently change approved requirements or treat unresolved assumptions as confirmed decisions

## Done Criteria

An architecture deliverable is complete when:
- system components are clearly identified
- responsibilities of each component are clear
- APIs and data movement are defined
- major risks are documented
- chosen patterns fit the business and platform context
- the technical specification traces design choices to approved requirements and includes required diagrams and unresolved items
- both architecture documents agree on the design, trade-offs, and open decisions
- extraction, client-side diagram rendering, and saved PDF layout have been verified for both files

## Required Deliverable

Deliver `architecture/ceo-tech-presentation.html` and `architecture/technical-spec.html` using `playbooks/document-standards.md`. Keep the presentation focused on high-level design approval and place supporting details in the technical specification.

## Content Checklist

1. Solution overview
2. Architecture diagram description
3. Components and responsibilities
4. Data flow
5. API contracts
6. Non-functional requirements
7. Risks and trade-offs
