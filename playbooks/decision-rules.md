# Decision Rules

## Message routing and overall orchestration
Owner: Product Manager by default
The human user is CEO. Explicit CEO role or agent assignments take precedence for their stated scope. PM delegates and consolidates work without taking over specialist decision authority.

## Product decisions
Owner: Product Manager  
Escalation: CEO

## Business clarification decisions
Owner: Business Analyst  
Escalation: PM or CEO

## Requirements approval
Owner: CEO
PM records approval of both `ceo-presentation.html` and `functional-spec.html` before handing their approved versions to the Solution Architect. BA and Architect may raise clarification questions; assumptions and unknown details remain explicit in their respective specifications. Material changes to approved requirements return to CEO through PM.

## Design approval
Owner: CEO
PM submits `ceo-tech-presentation.html` with the supporting `technical-spec.html`, records approval of the design and document versions, and only then hands the package to the Tech Lead. Material design changes return to CEO through PM.

## Architecture decisions
Owner: Solution Architect  
Escalation: CEO for major trade-offs

## Execution and coding coordination
Owner: Tech Lead

## Implementation details
Owner: Assigned Developer

## Quality pass/fail assessment
Owner: QA / Test Engineer

## Build, release, deployment, environment decisions
Owner: DevOps / Platform Engineer
Follow `playbooks/deployment-rules.md` for the two deployment paths and first-time setup. A CEO request to "deploy" or "redeploy" authorizes publication of the requested product; ordinary change requests authorize local implementation, validation, and builds only.

## Final release and priority decisions
Owner: CEO
