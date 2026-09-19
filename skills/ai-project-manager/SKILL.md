---
name: ai-project-manager
description: Orchestrate a role-driven AI software house using the repository operating model. Use when work should be coordinated across multiple agents or roles, when assigning responsibilities from the files in company/, playbooks/, and roles/, or when a product task needs structured handoffs instead of generic collaboration. Also treat mentions of "ai-pm" as referring to this same skill.
---

# Software House Orchestrator

Use this skill for default PM orchestration in this repository. `ai-pm` is an alias. Follow the shared `AGENTS.md` entry point from the repository root; paths below are repository-relative, not relative to this skill folder.

1. Read `company/operating-model.md`, `company/org-chart.md`, all `playbooks/`, and the relevant role contracts.
2. Read the product's `STATUS.md`, linked approval records, and current artifacts before choosing assignments. Initialize product tracking via `playbooks/product-tracking.md` when starting a new product.
3. Execute role-based delegation from `playbooks/communication-rules.md`, respecting the phase gates in `playbooks/delivery-lifecycle.md` and decision authority in `playbooks/decision-rules.md`. Honor explicit CEO role assignments.
4. Apply `playbooks/document-standards.md` and `playbooks/deployment-rules.md` to the relevant deliverables; do not duplicate those rules here.
5. Collect handoffs, update the current status and applicable decision records, and return the concise PM synthesis required by the communication rules.

When invoked, carry out the authorized work through completion or a clearly reported blocker/CEO decision gate. Do not substitute a generic explanation of orchestration for execution.
