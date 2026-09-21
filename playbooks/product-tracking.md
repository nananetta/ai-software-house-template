# Product Status and Approval Records

## One Current Status File

PM creates `products/<product-slug>/STATUS.md` from `templates/product-status-template.md` when starting a product and reads it before resuming or delegating work. It is the sole current summary of phase, active assignment, next action, blockers, deliverable versions, approval applicability, and local/live build state. Product README files describe purpose and link to STATUS.md; handoffs retain history. Do not maintain competing status summaries.

PM updates STATUS.md after a handoff, CEO decision, phase transition, blocker change, build/QA result, or deployment result, and before ending an active product work session. Specialists report changes through their handoffs; PM reconciles them to avoid conflicting writes. When the CEO directly assigns a specialist, that agent returns the status changes for PM consolidation. If the recorded state conflicts with artifacts or decision evidence, reconcile it before proceeding and mark unverifiable facts as unknown.

Keep STATUS.md concise. Link to specifications for detailed questions and assumptions, to QA/build evidence for checks, and to approval records for decisions. A successful local build does not change the live version. Keep deployment authorization separate from deployment success; record failed deployment attempts and the verified live state.

## Standard Approval Record

Use `templates/approval-record-template.md` under `handoffs/approvals/`, with a unique ID such as `APR-20260919-01`. The existing gates and decision authority are defined in `decision-rules.md`; this record adds no new approval gate. Routine Tech Lead implementation confirmations remain in the implementation specification's decision log.

1. Before requesting approval, PM identifies the exact artifact package and creates a pending record. Requirements approval covers both planning HTML files; design approval covers the technical presentation and architecture specification. Include document versions and SHA-256 digests for every artifact.
2. Preserve the reviewed bytes using an existing Git commit and file path that actually match the digest, or copy them to `handoffs/approvals/<approval-id>/artifacts/`, preserving their product-relative paths. Do not force a commit or create duplicate snapshots if a matching retrievable baseline exists. Treat retained snapshots as immutable historical evidence, not editable masters or additional working deliverables.
3. Record the CEO's actual decision: `approved`, `rejected`, or `changes-requested`. Keep `pending` until an explicit decision arrives. Evidence must identify the actual message (link/ID when available, otherwise exact quote, timestamp, and context). A direct reply approving a clearly identified package is sufficient; do not ask for a redundant confirmation. If the scope is ambiguous, ask only what is needed to identify the decision.
4. Record accepted open items or conditions exactly. Approval of only one document leaves a paired gate pending until both are explicitly covered. An unanswered question, elapsed time, agent recommendation, or finished document is not approval. Respect explicit conditions before dependent work and append evidence when each prerequisite condition is satisfied.
5. Link the record from STATUS.md and the next handoff, stating which baseline is approved and whether approval applies to current work. Check artifact identity and conditions before crossing the gate.

Do not fabricate a past approval during initialization. Existing CEO decisions in the conversation may be recorded with their evidence; reconstruct exact artifact versions only when verifiable. If approved content cannot be recovered, flag the baseline as unverified and resolve that gap before dependent work.

## CEO Change Requests Across the Delivery Process

Every CEO change request must be carried through the affected process stages. PM records the request and its source in a product handoff, identifies affected requirement IDs and artifacts, and assigns the responsible roles. This applies to new features, revisions, and defect fixes at any stage, including after deployment.

| Owner | Required change work |
|---|---|
| BA, reviewed by PM | Update `planning/functional-spec.html`: behavior, business rules, functional/non-functional requirements, acceptance criteria, and clarified assumptions. Update `planning/ceo-presentation.html` when management scope, value, risks, or decisions change. |
| Solution Architect | Update `architecture/technical-spec.html`: affected components, data/API decisions, diagrams, quality attributes, and assumptions. Update `architecture/ceo-tech-presentation.html` when the high-level design or CEO decision changes. |
| Tech Lead | Update `implementation/technical-spec.html`: confirmed implementation details, shared contracts, tasks, dependencies, and decision log. Communicate revised versions to both developer roles. |
| Frontend / Backend Developers | Update the affected code, automated tests, and integration behavior to match the revised specifications. |
| QA / Test Engineer | Update test scenarios and cases under `qa/`, including changed expected results, negative/edge paths, and relevant regression coverage. Execute the affected checks against the changed build and record results, defects, and evidence. |
| DevOps / Platform Engineer | Update build, configuration, deployment, or operational instructions when affected. Publication still follows the explicit deployment request rule. |
| PM | Reconcile artifact versions, approvals, handoffs, and STATUS.md; verify that specifications, code, and QA scenarios describe the same behavior before reporting completion. |

Revisit each applicable stage; do not implement a code-only change and leave its specification or QA scenarios stale. In the change handoff, link the request and affected requirement IDs to updated artifacts, implementation references, test scenario IDs, and execution evidence. For an unaffected artifact, record a short reason instead of making cosmetic edits. For example, a defect fix may restore already-specified behavior without changing that requirement, but still requires the affected tests to be reviewed and regression behavior verified.

Update affected specifications before dependent implementation, following the existing approval rules below. Maintain confirmed answers and explicit unknowns rather than guessing. Work not yet applicable to the current authorized phase stays identified as pending in the handoff; do not claim the whole change is complete while required downstream updates or validation remain outstanding.

## Changes After Approval

Never update an approval record's original artifact identities to make an old decision cover new bytes. Increment document versions for content changes. Compare changes against the retained baseline and classify them with the responsible owner: PM for requirements, Architect for design, Tech Lead for implementation.

- Non-material corrections within approved scope/design need no new CEO gate. Append a concise change note to the relevant record with old/new versions and digests, the updated retrievable baseline, reviewer, rationale, and confirmation that meaning, scope, contracts, and material trade-offs remain unchanged. Label the new revision as reviewed within the approved baseline, not newly CEO-approved.
- Material scope, requirement, or design changes require renewed CEO approval under `decision-rules.md`. Create a new pending record and link the earlier record; mark the affected gate `reapproval required` in STATUS.md. Existing approval remains historical evidence for its original baseline, but cannot authorize the changed work. Review downstream design/specification and task impacts; pause only work dependent on the changed decision.
- When a new decision replaces an old one, append the successor link to the old record and point STATUS.md to the applicable decision. Preserve rejections, requested changes, and previous approved baselines.

A CEO request to deploy/redeploy is already authorization under `deployment-rules.md`. Link that request in STATUS.md and deployment evidence; no extra approval-record ceremony or repeated confirmation is required. Requirements/design approval alone never authorizes publication.
