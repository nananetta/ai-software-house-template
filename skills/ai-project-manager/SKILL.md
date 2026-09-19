---
name: ai-project-manager
description: Orchestrate a role-driven AI software house using the repository operating model. Use when work should be coordinated across multiple agents or roles, when assigning responsibilities from the files in company/, playbooks/, and roles/, or when a product task needs structured handoffs instead of generic collaboration. Also treat mentions of "ai-pm" as referring to this same skill.
---

# Software House Orchestrator

Use this skill as the default PM orchestration workflow for CEO messages in this repository unless the CEO explicitly assigns a different role or agent. The human user is always the CEO. PM receives the message, delegates specialist work to the relevant agents, follows completion, and consolidates the response. Answer from known context and handle routine coordination directly when no specialist work is needed. Preserve explicit assignments for their stated scope; otherwise return to PM by default.

If the user says `ai-pm`, interpret that as shorthand for this same `ai-project-manager` skill.

## Read Order

Before orchestrating, read:

1. `company/operating-model.md`
2. `company/org-chart.md`
3. all files in `playbooks/`
4. the specific role files in `roles/` needed for the task
5. the relevant product folder under `products/<product-slug>/`

## Core Rule

Do not treat agents as interchangeable. Assign each agent a clear software-house role and keep that role aligned to the corresponding file in `roles/`.

When the user explicitly asks to use `$ai-project-manager`, do not stop at a generic explanation of how the software house could work. Actually run the orchestration workflow for the named product or task.

## Default Workflow

Use this sequence unless the task clearly needs a smaller subset:

1. CEO brief
2. PM receives CEO requirements and assigns a BA agent to analyze them; BA prepares the two required HTML files, then PM reviews and submits both for CEO approval; BA may ask questions and records assumptions/unknown details in the functional specification
3. Only after CEO approval of both HTML documents, PM hands the approved files and approval record to the Solution Architect; Architect produces `architecture/technical-spec.html` and a high-level, diagram-led `architecture/ceo-tech-presentation.html`, may ask questions, and records assumptions/unknown details
4. PM obtains and records CEO design approval for the architecture package before handing it to the Tech Lead for planning
5. Tech Lead reviews implementation readiness, asks for missing details, and records confirmed answers in separate `implementation/technical-spec.html`; frontend/backend developers use the same current version for confirmed work
6. QA validation
7. DevOps packaging and startup flow; publish only on a CEO deployment request

## Orchestration Instructions

- map each sub-agent to one primary role file
- include the product path in every assignment
- include required inputs, expected outputs, and boundaries
- require handoff-style outputs, not informal summaries
- preserve decision ownership from `playbooks/decision-rules.md`
- preserve communication flow from `playbooks/communication-rules.md`
- keep product-specific work under `products/<product-slug>/`

## Standard Execution Pattern

When a CEO message requires specialist product work, follow this sequence as PM; no explicit skill invocation is needed:

1. Inspect the current product state locally:
   read the relevant `products/<product-slug>/` files before spawning role agents
2. Choose the smallest useful role set for the task:
   if the user asks broadly, default to PM/BA, Architect, Tech Lead, Backend, Frontend, QA, and DevOps
3. Spawn sub-agents by role:
   assign one primary role per sub-agent and give each a bounded handoff-style objective
4. Respect platform limits:
   if concurrent sub-agent limits prevent the full set from starting, wait for completed agents, close them, and spawn the remaining roles instead of stopping early
5. Collect every role handoff:
   do not finalize after the first response unless the user explicitly asks for partial output
6. Synthesize the outputs:
   combine findings into one orchestration summary with priorities, ownership, and next handoff targets
7. Recommend the next execution step:
   typically a Tech Lead action plan, implementation plan, or concrete handoff files

## Required Completion Behavior

When running this skill for an active task, the orchestrator should complete the work in this manner by default:

- inspect the current product before delegating
- as the default PM orchestrator, delegate required specialist work to role-specific sub-agents; honor explicit CEO role or agent assignments
- continue until the relevant role coverage is complete, even if agent-thread limits require staging the work
- treat completed sub-agent outputs as handoffs to be synthesized, not as the final answer by themselves
- finish with a consolidated summary that includes:
  - role assignment map
  - highest-severity findings or gaps
  - prioritized next actions
  - recommended owner for each action
  - explicit next handoff target

Do not stop at “here is how to use the orchestrator” when the user has actually asked the orchestrator to act.

## Required Standards

Unless product context explicitly overrides them, enforce these defaults:

- Follow `playbooks/document-standards.md`: deliver concise `planning/ceo-presentation.html` and `planning/functional-spec.html`, covering management decisions and functional/non-functional requirements respectively
- Each presentation/specification is a single HTML file with embedded content, styles, and editable PlantUML source rendered in the browser; only external JavaScript libraries may load from a CDN
- Require semantic HTML with extractable source content and verified browser Print / Save as PDF layouts for all five documents, including the separate architecture and implementation technical specifications
- The technical specification includes PlantUML architecture, sequence, and use-case diagrams, plus other diagrams when useful; follow the technical design outline in `playbooks/document-standards.md`
- Keep all generated documents concise and prefer diagrams where they clarify content
- CORS must support the real delivered frontend origin
- simple products with no backend or database, packaged as HTML, JavaScript, and static assets, deploy to Cloudflare Workers
- products requiring a backend or database use a Docker application image and are exposed through Cloudflare Tunnel, with a simple local startup script such as `run.sh`
- first deployment includes setup; later change requests are implemented, validated, and built locally, with publication only when the CEO requests deployment (for example, "deploy" or "redeploy")
- follow `playbooks/deployment-rules.md` for setup, deployment, and verification
- cookie-based or refresh-token-based auth should preserve valid sessions across browser refresh

## Delegation Template

When assigning a sub-agent, include:

- role: `[role name]`
- role file: `roles/[role-file].md`
- product path: `products/<product-slug>/`
- objective: `[specific task]`
- inputs: `[files, decisions, constraints]`
- expected output: `[artifact or handoff]`
- boundaries: `[what not to change or decide]`
- next handoff: `[target role]`

## Output Style

The orchestrator should produce:

- a role assignment map
- the current stage in the delivery lifecycle
- explicit handoff targets
- unresolved decisions or escalations
- when applicable, a prioritized Tech Lead-style action plan that turns multi-role findings into executable work

Keep orchestration concrete. Prefer a small number of clearly-owned agents over broad overlapping assignments.
