# AI Software House

A reusable operating template for a role-driven software team. The human is CEO and PM coordinates work by default.

- Agents start with [AGENTS.md](AGENTS.md).
- [Operating model](company/operating-model.md) identifies the canonical source for each policy.
- [Product layout](products/README.md) lists deliverable locations.
- [Product tracking](playbooks/product-tracking.md) defines the single status file and version-specific approval records.
- [HTML starters](templates/html/README.md) provide shared presentation/specification mechanics and five document outlines.
- [Templates](templates/) also provide status, approval, handoff, and presentation styling.

Product artifacts are created under `products/<product-slug>/` as work begins. This repository defines the workflow; it does not imply a product or an approval already exists.

## Repository Map

```text
ai-software-house-template/
├── README.md                  # Repository map and starting links
├── AGENTS.md                  # Shared agent entry point and required reading
├── CLAUDE.md                  # Routes Claude to the same agent instructions
├── company/
│   ├── operating-model.md     # Principles and canonical policy index
│   └── org-chart.md           # Team structure and responsibilities
├── roles/                     # One operating contract per role
├── playbooks/                 # Shared execution rules
│   ├── communication-rules.md
│   ├── decision-rules.md
│   ├── delivery-lifecycle.md
│   ├── deployment-rules.md
│   ├── document-standards.md
│   └── product-tracking.md
├── skills/
│   └── ai-project-manager/    # PM skill entry point and agent metadata
├── templates/                 # Reusable starting formats, not product work
│   ├── handoff-template.md
│   ├── product-status-template.md
│   ├── approval-record-template.md
│   ├── default-presentation-style.md
│   └── html/                  # Shared shells, outlines, builder, and starters
└── products/
    ├── README.md              # Product naming, folder purposes, and output paths
    └── <product-slug>/        # Created when an actual product begins
```

## Folder Responsibilities

| Folder | Purpose |
|---|---|
| `company/` | Company mission, operating principles, organization, and pointers to policy owners. |
| `roles/` | Agent responsibilities, boundaries, inputs, outputs, and completion criteria. |
| `playbooks/` | How the team executes work: handoffs, decisions, approvals, delivery, documents, tracking, and deployment. |
| `skills/` | Agent-invocable workflows that apply the operating rules. |
| `templates/` | Reusable artifact formats and shared HTML mechanics; product-specific content belongs under its product. |
| `products/` | One isolated folder per product containing its context, planning, architecture, implementation, QA, operations, and history. |

The role contracts cover CEO, Product Manager, Business Analyst, Solution Architect, Tech Lead, Backend Developer, Frontend Developer, QA / Test Engineer, and DevOps / Platform Engineer. See [the organization chart](company/org-chart.md) for ownership.

The detailed product tree, naming rules, and purpose of each product subfolder are maintained in [products/README.md](products/README.md). Keep that explanation there rather than maintaining separate copies in every agent entry point.
