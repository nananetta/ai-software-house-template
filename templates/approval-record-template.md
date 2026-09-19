# Approval Record — [APR-YYYYMMDD-NN]

Copy to `products/<product-slug>/handoffs/approvals/<approval-id>.md`. Follow `playbooks/product-tracking.md`. PM records the CEO's decision; PM is not the approver.

| Field | Value |
|---|---|
| Product | [slug] |
| Gate / purpose | [requirements / design / explicitly requested release or other decision] |
| Requested by / date | [PM / ISO 8601 timestamp with timezone] |
| Decision | pending |
| Decision maker / date | [CEO / actual decision timestamp; unset while pending] |
| Decision evidence | [message link or ID if available; otherwise exact quote with conversation context and timestamp] |
| Scope / exclusions | [precise scope of this request] |
| Accepted assumptions / conditions | [IDs and exact limits; or none] |
| Supersedes | [prior record ID, or none] |

## Reviewed Artifacts

Paths are relative to the product folder. Pin the exact reviewed content; a mutable path alone is insufficient.

| Artifact | Document version / build ID | SHA-256 | Immutable retrieval reference |
|---|---|---|---|
| [path] | [version] | [digest] | [Git commit + path, or retained snapshot path] |

## Decision and Consequence

[Record what the CEO actually decided, what work it permits, and what remains unresolved. Requirements/design approval does not authorize deployment. While pending, state that dependent work is awaiting the CEO.]

## Follow-up Events

[Append dated corrections, superseding record links, or documented non-material updates here. Preserve the original decision, evidence, and reviewed artifact identities. Do not rewrite a past approval as approval of new content.]
