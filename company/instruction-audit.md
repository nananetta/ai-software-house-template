# Instruction Preservation Review — 2026-09-20

Compared the pre-consolidation instructions in Git revision `ca25ba0` with the current working files, including the agent entry points, operating model, PM skill, product guide, handoff template, and playbooks. PM performed the comparison and QA independently reviewed it. This is an audit record, not a second source of operating policy.

## Restored or Made Explicit Again

| Information weakened by consolidation | Current home |
|---|---|
| Repository map and top-level folder purposes | `README.md`; required by `AGENTS.md` |
| Product naming examples and explicit folder purposes | `products/README.md` |
| Agile delivery with lightweight waterfall inside phases, and why | `company/operating-model.md` |
| Small increments, recipient feedback after each major deliverable, independent verification | `company/operating-model.md` |
| Specific CEO escalation triggers: conflicting requirements, significant design complexity/cost, high release risk, infeasible timelines | `playbooks/decision-rules.md` |
| Broad delivery role coverage, staging under agent limits, explicit partial-result requests | `playbooks/communication-rules.md` |
| PM summary's role map, current phase, severity-ranked findings, and actionable next handoff | `playbooks/communication-rules.md` |
| Approved and recorded exceptions to product defaults | `company/operating-model.md` |
| Explicit Markdown format for historical role handoffs | `products/README.md` |

## Preserved Through Relocation

- Human CEO authority, default PM routing, explicit role overrides, and bounded single-role delegation: communication and decision rules, plus role contracts.
- Requirements and design approval gates, clarification handling, and the separate Tech Lead implementation specification: lifecycle, decision rules, and document standards.
- All five HTML deliverables, semantic extraction, client-side editable PlantUML, single-file packaging, CDN JavaScript limits, and PDF checks: document standards and product layout.
- Workers versus Docker through Tunnel, first-time setup, local builds, explicit deploy/redeploy authorization, and live verification: deployment rules.
- Real-origin CORS and session continuity: operating model and developer contracts.
- Role responsibilities, preferred implementation technologies, inputs, outputs, and completion criteria: role files.

## Intentional Changes, Not Lost Rules

- Current product status moved from README to the single PM-owned STATUS.md; README links to it.
- Review and approval history now belongs under handoffs, with exact artifact identity and evidence defined by product tracking.
- The obsolete fictional technical-specification assets were removed in the earlier cleanup. Reusable HTML starters now provide the document mechanics; the obsolete example is not a product baseline.
- CLAUDE.md and the PM skill lead to AGENTS.md, which requires both repository/product maps and the shared operating context. They do not maintain separate copies of those policies.

No additional lost requirement was identified in the compared operating instructions after these corrections. Future consolidation must preserve each rule's owner, trigger, action, exceptions, outputs, and discoverability, as specified in the operating model.
