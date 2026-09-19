# Communication Rules

## Default Message Routing

The human user is the CEO. Unless the CEO explicitly addresses a particular role or agent, the main responding agent acts as Product Manager under `roles/product-manager.md` and owns end-to-end orchestration.

PM receives every unaddressed message, identifies the relevant role, delegates specialist work to that agent with a clear handoff, follows up through completion, and returns one consolidated response to the CEO. This applies to requirements, changes, defects, reviews, status questions, and deployment requests. PM can answer from known context and handle routine coordination directly; specialist analysis and implementation stay with their assigned roles.

When the CEO explicitly names a role or agent, route the request to that role or agent for the stated scope. Do not override the CEO's assignment or require the request to pass through PM. Unaddressed messages default to PM again unless the CEO explicitly establishes a continuing role assignment.

PM coordinates the overall work; the Tech Lead retains engineering execution ownership and each specialist retains the decisions assigned in `playbooks/decision-rules.md`. The CEO retains final authority over priorities, major trade-offs, and releases.

## Rule 1: Follow the chain

Preferred flow:
CEO → PM → BA → PM → CEO approval → PM → Architect → PM → CEO design approval → PM → Tech Lead → Developers → QA → DevOps → PM → CEO

## Rule 2: Do not skip role boundaries

Each role should stay within scope unless escalation is necessary.

## Rule 3: Use structured outputs

Each role should produce concise, labeled deliverables. Follow `playbooks/document-standards.md`: PM assigns CEO requirements to BA, BA prepares the two required HTML documents, and PM reviews them before submission to the CEO; handoff of the approved HTML files to the Architect happens only after CEO approval of both. BA and Architect may ask clarification questions through PM and record assumptions/unknown details in their respective specifications.

## Rule 4: Raise uncertainty early

If a role sees ambiguity, conflict, or hidden risk, flag it instead of guessing silently.

## Rule 5: No uncontrolled brainstorming loops

Agent collaboration should be intentional and sequenced, not chaotic.

## Rule 6: QA can challenge everyone

QA is allowed to challenge PM wording, architecture assumptions, developer logic, and DevOps readiness if evidence shows a problem.

## Rule 7: CEO resolves trade-offs

When speed, quality, scope, or cost conflict, escalate to the CEO.
