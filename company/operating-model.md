# Operating Model

## Mission and Principles

Turn the human CEO's goals into working products through a lean, role-driven software house. PM coordinates delivery; specialists retain their decision ownership. Use short Agile iterations with structured handoffs within each phase, clear requirements before engineering, architecture before implementation, and independent QA and DevOps review.

Escalate material scope, cost, timeline, quality, and release-risk trade-offs to the CEO. Prefer concise artifacts and explicitly owned work over duplicate documents or overlapping agent assignments.

## Delivery Approach and Working Principles

Use **Agile for delivery and iteration**, with **lightweight waterfall inside each phase** to make responsibilities, outputs, and handoffs clear.

- Deliver small increments rather than one giant output.
- Clarify requirements before engineering and establish the solution architecture before developers implement it. Developers must not invent or change the system shape without the responsible design decision.
- Review each major deliverable with its receiving role, feed findings back to the producing role, and update the affected artifacts before dependent work proceeds. Use the existing CEO gates at their defined milestones; routine feedback is not an extra approval gate.
- QA and DevOps independently verify prior outputs rather than accepting another agent's assertion that work is complete.
- Keep responsibility explicit, documentation lightweight, and handoffs structured.

Pure waterfall delays feedback and spreads early assumptions; unrestricted collaboration causes duplicate work, contradictions, and drift. This hybrid preserves short feedback cycles while keeping phase handoffs accountable. The detailed sequence belongs in `playbooks/delivery-lifecycle.md` and escalation triggers in `playbooks/decision-rules.md`.

## Canonical Sources

| Subject | Owning source |
|---|---|
| Repository map and top-level folder purposes | `README.md` |
| Organization and role map | `company/org-chart.md` and `roles/` |
| CEO/PM routing, delegation, communication | `playbooks/communication-rules.md` |
| Delivery sequence and phase entry gates | `playbooks/delivery-lifecycle.md` |
| Decision owners and approval authority | `playbooks/decision-rules.md` |
| Document content, HTML, PlantUML, extraction, PDF | `playbooks/document-standards.md` |
| Deployment paths, setup, and publication trigger | `playbooks/deployment-rules.md` |
| Current product state, approval evidence, revision handling | `playbooks/product-tracking.md` |
| Product folders and deliverable locations | `products/README.md` |
| Artifact starting formats | `templates/` |

Keep detailed policy in its owning source. Other files should link to it and state only the responsibility or context needed locally. Role files define scope, inputs, outputs, and completion criteria without replacing shared policy. Entry points (`AGENTS.md`, `CLAUDE.md`, and the PM skill) route readers to these sources. Explicit CEO instructions take precedence over repository defaults; flag actual conflicts rather than silently choosing a duplicate rule.

When consolidating instructions, preserve each rule's owner, trigger, required action, exceptions, outputs, and discoverable location. Move unique explanations and examples before removing duplicated text. Shorter wording is not sufficient evidence that the meaning was preserved.

## Standard Product Behavior

Unless an approved, recorded product-specific decision by the responsible owner says otherwise (with CEO approval where the decision rules require it):

- CORS must support the real delivered frontend origin, not only local development defaults.
- Cookie-based or refresh-token authentication must restore valid sessions across browser refresh.
- Build and package according to the deployment playbook; keep local changes distinct from the live release.
